<?php

namespace Tada\REST;

use Pyrite\PyRest\PyRestItem;
use Tada\Model\Task;
use Pyrite\PyRest\PyRestCollection;
use Pyrite\PyRest\PyRestProperty;

class TaskREST extends \Pyrite\PyRest\PyRestObject
{
    const RESOURCE_NAME = 'tasks';

    protected static function initEmbeddables()
    {
        return array (
            'childs' => new PyRestCollection('tasks'),
            'nbChilds' => new PyRestProperty(),
            'state' => new PyRestItem('tags'),
        );
    }

    public function __construct(Task $task)
    {
        $this->id = $task->getId();
        $this->title = $task->getTitle();
        $this->description = $task->getDescription();
        $this->strippedDescription = $task->getStrippedDescription();
        $this->parentId = $task->getParentId();
        $this->updatedAt = ($task->getUpdatedAt() instanceof \DateTime) ? $task->getUpdatedAt()->format(\DateTime::ISO8601) : null;
        $this->createdAt = ($task->getCreatedAt() instanceof \DateTime) ? $task->getCreatedAt()->format(\DateTime::ISO8601) : null;
        $this->rank = (int)$task->getRank();
    }

    protected $id;
    protected $title;
    protected $description;
    protected $strippedDescription;
    protected $parentId;
    protected $updatedAt;
    protected $createdAt;
    protected $rank;
}