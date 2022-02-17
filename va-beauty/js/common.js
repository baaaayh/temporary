var Common = (function () {
    function init() {
        scrollPos();
    }

    function scrollPos() {
        var scrPos = $(window).scrollTop();
        headerChange(scrPos);
    }

    function headerChange(pos) {
        if (pos > 0) {
            if ($(".header").hasClass("fixed")) return;
            $(".header").addClass("fixed");
        } else if (pos < 40) {
            $(".header").removeClass("fixed");
        }
    }

    $(window).on("scroll", function () {
        scrollPos();
    });

    return {
        init: init,
    };
})();

$(document).ready(function () {
    Common.init();
});
