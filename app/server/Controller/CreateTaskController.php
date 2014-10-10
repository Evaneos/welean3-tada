<?php

namespace Tada\Controller;

use Pyrite\Response\ResponseBag;
use Symfony\Component\HttpFoundation\Request;
use Pyrite\Layer\Executor\Executable;

class CreateTaskController implements Executable
{
    /** @var  \Berthe\Service */
    protected $service;

    /**
     * @param  Request $request The HTTP Request
     * @param  ResponseBag $bag The Bag shared by all Layers of Pyrite
     * @return string               result identifier (success / failure / whatever / ...)
     */
    public function execute(Request $request, ResponseBag $bag)
    {
        $post = $bag->get('post');
        $post = $this->service->createNew($post);
        $bag->setResultCode(201);
        $bag->setResult($post->getId());
        return "success";
    }

    public function setTaskService($service)
    {
        $this->service = $service;
    }
}