<?php
/**
 * jira_import.php
 * Created by: matthieu
 * Date: 10/10/14 11:57
 * Project: tada.io
 */
require_once '../app/vendor/autoload.php';

$filename = $argv[1];

if (!is_file($filename) || !is_readable($filename)) {
    die ('Usage : php jira_import.php /path/to/xml/file');
}

$client = new \Guzzle\Http\Client;

/**
 * @param string $title
 * @param string $description
 * @param int $parent_id
 * @return int
 */
function postTask($title, $description = null, $parent_id = null)
{
    global $client;

    $body = array (
        'title' => $title,
        'description' => $description,
        'parent_id' => $parent_id,
    );

    $request = $client->post('http://tada:t4d4n00@www.tada.io/rest/tasks', array(), json_encode($body));
    try {
        $response = $client->send($request);
        //fuck Guzzle
        preg_match('(\d+)', (string) $response->getBody(), $matches);
        return (int)$matches[0];
    } catch (\Exception $e) {
        var_dump($e);
        die;
    }
}

/**
 * @param int $task_id
 * @param int $parent_id
 * @return int
 */
function putTaskParent($task_id, $parent_id)
{
    global $client;

    $body = array (
        'parent_id' => $parent_id,
    );

    $url = 'http://tada:t4d4n00@www.tada.io/rest/tasks/' . $task_id;
    $request = $client->put($url, array(), json_encode($body));
    try {
        $client->send($request);
    } catch (\Exception $e) {
        //var_dump($e);
        die ('Exception');
    }
}


$xml = simplexml_load_file($filename);

//$types = array();
$projects = array();
$epics = array();
$tasks = array();

foreach ($xml->channel->item as $item) {

    //project
    $projects[(string)$item->project] = array (
        'title' => (string)$item->project
    );
    $types[(string)$item->type] = 1;

    switch ((string)$item->type) {
        case 'Epic':
            $epics[(string)$item->key] = array (
                'title' => (string)$item->summary,
                'description' => $item->description ? (string)$item->description : null,
                'project' => (string)$item->project //default
            );
            break;
        default:
            $parent = null;
            if ($item->parent) {
                $parentType = 'task';
                $parent = (string)$item->parent;
            } elseif ($item->customfields) {
                foreach($item->customfields as $cf) {
                    if((string)$cf->customfield->customfieldname == 'Epic Link') {
                        $parentType = 'epic';
                        $parent = (string)$cf->customfield->customfieldvalues[0]->customfieldvalue;
                    }
                }
            }
            if ($parent) {
                $tasks[(string)$item->key] = array (
                    'title' => (string)$item->summary,
                    'description' => $item->description ? (string)$item->description : null,
                    'parentType' => $parentType,
                    'parent' => $parent,
                );
            }
            break;
    }
}

//Root task Evaneos
$idRoot = postTask('Evaneos');

//Main projects
foreach ($projects as $project) {
    printf("%s Posting project : %s\n", date('Y-m-d H:m:s'), $project['title']);
    $id = postTask($project['title'], null, $idRoot);
    $projects[$project['title']]['id'] = $id;
}

foreach($epics as $key => $epic) {
    printf("%s Posting epic (%s) : %s -- project : %s\n", date('Y-m-d H:m:s'), $key, $epic['title'], $projects[$epic['project']]['id']);
    $id = postTask($epic['title'], null, $projects[$epic['project']]['id']);
    $epics[$key]['id'] = $id;
}

foreach($tasks as $key => $task) {
    switch ($task['parentType']) {
        case 'epic':
            printf("%s Posting epic child task (%s) : %s -- Epic parent : %s\n", date('Y-m-d H:m:s'), $key, $task['title'], $epics[$task['parent']]['id']);
            $id = postTask($task['title'], $task['description'], $epics[$task['parent']]['id']);
            $tasks[$key]['id'] = $id;
            break;
        case 'task':
            printf("%s Posting simple task (%s) : %s\n", date('Y-m-d H:m:s'), $key, $task['title']);
            $id = postTask($task['title'], $task['description']);
            $tasks[$key]['id'] = $id;
            break;
    }
}

foreach($tasks as $key => $task) {
    switch ($task['parentType']) {
        case 'task':
            printf("%s Patching parent task (%d) : %d\n", date('Y-m-d H:m:s'), $task['id'], $tasks[$task['parent']]['id']);
            putTaskParent($task['id'], $tasks[$task['parent']]['id']);
            break;
    }
}

die;
var_dump($epics);

die;

?>
do
$body$
declare
begin

truncate table task;

<?php

$i=0;

foreach ($tasks as $key => $task) {
    printf ("PERFORM create_task ('%s', %s, %s);\n",
        str_replace("'", "''", $task['title']),
        $task['description'] ? "'" . str_replace("'", "''", $task['description']) . "'" : 'NULL',
        ++$i
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
