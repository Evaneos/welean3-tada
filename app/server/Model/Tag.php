<?php

namespace Tada\Model;

class Tag extends \Berthe\AbstractVO
{
    const VERSION = 1;

    public function getDatetimeFields()
    {
        return array('created_at');
    }

    /**
     * @var \DateTime
     */
    protected $created_at;

    /**
     * @var string
     */
    protected $title;

    /**
     * @var int
     */
    protected $category_id;

    /**
     * @param int $category_id
     */
    public function setCategoryId($category_id)
    {
        $this->category_id = $category_id;
    }

    /**
     * @return int
     */
    public function getCategoryId()
    {
        return $this->category_id;
    }

    /**
     * @param \DateTime $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }
}
