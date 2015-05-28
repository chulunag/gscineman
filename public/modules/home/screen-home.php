<script>
    (function ($) {
        $.zzz = "Hello";
        $.fn.CineMan = function () {
            console.log($.zzz)
        }
        $.fn.thaydoi = function () {
            $.zzz = "Terminator";
        }

    }(jQuery))

    var m, n;
    $(n).thaydoi();
    $(m).CineMan();
</script>