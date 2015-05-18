$(document).ready(function () {
    var rand_colors = ["#66CCCC", "#66CCFF", "#66CC99", "#66FF99", "#FFCCCC", "#FFCCFF", "#00FFFF"];
    var __current;

    function movie_drag(e) {
        console.log(e)
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
                            value: JSON.stringify({_id: item._id.$id, Runtime: item.Runtime})};
                    }));
                }
            });
        }, renderer: function (a, b) {
            return a;
        }, searchMode: "startswithignorecase", width: 480, height: 30, theme: _GLOBAL.theme});

    $("button").jqxButton({height: 30, theme: _GLOBAL.theme});

    //events
    $("span[role=time-start]").on("input", function (e) {

        console.log(e.target.parentNode.parentNode)
    });

//    $("button[b=add-movie]").on("click", function (e) {
//        self = this;
//        var f = document.createElement("span");
//        f.innerHTML = $("#txt-search").val();
//        e.target.parentNode.insertBefore(f, self);
//    });

    $("#txt-search").on("select", function (e) {
        __current = e.args;
    });

    $("#btn-add").click(function () {
        if (__current) {
            var info = __current.value;
            $("#selected-movies").append("<span info='" + info + "' role=\"selected-movie\" draggable=\"true\" style=\"padding:0 12px 0 12px;cursor:pointer;\">" + __current.label + "</span>");
        }

        $("#txt-search").val("")
    });

    $("#selected-movies").on("dragstart", "[role=selected-movie]", function (e) {
        e.originalEvent.dataTransfer.setData("info", e.currentTarget.attributes.info.value);
    });

    $("div[role=room]").on("dragover", function (e) {
        e.preventDefault();
    });
    $("div[role=room]").on("drop", function (e) {
        e.preventDefault();
        //console.log(e.originalEvent.dataTransfer.getData("info"))
    });
});