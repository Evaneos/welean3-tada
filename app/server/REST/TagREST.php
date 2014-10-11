<?php

namespace Tada\REST;

use Pyrite\PyRest\PyRestItem;
use Tada\Model\Tag;
use Tada\Model\Task;
use Pyrite\PyRest\PyRestCollection;

class TagREST extends \Pyrite\PyRest\PyRestObject
{
    const RESOURCE_NAME = 'tags';

    /** @var int  */
    protected $id;
    /** @var string  */
    protected $title;
    /** @var int */
    protected $categoryId;
    /** @var \DateTime */
    protected $createdAt;

    protected static function initEmbeddables()
    {
        return array (
            'category' => new PyRestItem('tagcategories')
        );
    }

    public function __construct(Tag $tag)
    {
        $this->id = $tag->getId();
        $this->title = $tag->getTitle();
        $this->categoryId = $tag->getCategoryId();
        $this->createdAt = ($tag->getCreatedAt() instanceof \DateTime) ? $tag->getCreatedAt()->format(\DateTime::ISO8601) : null;
    }
}
