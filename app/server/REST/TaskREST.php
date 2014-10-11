<?php

namespace Tada\REST;

use Tada\Model\Task;
use Pyrite\PyRest\PyRestCollection;

class TaskREST extends \Pyrite\PyRest\PyRestObject
{
    const RESOURCE_NAME = 'tasks';

    protected static function initEmbeddables()
    {
        return array(
            'childs' => new PyRestCollection('tasks'),
        );
    }

    public function __construct(Task $task)
    {
        $this->id = $task->getId();
        $this->title = $task->getTitle();
        $this->description = $task->getDescription();
        $this->parentId = $task->getParentId();
        $this->updatedAt = ($task->getUpdatedAt() instanceof \DateTime) ? $task->getUpdatedAt()->format(\DateTime::ISO8601) : null;
        $this->createdAt = ($task->getCreatedAt() instanceof \DateTime) ? $task->getCreatedAt()->format(\DateTime::ISO8601) : null;
    }

    protected $id;
    protected $title;
    protected $description;
    protected $parentId;
    protected $updatedAt;
    protected $createdAt;
}