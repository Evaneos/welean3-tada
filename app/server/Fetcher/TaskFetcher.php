<?php

namespace Tada\Fetcher;

use Berthe\Fetcher;

class TaskFetcher extends Fetcher
{
    public function filterByIdOfResourceTasks($id)
    {
        $this->addFilter('parent_id', Fetcher::TYPE_EQ, $id);
    }

    public function filterByHavingNoParent()
    {
        $this->addFilter('parent_id', Fetcher::TYPE_IS_NULL, null);
    }

    public function filterByParentIds(array $ids = array())
    {
        $this->addFilters('parent_id', Fetcher::TYPE_IN, $ids);
    }

    public function filterByRankNotNull()
    {
        $this->addFilter('rank', Fetcher::TYPE_IS_NOT_NULL, null);
    }

    public function sortByRank($sens = Fetcher::SORT_ASC)
    {
        $this->addSort('rank', $sens);
    }
}