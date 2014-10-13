var Tasks = {};

Tasks._task = {};
Tasks._tasks = {};
Tasks._parents = [];
Tasks.NUMBER = 40;

Tasks.TASK_UPDATED = "taskUpdated";
Tasks.CHILDREN_LOADED = "childrenLoaded";
Tasks.PARENTS_LOADED = "parentsLoaded";
Tasks.MAIN_TASK_CHANGING = "mainTaskChanging";
Tasks.TASK_MOVED = "taskMoved";

Tasks.HOME = {
    "id": 0,
    "title": "Home",
    "description": "",
    "parentId": null,
    "updatedAt": "2014-10-10T16:18:03+0200",
    "createdAt": "2014-10-10T16:18:03+0200"
};



Tasks.loadTask = function(id, callback) {
    var task = {};

    url = "/rest/tasks/"+id+"?embed=nbChilds";
    $.ajax({
        url: url,
        success: function(data) {
            var task = data.data;
            if (typeof callback != 'undefined') { callback(task); }
            Tasks.taskLoaded(task);
        },
        error: function(e) {
            console.log(e);
        },
        dataType: "json"
    });
};

Tasks.taskLoaded = function(task) {
    var oldTask = Tasks.hasTask(task.id);
    if (oldTask) {
        if (oldTask.title !== task.title) {
            Tasks.updateTitle(task, task.title);
        }
        if (oldTask.rank !== task.rank) {
            Tasks.updateRank(task, task.rank);
        }
            Tasks._calculateProperties(oldTask);
    } else {
        Tasks._calculateProperties(task);
    }
}

Tasks.setMainTask = function(id) {
    var task = {};
    this._tasks = {};
    this._task = {};

    if (id == 0) {
        Tasks._addMainTaskInTasks(this.HOME);
        Tasks.initParents();
        Tasks.loadChildren();
    } else {
        Tasks.loadTask(id, function(task) {
                Tasks._addMainTaskInTasks(task);
                Tasks.initParents();
        })
    }
    $(Tasks).trigger(Tasks.MAIN_TASK_CHANGING);
};

var index = 0;
Tasks._addMainTaskInTasks = function(task) {
    index = 0;
    this._task = task;
    task.level = 1;
    task.toolbar = false;
    task.hasChildren = false;

}

Tasks._calculateProperties = function(task) {
    index ++;
    task.strippedDescription = $("<div>").html(task.description).text();
    task.toolbar = true;
    task.index = index;
    task.hasChildren = false;

    // parent_id
    if ((task.parentId == null || typeof task.parentId == 'undefined') && task.id != 0) {
        task.parentId = 0;
    }

    // level
    if (typeof task.level == 'undefined') {
        var parent = Tasks.hasTask(task.parentId);
        if (typeof parent != 'undefined') {
            task.level = parent.level + 1;
        } else if (Tasks._task.id == 0) {
            task.level = 2;
        }
    }

    // hasChildren
    if (typeof task.nbChilds == 'undefined' && typeof task.children != 'undefined') {
        task.nbChilds = task.children.length;
    }
    if (parseInt(task.nbChilds) > 0) {
        task.hasChildren = true;
    }

    // more
    if (typeof task.children == 'undefined') {
        task.children = [];
    }
    task.more = false;
    if (typeof task.children != 'undefined' && parseInt(task.nbChilds) > task.children.length) {
        task.more = true;
    }

    if (task.id === Tasks.getMainTask().id) {
        task.toolbar = false;
    }

    Tasks._tasks[task.id] = task;
    $(Tasks).trigger(Tasks.TASK_UPDATED, task);
}

Tasks.hasTask = function(id) {
    return _.findWhere(this._tasks, {"id":id});
}

Tasks.getIndex = function(task) {
    var parent = Tasks.hasTask(task.parentId);

    if (parent) {
        var tasks = Tasks.getChildren(parent);
        for (var i = 0 ; i < tasks.length ; i ++) {
            if (tasks[i].id == task.id) {
                return i;
            }
        }
    } else  {
        return false;
    }
}

Tasks.getNext = function(task) {
    var parent = Tasks.hasTask(task.parentId);
    var index = Tasks.getIndex(task);
    if (parent) {
        var tasks = Tasks.getChildren(parent);
        if (tasks.length > index) {
            return tasks[index + 1];
        } else {
            return false;
        }
    } else  {
        return false;
    }
}

Tasks.getNextByRank = function(rank, task) {
    var parent = Tasks.hasTask(task.parentId);
    var tasks = Tasks.getChildren(parent);
    for (var i = 0 ; i < tasks.length ; i ++) {
        if (tasks[i].rank > rank) {
            return tasks[i];
        }
    }
    return false;
}

Tasks.getChildren = function(task) {
    if (typeof task.children == 'undefined') {
        return [];
    }
    return _.sortBy(task.children, function(task) {
        return task.rank;
    });
}

Tasks.getAllTasks = function() {
    return _.sortBy(Tasks._tasks, function(task) {
        return task.rank;
    });
}

Tasks.getMainTask = function() {
    return Tasks._task;
}


/************
* UPDATE / CREATE
* **********/

Tasks.create = function(title, callback) {

    var task = {
        title: title,
        parentId: (Tasks._task.id == 0 ) ? null : Tasks._task.id
    }

    $.ajax({
        url: "/rest/tasks",
        type: 'POST',
        success: function(id) {
            Tasks.loadTask(id);
            if (typeof callback != 'undefined') { callback()};
        },
        error: function(e) {
            console.info('POST ko');
        },
        data : JSON.stringify(task),
        dataType: "json"
    });
}

Tasks.updateTitle = function(task, title) {
    var id = task.id;
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

Tasks.updateRank = function(task, rank) {
    Tasks.updateRankWithNext(task, Tasks.getNextByRank(rank, task));
}

Tasks.updateRankWithNextFromView = function(task, nextTask) {


    var rank = Tasks.updateRankWithNext(task, nextTask);
    var data = {
        'rank' : rank
    }

    $.ajax({
        url: "/rest/tasks/" + task.id,
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
}

Tasks.updateRankWithNext = function(task, nextTask) {
    if (task.parentId != nextTask.parentId) {
        alert('WTF');
    }
    console.log("rank:" + task.rank);
    console.log("next rank:" + nextTask.rank);

    var tasksSortByRank = _.sortBy(Tasks.getChildren(this._tasks[task.parentId]), function(task) {return task.rank});

    var indexOfNextTask = Tasks.getIndex(nextTask);
    if(task.rank < nextTask.rank) {
        console.log('cas 1');

        var indexOfTask = Tasks.getIndex(task);

        Tasks.setRank(task, tasksSortByRank[indexOfNextTask - 1 ].rank);
        for (var i = indexOfTask + 1; i < tasksSortByRank.length ; i ++) {
            if (tasksSortByRank[i].id == nextTask.id) {
                break;
            }
            Tasks.setRank(tasksSortByRank[i], tasksSortByRank[i].rank - 1);
        }

    } else {
        Tasks.setRank(task, nextTask.rank);
        for (var i = indexOfNextTask ; i < tasksSortByRank.length ; i ++) {
            if (tasksSortByRank[i].id == task.id) {
                break;
            }
            Tasks.setRank(tasksSortByRank[i], tasksSortByRank[i].rank + 1);
        }
    }

    $(this).trigger(Tasks.TASK_MOVED, task);

    return task.rank;
}

Tasks.setRank = function(task, rank) {
    $(this).trigger(Tasks.TASK_UPDATED, task);
    task.rank = rank;
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
        $(Tasks).trigger(Tasks.PARENTS_LOADED);
    } else {
        $.ajax({
            url: "/rest/tasks/" + task.id + "/breadcrumb",
            success: function(data) {
                Tasks._parents = [];
                for (var i = 0 ; i < data.length ; i ++) {
                    Tasks._parents.push(data[i].data);
                };
                if (Tasks.getMainTask().id != 0) {
                    Tasks._parents.push(Tasks.HOME);
                }
                $(Tasks).trigger(Tasks.PARENTS_LOADED);
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

    var page = 1;
    if (typeof task.children != 'undefined') {
        var page = Math.floor(task.children.length / Tasks.NUMBER) + 1;
    }
    console.log(page);

    var parameters = "embed=nbChilds&number=" + Tasks.NUMBER + "&page=" + page;

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
                var child = data.data[i].data;
                children.push(child);
                if (child.parentId == null) {
                    child.parentId = 0;
                }
            }
            Tasks.addChildren(task, children);
            Tasks.taskLoaded(task);
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
    if (typeof task.children == 'undefined') {
        task.children = [];
    }
    for (var i = 0 ; i < children.length ; i++) {
        var child = children[i];
        child.level = level;
        task.children.push(child);
        Tasks._calculateProperties(child);

        if (typeof child.children != 'undefined') {
            Tasks.addChildren(child, child.children);
        }
    }
}