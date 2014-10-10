<?php

namespace Tada\Fetcher;


class TaskFetcher extends \Berthe\Fetcher
{
    public function filterByIdOfResourceTasks($id)
    {
        $this->addFilter('parent_id', \Berthe\Fetcher::TYPE_EQ, $id);
    }
}