<?php

namespace Tada\Controller;

use Pyrite\Response\ResponseBag;
use Symfony\Component\HttpFoundation\Request;
use Pyrite\Layer\Executor\Executable;

class UpdateTaskController implements Executable
{
    protected $service;

    /**
     * @param  Request $request The HTTP Request
     * @param  ResponseBag $bag The Bag shared by all Layers of Pyrite
     * @return string               result identifier (success / failure / whatever / ...)
     */
    public function execute(Request $request, ResponseBag $bag)
    {
        // get content from request

        // save stuff
        $task = $this->service->getById(1);

        var_dump($task); die();

        return "success";
    }

    public function setTaskService($service)
    {
        $this->service = $service;
    }
}