<?php

namespace Tada\Service;

use Berthe\BaseService;
use Tada\Model\TagCategory;
use Tada\Model\TagCategoryFetcher;

class TagCategoryService extends BaseService
{
    /**
     * @param string $title
     * @return TagCategory
     */
    public function getByTitle($title)
    {
        $fetcher = new TagCategoryFetcher(-1,-1);
        $fetcher->filterByTitle($title);
        $result = $this->manager->getByFetcher($fetcher)->getResultSet();
        return (count($result) === 1) ? reset($result) : null;
    }
}
