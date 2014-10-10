<?php

namespace Tada\Layer;

use Pyrite\PyRest\Exception\BadRequestException;
use Pyrite\Response\ResponseBag;
use Pyrite\Layer\AbstractLayer;
use Pyrite\Layer\Layer;

class ApiLayer extends AbstractLayer implements Layer
{
    protected function before(ResponseBag $responseBag)
    {
        $post = json_decode($this->request->getContent(), true);
        if (!$post || !is_array($post)) {
            throw new BadRequestException('Unable to parse request content as valid json');
        }
        $responseBag->set('post', $post);
    }
}
