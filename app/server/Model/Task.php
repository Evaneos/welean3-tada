<?php

namespace Tada\Model;


class Task extends \Berthe\AbstractVO
{
    const VERSION = 1;

    public function getDatetimeFields()
    {
        return array('created_at', 'updated_at');
    }

    /**
     * @var \DateTime
     */
    protected $created_at;

    /**
     * @var \DateTime
     */
    protected $updated_at;

    /**
     * @var string
     */
    protected $title;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     */
    protected $stripped_description;

    /**
     * @var int parent_id
     */
    protected $parent_id;
    /**
     * @return int rank
     */
    protected $rank;
    /**
     * @return int rank
     */
    public function getRank() {
        return $this->rank;
    }
    /**
     * @param int $value
     * @return Task
     */
    public function setRank($value) {
        $this->rank = $value;
        return $this;
    }
    /**
     * @return \DateTime
     */
    public function getUpdatedAt() {
        return $this->updated_at;
    }

    /**
     * @param \DateTime $value
     * @return Task
     */
    public function setUpdatedAt($value) {
        $this->updated_at = $value;
        return $this;
    }

    /**
     * @return int
     */
    public function getParentId() {
        return $this->parent_id;
    }

    /**
     * @param int $value
     * @return Task
     */
    public function setParentId($value) {
        $this->parent_id = $value;
        return $this;
    }

    /**
     * @return string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * @param string $value
     * @return Task
     */
    public function setDescription($value) {
        $this->description = $value;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle() {
        return $this->title;
    }

    /**
     * @param string $value
     * @return Task
     */
    public function setTitle($value) {
        $this->title = $value;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt() {
        return $this->created_at;
    }

    /**
     * @param \DateTime $value
     * @return Task
     */
    public function setCreatedAt($value) {
        $this->created_at = $value;
        return $this;
    }

    /**
     * @param string $stripped_description
     */
    public function setStrippedDescription($stripped_description)
    {
        $this->stripped_description = $stripped_description;
    }

    /**
     * @return string
     */
    public function getStrippedDescription()
    {
        return $this->stripped_description;
    }
}
