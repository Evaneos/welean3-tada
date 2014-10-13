var TaskMediator = {};

TaskMediator.templates = {};

TaskMediator.currentId = null;

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

    // create new task
    TaskMediator.newTaskInit();

    TaskMediator.initEvents();
}

TaskMediator.initEvents = function(event) {
    $(document).on("click",".plus", TaskMediator.onClickPlus);

    $(document).on("dblclick",".title", TaskMediator.onDblclickTitle);

    $(document).on('keyup', 'input[type="text"]',TaskMediator.resizeInput);

    $(Tasks).on(Tasks.TASK_UPDATED, TaskMediator.onUpdate);
    $(Tasks).on(Tasks.TASK_MOVED, TaskMediator.onTaskMoved);
    $(Tasks).on(Tasks.CHILDREN_LOADED, TaskMediator.onChildrenLoaded);

    $(Tasks).on(Tasks.MAIN_TASK_LOADING, function() {
        $(document).scrollTop(0);
    });

    TaskMediator.initSortable();
}
var loading = false;
TaskMediator.initLoading = function(task) {

    if (! task.more) {
        $(".to-be-removed-" + task.id).hide();
    }
    if (loading == false) {
        $(document).on("inview", '.more:visible',  function(event, isInView) {
            if (isInView) {
                var id = parseInt($(this).attr('data-link-id'));
                $(document).off("inview");
                loading = false;
                Tasks.loadChildren(Tasks.hasTask(id), true);
            }
        });
        loading = true;
    }
}

TaskMediator.initSortable = function() {
    // init sortable
    $( ".tasklist" ).sortable({
        helper: function(event, ui){
            var $clone =  $(ui).clone();
            $clone .css('position','absolute');
            return $clone.get(0);
        },
        stop: function(event, ui) {
            var task = TaskMediator.getTaskFromDom(ui.item);
            var nextTask = TaskMediator.getTaskFromDom(ui.item.next());
            Tasks.updateRankWithNextFromView(task, nextTask);
        }
    });
    $( ".tasklist" ).disableSelection();
}

TaskMediator.renderTask = function(task) {

    // Add it or replace DOM?
    var actualDom = TaskMediator.getDomFromId(task.id);
    var insertDom = TaskMediator.getDomFromId(task.parentId).siblings(".insert-children-here")
    if (typeof actualDom != 'undefined' && actualDom.length != 0) {
        var indexInModel = Tasks.getIndex(task);
        var indexInDom = $("#tada-"+task.id).parents('.level').index();

        var dom = $(TaskMediator.templates["task"](task));

        if (indexInModel == indexInDom) {
            dom.insertAfter(actualDom);
            actualDom.remove();
        } else {
            var levelDom = actualDom.parents(".level").first();
            var newLeveldom = $(TaskMediator.templates["leveln"](task));
            levelDom.remove();
            if (indexInModel == 0) {
                newLeveldom.prependTo(insertDom);
            } else {
                insertDom.children().eq(indexInModel - 1).after(newLeveldom);
            }
        }

    } else {

        // create dom
        var dom = $(TaskMediator.templates["leveln"](task));
        if (typeof insertDom == 'undefined' || insertDom.length == 0 ) {
            var parentDom = $('.levels');
            dom.appendTo(parentDom);
        } else {
            dom.appendTo(insertDom);
        }
    }
    TaskMediator.initSortable();
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


TaskMediator.onTaskMoved = function(event, task) {
    var parentTask = Tasks.hasTask(task.parentId);
    var tasks = Tasks.getChildren(parentTask);
    for (var i = 0 ; i < tasks.length ; i ++ ) {
        TaskMediator.renderTask(tasks[i]);
    }
}

TaskMediator.onUpdate = function(event, task) {
    if (Tasks.getMainTask().id != TaskMediator.currentId) {
        $(".levels").html("");
        TaskMediator.currentId = task.id;
    }

    TaskMediator.renderTask(task);
    $(".level1").children('.more').show();

    TaskMediator.initLoading(task);
}

TaskMediator.onChildrenLoaded = function(event, task) {

    TaskMediator.initLoading(task);
    var children = Tasks.getChildren(task);
    for(var i = 0 ; i < task.children.length ; i ++) {
        var child = task.children[i];
        // check if task is not already rendered
        if ($("#tada-" + child.id).length == 0) {
            TaskMediator.renderTask(child);
        }
    }
}

TaskMediator.resizeInput = function() {
    var size = $(this).val().length;
    if (size > 30) {
        $(this).attr('size', size);
    } else {
        $(this).attr('size', 30);
    }

    if (size > 75) {
        alert('75 characters for a title? Are you serious? (And you know what? We even have gave you the possibility to continue in the description ;) )');
        $(this).val($(this).val().substring(0,75));
    }
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
        var task = TaskMediator.getTaskFromDom(this);
        Tasks.updateTitle(task, input.val());
    });
    return false;
}

TaskMediator.newTaskInit = function(task) {

    // Add dom element
    var dom = $(TaskMediator.templates["leveln"]({"title":"", "description":"", "id":"-1", "level": "2"}));
    $(dom).appendTo($('.new'));

    // Edit mode
    var el = $(dom).find('.title');
    $(el).addClass('edit');
    var input = $(el).children("input");
    TaskMediator.resizeInput.call(input);
    Mousetrap.bind('enter', function() {
        var mainTask = Tasks.getMainTask();
        if (mainTask.nbChilds > mainTask.children.length) {
            alert("we can't create a task if you haven't loaded every tasks!");
        }
        Tasks.create(input.val(), function() {
            input.val("");
        });
        input.blur();
    });
    Mousetrap.bind('esc', function() {
        input.blur();
    });
    return false;

}

TaskMediator.onClickPlus = function(event) {
    var currentId = parseInt(TaskMediator.getIdFromDom(this));
    var dom = $(this).parents('.level').first();
    if (dom.hasClass('open')) {
        $(".parent-id-"+currentId).hide();
        dom.removeClass('open');
    } else {
        $(".parent-id-"+currentId).show();
        dom.addClass('open');
    }
}

TaskMediator.getTaskFromDom = function(dom) {
    var id = TaskMediator.getIdFromDom(dom);
    return task = Tasks.hasTask(id);
}

TaskMediator.getIdFromDom = function(dom) {
    if (!$(dom).hasClass('level')) {
        dom = $(dom).parents('.task');
    } else {
        dom = dom.find(".task");
    }
    return parseInt($(dom).attr('id').replace ( /[^\d.]/g, '' ));
}