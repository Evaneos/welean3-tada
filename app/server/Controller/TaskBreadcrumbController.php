<?php

namespace Tada\Controller;

use Pyrite\PyRest\Exception\NotFoundException;
use Pyrite\PyRest\Serialization\Serializer;
use Pyrite\Response\ResponseBag;
use Symfony\Component\HttpFoundation\Request;
use Pyrite\Layer\Executor\Executable;
use Tada\Model\Task;
use Tada\RESTBuilder\TaskRESTBuilder;

class TaskBreadcrumbController implements Executable
{
    /** @var  \Berthe\Service */
    protected $service;

    /** @var TaskRESTBuilder */
    protected $builder;

    /** @var Serializer */
    protected $serializer;

    /**
     * @param  Request $request The HTTP Request
     * @param  ResponseBag $bag The Bag shared by all Layers of Pyrite
     * @throws \Pyrite\PyRest\Exception\NotFoundException
     * @return string               result identifier (success / failure / whatever / ...)
     */
    public function execute(Request $request, ResponseBag $bag)
    {
        $tasks = array();
        /** @var Task $task */
        $task = $this->service->getById($request->get('id'));
        if (!$task) {
            throw new NotFoundException;
        }

        $parentId = $task->getParentId();
        $tasks[] = $task;

        while ($parentId) {
            $task = $this->service->getById($task->getParentId());
            $tasks[] = $task;
            $parentId = $task->getParentId();
        }

        list($restTasks,,) = $this->builder->convertAll($tasks);

        $bag->set('data', $this->serializer->serializeMany($restTasks));

        return "success";
    }

    /**
     * @param \Berthe\Service $service
     */
    public function setTaskService($service)
    {
        $this->service = $service;
    }

    /**
     * @param \Tada\RESTBuilder\TaskRESTBuilder $builder
     */
    public function setBuilder($builder)
    {
        $this->builder = $builder;
    }

    /**
     * @param \Pyrite\PyRest\Serialization\Serializer $serializer
     */
    public function setSerializer($serializer)
    {
        $this->serializer = $serializer;
    }
}