$(document).ready(function () {
    var __colors = ["#66CCCC", "#66CCFF", "#66CC99", "#3366FF", "#990099", "#6633CC", "#669999"];
    var __current;//bien dung de luu thong tin khi search movie
    var __icon_drag_movie = document.createElement("img");
    __icon_drag_movie.src = "/img/icon-drag-movie.png";

    var __scheduler = [
        {room: 1, scheduler: {}},
        {room: 2, scheduler: {}},
        {room: 3, scheduler: {}}];

    //functions
    function recursiveN() {//ham tra ra node goc' voi N buoc

    }
    function rtPx(t) {//ham chuyen doi runtime ra pixel
        var t = t.split(":");
        return (parseInt(t[0]) * 60 + parseInt(t[1])) * 1;
    }

    function schedulerRender() {

    }
    //components
    $("#txt-search").jqxInput({placeHolder: "enter movie name...", source: function (q, r) {
            var d = new $.jqx.dataAdapter(
                    {type: "post", datatype: "json", datafields: [{name: "IntTitle"}, {name: "Runtime"}], url: "modules/common/movies-list.php"},
            {autoBind: true,
                formatData: function (data) {
                    data.query = q;
                    return data;
                }, loadComplete: function (data) {
                    r($.map(data.items, function (item) {
                        return {
                            label: item.IntTitle,
                            value: JSON.stringify({_id: item._id.$id, IntTitle: item.IntTitle, Runtime: item.Runtime, Format: item.Format})};
                    }));
                }
            });
        }, renderer: function (a, b) {
            return a;
        }, searchMode: "startswithignorecase", width: 480, height: 30, theme: _GLOBAL.theme});

    $("button").jqxButton({height: 30, theme: _GLOBAL.theme});

    //events
    $("#txt-search").on("select", function (e) {
        if (e.args)
            __current = e.args.item;
    });

    $("#btn-add").click(function () {
        if (__current) {
            var o = JSON.parse(__current.value);
            o.bg = __colors.pop();

            var movie = '<div role="queue-selected" draggable="true" style="background-color:' + o.bg + ';" data="'
                    + JSON.stringify(o).replace(/"/g, "'") + '"><img role="m-remove" title="remove" style="margin-right:6px;"><span>' + __current.label + '</span></div>';
            $("#selected-movies").append(movie);
        }

        __current = null;
        $("#txt-search").val("");
    });

    $("#selected-movies").on("dragstart", "[role=queue-selected]", function (e) {
        e.originalEvent.dataTransfer.setData("data", e.currentTarget.attributes.data.value);
        e.originalEvent.dataTransfer.setDragImage(__icon_drag_movie, 24, 24);
    });

    $("#selected-movies").on("dragstart", "[role=rest]", function (e) {
        e.originalEvent.dataTransfer.setData("data", e.currentTarget.attributes.data.value);
    });

    $("div[role=room]").on("dragover", function (e) {
        e.preventDefault();
        e.currentTarget.style.border = "5px dashed black";
    });

    $("div[role=room]").on("dragleave", function (e) {
        e.preventDefault();
        e.currentTarget.style.border = "";
    });

    $("#selected-movies").on("click", "[role=m-remove]", function (e) {
        //remove phim
        var n = e.currentTarget.parentNode;
        var p = e.currentTarget.parentNode.parentNode;
        var o = JSON.parse($(n).attr("data").replace(/'/g, '"'));//lay lai thong tin mau sac
        p.removeChild(n);
        __colors.push(o.bg);//tra lai mau sac
    });

    $("div[role=room]").on("drop", function (e) {
        e.preventDefault();
        e.currentTarget.style.border = "";
        var self = this, data;

        data = JSON.parse(e.originalEvent.dataTransfer.getData("data").replace(/'/g, '"'));

        if (data.rest)
            $(self).append('<div><input role="rest" value="15"></div>');
        else
            $(self).append('<div role="on-timeline" style="background-color:' + data.bg + ';width:' + rtPx(data.Runtime) + 'px;">' +
                    '<div><img role="m-remove" title="remove" style="margin-left:6px;"></div>' +
                    '<div style="margin-left:6px">' + data.IntTitle + '</div>' +
                    '<div style="margin-left:6px">' + data.Format + '</div>' +
                    '<div style="margin-left:6px">start | end</div>' +
                    '</div>');
    });

    $("div[role=room]").on("click", "img[role=m-remove]", function (e) {
        var n = e.currentTarget.parentNode.parentNode;
        var p = e.currentTarget.parentNode.parentNode.parentNode;
        p.removeChild(n);
    });
});