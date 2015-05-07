var _GLOBAL = {
	theme : "metro",
	uri : null,
	cache : {}
};

$(document).ready(function() {

	$("#main-menu").jqxMenu({
		clickToOpen : true,
		animationHideDuration : 0,
		animationShowDuration : 0,
		animationHideDelay : 0,
		animationShowDelay : 0,
		autoCloseInterval : 0,
		autoCloseOnClick : true,
		theme : _GLOBAL.theme
	});

	// events
	$("#mnu-home").click(function() {
		_GLOBAL.uri = "modules/home/screen-home.php";
		$("#main-content").empty();
		$("#main-content").load(_GLOBAL.uri);
	});
	$("#mnu-tickets").click(function() {
		_GLOBAL.uri = "modules/tickets/screen-tickets.php";
		$("#main-content").empty();
		$("#main-content").load(_GLOBAL.uri);
	});
	$("#mnu-members").click(function() {
		_GLOBAL.uri = "modules/members/screen-members.php";
		$("#main-content").empty();
		$("#main-content").load(_GLOBAL.uri);
	});
	$("#mnu-movieslist").click(function() {
		_GLOBAL.uri = "modules/movieslist/screen-movieslist.php";
		$("#main-content").empty();
		$("#main-content").load(_GLOBAL.uri);
	});
	$("#mnu-moviesscheduler").click(function() {
		_GLOBAL.uri = "modules/moviesscheduler/screen-moviesscheduler.php";
		$("#main-content").empty();
		$("#main-content").load(_GLOBAL.uri);
	});

	// $(window).on("beforeunload", function() {
	// return false;
	// });
});