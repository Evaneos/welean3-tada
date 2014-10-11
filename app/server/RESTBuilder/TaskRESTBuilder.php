<?php

namespace Tada\RESTBuilder;

use Tada\Fetcher\TaskFetcher;
use Tada\Model\TagCategoryFetcher;

class TaskRESTBuilder extends BaseBertheBuilder
{
    /** @var \Berthe\Service */
    protected $service;

    /** @var \Berthe\Service */
    protected $tagCategoryService;

    /**
     * @param \Berthe\Service $service
     */
    public function setService($service)
    {
        $this->service = $service;
    }

    /**
     * @param \Berthe\Service $service
     */
    public function setTagCategoryService($service)
    {
        $this->tagCategoryService = $service;
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

    protected function joinState(array $tasks = array(), array $tasksREST = array(), array $embeds = array())
    {
        $ids = array();
        foreach($tasks as $task) {
            $ids[$task->getId()] = 0;
        }

        //@todo this bloc is berk, sorry, we don't know exactly what we want to do with tags, state, etc.
        $fetcher = new TagCategoryFetcher(-1,-1);
        $fetcher->filterByTitle('state');
        $result = $this->tagCategoryService->getByFetcher($fetcher)->getResultSet();
        $tagCategory = reset($result);

        var_dump($tagCategory); die;


        foreach($resultSet as $task) {
            $ids[$task->getParentId()] += 1;
        }

        foreach($tasks as $key => $task) {
            $tasksREST[$key]->setEmbed('state', new \Pyrite\PyRest\PyRestObjectPrimitive($ids[$task->getId()]));
        }

        return $tasksREST;
    }
}