<?php

namespace Tada\Service;

use Berthe\BaseService;
use Tada\Fetcher\TagFetcher;
use Tada\Model\Tag;

class TagService extends BaseService
{
    /** @var TagCategoryService */
    protected $tagCategoryService;

    /**
     * @param TagCategoryService $tagCategoryService
     */
    public function setTagCategoryService($tagCategoryService)
    {
        $this->tagCategoryService = $tagCategoryService;
    }

    /**
     * @param int $id
     * @return Tag[]
     */
    public function getTagsByCategoryId($id)
    {
        $fetcher = new TagFetcher(-1,-1);
        $fetcher->filterByIdOfResourceTagcategories($id);
        return $this->manager->getByFetcher($fetcher)->getResultSet();
    }

    /**
     * @param string $title
     * @return Tag[]
     */
    public function getTagsByCategoryTitle($title)
    {
        $tagCategory = $this->tagCategoryService->getByTitle($title);
        if ($tagCategory) {
            return $this->getTagsByCategoryId($tagCategory->getId());
        }
        return array();
    }
}
