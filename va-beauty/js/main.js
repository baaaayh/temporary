var Main = (function () {
    function init() {
        initSlider();
        recAni();
        promoteAni();
    }

    function initSlider() {
        var $descSlider = $(".desc-img-slider");
        $(".main-visual-wrapper").slick({
            arrows: true,
            dots: true,
        });
        $descSlider.slick({
            arrows: true,
            infinite: true,
        });
        $descSlider.on("afterChange", function (event, slick, index) {
            changeContent(index);
        });
        $(".recommend-slider").slick({
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
        });
    }

    var prodInfo = [
        {
            id: 1,
            desc: "피부 밀도를 높이고 광채를 선사하는 항산화 앰플",
            name: "안티옥시던트 래디언스 앰플",
            price: "₩ 52,000",
        },
        {
            id: 2,
            desc: "결점 없이 매끄러운 피부를 연출해주는 쿠션 파운데이션",
            name: "롱 웨어 쿠션 파운데이션",
            price: "₩ 45,000",
        },
    ];

    function changeContent(idx) {
        const prodName = prodInfo[idx].name;
        const prodDesc = prodInfo[idx].desc;
        const prodPrice = prodInfo[idx].price;
        document.querySelector(".prod-name").innerText = prodName;
        document.querySelector(".prod-desc").innerText = prodDesc;
        document.querySelector(".prod-price").innerText = prodPrice;
    }
    function recAni() {
        var controller = new ScrollMagic.Controller();
        var tween = TweenMax.fromTo(".trans-ani1", 0.3, { y: 130 }, { y: 0 });
        var scene = new ScrollMagic.Scene({
            triggerElement: ".trans-ani1",
            triggerHook: "onEnter",
        })
            .setTween(tween) // trigger a TweenMax.to tween
            .addTo(controller);

        // .addIndicators({
        //     name: "1",
        // });
    }

    function promoteAni() {
        var controller = new ScrollMagic.Controller();
        var tween = TweenMax.fromTo(".trans-ani2", 0.7, { x: 500 }, { x: 0 });
        var scene = new ScrollMagic.Scene({
            triggerElement: ".trans-ani2",
            triggerHook: "onEnter",
        })
            .setTween(tween) // trigger a TweenMax.to tween
            .addTo(controller);
        // .addIndicators({
        //     name: "1",
        // });
    }

    return {
        init: init,
    };
})();

$(document).ready(function () {
    Main.init();
});
