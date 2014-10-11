<?php

namespace Tada\Model;

use Berthe\Fetcher;

class TagCategoryFetcher extends \Berthe\Fetcher
{
    /**
     * @param string $title
     * @return $this
     */
    public function filterByTitle($title)
    {
        $this->addFilter('title', Fetcher::TYPE_EQ, $title);
        return $this;
    }
}

