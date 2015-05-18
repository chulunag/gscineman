var _GLOBAL = {
    theme: "metro",
    cache: {}
};

$(document).ready(function () {

    $("#main-menu").jqxMenu({clickToOpen: true, animationHideDuration: 0, animationShowDuration: 0, animationHideDelay: 0, animationShowDelay: 0, autoCloseInterval: 0, autoCloseOnClick: true, theme: _GLOBAL.theme});

    // events
    $("#main-menu").on("itemclick", function (e) {
        switch (e.args.id) {
            case "mnu-movieslist":
                $("#main-content").empty();
                $("#main-content").load("modules/movieslist/screen-movieslist.php");

                $("[id^=mnu-]").removeClass("mnu-selected");
                $("#mnu-movieslist").addClass("mnu-selected");
                break;

            case "mnu-moviesscheduler":
                $("#main-content").empty();
                $("#main-content").load("modules/moviesscheduler/screen-moviesscheduler.php");

                $("[id^=mnu-]").removeClass("mnu-selected");
                $("#mnu-moviesscheduler").addClass("mnu-selected");
                break;
            case "mnu-home":
                $("#main-content").empty();
                $("#main-content").load("modules/home/screen-home.php");

                $("[id^=mnu-]").removeClass("mnu-selected");
                $("#mnu-home").addClass("mnu-selected");
                break;
        }
    });

    // $(window).on("beforeunload", function() {
    // return false;
    // });
});