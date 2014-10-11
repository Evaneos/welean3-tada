var Tasks = {};

Tasks._task = {};
Tasks._tasks = {};
Tasks._parents = [];
Tasks.NUMBER = 20;

Tasks.TASK_UPDATED = "taskUpdated";
Tasks.CHILDREN_LOADED = "childrenLoaded";
Tasks.PARENTS_LOADED = "parentsLoaded";

Tasks.HOME = {
    "id": 0,
    "title": "Home",
    "description": "",
    "parentId": null,
    "updatedAt": "2014-10-10T16:18:03+0200",
    "createdAt": "2014-10-10T16:18:03+0200"
};



Tasks.loadTask = function(id) {
    var task = {};

    url = "/rest/tasks/"+id;
    $.ajax({
        url: "/rest/tasks/"+id,
        success: Tasks.taskLoaded,
        error: function(e) {
            console.log(e);
        },
        dataType: "json"
    });
};

Tasks.taskLoaded = function(data) {
    Tasks._calculateProperties(data.data);
    Tasks._tasks[data.data.id] = data.data;
    $(Tasks).trigger(Tasks.TASK_UPDATED, data.data);
}

Tasks.setBaseTask = function(id) {
    var task = {};
    this._tasks = {};
    this._task = {};

    if (id == 0) {
        Tasks._addMainTaskInTasks(this.HOME);
        Tasks.loadChildren(this._task);
        Tasks.initParents();
        Tasks.taskLoaded({data: this._task});
    } else {
        url = "/rest/tasks/"+id+"&number=" + number;
        $.ajax({
            url: "/rest/tasks/"+id,
            success: function(data) {
                Tasks._addMainTaskInTasks(data.data);
                Tasks.loadChildren();
                Tasks.initParents();
                Tasks.taskLoaded(data);
            },
            error: function(e) {
                console.log(e);
            },
            dataType: "json"
        });
    }
};

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
    task.index = index;
    // hasChildren
    if (parseInt(task.nbChilds) > 0) {
        task.hasChildren = true;
        task.toolbar = true;
    } else {
        task.hasChildren = false;
    }

    // more
    task.more = false;
    if (typeof task.children != 'undefined' && parseInt(task.nbChilds) > task.children.length) {
        task.more = true;
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
    return _.sortBy(Tasks._tasks, function(task) {
        return task.index;
    });
}

/************
* PARENTS
* **********/

Tasks.getParents = function() {
    return this._parents;
}

Tasks.initParents = function(task) {

    if (typeof id == "undefined") {
        task = this._task;
    }
    if (task.id == 0) {
        Tasks._parents = {};
    } else {
        $.ajax({
            url: "/rest/tasks/" + task.id + "/breadcrumb",
            success: function(data) {
                Tasks._parents = [];
                for (var i = 0 ; i < data.length ; i ++) {
                    Tasks._parents.push(data[i].data);
                };
                Tasks._parents.push(Tasks.HOME);
            },
            error: function(e) {
                console.log(e);
            },
            dataType: "json"
        });
    }
}


/************
* CHILDREN
* **********/

Tasks.loadChildren = function(task, more) {

    // Get task
    if (typeof task == 'undefined') {
        task = this._task;
    }

    if (typeof task.childrenPage == 'undefined') {
        task.childrenPage = 1;
    }

    if (more) {
        task.childrenPage ++ ;
    }

    var parameters = "embed=nbChilds&number=" + Tasks.NUMBER + "&page=" + task.childrenPage;

    // Load children
    if (task.id == 0) {
        url = "/rest/tasks?root&" + parameters;
    } else {
        url = "/rest/tasks/" + task.id + "/childs?" + parameters;
    }
    $.ajax({
        url: url,
        success: function(data) {
            var children = [];
            for ( var i = 0 ; i < data.data.length ; i ++) {
                children.push(data.data[i].data);
            }
            Tasks.addChildren(task, children);
            Tasks._calculateProperties(task);
            $(Tasks).trigger(Tasks.CHILDREN_LOADED, task);
        },
        error: function(e) {
            console.log('impossible to get children of ' + task.id + ' on url ' + url);
        },
        dataType: "json"
    });
}

Tasks.addChildren = function(task, children) {
    var level = task.level + 1;
    task.children = children;
    for (var i = 0 ; i < children.length ; i++) {
        var task = children[i];
        task.level = level;
        Tasks._calculateProperties(task);
        Tasks._tasks[task.id] = task;

        if (typeof task.children != 'undefined') {
            Tasks.addChildren(task, task.children);
        }
    }
}