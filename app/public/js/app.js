

$( document ).ready(function() {

    // Compile template
    TaskMediator.compileTemplate();

    window.onhashchange = TaskMediator.onHashChange;
    TaskMediator.onHashChange();

    TaskMediator.init();
    TaskMediator.initEvents();

    var socket = io(SOCKET_HOST);

    socket.on('object changed', function(data) {
        var id = parseInt(data.data);
        if (data.type == "creation") {
            console.info('object created', data);
        }
        else if (data.type == "update") {
            console.info('object updated', data);

            var res = Tasks.hasTask(id);
            if(res) {
                Tasks.loadTask(id, function(data) {
                    Tasks._tasks[data.data.id] = data.data;
                    $(Tasks).trigger("update", data.data);
                });
            }
        }
        else {
            console.info('unknown message', data);
        }
    })
});

function init(id) {
    Tasks.setBaseTask(id, TaskMediator.initData);
    Tasks.initBreadcrumb(id, TaskMediator.setBreadcrumb);
}

TaskMediator.onHashChange = function(event) {
    var id = parseInt(window.location.hash.replace ( /[^\d.]/g, '' ));
    init(isNaN(id) ? 0 : id);
}