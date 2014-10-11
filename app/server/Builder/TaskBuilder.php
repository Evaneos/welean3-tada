<?php

namespace Tada\Builder;

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
        if (array_key_exists('parentId', $data)) {
            $object->setParentId($data['parentId']);
        }
        if (array_key_exists('rank', $data)) {
            $object->setRank($data['rank']);
        }
        return $object;
    }
}
