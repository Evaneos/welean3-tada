<?php

namespace Tada\PersistentStore;

class TaskPersistentStore extends \Berthe\DAL\StoreDatabase
{
    public function incrementRankInRange($lower, $higher)
    {
        return $this->getWriter()->incrementRankInRange($lower, $higher);
    }

    public function decrementRankInRange($lower, $higher)
    {
        return $this->getWriter()->decrementRankInRange($lower, $higher);
    }
}