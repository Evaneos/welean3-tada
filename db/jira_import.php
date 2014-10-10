<?php
/**
 * jira_import.php
 * Created by: matthieu
 * Date: 10/10/14 11:57
 * Project: tada.io
 */

$filename = $argv[1];

if (!is_file($filename) || !is_readable($filename)) {
    die ('Usage : php jira_import.php /path/to/xml/file');
}

$xml = simplexml_load_file($filename);
$types = array();
$projects = array();
$tasks = array();

foreach ($xml->channel->item as $item) {
    //project
    $tasks[(string)$item->project] = array (
        'title' => (string)$item->project,
        'description' => 'Description du projet ' . (string)$item->project,
        'parent' => null,
    );

    $tasks[(string)$item->key] = array (
        'title' => (string)$item->title,
        'description' => $item->description ? (string)$item->description : null,
        'project' => (string)$item->project, //default
        'parent' => (string)$item->project, //default
    );

    if ($item->parent) {
        $tasks[(string)$item->key]['parent'] = (string)$item->parent;
    } elseif ($item->customfields) {
        $epic = null;
        foreach($item->customfields as $cf) {
            if((string)$cf->customfield->customfieldname == 'Epic Link') {
                $tasks[(string)$item->key]['parent'] = (string)$cf->customfield->customfieldvalues[0]->customfieldvalue;
            }
        }
    }
}

?>
do
$body$
declare
begin

truncate table task;

<?php

foreach ($tasks as $key => $task) {
    printf ("PERFORM create_task ('%s', %s);\n",
        str_replace("'", "''", $task['title']),
        $task['description'] ? "'" . str_replace("'", "''", $task['description']) . "'" : 'NULL'
    );
}

foreach ($tasks as $key => $task) {
    $parent = null;

    if (isset($task['parent'])) {
        if (!array_key_exists($task['parent'], $tasks)) {
            echo '-- Parent not found : ' . $task['parent'] . "\n";
        }
        $parent = array_key_exists($task['parent'], $tasks) ? $tasks[$task['parent']]['title'] : $task['project']; //just in case missing parent
        printf ("PERFORM set_task_parent ('%s', '%s');\n",
            str_replace("'", "''", $task['title']),
            str_replace("'", "''", $parent)
        );
    }
}

?>

end
$body$
;
