<?php

namespace Tada\Model;


class Task extends \Berthe\AbstractVO
{
    const VERSION = 1;

    public function getDatetimeFields() {
        return array('created_at', 'updated_at');
    }
    /**
     * @return DateTime created_at
     */
    protected $created_at;
    /**
     * @return string title
     */
    protected $title;
    /**
     * @return string description
     */
    protected $description;
    /**
     * @return int parent_id
     */
    protected $parent_id;
    /**
     * @return DateTime updated_at
     */
    protected $updated_at;

    /**
     * @return DateTime updated_at
     */
    public function getUpdatedAt() {
        return $this->updated_at;
    }
    /**
     * @param DateTime $value
     * @return Task
     */
    public function setUpdatedAt($value) {
        $this->updated_at = $value;
        return $this;
    }
    /**
     * @return int parent_id
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
     * @return string description
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
     * @return string title
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
     * @return DateTime created_at
     */
    public function getCreatedAt() {
        return $this->created_at;
    }
    /**
     * @param DateTime $value
     * @return Task
     */
    public function setCreatedAt($value) {
        $this->created_at = $value;
        return $this;
    }

}