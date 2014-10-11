<?php

namespace Tada\REST;

use Tada\Model\Tag;
use Pyrite\PyRest\PyRestCollection;
use Tada\Model\TagCategory;

class TagCategoryREST extends \Pyrite\PyRest\PyRestObject
{
    const RESOURCE_NAME = 'tagcategories';

    /** @var int  */
    protected $id;
    /** @var string  */
    protected $title;
    /** @var \DateTime */
    protected $createdAt;

    protected static function initEmbeddables()
    {
        return array (
            'tags' => new PyRestCollection('tags')
        );
    }

    public function __construct(TagCategory $tagCategory)
    {
        $this->id = $tagCategory->getId();
        $this->title = $tagCategory->getTitle();
        $this->createdAt = ($tagCategory->getCreatedAt() instanceof \DateTime) ? $tagCategory->getCreatedAt()->format(\DateTime::ISO8601) : null;
    }
}
