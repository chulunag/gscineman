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
    function rtPx(t) {//ham chuyen doi runtime ra pixel | neu split < 2 thi la minutes
        var t = t.split(":");
        return (parseInt(t[0]) * 60 + parseInt(t[1])) * 2;
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

    $("div[role=room]").on("drop", function (e) {//xu ly du lieu khi drop
        e.preventDefault();
        e.currentTarget.style.border = "";
        var data = JSON.parse(e.originalEvent.dataTransfer.getData("data").replace(/'/g, '"'));
        var l = $(this).children().last().attr("role");
        if (l !== "rest" && l !== undefined)
            $(this).append('<div role="rest"><input value="15"></div>');

        $(this).append('<div role="movie-on-timeline" style="background-color:' + data.bg + ';width:' + rtPx(data.Runtime) + 'px;">' +
                '<div><img role="m-remove" title="remove" style="margin-left:6px;"></div>' +
                '<div style="margin-left:6px">' + data.IntTitle + '</div>' +
                '<div style="margin-left:6px"><div style="float:left;margin-right:10px">' + data.Runtime + '</div>' +
                '<div role="format" style="float:left">' + data.Format + '</div></div>' +
                '<div role="start-end" style="clear:both;margin-left:6px">start | end</div>' +
                '</div>');
    });

    $("div[role=room]").on("click", "img[role=m-remove]", function () {//xoa phim tren timeline
        var cls = $(this).closest("div[role=movie-on-timeline]");
        var n = cls.next();
        var p = cls.prev();
        var l = cls.is(":last-child");

        if (n.attr("role") === "rest") {
            n.remove();
            $(this).closest("div[role=movie-on-timeline]").remove();
        } else {
            if (l && p.attr("role") === "rest")
                p.remove();
            $(this).closest("div[role=movie-on-timeline]").remove();
        }
    });

    $("input[role=time-start]").on("input", function () {
        var a = rtPx($(this).val()) - 7 * 60 * 2;
        var w = a > 0 ? a / 2 + 120 : 120;
        $(this).closest("div").css({width: w});
    });
});