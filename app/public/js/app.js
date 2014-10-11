

$( document ).ready(function() {

    // Compile template
    TaskMediator.compileTemplate();

    TaskMediator.init();
    BreadcrumbMediator.init();

    window.onhashchange = TaskMediator.onHashChange;
    TaskMediator.onHashChange();

    var socket = io(SOCKET_HOST);

    socket.on('object changed', function(data) {
        var id = parseInt(data.data);
        if (data.type == "creation") {
            console.info('object created', data);
        }
        else if (data.type == "update") {
            console.info('object updated', data);

            Tasks.loadTask(id);
        }
        else {
            console.info('unknown message', data);
        }
    })
});

function init(id) {
    Tasks.setBaseTask(id);
}

TaskMediator.onHashChange = function(event) {
    var id = parseInt(window.location.hash.replace ( /[^\d.]/g, '' ));
    init(isNaN(id) ? 0 : id);
}