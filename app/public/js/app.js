

$( document ).ready(function() {

    // Compile template
    TaskMediator.compileTemplate();

    // Get data
    init(0);

    window.onhashchange = TaskMediator.onHashChange;

    TaskMediator.init();
    TaskMediator.initEvents();

    var socket = io(SOCKET_HOST);

    socket.on('object changed', function(data) {
        if (data.type == "creation") {
            console.info('object created', data.data);
        }
        else if (data.type == "update") {
            console.info('object updated', data.data);
        }
        else {
            console.info('unknown message', data);
        }
    })
});

function init(id) {
    Tasks.initTask(id, TaskMediator.initData);
}

TaskMediator.onHashChange = function(event) {
    var id = parseInt(window.location.hash.replace ( /[^\d.]/g, '' ));
    init(id);
}