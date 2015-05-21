/*prototype*/
String.prototype.toMinutes = function () {
    var t = this.split(":");

    if (t[0])
        return t = t.length - 1 ? parseInt(t[0]) * 60 + parseInt(t[1]) : parseInt(t[0]);

    return false;
};

/*functions*/
(function ($) {
    $.fn.MoviesTimeline = function (o) {
        /*
         * r = return , m = method , p = properties
         */
        var self = this, r, p;

        var m = {
            add: function (e) {
                $(self).append('<div role="member"><span role="m-remove">' + e + '</span></div>');
            },
            remove: function (e) {
                //console.log(e.currentTarget)
                //$(e.currentTarget).closest("div[role=member]").remove()
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