BreadcrumbMediator = {};
BreadcrumbMediator.templates = [];

BreadcrumbMediator.init = function() {
    this.compileTemplate();

    this.initEvents();
}

BreadcrumbMediator.initEvents = function() {
    $(Tasks).on(Tasks.PARENTS_LOADED, BreadcrumbMediator.setBreadcrumb);
}

BreadcrumbMediator.setBreadcrumb = function() {
    this._breadcrumb = Tasks.getParents();
    $(".breadcrumb").html("");
    if (this._breadcrumb.length > 1) {
        for (var i = this._breadcrumb.length - 1 ; i > 0 ; i--) {
            $(".breadcrumb").append(BreadcrumbMediator.templates.item(this._breadcrumb[i]));
        }
    }
}

BreadcrumbMediator.compileTemplate = function() {
    BreadcrumbMediator.templates.item = Handlebars.compile($("#breadcrumb-item").html());
}