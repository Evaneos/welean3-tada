var TaskMediator = {};

TaskMediator.templates = {};



TaskMediator.renderTask = function(task) {



    // Add it or replace DOM?
    var actualDom = TaskMediator.getDomFromId(task.id);

    if (typeof actualDom != 'undefined' && actualDom.length != 0) {
        var dom = $(TaskMediator.templates["task"](task));

        dom.insertAfter(actualDom);
        actualDom.remove();

    } else {

        // create dom
        var dom = $(TaskMediator.templates["leveln"](task));

        var parentDom = TaskMediator.getDomFromId(task.parent_id);
        if (typeof parentDom == 'undefined' || parentDom.length == 0 ) {
            parentDom = $('.levels');
            dom.appendTo(parentDom);
        } else {
            dom.insertAfter(parentDom);
        }
    }
}

TaskMediator.getTemplateName = function(n) {
    return "leveln";
}

TaskMediator.getDomFromId = function(id) {
    return $("#tada-"+id);
}

TaskMediator.init = function() {

    Handlebars.registerHelper('ifel', function(conditional, options) {
      if(Object.prototype.toString.call( conditional ) === '[object Array]' && conditional.length > 0) {
        return options.fn(this);
      }
    });
    Handlebars.registerPartial("task", $("#partial-task").html());
}

TaskMediator.initData = function() {
    // clean view
    $(".levels").html("");

    // render tasks
    var tasks = Tasks.getAllTasks();
    for (var i = 0 ; i < tasks.length ; i++) {
        TaskMediator.renderTask(tasks[i]);
    }

    $(".level").hide();
    $(".level1").show();
    $(".level2").show();
}

TaskMediator.setBreadcrumb = function() {

}

TaskMediator.compileTemplate = function() {
    TaskMediator.templates.leveln = TaskMediator.compileTemplateName('leveln');
    TaskMediator.templates.task = TaskMediator.compileTemplateName('partial-task');
}

TaskMediator.compileTemplateName = function(name) {
    return Handlebars.compile($("#"+name).html());
}

TaskMediator.initEvents = function(event) {
    $(document).on("click",".plus", TaskMediator.onClickPlus);

    $(document).on("dblclick",".title", TaskMediator.onDblclickTitle);

    $(document).on('keyup', 'input[type="text"]',TaskMediator.resizeInput);

    $(Tasks).on('update', TaskMediator.onUpdate);
}

TaskMediator.onUpdate = function(event, task) {
    TaskMediator.renderTask(task);
}

TaskMediator.resizeInput = function() {
    $(this).attr('size', $(this).val().length);
}

TaskMediator.onDblclickTitle = function(e) {
    var el = $(this);
    $(el).addClass('edit');
    var input = $(el).children("input").select();
    var prevValue = input.val();
    TaskMediator.resizeInput.call(input);
    Mousetrap.bind('enter', function() {
        input.blur();
    });
    Mousetrap.bind('esc', function() {
        input.val(prevValue);
        input.blur();
    });

    input.on('blur', function(event) {
        Mousetrap.unbind('enter');
        $(el).removeClass('edit');
        var id = TaskMediator.getIdFromDomId($(this).parents('.task').attr('id'));
        Tasks.updateTitle(parseInt(id), input.val());
    });
    return false;

}

TaskMediator.onClickPlus = function(event) {
    var currentId = TaskMediator.getIdFromDomId($(this).parents('.task').attr('id'));
    if ($(this).hasClass('open')) {
        $(".parent-id-"+currentId).slideUp(200);
        $(this).removeClass('open');
    } else {
        $(".parent-id-"+currentId).slideDown(200);
        $(this).addClass('open');
    }

}

TaskMediator.getIdFromDomId = function(domId) {
    return domId.replace ( /[^\d.]/g, '' );
}