<?php

namespace Tada\Model;

use Berthe\Fetcher;

class TaskHasTagFetcher extends \Berthe\Fetcher
{
    public function filterByTagIds($ids)
    {
        $this->addFilters('tag_id', Fetcher::TYPE_IN, $ids);
        return $this;
    }

    public function filterByTaskIds($ids)
    {
        $this->addFilters('task_id', Fetcher::TYPE_IN, $ids);
        return $this;
    }
}

