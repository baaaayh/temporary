var Main = (function () {
    function init() {
        initSlider();
        posCalc();
        nodesReturn();
        lnbClick();
        lnbToggle();
        secPos();
        secClick();
        detectScreen();
    }

    function initSlider() {
        $(".kv-slider").slick({
            dots: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1040,
                    slidesToShow: 5.2,
                    settings: {
                        dots: false,
                        arrows: true,
                    },
                },
            ],
        });
        $(".card-slider").slick({
            dots: false,
            arrows: true,
            slidesToScroll: 1,
            // slidesToShow: 3,
            infinite: false,
            draggable: true,
            variableWidth: true,
        });
        $(".banner-slider").slick({
            dots: true,
            arrows: false,
        });
        $(".people-slider").slick({
            dots: false,
            arrows: false,
            fade: true,
            initialSlide: 0,
        });
        $(".people-img-slider").slick({
            dots: false,
            arrows: false,
            slidesToShow: 3,
            initialSlide: 1,
            draggable: true,
            focusOnSelect: true,
        });
        $(".people-slider").on(
            "beforeChange",
            function (event, slick, currentSlide, nextSlide) {
                $(".people-img-slider").slick("slickGoTo", nextSlide);
            }
        );

        $(".people-img-slider").on(
            "beforeChange",
            function (event, slick, currentSlide, nextSlide) {
                $(".people-slider").slick("slickGoTo", nextSlide);
            }
        );
        $(".story-slider").slick({
            dots: false,
            arrows: true,
            infinite: true,
            draggable: true,
            variableWidth: true,
            initialSlide: 0,
        });
    }

    function detectScreen(scrPos) {
        // 페이지로드 후 초기화
        $(function () {
            autoHeight();
        });
        // 리사이징시
        window.addEventListener("resize", function () {
            var winW = window.innerWidth;
            autoHeight();
            if (winW > 1280) {
                fixBottom(scrPos);
            }
        });
        $(function () {
            var winW = window.innerWidth;
            if (winW > 1280) {
                fixBottom(scrPos);
            }
        });

        function autoHeight() {
            var currH = $(".people-box.slick-current").outerHeight();
            $(".people-slider").height(currH);
            $(".people-slider").on(
                "beforeChange",
                function (event, slick, currentSlide, nextSlide) {
                    var nextNum = nextSlide + 1;
                    var nH = $(
                        ".people-box:nth-child(" + nextNum + ") "
                    ).outerHeight();
                    $(".people-slider").height(nH);
                }
            );
        }
    }

    // 엘리먼트별 포지션
    function posCalc() {
        // 안내, lnb 포지션
        var anncH = document.querySelector(".announce-box").clientHeight;
        var navH = document.querySelector(".nav-wrapper").clientHeight;
        var ft = document.querySelector(".footer").offsetTop;
        // var ftPos = ft.toFixed();
        // 섹션별 포지션
        return [anncH, navH, ft];
    }

    function secPos() {
        var sPosValue = [];
        var sHeightV = [];
        var sectionNum = document.querySelectorAll("section").length;
        for (var i = 1; i <= sectionNum; i++) {
            var secClass = ".main-sec0" + i;
            var pos = $(".main-sec0" + i).offset().top;
            var sHeight = document.querySelector(secClass).clientHeight;
            sPosValue[i - 1] = pos;
            sHeightV[i - 1] = sHeight;
        }
        return [sPosValue, sHeightV];
    }

    // 안내, lnb 푸터에 고정
    function fixBottom(scrPos) {
        var ft = posCalc()[2];
        var anncBotPos = scrPos + posCalc()[0];
        var navBotPos = scrPos + posCalc()[1];
        var headerH = document.querySelector(".header").clientHeight;
        var anncTopPos = document.querySelector(".announce-box").offsetTop;
        var navTopPos = document.querySelector(".nav-wrapper").offsetTop;
        var anncBox = document.querySelector(".announce-box");
        var mainNav = document.querySelector(".nav-wrapper");
        var windowTop = $(window).scrollTop();
        var elArray = [
            {
                elName: anncBox,
                elBotPos: anncBotPos,
                elTopPos: anncTopPos,
            },
            {
                elName: mainNav,
                elBotPos: navBotPos,
                elTopPos: navTopPos,
            },
        ];

        $.each(elArray, function (index, el) {
            if (el.elBotPos > ft) {
                el.elName.classList.add("fix-bottom");
            } else if (windowTop < el.elTopPos - headerH) {
                el.elName.classList.remove("fix-bottom");
            }
        });
    }

    // 스크롤 위치
    var lastScroll = -1;
    function scrollHandler() {
        var scrPos = $(window).scrollTop();
        if (scrPos > lastScroll && scrPos > 1) {
            // scroll down
        } else if (scrPos < lastScroll) {
            // scroll down
        }
        lastScroll = scrPos;
        detectScreen(scrPos);
        lnbToggle(scrPos);
    }

    $(window).on("scroll", function (e) {
        scrollHandler();
    });

    // 스크롤 액션
    function nodesReturn() {
        var nodesList = document.querySelectorAll(".nav-wrapper nav ul li");
        return nodesList;
    }
    function pageGoTo(pageNum) {
        var secValue = secPos()[0];
        $("html, body").animate({ scrollTop: secValue[pageNum] }, 300);
    }
    function lnbToggle(scrPos) {
        var sp = secPos()[0];
        var sh = secPos()[1];
        var lastIdx = sp.length - 1;
        var headerH = document.querySelector(".header").clientHeight;
        var s4Mid = sh[lastIdx - 1] / 2;
        for (i = 0; i < lastIdx; i++) {
            if (scrPos >= sp[i] - headerH && scrPos < sp[i] + sh[i]) {
                pageNation(i);
                if (scrPos >= sp[lastIdx - 1] + s4Mid) {
                    pageNation(lastIdx);
                }
            }
        }
    }
    function pageNation(idx) {
        var number = idx;
        var lnbList = nodesReturn();
        for (var i = 0; i <= 4; i++) {
            lnbList[i].classList.remove("active");
        }
        lnbList[idx].classList.add("active");
        document.getElementsByClassName("page-num")[0].textContent =
            "0" + (number + 1);
    }
    function lnbClick() {
        var lnbBtn = nodesReturn();
        for (var i = 0; i <= 4; i++) {
            lnbBtn[i].addEventListener("click", function () {
                var lnbIdx = this.getAttribute("data-num");
                pageGoTo(lnbIdx);
            });
        }
    }

    function secClick() {
        var secList = document.querySelectorAll("section");
        var secIdx;
        for (var i = 0; i <= 4; i++) {
            secList[i].addEventListener("click", function () {
                var windowW = window.innerWidth;
                if (windowW > 1040) {
                    var secIdx = this.getAttribute("data-page");
                    pageGoTo(secIdx);
                }
            });
        }
    }
    return {
        init: init,
    };
})();

$(document).ready(function () {
    Main.init();
});
