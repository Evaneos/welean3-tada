

$( document ).ready(function() {

    // Compile template
    TaskMediator.compileTemplate();

    // Get data
    Tasks.initTask(0, TaskMediator.initData);

    var socket = io(SOCKET_HOST);
});