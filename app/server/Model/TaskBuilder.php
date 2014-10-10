<?php

namespace Tada\Model;

use Berthe\AbstractBuilder;

class TaskBuilder extends AbstractBuilder
{
    /**
     * @param Task $object
     * @param array $data
     * @return Task
     */
    public function updateFromArray($object, array $data = array())
    {
        if (array_key_exists('title', $data)) {
            $object->setTitle(trim($data['title']));
        }
        if (array_key_exists('description', $data)) {
            $object->setDescription(trim($data['description']));
        }
        if (array_key_exists('parent_id', $data)) {
            $object->setParentId($data['parent_id']);
        }
        return $object;
    }
}
