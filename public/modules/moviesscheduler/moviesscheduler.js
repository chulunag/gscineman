$(document).ready(function () {
    var rand_colors = ["#66CCCC", "#66CCFF", "#66CC99", "#66FF99", "#FFCCCC", "#FFCCFF", "#00FFFF"];
    var __current;//bien dung de luu thong tin khi search movie
    var __icon_drag_movie = document.createElement("img");
    __icon_drag_movie.src = "/img/icon-drag-movie.png";

    var scheduler = {};

    //functions
    function rtPx(t) {//ham chuyen doi runtime ra pixel
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
                            value: JSON.stringify({_id: item._id.$id, IntTitle: item.IntTitle, Runtime: item.Runtime})};
                    }));
                }
            });
        }, renderer: function (a, b) {
            return a;
        }, searchMode: "startswithignorecase", width: 480, height: 30, theme: _GLOBAL.theme});

    $("button").jqxButton({height: 30, theme: _GLOBAL.theme});

    //events
    $("#txt-search").on("select", function (e) {
        __current = e.args.item;
    });

    $("#btn-add").click(function () {
        if (__current) {
            var r = Math.floor(Math.random() * rand_colors.length);
            var o = JSON.parse(__current.value);
            o.bg = rand_colors[r];

            var movie = '<div role="movie-selected" draggable="true" style="padding:0 12px 0 6px;display:block;cursor:pointer;background-color:' +
                    o.bg + ';width:' + rtPx(o.Runtime) + 'px" data="' + JSON.stringify(o).replace(/"/g, "'") +
                    '"><span role="m-remove" title="remove" style="margin-right:6px;">X</span><span>' + __current.label + '</span></div>';
            $("#selected-movies").append(movie);
        }

        __current = null;
        $("#txt-search").val("");
    });

    $("#selected-movies").on("dragstart", "[role=movie-selected]", function (e) {
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
        var n = e.currentTarget.parentNode;
        var p = e.currentTarget.parentNode.parentNode;
        p.removeChild(n)
    });

    $("div[role=room]").on("drop", function (e) {
        e.preventDefault();
        e.currentTarget.style.border = "";
        var self = this, data;

        data = JSON.parse(e.originalEvent.dataTransfer.getData("data").replace(/'/g, '"'));

        $(self).append('<div style="background-color:' + data.bg + '">' + data.IntTitle + '</div>');
    });
});