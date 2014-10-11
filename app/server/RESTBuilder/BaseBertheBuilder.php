<?php

namespace Tada\RESTBuilder;

class BaseBertheBuilder
{
    protected $container;
    protected $resourceName;

    public function setContainer($container)
    {
        $this->container = $container;
    }

    public function setResourceName($resourceName)
    {
        $this->resourceName = $resourceName;
    }

    protected function preBuild($object)
    {
        $className = get_class($object);
        $config = $this->container->getParameter('crud.packages.' . $this->resourceName);
        $classNameREST = $config['rest'];
        $objectREST = new $classNameREST($object);
        return $objectREST;
    }

    public function convertAll(array $objects = array(), array $embeds = array())
    {
        $objectsREST = array();
        foreach($objects as $key => $object) {
            $objectREST = $this->preBuild($object);
            $objectsREST[$key] = $objectREST;
        }

        $this->joinBuild($objects, $objectsREST, $embeds);

        $transformed = array();
        foreach($objectsREST as $key => $objectREST) {
            $transformed[$key] = $objectREST;
        }

        return array($transformed, $objectsREST, $objects);
    }

    protected function joinBuild(array $objects = array(), array $objectsREST = array(), array $embeds = array())
    {
        if(!count($objectsREST)) {
            return;
        }

        $first = reset($objectsREST);
        $embeddables = $first::getEmbeddables();

        foreach($embeds as $name => $embedArray) {
            if (array_key_exists($name, $embeddables)) {
                if (($embeddables[$name] instanceof \Pyrite\PyRest\PyRestItem) || ($embeddables[$name] instanceof \Pyrite\PyRest\PyRestProperty)) {
                    $joinMethod = "join" . ucfirst($name);
                    if (method_exists($this, $joinMethod)) {
                        $this->$joinMethod($objects, $objectsREST, $embedArray);
                    }
                    else {
                        throw new \Pyrite\PyRest\Exception\NotImplementedException(sprintf("Couldn't embed '%s', method '%s' doesn't exist in '%s'", $name, $joinMethod, get_class($this)));
                    }
                }
                elseif ($embeddables[$name] instanceof \Pyrite\PyRest\PyRestCollection) {
                    throw new \Pyrite\PyRest\Exception\BadRequestException(sprintf("Can only embed a PyRestItem, '%s' is a collection", $name));
                }
                else {
                    throw new \Pyrite\PyRest\Exception\BadRequestException(sprintf("Can only embed a PyRestItem, '%s' is a '%s'", $name, gettype($embeddables[$name])));
                }
            }
            else {
                throw new \Pyrite\PyRest\Exception\BadRequestException(sprintf("'%s' is not an available embed", $name));

            }
        }
    }
}