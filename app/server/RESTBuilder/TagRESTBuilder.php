<?php

namespace Tada\RESTBuilder;

use Berthe\Service;
use Tada\Model\Tag;
use Tada\REST\TagREST;


class TagRESTBuilder extends BaseBertheBuilder
{
    /** @var Service */
    private $tagCategoryService;

    /**
     * @param Tag[] $tags
     * @param TagREST[] $tagsREST
     * @param array $embeds
     * @return \Tada\REST\TagREST[]
     */
    protected function joinCategory(array $tags = array(), array $tagsREST = array(), array $embeds = array())
    {
        /** @var TagCategoryRESTBuilder $baseBuilder */
        $baseBuilder = $this->container->get('Berthe-tagcategories-RESTBuilder');

        $categoryIds = array();
        foreach ($tags as $tag) {
            $categoryIds[$tag->getId()] = $tag->getCategoryId();
        }

        $categories = $this->tagCategoryService->getByIds(array_unique($categoryIds));
        list($convertedCategories,,) = $baseBuilder->convertAll($categories, $embeds);

        foreach($tags as $tag) {
            $tagsREST[$tag->getId()]->setEmbed('category', $convertedCategories[$tag->getCategoryId()]);
        }

        return $tagsREST;
    }

    /**
     * @param \Berthe\Service $tagCategoryService
     */
    public function setTagCategoryService($tagCategoryService)
    {
        $this->tagCategoryService = $tagCategoryService;
    }
}
