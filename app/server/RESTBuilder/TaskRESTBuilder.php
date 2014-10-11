<?php

namespace Tada\RESTBuilder;

use Tada\Fetcher\TaskFetcher;

class TaskRESTBuilder extends BaseBertheBuilder
{
    protected $service;

    public function setService($service)
    {
        $this->service = $service;
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
}