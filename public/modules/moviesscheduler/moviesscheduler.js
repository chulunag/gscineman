$(document).ready(function () {
    var moviesqueueColors = ["#66CCCC", "#66CCFF", "#66CC99", "#3366FF", "#990099", "#6633CC", "#669999"];
    var __icon_drag_movie = document.createElement("img");
    __icon_drag_movie.src = "/img/icon-drag-movie.png";

    var scheduler = [
        {room: 1, scheduler: {}},
        {room: 2, scheduler: {}},
        {room: 3, scheduler: {}}];

    //functions
    function rtPx(t) {//ham chuyen doi runtime ra pixel | neu split < 2 thi la minutes
        var t = t.split(":");
        return (parseInt(t[0]) * 60 + parseInt(t[1])) * 2;
    }
    //components
    //$("button").jqxButton({theme: _GLOBAL.theme});

    $("#txt-search").jqxInput({placeHolder: "enter movie name", source: function (q, r) {
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
        }, searchMode: "startswithignorecase", width: 280, height: 30, theme: _GLOBAL.theme});

    $("#_1").scrollToElem();
    $("#_2").scrollToElem();
    $("#_3").scrollToElem();

    //events
    $("#txt-search").on("select", function (e) {
        var c = e.args ? e.args.item : null;

        if (c) {
            var data = JSON.parse(c.value);
            data.bg = moviesqueueColors.pop();
            $("#movies-queue").MoviesQueue("add", data);
        }
        c = null;
        $("#txt-search").val("");
    });

    $("#movies-queue").on("dragstart", "[role=queue-selected]", function (e) {
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

    $("#movies-queue").on("click", "[role=m-remove]", function (e) {/* remove movie queue */
        $("#movies-queue").MoviesQueue("remove", e, moviesqueueColors);
    });

    $("div[role=room]").on("drop", function (e) {//xu ly du lieu khi drop
        e.preventDefault();
        $(this).css({border: "none"});
        var data = JSON.parse(e.originalEvent.dataTransfer.getData("data").replace(/'/g, '"'));

        var l = $(this).children().last().attr("role");

        if (l !== "time-start")
            $(this).append('<div role="rest"><input value="15"></div>');

        $(this).MoviesTimeLine("add", data);
        $(this).MoviesTimeLine("update")
    });

    $("div[role=room]").on("click", "img[role=m-remove]", function () {/* remove movie on timeline */
        var cls = $(this).closest("div[role=on-timeline]");
        var n = cls.next();
        var p = cls.prev();
        var l = cls.is(":last-child");

        if (n.attr("role") === "rest") {
            n.remove();
            $(this).closest("div[role=on-timeline]").remove();
        } else {
            if (l && p.attr("role") === "rest")
                p.remove();
            $(this).closest("div[role=on-timeline]").remove();
        }
    });

    $("div[role=time-start] > input").on("input", function () {
        var a = rtPx($(this).val()) - 7 * 60 * 2;
        var w = a > 0 ? a / 2 + 140 : 140;
        $(this).closest("div").css({width: w});
    });

    $(".btn-NP").on("click", function (e) {
        if ($(e.currentTarget).html() === "N") {
            $("#_" + $(e.currentTarget).attr("val")).trigger("next");
        } else {
            $("#_" + $(e.currentTarget).attr("val")).trigger("prev");
        }
    });
});