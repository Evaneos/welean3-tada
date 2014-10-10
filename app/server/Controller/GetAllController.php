<?php

namespace Tada\Controller;

use Pyrite\Response\ResponseBag;
use Symfony\Component\HttpFoundation\Request;
use Pyrite\Layer\Executor\Executable;

class GetAllController implements Executable
{
    /**
     * @param  Request $request The HTTP Request
     * @param  ResponseBag $bag The Bag shared by all Layers of Pyrite
     * @return string               result identifier (success / failure / whatever / ...)
     */
    public function execute(Request $request, ResponseBag $bag)
    {
        $json = file_get_contents(ROOT_DIR . '/server/dummy.all.json');

        $bag->addHeader("Content-type", "application/json");
        $bag->setResult($json);

        return "success";
    }
}