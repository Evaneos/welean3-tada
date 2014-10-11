<?php

namespace Tada\Manager;

class TaskManager extends \Berthe\AbstractManager
{
    /**
     * Return a new VO with default values
     * @return VO the VO with its default values
     */
    public function getVOForCreation()
    {
        $vo = parent::getVOForCreation();

        $vo->setRank($this->fetchMaxRank() + 1);

        return $vo;
    }

    /**
     * Retrieve the current max rank, 0 if no rank
     * @return int
     */
    protected function fetchMaxRank()
    {
        $fetcher = new \Tada\Fetcher\TaskFetcher(1, 1);
        $fetcher->sortByRank(\Berthe\Fetcher::SORT_DESC);
        $fetcher->filterByRankNotNull();

        $resultSet = $this->getByFetcher($fetcher)->getResultSet();

        if(count($resultSet)) {
            $task = reset($resultSet);
            $rankValue = $task->getRank();
        }
        else {
            $rankValue = 0;
        }

        return $rankValue;
    }

    public function updateAllRanks($oldRank, $newRank)
    {
        if ($newRank < $oldRank) {
            return $this->getStorage()->incrementRankInRange($newRank, $oldRank - 1);
        }
        elseif ($newRank > $oldRank) {
            return $this->getStorage()->decrementRankInRange($oldRank + 1, $newRank);
        }

        return true;
    }
}