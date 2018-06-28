let DiagramsViewReceiver = (function (diagramsViewBuilder) {
    let url = "api/diagrams/";

    function getDiagrams() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                diagramsViewBuilder.buildTableDiagrams(JSON.parse(xhttp.responseText));
            }
        }

        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function getDiagram() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                diagramsViewBuilder.buildDiagram(JSON.parse(xhttp.responseText));
            }
        }

        xhttp.open("GET", url + diagramsViewBuilder.iddiagram, true);
        xhttp.send();
    }
    // to do
    function putDiagram() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //diagramsViewBuilder;
            }
        }

        xhttp.open("PUT", url, true);
        xhttp.send();
    }
    // to do
    function postDiagram() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //diagramsViewBuilder;
            }
        }

        xhttp.open("POST", url, true);
        xhttp.send();
    }

    /*function deleteDiagram() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                slideViewBuilder.setLastIndex(Number(xhttp.responseText));
                getSlide();
            }
        }

        xhttp.open("DELETE", url + "GetLastIndex" + "/" + slideViewBuilder.idcourse, true);
        xhttp.send();
    }*/

    return {
        getDiagrams: getDiagrams,
        getDiagram: getDiagram,
        putDiagram: putDiagram,
        postDiagram: postDiagram
        //deleteDiagram: deleteDiagram
    }
})(DiagramsViewBuilder);