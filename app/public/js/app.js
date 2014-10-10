var data = {};
var templates = {};

Handlebars.registerHelper('ifel', function(conditional, options) {
  if(Object.prototype.toString.call( conditional ) === '[object Array]' && conditional.length > 0) {
    return options.fn(this);
  }
});

function getData(id, callback) {
    $.ajax({
        url: "data.json?id="+id,
        success: function(data) {
            callback(data);
        },
        error: function(e) {
            console.log(e);
        },
        dataType: "json"
    });
}

function renderLevel1(task) {
    $(".level1").html("");
    $(".level1").html(templates.level1(task));
}

function renderLeveln(tasks, n, dom) {

    for(var i = 0 ; i < tasks.length ; i++) {
        var task = tasks[i];
        task.level = "level"+n;

        //render level n
        var templateName = "level"+n;
        if (n > 2)
        {
            templateName = "level2";
        }
        var domChild = $(templates[templateName](task)).appendTo(dom);

        // Manage level n+1
        if (typeof task.children != 'undefined') {
            renderLeveln(task.children, n+1, domChild);
        }

        // hide leveln+1
        $(".level"+(n+1).toString()).hide();
    }

}

function initData(data) {
    console.log(data);

    // render
    renderLevel1(data);
    $(".levels").html("");
    renderLeveln(data.children, 2, $(".levels"));
}

function compileTemplate() {
    templates.level1 = compileTemplateName('level1');
    templates.level2 = compileTemplateName('level2');
}

function compileTemplateName(name) {
    return Handlebars.compile($("#"+name).html());
}

function initEvents(event) {
    $(document).on("click",".task", function(event) {
        var currentId = getIdFromDomId($(this).attr('id'));
        if ($(this).hasClass('open')) {
            $(".parent-id-"+currentId).slideUp(200);
            $(this).removeClass('open');
        } else {
            $(".parent-id-"+currentId).slideDown(200);
            $(this).addClass('open');
        }

    });
}

function getIdFromDomId(domId) {
    return domId.replace ( /[^\d.]/g, '' );
}

$( document ).ready(function() {

    // Compile template
    compileTemplate();

    // Get data
    getData(0, initData);

    // InitEvents
    initEvents();



    var socket = io(SOCKET_HOST);
});