BreadcrumbMediator = {};
BreadcrumbMediator.templates = [];

BreadcrumbMediator.init = function() {
    this.compileTemplate();
}

BreadcrumbMediator.setBreadcrumb = function() {
    this._breadcrumb = Tasks.getBreadcrumb();
    $(".breadcrumb").html("");
    console.log(this._breadcrumb);
    if (this._breadcrumb.length > 1) {
        for (var i = this._breadcrumb.length - 1 ; i > 0 ; i--) {
            $(".breadcrumb").append(BreadcrumbMediator.templates.item(this._breadcrumb[i]));
        }
    }
    console.log(this._breadcrumb);
}

BreadcrumbMediator.compileTemplate = function() {
    BreadcrumbMediator.templates.item = Handlebars.compile($("#breadcrumb-item").html());
}