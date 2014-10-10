<?php

namespace Tada\Service;

use Berthe\BaseService;
use Berthe\Exception\NotFoundException;
use Tada\Model\Task;

class TaskService extends BaseService
{
    /**
     * @param int $id The task identifier
     * @throws \Exception
     * @return Task[]
     */
    public function getBreadcrumbTasks($id)
    {
        $tasks = array();
        try {
            /** @var Task $task */
            $task = $this->getById($id);
        } catch (NotFoundException $e) {
            return null;
        }

        $parentId = $task->getParentId();
        $tasks[] = $task;

        while ($parentId) {
            $task = $this->getById($task->getParentId());
            $tasks[] = $task;
            $parentId = $task->getParentId();
        }

        return $tasks;
    }
}
