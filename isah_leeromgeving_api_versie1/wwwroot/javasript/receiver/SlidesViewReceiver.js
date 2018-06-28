let SlideViewReceiver = (function (slideViewBuilder) {
    let url = "api/courses/";
    
    function getSlide() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                slideViewBuilder.buildSlide(JSON.parse(xhttp.responseText));
            }
        }

        xhttp.open("GET", url + slideViewBuilder.idcourse + "/" + slideViewBuilder.indexslide, true);
        xhttp.send();
    }

    function getLastIndex() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                slideViewBuilder.setLastIndex(Number(xhttp.responseText));
                getSlide();
            }
        }

        xhttp.open("GET", url + "GetLastIndex"+ "/"+ slideViewBuilder.idcourse, true);
        xhttp.send();
    }

    return {
        getSlide: getSlide,
        getLastIndex: getLastIndex
    }
})(SlideViewBuilder);