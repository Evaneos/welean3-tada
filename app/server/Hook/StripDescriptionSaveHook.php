<?php

namespace Tada\Hook;

use Berthe\Hook;
use Berthe\VO;
use Tada\Model\Task;

class StripDescriptionSaveHook implements Hook
{
    /**
     * @param Task $vo
     * @throws \InvalidArgumentException
     * @return void
     */
    public function before($vo)
    {
        if (null === $vo->getDescription()) {
            $vo->setStrippedDescription(null);
        } else {
            $stripped = strip_tags($vo->getDescription());
            $vo->setStrippedDescription($stripped);
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
