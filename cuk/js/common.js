var Common = (function () {
    function init() {
        headerUp();
        headerDown();
        tabClick();
        popup();
        floatNavBtn();
        mobMenu();
    }

    $(window).on("mousewheel DOMMouseScroll", function (e) {
        var cr = e.originalEvent.wheelDelta / 120;
        var ff = e.originalEvent.detail / 3;
        if (cr > 0 || ff < 0) {
            headerDown();
        } else if (cr < 0 || ff > 0) {
            headerUp();
        }
    });

    var lastScroll = -1;
    $(window).on("scroll", function () {
        var scrPos = $(window).scrollTop();
        if (scrPos > lastScroll && scrPos > 1) {
            headerUp();
        } else if (scrPos < lastScroll) {
            headerDown();
        }
        lastScroll = scrPos;
        floatNav(scrPos);
    });

    // 헤더 액션
    function headerUp() {
        if ($("body").hasClass("scroll-down")) return;
        $("body").removeClass("scroll-up");
        $("body").addClass("scroll-down");
    }
    function headerDown() {
        if ($("body").hasClass("scroll-up")) return;
        $("body").removeClass("scroll-down");
        $("body").addClass("scroll-up");
    }

    function toggleMenu() {
        $("#gnb > li > a").siblings(".depth2-wrapper").css("display", "none");
        $("#gnb > li > a").on("mouseenter", function () {
            var winW = window.innerWidth;
            if (winW > 1280) {
                $(".dim").addClass("on");
                $(this)
                    .parent("li")
                    .siblings("li")
                    .children(".depth2-wrapper")
                    .slideUp();
                $(this).siblings(".depth2-wrapper").slideDown(300);
            }
        });
        $("header").on("mouseleave", function () {
            var winW = window.innerWidth;
            if (winW > 1280) {
                $(".dim").removeClass("on");
                $(".depth2-wrapper").slideUp(300);
            }
        });
    }

    function mobMenu() {
        $("#gnb > li > a").on("click", function (e) {
            var winW = window.innerWidth;
            if (winW <= 1280) {
                if ($(this).hasClass("link")) {
                    return;
                }
                e.preventDefault();
                $("#gnb > li > a")
                    .siblings(".depth2-wrapper")
                    .css("display", "none");
                $(this).siblings(".depth2-wrapper").css("display", "block");
            }
        });
        $(".depth2-container .depth2 > a").on("click", function (e) {
            var winW = window.innerWidth;
            if (winW <= 1280) {
                if ($(this).parent(".depth2").hasClass("has-dep3")) {
                    e.preventDefault();
                    if ($(this).parent(".depth2").hasClass("on")) {
                        $(this).siblings(".depth3").slideDown();
                    } else {
                        $("#gnb .depth3").slideUp();
                        $(this).siblings("#gnb .depth3").slideDown();
                    }
                } else {
                    return;
                }
                $(".depth2-container .depth2").removeClass("on");
                $(this).parent(".depth2").addClass("on");
            }
        });
    }

    // 탭클릭 시
    function tabClick() {
        var tabs = document.querySelectorAll(".tab > li");
        if (tabs) {
            for (var i = 0; i <= tabs.length - 1; i++) {
                tabs[i].addEventListener("click", function (e) {
                    // e.preventDefault();
                    // var tabName = this.dataset.tabName;
                    var tabName = this.getAttribute("data-tab-name");
                    var tabNodes = document.querySelectorAll(
                        "[data-tab-name=" + tabName + "]"
                    );
                    var tabContent = document.querySelectorAll(
                        "[data-content-name=" + tabName + "]"
                    );
                    var target = this.getAttribute("data-tab-target");
                    // var target = this.dataset.tabTarget;
                    for (var i = 0; i <= tabNodes.length - 1; i++) {
                        tabNodes[i].classList.remove("active");
                    }
                    for (var i = 0; i <= tabContent.length - 1; i++) {
                        tabContent[i].classList.remove("active");
                    }
                    this.classList.add("active");
                    if (!tabContent.length > 0) {
                        return;
                    } else {
                        document.querySelector(target).classList.add("active");
                    }
                });
            }
        }
    }

    // 플로팅 네비
    function floatNav(scrPos) {
        //floating
        var winW = window.innerWidth;
        if (winW > 1040) {
            var wbPos = scrPos + window.innerHeight;
            var ft = document.getElementsByClassName("footer")[0].offsetTop;
            var $fn = document.getElementsByClassName("float-menu");
            if (wbPos >= ft) {
                $fn[0].classList.add("fixed");
            } else if (wbPos < ft) {
                $fn[0].classList.remove("fixed");
            }
        }
    }

    function floatNavBtn() {
        document
            .querySelector(".btn-top")
            .addEventListener("click", function () {
                // window.animate({ scrollTop: 0, behavior: "smooth" });
                $("html, body").animate({ scrollTop: 0 }, "fase");
            });
        document
            .querySelector(".btn-quick-menu > a")
            .addEventListener("click", function () {
                var winW = window.innerWidth;
                if (winW <= 1280) {
                    document
                        .querySelector(".float-menu")
                        .classList.toggle("active");
                    document.querySelector(".body-dim").classList.toggle("on");
                }
                document
                    .querySelector(".quick-menu")
                    .classList.toggle("active");
                this.classList.toggle("close");
            });
    }

    //팝업
    function popup() {
        $closeBtns = document.querySelectorAll(".pop-close");
        $openBtns = document.querySelectorAll(".popOpen");
        $popUps = document.querySelectorAll(".pop-wrapper");
        if ($openBtns) {
            for (var i = 0; i <= $openBtns.length - 1; i++) {
                $openBtns[i].addEventListener("click", function () {
                    var popName = this.getAttribute("data-pop-name");
                    document
                        .querySelector(".pop-wrapper." + popName)
                        .classList.add("active");
                    document.querySelector("body").classList.add("pop-open");
                });
            }
        }
        if ($closeBtns) {
            for (var i = 0; i <= $closeBtns.length - 1; i++) {
                $closeBtns[i].addEventListener("click", function () {
                    this.parentNode.parentNode.parentNode.parentNode.classList.remove(
                        "active"
                    );
                    document.querySelector("body").classList.remove("pop-open");
                });
            }
        }
    }

    function mobMenuCall() {
        document
            .querySelector(".mob-ham")
            .addEventListener("click", function () {
                var winW = window.innerWidth;
                if (winW <= 1280) {
                    document
                        .querySelector(".gnb-container")
                        .classList.add("on");
                    document.querySelector(".mob-dim").classList.add("on");
                    // document.querySelector("body").style.overflowY = "hidden";
                    // $("body").on(
                    //     "scroll touchmove mousewheel",
                    //     function (event) {
                    //         event.preventDefault();
                    //         event.stopPropagation();
                    //         return false;
                    //     }
                    // );
                    document.querySelector("body").classList.add("off-scroll");
                }
            });
        document
            .querySelector(".btn-close")
            .addEventListener("click", function () {
                var winW = window.innerWidth;
                if (winW <= 1280) {
                    document
                        .querySelector(".gnb-container")
                        .classList.remove("on");
                    document.querySelector(".mob-dim").classList.remove("on");
                    // document.querySelector("body").style.overflowY = "visible";
                    // $("body").off("scroll touchmove mousewheel");
                    document
                        .querySelector("body")
                        .classList.remove("off-scroll");
                }
            });
    }

    function initHeader() {
        document.querySelector(".gnb-container").classList.remove("on");
        document.querySelector(".dim").classList.remove("on");
        // document.querySelector(".mob-dim").classList.remove("on");
        // document.querySelector("body").style.overflowY = "auto";
        // $("body").off("scroll touchmove mousewheel");
        document.querySelector("body").classList.remove("off-scroll");
        if (document.querySelector("#gnb > li > a.on")) {
            document.querySelector(
                "#gnb > li > a.on"
            ).nextElementSibling.style.display = "block";
        }
    }

    window.addEventListener("resize", function () {
        alert("resize");
        document.querySelector(".body-dim").classList.remove("on");
        document.querySelector(".float-menu").classList.remove("active");
        document.querySelector(".quick-menu").classList.remove("active");
        var $winW = window.innerWidth;

        if ($winW > 1280) {
            toggleMenu();
        }
        if ($winW <= 1280) {
            var $d2 = document.querySelectorAll("#gnb .depth2");
            for (var i = 0; i <= $d2.length - 1; i++) {
                if ($d2[i].classList.contains("on")) {
                    if ($d2[i].querySelector(".depth3")) {
                        $d2[i].querySelector(".depth3").style.display = "block";
                    }
                }
            }
            mobMenuCall();
        }
        if ($winW > 1040) {
            document.querySelector(".body-dim").classList.remove("on");
        }
        if ($winW <= 1040) {
            // initHeader();
        }
    });
    $(function () {
        var $winW = window.innerWidth;
        if ($winW > 1280) {
            toggleMenu();
        }
        if ($winW <= 1280) {
            var $gnbDep = document.querySelectorAll("#gnb .depth2");
            for (var i = 0; i <= $gnbDep.length - 1; i++) {
                if ($gnbDep[i].classList.contains("on")) {
                    if ($gnbDep[i].querySelector(".depth3")) {
                        $gnbDep[i].querySelector(".depth3").style.display =
                            "block";
                    }
                }
            }
            mobMenuCall();
        }
    });

    return {
        init: init,
    };
})();

$(document).ready(function () {
    Common.init();
});
