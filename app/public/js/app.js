

$( document ).ready(function() {

    // Compile template
    TaskMediator.compileTemplate();

    window.onhashchange = TaskMediator.onHashChange;
    TaskMediator.onHashChange();

    TaskMediator.init();
    TaskMediator.initEvents();

    BreadcrumbMediator.init();

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
    Tasks.initBreadcrumb(id, BreadcrumbMediator.setBreadcrumb);
}

TaskMediator.onHashChange = function(event) {
    var id = parseInt(window.location.hash.replace ( /[^\d.]/g, '' ));
    init(isNaN(id) ? 0 : id);
}