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
            add: function () {
            },
            remove: function () {
            }
        };

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