

$( document ).ready(function() {

    // Compile template
    TaskMediator.compileTemplate();

    window.onhashchange = TaskMediator.onHashChange;
    TaskMediator.onHashChange();

    TaskMediator.init();
    TaskMediator.initEvents();

    //var socket = io(SOCKET_HOST);
});

function init(id) {
    Tasks.initTask(id, TaskMediator.initData);
    Tasks.initBreadcrumb(id, TaskMediator.setBreadcrumb);
}

TaskMediator.onHashChange = function(event) {
    var id = parseInt(window.location.hash.replace ( /[^\d.]/g, '' ));
    init(id);
}