<?php

namespace Tada\Hook;

use Berthe\Hook;
use Berthe\VO;

class UpdateAllRankSaveHook implements Hook
{
    protected $manager;

    public function __construct(\Tada\Manager\TaskManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @param VO $vo
     * @throws \InvalidArgumentException
     * @return void
     */
    public function before($vo)
    {
        if ($vo->getId()) {
            $originalVO = $this->manager->getStorage()->getObjectFromPrimaryStore($vo->getId());
            if ($originalVO && ($vo->getRank() != $originalVO->getRank())) {
                $this->manager->updateAllRanks($originalVO->getRank(), $vo->getRank());
            }
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
