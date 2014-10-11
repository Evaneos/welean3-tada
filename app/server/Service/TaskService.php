<?php

namespace Tada\Service;

use Berthe\BaseService;
use Berthe\Exception\NotFoundException;
use Pyrite\PyRest\Exception\BadRequestException;
use Tada\Model\Task;
use Tada\Model\TaskHasTagFetcher;

class TaskService extends BaseService
{
    /** @var TagService */
    protected $tagService;

    /** @var \Berthe\Service */
    protected $taskHasTagService;

    /** @var TagCategoryService */
    protected $tagCategoryService;

    /**
     * @param \Tada\Service\TagCategoryService $tagCategoryService
     */
    public function setTagCategoryService($tagCategoryService)
    {
        $this->tagCategoryService = $tagCategoryService;
    }

    /**
     * @param \Tada\Service\TagService $tagService
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

    /**
     * @param int $id The task identifier
     * @throws \Exception
     * @return Task[]
     */
    public function getBreadcrumbTasks($id)
    {
        $tasks = array();
        try {
            /** @var Task $task */
            $task = $this->getById($id);
        } catch (NotFoundException $e) {
            return null;
        }

        $parentId = $task->getParentId();
        $tasks[] = $task;

        while ($parentId) {
            $task = $this->getById($task->getParentId());
            $tasks[] = $task;
            $parentId = $task->getParentId();
        }

        return $tasks;
    }

    /**
     * @param int $taskId
     * @param int $tagId
     * @throws \InvalidArgumentException
     * @return null
     */
    public function updateState($taskId, $tagId)
    {
        try {
            /** @var Task $task */
            $task = $this->getById($taskId);
            $tag = $this->tagService->getById($tagId);
        } catch (NotFoundException $e) {
            throw new \InvalidArgumentException;
        }

        $stateTags = $this->tagService->getTagsByCategoryTitle('state');
        $isAGoodTag = false;
        $tagIds = array();
        foreach ($stateTags as $stateTag) {
            $tagIds[] = $stateTag->getId();
            if ($stateTag->getId() == $tag->getId()) {
                $isAGoodTag = true;
            }
        }

        if (!$isAGoodTag) {
            throw new \InvalidArgumentException(sprintf('Tag id %s is not a state tag', $tagId));
        }

        $fetcher = new TaskHasTagFetcher(-1,-1);
        $fetcher->filterByTaskIds(array($task->getId()));
        $fetcher->filterByTagIds($tagIds);

        $result = $this->taskHasTagService->getByFetcher($fetcher)->getResultSet();
        if (count($result) === 1) {
            $taskHasTag = reset($result);
            $this->taskHasTagService->delete($taskHasTag);
        }

        var_dump($this->taskHasTagService->createNew(array(
            'task_id' => $task->getId(),
            'tag_id' => $tag->getId()
        )));
        die;
    }
}
