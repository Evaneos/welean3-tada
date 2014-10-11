<?php

namespace Tada\Model;

class TaskHasTag extends \Berthe\AbstractVO
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
     * @var int
     */
    protected $task_id;

    /**
     * @var int
     */
    protected $tag_id;

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
     * @param int $tag_id
     */
    public function setTagId($tag_id)
    {
        $this->tag_id = $tag_id;
    }

    /**
     * @return int
     */
    public function getTagId()
    {
        return $this->tag_id;
    }

    /**
     * @param int $task_id
     */
    public function setTaskId($task_id)
    {
        $this->task_id = $task_id;
    }

    /**
     * @return int
     */
    public function getTaskId()
    {
        return $this->task_id;
    }
}
