/*prototype*/
String.prototype.toMinutes = function () {
    var t = this.split(":");

    if (t[0])
        return t = t.length - 1 ? parseInt(t[0]) * 60 + parseInt(t[1]) : parseInt(t[0]);

    return parseInt(this);
};
Number.prototype.LPad = function () {
    return this > 9 ? this : "0" + this;
};
Number.prototype.minutesTimeFormat = function () {
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
                $(self).append('<div role="on-timeline" style="background-color:' + e.bg + ';width:' + e.Runtime.toMinutes() * 2 + 'px;">' +
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
                var e = '<div role="queue-selected" draggable="true" data="' + JSON.stringify(a).replace(/"/g, "'") + '" style="background-color:' + a.bg + '">' +
                        '<img role="m-remove" title="remove" style="margin-right:6px;"><span>' + a.IntTitle + '</span>' +
                        '</div>';
                $(self).append(e);
            },
            remove: function (a, b) {
                var e = $(a.currentTarget).closest("div[role=queue-selected]");
                b.push(e.css("background-color"));
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