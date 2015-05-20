$(document).ready(
        function () {
            function toggled(e, c) {
                if (parseInt(e.value)) {
                    e.style.color = "";
                    e.style.backgroundColor = "";
                    e.value = 0;
                } else {
                    e.style.color = "#ffffff";
                    e.style.backgroundColor = c;
                    e.value = 1;
                }
            }

            function md_status() {//render trang thai nut mark & disabled
                var post = {};
                post.__action = "get_addition";
                post._id = __selected._id.$id;
                $.ajax({type: "post", url: "modules/movieslist/movieslist.php", data: {post: post}, success: function (r) {
                        var r = r ? JSON.parse(r) : {mark: 0, disabled: 0};
                        //
                        $("#btn-mark").attr({value: r.mark});
                        $("#btn-mark").css({"background-color": parseInt(r.mark) ? "#669900" : "", color: parseInt(r.mark) ? "#fff" : ""});
                        //
                        $("#btn-disabled").attr({value: r.disabled});
                        $("#btn-disabled").css({"background-color": parseInt(r.disabled) ? "#cc3300" : "", color: parseInt(r.disabled) ? "#fff" : ""});
                    }});
            }

            var __changed = false;//bien ghi nhan su thay doi row nay sang row khac
            var __selected = false;//bien luu tru thong tin khi cell duoc chon
            var genres_src = {datatype: "json", url: "modules/common/genres-list.php", datafields: [{name: "name"}], root: "items"};
            var format_src = [{name: "2D"}, {name: "3D"}];
            var studios_src = {datatype: "json", url: "modules/common/studios-list.php", datafields: [{name: "name"}], root: "items"};
            var grid_movieslist_src = {
                datatype: "json",
                url: "modules/common/movies-list.php",
                datafields: [{name: "_id"},
                    {name: "IntTitle"}, {name: "Title"}, {name: "Runtime"}, {name: "Format"},
                    {name: "Studio"}, {name: "Distributor"}, {name: "Genres"}, {name: "ReleaseDate", type: "date"}],
                root: "items",
                updaterow: function (rowid, rowdata, commit) {
                    var post = {};
                    post._id = rowdata._id;
                    post.IntTitle = rowdata.IntTitle;
                    post.Title = rowdata.Title;
                    post.Runtime = rowdata.Runtime;
                    post.Format = rowdata.Format;
                    post.Genres = rowdata.Genres;
                    post.ReleaseDate = rowdata.ReleaseDate;
                    post.Studio = rowdata.Studio;
                    post.Distributor = rowdata.Distributor;
                    $.ajax({type: "post", url: "modules/movieslist/modify.php", data: {post: post}});
                    commit(true);
                }};
            //components
            $("#btn-mark").jqxButton({height: 30, theme: _GLOBAL.theme});
            $("#btn-disabled").jqxButton({height: 30, theme: _GLOBAL.theme});
            $("#grid-movieslist").jqxGrid(
                    {
                        source: grid_movieslist_src,
                        width: 854,
                        //pageable: true,
                        //showstatusbar: true,
                        renderstatusbar: function (s) {
                            //s.append("<div style=\"overflow:hidden;position:relative;margin:7px;color:#fff;background-color:DodgerBlue\">Status : OK</div>");
                        },
                        editable: true,
                        sortable: true,
                        filterable: true,
                        showfilterrow: true,
                        //autoshowfiltericon: false,
                        //editmode: "dblclick",
                        selectionmode: "multiplecellsextended",
                        //selectionmode: "singlecell",
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
                                post.Runtime = "00:00";
                                $.ajax({type: "post", url: "modules/movieslist/add.php", data: {post: post}, success: function (r) {
                                        $("#grid-movieslist").jqxGrid("updatebounddata");
                                    }});
                            });
                            btnRemove.on("click", function () {

                            });
                        },
                        columns: [
                            {text: "International Title", datafield: "IntTitle", pinned: true, width: 220, align: "center"},
                            {text: "Title", datafield: "Title", width: 220, align: "center"},
                            {text: "Runtime", datafield: "Runtime", width: 80, align: "center"},
                            /* Format : Multi */
                            {text: "Format", datafield: "Format", columntype: "template", createeditor: function (row, value, editor, cellText, width, height) {
                                    editor.jqxDropDownList({source: new $.jqx.dataAdapter(format_src), displayMember: "name", checkboxes: true, selectionRenderer: function () {
                                            return "<span style=\"top:4px; position: relative;\">Format</span>";
                                        }, width: width, height: height, autoDropDownHeight: true, theme: _GLOBAL.theme});
                                }, initeditor: function (row, cellvalue, editor, celltext, pressedkey) {
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
                                }, geteditorvalue: function (row, cellvalue, editor) {
                                    return editor.val();
                                }, width: 80, align: "center"},
                            {text: "ReleaseDate", datafield: "ReleaseDate", columntype: "datetimeinput", cellsformat: "dd-MM-yyyy", width: 100, align: "center"},
                            /*  Genres : Multi */
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
                                }, geteditorvalue: function (row, cellvalue, editor) {
                                    return editor.val();
                                },
                                width: 150, align: "center"},
                            {text: "Studio", datafield: "Studio", columntype: "dropdownlist", createeditor: function (row, value, editor) {
                                    editor.jqxDropDownList({source: new $.jqx.dataAdapter(studios_src), displayMember: "name", autoDropDownHeight: false});
                                }, width: 200, align: "center"},
                            {text: "Distributor", datafield: "Distributor", columntype: "dropdownlist", createeditor: function (row, value, editor) {
                                    editor.jqxDropDownList({source: ["CGV", "BHD", "GALAXY CINEMA", "LOTTE CINEMA"], autoDropDownHeight: true});
                                }, width: 150, align: "center"},
                            {text: "Storyline"}
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
                fd.append("_id", $("#grid-movieslist").jqxGrid("getrowdata", $("#grid-movieslist").jqxGrid("getselectedcell").rowindex)._id.$id);
                xhr.open("POST", "modules/movieslist/thumb-upload.php", true);
                xhr.send(fd);
            });
            $("#grid-movieslist").on("cellselect", function (e) {
                //can sua lai khong de thong bao GET 404 report ra console
                __selected = $("#grid-movieslist").jqxGrid("getrowdata", $("#grid-movieslist").jqxGrid("getselectedcell").rowindex);

                if (!__changed) {
                    __changed = __selected._id.$id;

                    var imgurl = "img/" + __selected._id.$id + ".jpg";
                    $.get(imgurl).done(function () {
                        $("#img-thumbnail").css({"background-image": "url(" + imgurl + ")"});
                    }).fail(function () {
                        $("#img-thumbnail").css({"background-image": "url(img/empty.jpg)"});
                    });

                    md_status();
                } else {
                    //__selected = $("#grid-movieslist").jqxGrid("getrowdata", $("#grid-movieslist").jqxGrid("getselectedcell").rowindex);
                    if (__changed !== __selected._id.$id) {
                        __changed = __selected._id.$id;

                        var imgurl = "img/" + __selected._id.$id + ".jpg";
                        $.get(imgurl).done(function () {
                            $("#img-thumbnail").css({"background-image": "url(" + imgurl + ")"});
                        }).fail(function () {
                            $("#img-thumbnail").css({"background-image": "url(img/empty.jpg)"});
                        });

                        md_status();
                    }
                }
            });

            $("#btn-mark").click(function () {
                toggled(this, "#669900");
                var post = {};
                post.__action = 'set_mark';
                post._id = __selected._id.$id;
                post.mark = this.value;
                $.ajax({type: "post", url: "/modules/movieslist/movieslist.php", data: {post: post}});
            });
            $("#btn-disabled").click(function () {
                toggled(this, "#cc3300");
                var post = {};
                post.__action = 'set_disabled';
                post._id = __selected._id.$id;
                post.disabled = this.value;
                $.ajax({type: "post", url: "/modules/movieslist/movieslist.php", data: {post: post}});
            });
        });
