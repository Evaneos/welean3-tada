<?php

namespace Tada\Controller;

use Pyrite\Response\ResponseBag;
use Symfony\Component\HttpFoundation\Request;
use Pyrite\Layer\Executor\Executable;

class GetAllController implements Executable
{
    protected $service;

    /**
     * @param  Request $request The HTTP Request
     * @param  ResponseBag $bag The Bag shared by all Layers of Pyrite
     * @return string               result identifier (success / failure / whatever / ...)
     */
    public function execute(Request $request, ResponseBag $bag)
    {
        $tasks = $this->service->getAll();

        $out = array();
        foreach($tasks as $task) {
            $out[] = $task->__toArray();
        }
        $json = json_encode($out);

        $bag->addHeader("Content-type", "application/json");
        $bag->setResult($json);

        return "success";
    }

    public function setTaskService($service)
    {
        $this->service = $service;
    }
}