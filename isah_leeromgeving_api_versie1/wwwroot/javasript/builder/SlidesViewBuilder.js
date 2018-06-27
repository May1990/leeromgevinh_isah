let SlideViewBuilder = (function () {//viewSender
    let idcourse = JSON.parse(localStorage.getItem("idcourse"));
    let indexslide = JSON.parse(localStorage.getItem("indexslide"));
    console.log(indexslide);

    function buildSlide(data) {
        console.log(data);

    }

    return {
        idcourse: idcourse,
        indexslide: indexslide,
        buildSlide: buildSlide
    }
})();//SlideViewSender