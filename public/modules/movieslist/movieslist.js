$(document).ready(
		function() {
			var post = {};

			var grid_movieslist_src = [];

			var genres_src = new $.jqx.dataAdapter({datatype : "json", datafields : [{name : "name"}], type : "post", url : "/modules/common/genres-list.php", root : "rows"});
			var countries_src = new $.jqx.dataAdapter({datatype : "json", datafields : [{name : "name"}], type : "post", url : "/modules/common/countries-list.php", root : "rows"});

			//
			$("#txt-inttitle").jqxInput({width : 198, height : 30, theme : _GLOBAL.theme});
			$("#txt-title").jqxInput({width : 198, height : 30, theme : _GLOBAL.theme});
			$("#txt-runtime").jqxInput({width : 198, height : 30, theme : _GLOBAL.theme});
			$("#lst-genres").jqxDropDownList({source : genres_src, displayMember : "name", checkboxes : true, autoDropDownHeight : true, width : 198, height : 30, theme : _GLOBAL.theme});
			$("#lst-countries").jqxDropDownList({source : countries_src, displayMember : "name", checkboxes : true, autoDropDownHeight : true, width : 198, height : 30, theme : _GLOBAL.theme});
			$("#lst-language").jqxDropDownList({source : ["Vietnam", "English"], autoDropDownHeight : true, width : 198, height : 30, theme : _GLOBAL.theme});
			$("#dtp-releasedate").jqxDateTimeInput({width : 198, height : 30, showCalendarButton : true, theme : _GLOBAL.theme});
			$("#grid-movieslist").jqxGrid(
					{
						width : 900,
						columns : [{text : "Int Title", datafield : "Int Title", width : 300, align : "center"}, {text : "Title", datafield : "Title", width : 300, align : "center"},
								{text : "Runtime", datafield : "Runtime", width : 100, align : "center"}, {text : "Distributor", datafield : "Distributor", width : 180, align : "center"}], theme : _GLOBAL.theme});
		});
