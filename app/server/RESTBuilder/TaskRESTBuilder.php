<?php

namespace Tada\RESTBuilder;

use Tada\Fetcher\TaskFetcher;
use Tada\Model\TagCategory;
use Tada\Model\TagCategoryFetcher;
use Tada\Model\TagFetcher;
use Tada\Model\Task;
use Tada\Model\TaskHasTag;
use Tada\Model\TaskHasTagFetcher;
use Tada\REST\TaskREST;
use Tada\Service\TagService;

class TaskRESTBuilder extends BaseBertheBuilder
{
    /** @var \Berthe\Service */
    protected $service;

    /** @var TagService */
    protected $tagService;

    /** @var \Berthe\Service */
    protected $taskHasTagService;

    /**
     * @param \Berthe\Service $service
     */
    public function setService($service)
    {
        $this->service = $service;
    }

    /**
     * @param \Berthe\Service $tagService
     */
    public function setTagService($tagService)
    {
        $this->tagService = $tagService;
    }

    /**
     * @param \Berthe\Service $taskHasTagService
     */
    public function setTaskHasTagService($taskHasTagService)
    {
        $this->taskHasTagService = $taskHasTagService;
    }

    protected function joinChild(array $tasks = array(), array $tasksREST = array(), array $embeds = array())
    {
    }

    protected function joinNbChilds(array $tasks = array(), array $tasksREST = array(), array $embeds = array())
    {
        $ids = array();
        foreach($tasks as $task) {
            $ids[$task->getId()] = 0;
        }

        $fetcher = new TaskFetcher(-1, -1);
        $fetcher->filterByParentIds(array_keys($ids));
        $resultSet = $this->service->getByFetcher($fetcher)->getResultSet();

        foreach($resultSet as $task) {
            $ids[$task->getParentId()] += 1;
        }

        foreach($tasks as $key => $task) {
            $tasksREST[$key]->setEmbed('nbChilds', new \Pyrite\PyRest\PyRestObjectPrimitive($ids[$task->getId()]));
        }

        return $tasksREST;
    }

    /**
     * @param Task[] $tasks
     * @param TaskREST[] $tasksREST
     * @param array $embeds
     * @return TaskREST[]
     */
    protected function joinState(array $tasks = array(), array $tasksREST = array(), array $embeds = array())
    {
        $tasksIds = array();
        foreach($tasks as $task) {
            $tasksIds[] = $task->getId();
        }

        /**
         * 1st, get list of tags for the 'state' tagCategory
         */
        $tagsIds = array();
        $tags = $this->tagService->getTagsByCategoryTitle('state');

        /** @var TagRESTBuilder $tagRESTBuilder */
        $tagRESTBuilder = $this->container->get('Berthe-tags-RESTBuilder');
        list($convertedTags,,) = $tagRESTBuilder->convertAll($tags, $embeds);

        foreach($tags as $tag) {
            $tagsIds[] = $tag->getId();
        }

        /**
         * Then, get list of task_has_tag
         */
        $fetcher = new TaskHasTagFetcher(-1,-1);
        $fetcher->filterByTaskIds($tasksIds);
        $fetcher->filterByTagIds($tagsIds);
        $resultSet = $this->taskHasTagService->getByFetcher($fetcher)->getResultSet();

        /** @var TaskHasTag $taskHasTag */
        $taskTags = array();
        foreach($resultSet as $taskHasTag) {
            $taskTags[$taskHasTag->getTaskId()] = $taskHasTag->getTagId();
        }

        foreach($tasks as $task) {
            if (array_key_exists($task->getId(), $taskTags)) {
                $tasksREST[$task->getId()]->setEmbed('state', $convertedTags[$taskTags[$task->getId()]]);
            }
        }

        return $tasksREST;
    }
}
