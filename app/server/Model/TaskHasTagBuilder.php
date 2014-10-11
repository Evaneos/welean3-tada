<?php

namespace Tada\Model;

use Berthe\AbstractBuilder;

class TaskHasTagBuilder extends AbstractBuilder
{
    /**
     * @param TaskHasTag $object
     * @param array $data
     * @return TaskHasTag
     */
    public function updateFromArray($object, array $data = array())
    {
        if (array_key_exists('task_id', $data)) {
            $object->setTaskId($data['task_id']);
        }
        if (array_key_exists('tag_id', $data)) {
            $object->setTagId($data['tag_id']);
        }
        return $object;
    }
}
