<?php

namespace Tada\Controller;

use Pyrite\PyRest\Exception\BadRequestException;
use Pyrite\Response\ResponseBag;
use Symfony\Component\HttpFoundation\Request;
use Pyrite\Layer\Executor\Executable;
use Tada\Service\TaskService;

class TaskUpdateStateController implements Executable
{
    /** @var TaskService */
    protected $service;

    /**
     * @param  Request $request The HTTP Request
     * @param  ResponseBag $bag The Bag shared by all Layers of Pyrite
     * @throws \Pyrite\PyRest\Exception\BadRequestException
     * @return string               result identifier (success / failure / whatever / ...)
     */
    public function execute(Request $request, ResponseBag $bag)
    {
        $taskId = $request->get('id');
        $post = $bag->get('post');

        if (!isset($post['state']) || !is_numeric($post['state'])) {
            throw new BadRequestException('state must exist and be numeric');
        }

        try {
            $this->service->updateState($taskId, $post['state']);
            $bag->setResultCode(204);
        } catch (\InvalidArgumentException $e) {
            throw new BadRequestException($e->getMessage());
        }

        return "success";
    }

    public function setTaskService($service)
    {
        $this->service = $service;
    }
}
