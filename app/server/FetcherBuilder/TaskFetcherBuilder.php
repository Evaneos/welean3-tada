<?php

namespace Tada\FetcherBuilder;

use Pyrite\PyRest\PyRestConfiguration;
use Pyrite\PyRest\Configuration\PaginationParser;
use Pyrite\PyRest\Configuration\FilterParser;
use EVFramework\Berthe\Fetcher\BaseFetcherBuilder;
use Tada\Fetcher\TaskFetcher;
use Berthe\Fetcher;


class TaskFetcherBuilder extends \EVFramework\Berthe\Fetcher\BaseFetcherBuilder
{
    protected function createFetcher(PyRestConfiguration $config)
    {
        $fetcher = new TaskFetcher($this->getPage($config), $this->getNbByPage($config));
        return $fetcher;
    }

    protected function createFilters(Fetcher $fetcher, PyRestConfiguration $config)
    {

    }

    protected function createSorts(Fetcher $fetcher, PyRestConfiguration $config)
    {

    }
}