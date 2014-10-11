<?php

namespace Tada\FetcherBuilder;

use Pyrite\PyRest\PyRestConfiguration;
use Pyrite\PyRest\Configuration\FilterParser;
use Berthe\Fetcher;
use Tada\Model\TagFetcher;

class TagFetcherBuilder extends \EVFramework\Berthe\Fetcher\BaseFetcherBuilder
{
    protected function createFetcher(PyRestConfiguration $config)
    {
        $fetcher = new TagFetcher($this->getPage($config), $this->getNbByPage($config));
        return $fetcher;
    }

    protected function createFilters(Fetcher $fetcher, PyRestConfiguration $config)
    {
        $config = $config->getConfig(FilterParser::NAME, array());
        /** @var TagFetcher $fetcher */

        if (array_key_exists('category', $config)) {
            $fetcher->filterByIdOfResourceTagcategories($config['category']);
        }
    }

    protected function createSorts(Fetcher $fetcher, PyRestConfiguration $config)
    {

    }
}