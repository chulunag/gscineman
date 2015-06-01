$(document).ready(function () {
    var moviesIndex;
    //initialize
    $.ajax({type: "post", url: "modules/moviesscheduler/moviesscheduler.php", data: {post: {__action: "get_schedule"}},
        success: function (response) {
            var obj = JSON.parse(response);
            moviesIndex = obj.moviesIndex ? obj.moviesIndex : {};
            $("#movies-scheduler").MoviesScheduler({schedules: obj.schedules, moviesIndex: moviesIndex});
            $("#movies-scheduler").MoviesScheduler("scheduleRender");
        }
    });

    //components
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
        }, searchMode: "startswithignorecase", width: 280, height: 30, theme: _GLOBAL.theme
    });

    //events
    $("#txt-search").on("select", function (e) {
        var selected = e.args ? e.args.item : null;

        if (selected) {
            var selected = JSON.parse(selected.value);

            if (!moviesIndex[selected._id]) {
                moviesIndex[selected._id] = {_id: selected._id, IntTitle: selected.IntTitle, Runtime: selected.Runtime, Format: selected.Format}
            }

            $("#movies-queue").MoviesQueue("add", selected);
        }
        $("#txt-search").val("");
    });

    $("#movies-queue").on("dragstart", "[role=queue-selected]", function (e) {
        e.originalEvent.dataTransfer.setData("movieData", e.currentTarget.attributes.data.value);
    });

    $("div[role=room]").on("dragover", function (e) {
        e.preventDefault();
        $(this).css({border: "5px dashed black"});
    });

    $("div[role=room]").on("dragleave", function () {
        $(this).css({border: "none"});
    });

    $("#movies-queue").on("click", "[role=m-remove]", function (e) {/* remove movie queue */
        $("#movies-queue").MoviesQueue("remove", e, moviesqueueColors);
    });

    $("div[role=room]").on("drop", function (e) {
        e.preventDefault();
        $(this).css({border: "none"});
        var roomNo = $(this).attr("no");
        var movieData = JSON.parse(e.originalEvent.dataTransfer.getData("movieData").replace(/'/g, '"'));

        $("#movies-scheduler").MoviesScheduler("addMovie", roomNo, movieData);
        $("#movies-scheduler").MoviesScheduler("scheduleRender", roomNo);
    });

    $("div[role=room]").on("change", "div[role=open] > input", function () {
        var roomno = $($(this).closest("[role=room]")[0]).attr("no");
        $("#movies-scheduler").MoviesScheduler("update", "open", {roomno: roomno, opentime: $(this).val()});
        $("#movies-scheduler").MoviesScheduler("scheduleRender", roomno);
    });


    $("#btn-confirm").click(function () {

        var post = {};
        post.__action = "apply";
        post.date = new Date().toYMDFormat();
        post.schedules = $("#movies-scheduler").MoviesScheduler("getSchedules");

        $.ajax({type: "post", url: "modules/moviesscheduler/moviesscheduler.php", data: {post: post},
            success: function (r) {
                console.log("Saved!")
            }
        });
    });
});