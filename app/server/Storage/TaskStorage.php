<?php

namespace Tada\Storage;

class TaskStorage extends \Berthe\DAL\AbstractStorage
{
    public function incrementRankInRange($lower, $higher)
    {
        return $this->getPrimaryStore()->incrementRankInRange($lower, $higher);
    }

    public function decrementRankInRange($lower, $higher)
    {
        return $this->getPrimaryStore()->decrementRankInRange($lower, $higher);
    }
}