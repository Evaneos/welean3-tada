<?php

namespace Tada\Service;

use Guzzle\Http\Client;
use Guzzle\Http\Message\RequestInterface;
use Tada\Model\Task;

class NotificationService
{
    /** @var Client */
    private $client;

    /** @var string */
    private $host;

    /** @var int */
    private $port;

    /** @var string */
    private $uri;

    /** @var string */
    private $endpoint;

    /**
     * @param string $host
     * @param int $port
     * @param string $uri
     */
    function __construct($host, $port, $uri)
    {
        $this->host = $host;
        $this->port = $port;
        $this->uri = $uri;
        $this->endpoint = sprintf('%s:%s%s', $this->host, $this->port, $this->uri);
    }

    /**
     * @param \Guzzle\Http\Client $client
     */
    public function setClient(Client $client)
    {
        $this->client = $client;
    }

    /**
     * @param Task $task
     */
    public function notifyCreation(Task $task)
    {
        $request = $this->client->post($this->endpoint, array(), array (
            'type' => 'creation',
            'data' => (int)$task->getId()
        ));
        try {
            $this->client->send($request);
        } catch (\Exception $e) {
            //todo manage errors
        }
    }

    /**
     * @param Task $task
     */
    public function notifyUpdate(Task $task)
    {
        $request = $this->client->post($this->endpoint, array(), array (
            'type' => 'update',
            'data' => (int)$task->getId()
        ));
        try {
            $this->client->send($request);
        } catch (\Exception $e) {
            //todo manage errors
        }
    }
}
