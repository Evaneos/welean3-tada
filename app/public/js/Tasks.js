var Tasks = {};

Tasks._task = {};
Tasks._tasks = [];
Tasks._breadcrumb = [];
Tasks.NUMBER = 100;

Tasks.TASK_UPDATED = "taskUpdated";
Tasks.CHILDREN_LOADED = "childrenLoaded";

Tasks.initChildren = function(id, callback) {
    var url = "";
    if (id == 0) {
        url = "/rest/tasks?root";
    } else {
        url = "/rest/tasks/"+id+"/childs?number=" + Tasks.NUMBER;
    }
    $.ajax({
        url: url,
        success: function(data) {
            Tasks.addChildren(data.data, 2);
            callback();
        },
        error: function(e) {
            console.log(e);
        },
        dataType: "json"
    });
};

Tasks.loadChildren = function(id) {
    var task = Tasks.getTask(id);
    $.ajax({
        url: "/rest/tasks/"+id+"/childs?number=" + Tasks.NUMBER,
        success: function(data) {
            task.children = [];
            for ( var i = 0 ; i < data.data.length ; i ++) {
                task.children.push(data.data[i].data);
            }
            Tasks.addChildren(data.data, task.level + 1);
            $(Tasks).trigger(Tasks.CHILDREN_LOADED, task);
        },
        error: function(e) {
            console.log('impossible to get children of ' + id);
        },
        dataType: "json"
    });
}


Tasks.initTask = function(id, callback) {
    var number = 100;
    var task = {};
    if (id == 0) {
        Tasks.setTask({
            "id": 0,
            "title": "Home",
            "description": "",
            "parentId": null,
            "updatedAt": "2014-10-10T16:18:03+0200",
            "createdAt": "2014-10-10T16:18:03+0200"
        });
        Tasks.initChildren(id, callback);
    } else {
        url = "/rest/tasks/"+id+"&number=" + number;
        $.ajax({
            url: "/rest/tasks/"+id,
            success: function(data) {
                console.log(data);
                Tasks.setTask(data.data);
                Tasks.initChildren(id, callback);
            },
            error: function(e) {
                console.log(e);
            },
            dataType: "json"
        });
    }
};

Tasks.initBreadcrumb = function(id, callback) {
    if (id == 0) {

        Tasks._breadcrumb = {};
        callback();

    } else {
        $.ajax({
            url: "/rest/tasks/" + id + "/breadcrumb",
            success: function(data) {
                Tasks._breadcrumb = [];
                for (var i = 0 ; i < data.length ; i ++) {
                    Tasks._breadcrumb.push(data[i].data);
                };
                Tasks._breadcrumb.push(
                {
                    "id": 0,
                    "title": "Home",
                    "description": "",
                    "parentId": null,
                    "updatedAt": "2014-10-10T16:18:03+0200",
                    "createdAt": "2014-10-10T16:18:03+0200"
                });
                callback();
            },
            error: function(e) {
                console.log(e);
            },
            dataType: "json"
        });
    }
}

Tasks.setTask = function(task) {
    this._task = task;
    this._tasks = [];
    task.level = 1;
    task.strippedDescription = $("<div>").html(task.description).text();
    this._tasks.push(task);

}

Tasks.addChildren = function(children, level) {
    for (var i = 0 ; i < children.length ; i++) {
        var task = children[i].data;
        task.level = level;
        task.strippedDescription = task.description;
        task.childrenToBeLoaded = 2;
        Tasks._tasks.push(task);

        if (typeof task.children != 'undefined') {
            Tasks.addChildren(task.children, level + 1);
        }
    }
}

Tasks.updateTitle = function(id, title) {
    var task = Tasks.getTask(id);
    task.title = title;
    $(this).trigger(Tasks.TASK_UPDATED, task);
}

Tasks.getTask = function(id) {
    return _.findWhere(this._tasks, {"id":id});
}

Tasks.getAllTasks = function() {
    console.log(Tasks._tasks);
    return Tasks._tasks;
}

Tasks.getBreadcrumb = function() {
    return this._breadcrumb;
}