<?php

namespace Tada\Model;

use Berthe\Fetcher;

class TagFetcher extends \Berthe\Fetcher
{
    public function filterByIdOfResourceTagcategories($id)
    {
        $this->addFilter('category_id', Fetcher::TYPE_EQ, $id);
        return $this;
    }
}

