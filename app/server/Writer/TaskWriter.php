<?php

namespace Tada\Writer;


class TaskWriter extends \Berthe\DAL\BaseWriter
{
    public function incrementRankInRange($lower, $higher)
    {
        $sql = <<<SQL
UPDATE
    task
SET
    rank = rank+1
WHERE
    rank >= ?
AND
    rank <= ?
SQL;
        return $this->db->query($sql, array($lower, $higher));
    }

    public function decrementRankInRange($lower, $higher)
    {
        $sql = <<<SQL
UPDATE
    task
SET
    rank = rank-1
WHERE
    rank >= ?
AND
    rank <= ?
SQL;
        return $this->db->query($sql, array($lower, $higher));
    }
}