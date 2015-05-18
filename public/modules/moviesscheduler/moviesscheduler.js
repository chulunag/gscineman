$(document).ready(function () {
    var rand_colors = ["#66CCCC", "#66CCFF", "#66CC99", "#66FF99", "#FFCCCC", "#FFCCFF", "#00FFFF"];
    var __current;
    var __icon_drag_movie = document.createElement("img");
    __icon_drag_movie.src = "/img/icon-drag-movie.png";

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
            var m = document.createElement("span");
            var rnd = Math.floor(Math.random() * rand_colors.length);
            m.setAttribute("role", "movie-selected");
            m.setAttribute("data", __current.value.replace(/"/g, "'"));
            m.setAttribute("draggable", "true");
            m.style.cssText = "padding:0 12px 0 12px;cursor:pointer;background-color:" + rand_colors[rnd];
            m.innerHTML = __current.label;

            $("#selected-movies").append(m);
        }

        __current = null;
        $("#txt-search").val("")
    });

    $("#selected-movies").on("dragstart", "[role=movie-selected]", function (e) {
        e.originalEvent.dataTransfer.setData("data", e.currentTarget.attributes.data.value);
        e.originalEvent.dataTransfer.setDragImage(__icon_drag_movie, 24, 24);
    });

    $("div[role=room]").on("dragover", function (e) {
        e.preventDefault();
    });
    $("div[role=room]").on("drop", function (e) {
        e.preventDefault();
        var self = this, data;

        data = JSON.parse(e.originalEvent.dataTransfer.getData("data").replace(/'/g, '"'));

        $(self).append("<div>" + data.IntTitle + "</div>")
    });
});