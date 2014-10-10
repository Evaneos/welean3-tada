var Tasks = {};

Tasks._task = {};
Tasks._tasks = [];

Tasks.initTask = function(id, callback) {
    $.ajax({
        url: "data.json?id="+id,
        success: function(data) {
            Tasks.setTask(data);
            callback(data);
        },
        error: function(e) {
            console.log(e);
        },
        dataType: "json"
    });
};

Tasks.setTask = function(task) {
    this._task = task;
    this._tasks = [];
    task.level = 1;
    this._tasks.push(task);
    this.addChildren(task.children, 2);

}

Tasks.addChildren = function(children, level) {
    for (var i = 0 ; i < children.length ; i++) {
        var task = children[i];
        task.level = level;
        Tasks._tasks.push(task);

        if (typeof task.children != 'undefined') {
            Tasks.addChildren(task.children, level + 1);
        }
    }
}

Tasks.updateTitle = function(id, title) {
    var task = Tasks.getTask(id);
    task.title = title;
    $(this).trigger("update", task);
}

Tasks.getTask = function(id) {
    return _.findWhere(this._tasks, {"id":id});
}

Tasks.getAllTasks = function() {
    console.log(Tasks._tasks);
    return Tasks._tasks;
}