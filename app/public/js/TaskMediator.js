var TaskMediator = {};

TaskMediator.templates = {};



TaskMediator.init = function() {

    Handlebars.registerHelper('ifel', function(conditional, options) {
      if(Object.prototype.toString.call( conditional ) === '[object Array]' && conditional.length > 0) {
        console.log('ok');
        return options.fn(this);
      }
    });
    Handlebars.registerHelper('plusone', function(conditional, options) {
      return conditional + 1;
    });
    Handlebars.registerPartial("task", $("#partial-task").html());

    TaskMediator.initEvents();
}

TaskMediator.initEvents = function(event) {
    $(document).on("click",".plus", TaskMediator.onClickPlus);

    $(document).on("dblclick",".title", TaskMediator.onDblclickTitle);

    $(document).on('keyup', 'input[type="text"]',TaskMediator.resizeInput);

    $(document).on("inview", '.more:visible',  function(event, isInView) {
        if (isInView) {
            var id = parseInt($(this).attr('data-link-id'));
            Tasks.loadChildren(Tasks.hasTask(id), true);
        }
    });

    $(Tasks).on(Tasks.TASK_UPDATED, TaskMediator.onUpdate);

    $(Tasks).on(Tasks.CHILDREN_LOADED, TaskMediator.onChildrenLoaded);
}

TaskMediator.initData = function() {
    // clean view
    $(".levels").html("");

    // render tasks
    var tasks = Tasks.getAllTasks();
    _.each(tasks, function(elem, index, list) {
        TaskMediator.renderTask(elem);
    });

    $(".level").hide();
    $(".level1").show();
    $(".level2").show();
}

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

        var insertBeforeDom = TaskMediator.getDomFromId(task.parentId).siblings(".insert-children-here");
        if (typeof insertBeforeDom == 'undefined' || insertBeforeDom.length == 0 ) {
            var parentDom = $('.levels');
            dom.appendTo(parentDom);
        } else {
            dom.insertBefore(insertBeforeDom);
        }
    }
}

TaskMediator.getTemplateName = function(n) {
    return "leveln";
}

TaskMediator.getDomFromId = function(id) {
    return $("#tada-"+id);
}

TaskMediator.compileTemplate = function() {
    TaskMediator.templates.leveln = TaskMediator.compileTemplateName('leveln');
    TaskMediator.templates.task = TaskMediator.compileTemplateName('partial-task');
}

TaskMediator.compileTemplateName = function(name) {
    return Handlebars.compile($("#"+name).html());
}

TaskMediator.onUpdate = function(event, task) {
    TaskMediator.renderTask(task);
}

TaskMediator.onChildrenLoaded = function(event, task) {

    if (! task.more) {
        $(".to-be-removed-" + task.id).hide();
    }
    for(var i = 0 ; i < task.children.length ; i ++) {
        var child = task.children[i];
        // check if task is not already rendered
        if ($("#tada-" + child.id).length == 0) {
            TaskMediator.renderTask(child);
        }
    }
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
        var id = TaskMediator.getIdFromDom(this);
        Tasks.updateTitle(parseInt(id), input.val());
    });
    return false;

}

TaskMediator.onClickPlus = function(event) {
    var currentId = parseInt(TaskMediator.getIdFromDom(this));
    if ($(this).hasClass('open')) {
        $(".parent-id-"+currentId).slideUp(200);
        $(this).removeClass('open');
    } else {
        $(".parent-id-"+currentId).slideDown(200);
        $(this).addClass('open');
    }
}

TaskMediator.getIdFromDom = function(dom) {
    return $(dom).parents('.task').attr('id').replace ( /[^\d.]/g, '' );
}