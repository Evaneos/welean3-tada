<?php

namespace Tada\Hook;

use Berthe\Hook;
use Berthe\VO;

class CreatedDateSaveHook implements Hook
{
    /**
     * @var string
     */
    protected $method = 'setCreatedAt';

    /**
     * @param string $method
     */
    public function setMethod($method)
    {
        $this->method = $method;
    }

    /**
     * @param VO $vo
     * @throws \InvalidArgumentException
     * @return void
     */
    public function before($vo)
    {
        if (!$vo->getId()) {
            if (!method_exists($vo, $this->method)) {
                throw new \InvalidArgumentException(sprintf("Invalid CreatedDateSaveHook method '%s' for class '%s'", $this->method, get_class($vo)));
            }
            call_user_func(array($vo, $this->method), new \Datetime());
        }
    }

    /**
     * Will be run after the hooked method
     * Should be abstract, but PHP won't fix the type hinting issue on due to laziness (php bug #36601)
     * @param mixed $vo
     * @return void
     */
    public function after($vo)
    {
    }
}
