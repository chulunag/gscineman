/*prototype*/
Date.prototype.toYMDFormat = function () {
    return this.getFullYear() + "-" + (this.getMonth() + 1).LPad() + "-" + this.getDate().LPad();
};
String.prototype.toMinutes = function () {
    var t = this.split(":");

    if (t[0])
        return t = t.length - 1 ? parseInt(t[0]) * 60 + parseInt(t[1]) : parseInt(t[0]);

    return parseInt(this);
};
Number.prototype.LPad = function () {
    return this > 9 ? this : "0" + this;
};
Number.prototype.minutesToTime = function () {
    var h = parseInt(this / 60).LPad();
    var m = (this - h * 60).LPad();

    return h + ":" + m;
};

/*functions*/
(function ($) {
    $.fn.MoviesTimeLine = function (o) {
        /*
         * r = return , m = method , p = properties
         */
        var self = this, r, p;

        var m = {
            add: function (e) {
                $(self).append('<div role="on-timeline" _id="' + e._id + '" style="background-color:' + e.bg + ';width:' + e.Runtime.toMinutes() * 2 + 'px;">' +
                        '<div><img role="m-remove" title="remove" style="margin-left:6px;"><span class="txt-count">...</span></div>' +
                        '<div style="margin-left:6px">' + e.IntTitle + '</div>' +
                        '<div style="margin-left:6px"><span style="margin-right:10px">' + e.Runtime + '</span><span role="format">' + e.Format + '</span></div>' +
                        '<div role="start-end" style="margin-left:6px"><span style="background-color:#ff0000;font-weight:bold">...</span><img src="/img/icon-start-end.png"><span>...</span></div>' +
                        '</div>');
            },
            remove: function (e) {
                //todo
            },
            update: function () {
                var t = 0, x = 1;
                $(self).find("div[role=time-start],div[role=on-timeline],div[role=rest]").each(function () {

                    switch ($(this).attr("role")) {
                        case "time-start":
                            t = this.childNodes[0].value.toMinutes();
                            break;
                        case "on-timeline":
                            var run = this.childNodes[2].childNodes[0].innerText.toMinutes();
                            var start = t;
                            var end = start + run;

                            t = end;

                            this.childNodes[0].children[1].innerText = x++;

                            this.childNodes[3].children[0].innerText = start.minutesTimeFormat();
                            this.childNodes[3].children[2].innerText = t.minutesTimeFormat();
                            break;
                        case "rest":
                            t = t + this.childNodes[0].value.toMinutes();
                            break;
                    }
                });


            }
        };

        /* kiem tra tham so cuoi cung co phai la function hay khong
         * neu dung thi su dung no nhu 1 callback
         * */
        if (arguments.length) {
            switch (typeof (arguments[0])) {
                case 'string':
                    m[arguments[0]](arguments[1]);
                    break;
                case 'object':
                    p = o;
                    break;
            }

            if (typeof (arguments[arguments.length - 1]) === 'function')
                arguments[arguments.length - 1](r);
        }
    }
}(jQuery));

(function ($) {
    $.fn.MoviesQueue = function (o) {
        var self = this, p;
        var m = {
            add: function (a) {
                var e = '<div role="queue-selected" draggable="true" data="' + JSON.stringify(a).replace(/"/g, "'") + '">' +
                        '<img role="m-remove" title="remove" style="margin-right:6px;"><span>' + a.IntTitle + '</span>' +
                        '</div>';
                $(self).append(e);
            },
            remove: function (a, b) {
                var e = $(a.currentTarget).closest("div[role=queue-selected]");
                e.remove();
            }
        };

        if (arguments.length) {
            switch (typeof (arguments[0])) {
                case 'string':
                    switch (arguments[0]) {
                        case "add":
                            m.add(arguments[1]);
                            break;
                        case "remove":
                            m.remove(arguments[1], arguments[2]);
                            break;
                    }
                    break;
                case 'object':
                    p = o;
                    break;
            }

            if (typeof (arguments[arguments.length - 1]) === 'function')
                arguments[arguments.length - 1](r);
        }
    }
}(jQuery));

(function ($) {
    var movieindexColors = ["#66CCCC", "#66CCFF", "#66CC99", "#3366FF", "#990099", "#6633CC", "#669999"];
    var source;
    $.fn.MoviesScheduler = function () {
        var self = this;
        var methods = {
            addMovie: function (room, movie) {
                $.each(source.schedules, function () {
                    if (this.room == room) {
                        var prev = this.schedule[this.schedule.length - 1];

                        if (prev.type == "open")
                            this.schedule.push({type: "movie", _id: movie._id, start: prev.time});
                        else {
                            var lastT = prev.start.toMinutes() + source.moviesIndex[prev._id].Runtime.toMinutes() + 5;
                            this.schedule.push({type: "rest", time: "00:05"}, {type: "movie", _id: movie._id, start: lastT.minutesToTime()});
                        }
                        return;
                    }
                });
            },
            update: function (type, obj) {
                if (type === "open") {
                    var found = methods.findRoom(obj.roomno);
                    found.schedule[0].time = obj.opentime;
                } else {
                    console.log("update for rest")
                }

                methods.timeReCalc(obj.roomno);
            },
            timeReCalc: function (no) {
                var found = methods.findRoom(no);

                for (var i = 0; i < found.schedule.length; i++) {
                    if (found.schedule[i].type === "movie") {
                        var prev = found.schedule[i - 1];
                        if (prev.type == "open") {
                            found.schedule[i].start = prev.time;
                        } else if (prev.type == "rest") {
                            var movPrev = found.schedule[i - 2];
                            found.schedule[i].start = (movPrev.start.toMinutes() + source.moviesIndex[movPrev._id].Runtime.toMinutes() + prev.time.toMinutes()).minutesToTime();
                        }
                    }
                }
            },
            removeMovie: function () {
            },
            appendElem: function (obj) {
                var mov = source.moviesIndex[obj._id];
                switch (obj.type) {
                    case "open":
                        var t = (obj.time.toMinutes() - 7 * 60) * 2;
                        var w = t > 0 ? t / 2 + 140 : 140; //7*2*10=140
                        return '<div role="open" style="width:' + w + 'px"><input value="' + obj.time + '"></div>';
                        break;
                    case "movie":
                        return '<div role="on-timeline" _id="' + obj._id + '" style="width:' + mov.Runtime.toMinutes() * 2 + 'px">' +
                                '<div><img role="m-remove" title="remove"></div>' +
                                '<div>' + mov.IntTitle + '</div>' +
                                '<div><span style="margin-right:10px">' + mov.Runtime + '</span><span role="format">' + mov.Format + '</span></div>' +
                                '<div role="start-end"><span>' + obj.start + '</span><img src="/img/icon-start-end.png">' +
                                '<span>' + (obj.start.toMinutes() + mov.Runtime.toMinutes()).minutesToTime() + '</span></div></div>';
                        break;
                    case "rest":
                        return '<div role="rest"><input value="' + obj.time.toMinutes() + '"></div>';
                        break;
                }
            },
            scheduleRender: function (roomNo) {
                if (roomNo) {
                    var found = methods.findRoom(roomNo);
                    var thisEofRoom = $($(self).find("[role=room][no=" + roomNo + "]")[0]);

                    thisEofRoom.empty();
                    $.each(found.schedule, function () {
                        thisEofRoom.append(methods.appendElem(this));
                        //console.log(this)
                    });
                } else {
                    $.each(source.schedules, function () {
                        var curRoom = this.room;
                        $.each(this.schedule, function () {
                            $($(self).find("[role=room][no=" + curRoom + "]")[0]).append(methods.appendElem(this));
                        });
                    });
                }
            },
            findRoom: function (no) {//inner
                var found;

                for (var n in source.schedules) {
                    if (source.schedules[n].room == no) {
                        found = source.schedules[n];
                    }
                }

                return found;
            }
        };
        if (arguments.length) {
            switch (typeof (arguments[0])) {
                case "string":
                    switch (arguments[0]) {
                        case "scheduleRender":
                            methods.scheduleRender(arguments[1]);
                            break;
                        case "addMovie":
                            methods.addMovie(arguments[1], arguments[2]);
                            break;
                        case "update":
                            methods.update(arguments[1], arguments[2]);
                            break;
                        case "getSchedules":
                            return source.schedules;
                            break;
                    }
                    break;
                case "object":
                    source = arguments[0];
                    break;
            }
            if (typeof (arguments[arguments.length - 1]) === "function")
                arguments[arguments.length - 1]();
        }
    }
}(jQuery));