<?php

namespace Tada\Controller;

use Pyrite\Response\ResponseBag;
use Symfony\Component\HttpFoundation\Request;
use Pyrite\Layer\Executor\Executable;

class IndexController implements Executable
{
    public $socketUrl = '';


    /**
     * @param  Request $request The HTTP Request
     * @param  ResponseBag $bag The Bag shared by all Layers of Pyrite
     * @return string               result identifier (success / failure / whatever / ...)
     */
    public function execute(Request $request, ResponseBag $bag)
    {
        $bag->set('socketUrl', $this->socketUrl);
        return "success";
    }
}