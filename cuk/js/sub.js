var Sub = (function () {
    function init() {
        scrollHandler();
        posCalc();
        lnbClk();
        fileUpload();
        toggleList();
        initSlider();
        mobLnb();
        formChange();
    }

    function initSlider() {
        $(".lnb-slider").slick({
            infinite: false,
            slidesToScroll: 1,
            slidesToShow: 7,
            arrows: false,
            dots: false,
            swipeToSlide: true,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }

    var lastScroll = -1;
    function scrollHandler() {
        // console.log(lastScroll);
        var scrTop = $(window).scrollTop();
        var headIs;
        // console.log(scrTop);
        if (scrTop > lastScroll && scrTop > 1) {
            // scroll down
            headIs = false;
        } else if (scrTop < lastScroll) {
            // scroll up
            headIs = true;
        }
        lastScroll = scrTop;
        lnbFix(scrTop, headIs);
    }

    $(window).on("scroll", function () {
        scrollHandler();
    });

    function posCalc() {
        var scTopPos = $(".sub-content-container").offset().top;
        var lnbH = $(".sub-lnb-wrapper").outerHeight();
        var lnbTopPos = $(".sub-lnb-wrapper").offset().top;
        var lnbBotPos = $(".sub-lnb-wrapper").offset().top + lnbH;
        var footTop = $(".footer").offset().top;
        return [scTopPos, lnbTopPos, lnbBotPos, lnbH, footTop];
    }

    function lnbFix(scrTop, headIs) {
        var st = scrTop;
        var head = headIs;
        var lnbH = posCalc()[3];
        var lnbBot = st + lnbH;
        var secTop = posCalc()[0];
        var ft = posCalc()[4];
        if (st < secTop) {
            // 화면 상단이 섹션 상단 보다 높을 경우
            if ($("body").hasClass("scroll-up") && st < secTop - 160) {
                // 스크롤업 상태
                $(".sub-lnb-wrapper").removeClass("down");
                $(".sub-lnb-wrapper").removeClass("fixed-bottom");
                $(".sub-lnb-wrapper").removeClass("fixed-top");
            } else if ($("body").hasClass("scroll-down")) {
                // 스크롤 다운 상태
                $(".sub-lnb-wrapper").removeClass("down");
                $(".sub-lnb-wrapper").removeClass("fixed-bottom");
                $(".sub-lnb-wrapper").removeClass("fixed-top");
            }
        } else if (st > secTop && lnbBot < ft) {
            if ($("body").hasClass("scroll-up")) {
                $(".sub-lnb-wrapper").addClass("down");
                $(".sub-lnb-wrapper").removeClass("fixed-bottom");
                $(".sub-lnb-wrapper").addClass("fixed-top");
            }
            if ($("body").hasClass("scroll-down")) {
                $(".sub-lnb-wrapper").removeClass("down");
                $(".sub-lnb-wrapper").removeClass("fixed-bottom");
                $(".sub-lnb-wrapper").addClass("fixed-top");
            }
        } else if (st > secTop && lnbBot > ft) {
            // lnb가 푸터에 픽스될 경우
            if ($("body").hasClass("scroll-up")) {
                $(".sub-lnb-wrapper").addClass("down");
            } else if ($("body").hasClass("scroll-down")) {
                $(".sub-lnb-wrapper").removeClass("down");
                $(".sub-lnb-wrapper").removeClass("fixed-top");
                $(".sub-lnb-wrapper").addClass("fixed-bottom");
            }
        }
    }

    function lnbClk() {
        $(".sub-lnb > ul > li > a").on("click", function () {
            $(".sub-lnb > ul > li > ul").removeClass("active");
            $(this).siblings("ul").addClass("active");
        });
        $(".sub-lnb > ul > li > ul").mouseleave(function () {
            $(this).removeClass("active");
        });
    }

    function fileUpload() {
        $("input[type='file']").on("change", function () {
            var fileName = $(this).val().split("/").pop().split("\\").pop();
            $(this).siblings('input[type="text"]').val(fileName);
        });
    }

    function toggleList() {
        var $q = $(".question-wrapper > a");
        $q.on("click", function () {
            $(this).parents("li").toggleClass("open");
            $(this).parents("li").children(".answer-wrapper").slideToggle(300);
        });
    }

    function mobLnb() {
        // 화살표 클릭 시 풀메뉴
        // document
        //     .querySelector(".mob-lnb-arrow")
        //     .addEventListener("click", function () {
        //         document
        //             .querySelector(".mob-lnb-menu")
        //             .classList.remove("dep3-open");
        //         var $mobArrow = document.querySelectorAll(
        //             ".mob-lnb-menu > div"
        //         );
        //         for (var i = 0; i <= $mobArrow.length - 1; i++) {
        //             $mobArrow[i].classList.remove("menu-on");
        //         }

        //         this.classList.toggle("open");
        //         document.querySelector(".mob-lnb-menu").classList.toggle("on");
        //     });

        // 화살표 클릭 시 풀메뉴
        $(".mob-lnb-arrow").on("click", function () {
            $(".mob-lnb-menu").removeClass("dep3-open");
            $(".mob-lnb-menu > div").removeClass("menu-on");
            $(this).toggleClass("open");
            $(".mob-lnb-menu").toggleClass("on");
            // 다시 열었을 경우 초기화
            $(".mob-lnb-menu > div.plus > a").removeClass("minus");
            $(".mob-lnb-menu.on > div > ul").removeClass("on");
        });

        // 풀메뉴에서 플러스 버튼 클릭 시
        // var $plusBtn = document.querySelectorAll(".mob-lnb-menu > div > a");
        // for (var i = 0; i <= $plusBtn.length - 1; i++) {
        //     $plusBtn[i].addEventListener("click", function (e) {
        //         var $t = this.parentNode;
        //         document
        //             .querySelector(".mob-lnb-menu")
        //             .classList.remove("dep3-open");
        //         if ($t.classList.contains("plus")) {
        //             e.preventDefault();
        //             if (this.classList.contains("minus")) {
        //                 var $allMenu = document.querySelectorAll(
        //                     ".mob-lnb-menu > div > ul"
        //                 );
        //                 for (var i = 0; i <= $allMenu.length - 1; i++) {
        //                     $allMenu[i].classList.remove("on");
        //                 }
        //                 this.classList.remove("minus");
        //                 this.nextElementSibling.classList.remove("on");
        //             } else {
        //                 var $menuList = document.querySelectorAll(
        //                     ".mob-lnb-menu > div > ul"
        //                 );
        //                 for (var i = 0; i <= $menuList.length - 1; i++) {
        //                     $menuList[i].classList.remove("on");
        //                 }
        //                 var $callBtn = document.querySelectorAll(
        //                     ".mob-lnb-menu > div > a"
        //                 );
        //                 for (var i = 0; i <= $callBtn.length - 1; i++) {
        //                     $callBtn[i].classList.remove("minus");
        //                 }
        //                 this.classList.add("minus");
        //                 this.nextElementSibling.classList.add("on");
        //             }
        //         }
        //     });
        // }

        // 풀메뉴에서 플러스 버튼 클릭 시
        $(".mob-lnb-menu > div > a").on("click", function (e) {
            // e.preventDefault();
            var $t = $(this).parent("div");
            $(".mob-lnb-menu").removeClass("dep3-open");
            if ($t.hasClass("plus")) {
                e.preventDefault();
                if ($(this).hasClass("minus")) {
                    $(".mob-lnb-menu > div > ul").removeClass("on");
                    $(this).removeClass("minus");
                    $(this).siblings("ul").removeClass("on");
                } else {
                    $(".mob-lnb-menu > div > ul").removeClass("on");
                    $(".mob-lnb-menu > div > a").removeClass("minus");
                    $(this).addClass("minus");
                    $(this).siblings("ul").addClass("on");
                }
            }
        });

        // 각 메뉴 클릭 시
        // var $ml = $(".lnb-slider .slick-slide > a");
        // for (var i = 0; i <= $ml.length - 1; i++) {
        //     $ml[i].addEventListener("click", function (e) {
        //         var winW = window.innerWidth;
        //         if (winW <= 1040) {
        //             $(".mob-lnb-menu").addClass("on");
        //             var data = this.dataset.menuNum;
        //             if (data) {
        //                 e.preventDefault();
        //                 $(".mob-lnb-arrow").removeClass("open");
        //                 $(".mob-lnb-menu > div > ul").removeClass("on");
        //                 $(".mob-lnb-menu > div.plus > a").removeClass("minus");
        //                 $(".mob-lnb-menu").addClass("dep3-open");
        //                 var $t = $("[data-lnb-num='" + data + "']");
        //                 if ($t.hasClass("menu-on")) {
        //                     $(".mob-lnb-menu > div").removeClass("menu-on");
        //                     $t.removeClass("menu-on");
        //                 } else {
        //                     $(".mob-lnb-menu > div").removeClass("menu-on");
        //                     $t.addClass("menu-on");
        //                 }
        //             }
        //         }
        //     });
        // }

        // 각 메뉴 클릭 시
        $(".lnb-slider .slick-slide > a").on("click", function (e) {
            // e.preventDefault();
            var winW = window.innerWidth;
            if (winW <= 1040) {
                $(".mob-lnb-menu").addClass("on");
                var data = $(this).attr("data-menu-num");
                if (data) {
                    e.preventDefault();
                    $(".mob-lnb-arrow").removeClass("open");
                    $(".mob-lnb-menu > div > ul").removeClass("on");
                    $(".mob-lnb-menu > div.plus > a").removeClass("minus");
                    $(".mob-lnb-menu").addClass("dep3-open");
                    var $t = $("[data-lnb-num='" + data + "']");
                    if ($t.hasClass("menu-on")) {
                        $(".mob-lnb-menu > div").removeClass("menu-on");
                        $t.removeClass("menu-on");
                    } else {
                        $(".mob-lnb-menu > div").removeClass("menu-on");
                        $t.addClass("menu-on");
                    }
                }
            }
        });
    }

    function formChange() {
        // $t = document.querySelector("#domesticChk");
        // if ($t) {
        //     document
        //         .querySelector("#domesticChk")
        //         .addEventListener("click", function () {
        //             var $domeInput =
        //                 document.querySelectorAll(".domestic-input");
        //             for (var i = 0; i <= $domeInput.length - 1; i++) {
        //                 $domeInput[i].style.display = "block";
        //             }
        //             document.querySelector(".foreign-input").style.display =
        //                 "none";
        //         });
        //     document
        //         .querySelector("#foreignChk")
        //         .addEventListener("click", function () {
        //             var $domeInput =
        //                 document.querySelectorAll(".domestic-input");
        //             for (var i = 0; i <= $domeInput.length - 1; i++) {
        //                 $domeInput[i].style.display = "none";
        //             }
        //             document.querySelector(".foreign-input").style.display =
        //                 "block";
        //         });
        // }
        if ($("#domesticChk")) {
            $("#domesticChk").on("click", function () {
                $(".domestic-input").css("display", "block");
                $(".foreign-input").css("display", "none");
            });
            $("#foreignChk").on("click", function () {
                $(".domestic-input").css("display", "none");
                $(".foreign-input").css("display", "block");
            });
        }
    }
    return {
        init: init,
    };
})();

$(document).ready(function () {
    Sub.init();
});
