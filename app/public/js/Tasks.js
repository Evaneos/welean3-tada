var Tasks = {};

Tasks._task = {};
Tasks._tasks = {};
Tasks._breadcrumb = [];
Tasks.NUMBER = 100;

Tasks.TASK_UPDATED = "taskUpdated";
Tasks.CHILDREN_LOADED = "childrenLoaded";

Tasks.HOME = {
    "id": 0,
    "title": "Home",
    "description": "",
    "parentId": null,
    "updatedAt": "2014-10-10T16:18:03+0200",
    "createdAt": "2014-10-10T16:18:03+0200"
};

Tasks.initChildren = function(id, callback) {
    var url = "";
    if (id == 0) {
        url = "/rest/tasks?root&embed=nbChilds";
    } else {
        url = "/rest/tasks/"+id+"/childs?embed=nbChilds&number=" + Tasks.NUMBER;
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
    var task = Tasks.hasTask(id);
    $.ajax({
        url: "/rest/tasks/"+id+"/childs?embed=nbChilds&number=" + Tasks.NUMBER,
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

Tasks.loadTask = function(id) {
    var number = 100;
    var task = {};

    url = "/rest/tasks/"+id;
    $.ajax({
        url: "/rest/tasks/"+id,
        success: function(data) {
            Tasks._calculateProperties(data.data);
            Tasks._tasks[data.data.id] = data.data;
            $(Tasks).trigger(Tasks.TASK_UPDATED, data.data);
        },
        error: function(e) {
            console.log(e);
        },
        dataType: "json"
    });
};

Tasks.setBaseTask = function(id, callback) {
    var number = 100;
    var task = {};
    this._tasks = {};
    this._task = {};

    if (id == 0) {
        Tasks._addMainTaskInTasks(this.HOME);
        Tasks.initChildren(id, callback);
    } else {
        url = "/rest/tasks/"+id+"&number=" + number;
        $.ajax({
            url: "/rest/tasks/"+id,
            success: function(data) {
                Tasks._addMainTaskInTasks(data.data);
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
                Tasks._breadcrumb.push(Tasks.HOME);
                callback();
            },
            error: function(e) {
                console.log(e);
            },
            dataType: "json"
        });
    }
}
var index = 0;
Tasks._addMainTaskInTasks = function(task) {
    index = 0;
    this._task = task;
    Tasks._calculateProperties(task);
    task.level = 1;
    task.toolbar = false;
    task.hasChildren = false;
    Tasks._tasks = {};
    Tasks._tasks[task.id] = task;

}

Tasks._calculateProperties = function(task) {
    index ++;
    task.strippedDescription = $("<div>").html(task.description).text();
    task.toolbar = false;
    task.childrenToBeLoaded = 1;
    task.index = index;
    console.log(task);
    if (parseInt(task.nbChilds) > 0) {
        task.hasChildren = true;
        task.toolbar = true;
    } else {
        task.hasChildren = false;
    }
}

Tasks.addChildren = function(children, level) {
    for (var i = 0 ; i < children.length ; i++) {
        var task = children[i].data;
        task.level = level;
        Tasks._calculateProperties(task);
        Tasks._tasks[task.id] = task;

        if (typeof task.children != 'undefined') {
            Tasks.addChildren(task.children, level + 1);
        }
    }
}

Tasks.updateTitle = function(id, title) {
    console.info(id, title);
    var task = Tasks.hasTask(id);
    task.title = title;
    $(this).trigger(Tasks.TASK_UPDATED, task);


    var data = {
        'title' : title
    }

    $.ajax({
        url: "/rest/tasks/" + id,
        type: 'PATCH',
        success: function(data) {
            console.info('PATCH ok');
        },
        error: function(e) {
            console.info('PATCH ko');
        },
        data : JSON.stringify(data),
        dataType: "json"
    });


    $(this).trigger(Tasks.TASK_UPDATED, task);
}

Tasks.hasTask = function(id) {
    return _.findWhere(this._tasks, {"id":id});
}

Tasks.getAllTasks = function() {
    console.log(Tasks._tasks);
    return _.sortBy(Tasks._tasks, function(task) {
        return task.index;
    });
}

Tasks.getBreadcrumb = function() {
    return this._breadcrumb;
}