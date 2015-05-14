$(document).ready(
        function () {
            // var post = {};

            var genres_src = {
                datatype: "json",
                url: "modules/common/genres-list.php", datafields: [{name: "name"}],
                root: "items"
            };

            var studios_src = {
                datatype: "json",
                url: "modules/common/studios-list.php", datafields: [{name: "name"}],
                root: "items"
            };

            var grid_movieslist_src = {
                datatype: "json",
                url: "modules/common/movies-list.php",
                datafields: [{name: "_id"},
                    {name: "IntTitle"}, {name: "Title"}, {name: "Runtime"},
                    {name: "Studio"}, {name: "Distributor"}, {name: "Genres"}, {name: "ReleaseDate", type: "date"}],
                root: "items",
                updaterow: function (rowid, rowdata, commit) {
                    var post = {};
                    post._id = rowdata._id;
                    post.IntTitle = rowdata.IntTitle;
                    post.Title = rowdata.Title;
                    post.Runtime = rowdata.Runtime;
                    post.Genres = rowdata.Genres;
                    post.ReleaseDate = rowdata.ReleaseDate;
                    post.Studio = rowdata.Studio;
                    post.Distributor = rowdata.Distributor;
                    $.ajax({type: "post", url: "modules/movieslist/modify.php", data: {post: post}});
                    commit(true);
                }};

            $("#grid-movieslist").jqxGrid(
                    {
                        source: grid_movieslist_src,
                        width: 920,
                        pageable: true,
                        showstatusbar: true,
                        renderstatusbar: function (s) {
                            s.append("<div style=\"overflow:hidden;position:relative;margin:7px;color:#fff;background-color:DodgerBlue\">Status : OK</div>");
                        },
                        editable: true,
                        editmode: "dblclick",
                        selectionmode: "singlecell",
                        showtoolbar: true,
                        autoheight: true,
                        autorowheight: true,
                        rendertoolbar: function (t) {
                            btnAdd = $("<div id=\"btn-tb-add\" style=\"float:left;margin-left:15px;margin-top:7px;cursor:pointer\">ADD</div>");
                            btnRemove = $("<div id=\"btn-tb-remove\" style=\"float:left;margin-left:10px;margin-top:7px;color:#ccc\">REMOVE</div>");

                            t.append(btnAdd);
                            t.append(btnRemove);

                            btnAdd.on("click", function () {
                                var post = {};
                                post.IntTitle = "[ default-int-title ]";
                                post.Title = "[ default-title ]";
                                post.Runtime = "00:00:00";
                                $.ajax({type: "post", url: "modules/movieslist/add.php", data: {post: post}, success: function (r) {
                                        $("#grid-movieslist").jqxGrid("updatebounddata");
                                    }});
                            });

                            btnRemove.on("click", function () {

                            });
                        },
                        columns: [
                            {text: "", datafield: "_status", width: 25, editable: false, pinned: true, align: "center"},
                            {text: "International Title", datafield: "IntTitle", pinned: true, width: 220, align: "center"},
                            {text: "Title", datafield: "Title", width: 220, align: "center"},
                            {text: "Runtime", datafield: "Runtime", width: 100, align: "center"},
                            {text: "Format", datafield: "Format", width: 100, align: "center"},
                            {text: "ReleaseDate", datafield: "ReleaseDate", columntype: "datetimeinput", cellsformat: "dd-MM-yyyy", width: 100, align: "center"},
                            {text: "Genres", datafield: "Genres", columntype: "template", createeditor: function (row, value, editor, cellText, width, height) {
                                    editor.jqxDropDownList({source: new $.jqx.dataAdapter(genres_src),
                                        displayMember: "name", width: width, height: height, checkboxes: true, autoDropDownHeight: true,
                                        selectionRenderer: function () {
                                            return "<span style=\"top:4px; position: relative;\">Please Choose:</span>";
                                        }, theme: _GLOBAL.theme});
                                },
                                initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
                                    var items = editor.jqxDropDownList("getItems");
                                    editor.jqxDropDownList("uncheckAll");
                                    var values = cellvalue.split(/,\s*/);
                                    for (var j = 0; j < values.length; j++) {
                                        for (var i = 0; i < items.length; i++) {
                                            if (items[i].label === values[j]) {
                                                editor.jqxDropDownList("checkIndex", i);
                                            }
                                        }
                                    }
                                },
                                width: 150, align: "center"},
                            {text: "Studio", datafield: "Studio", columntype: "dropdownlist", createeditor: function (row, value, editor) {
                                    editor.jqxDropDownList({source: new $.jqx.dataAdapter(studios_src), displayMember: "name", autoDropDownHeight: false});
                                }, width: 200, align: "center"},
                            {text: "Distributor", datafield: "Distributor", columntype: "dropdownlist", createeditor: function (row, value, editor) {
                                    editor.jqxDropDownList({source: ["CGV", "BHD", "GALAXY CINEMA", "LOTTE CINEMA"], autoDropDownHeight: true});
                                }, width: 150, align: "center"}
                        ],
                        theme: _GLOBAL.theme});
            // events
            $("#img-thumbnail").click(function () {
                try {
                    var r = $("#grid-movieslist").jqxGrid("getrowdata", $("#grid-movieslist").jqxGrid("getselectedcell").rowindex);
                } catch (e) {
                    console.log(e)
                    return;
                }

                if (confirm("Upload thumbnail poster for " + r.IntTitle + "?")) {
                    $("#file-upload").click();
                }
            });

            $("#file-upload").on("change", function () {
                var fread = new FileReader();
                var fd = new FormData();
                var xhr = new XMLHttpRequest();
                var f = $("#file-upload")[0].files[0];

                fread.readAsDataURL(f);

                fread.onload = function (e) {
                    $("#img-thumbnail").css({"background-image": "url(" + e.target.result + ")"});
                };

                fd.append("file", f);
                fd.append("_id", "thong tin id cua grid");

                xhr.open("POST", "modules/common/upload.php", true);
                xhr.send(fd);
            });
        });
