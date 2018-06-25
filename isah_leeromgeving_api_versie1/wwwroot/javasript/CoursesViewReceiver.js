function CoursesViewReceiver() {
    let url = "api/courses/";
    let xhttp = null;

    function getAll() {
        let allcourses = null;

        xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                allcourses = JSON.parse(xhttp.responseText);
                console.log(allcourses);
                let courseboxes = d3.select("#onlinecourses").selectAll(".coursebox").data(allcourses)
                    .enter()
                    .append("section")
                    .classed("coursebox", true);

                courseboxes
                    .append("h2")
                    .classed("coursetitle", true)
                    .text(function (d) {
                        return d.name;
                    });

                courseboxes
                    .append("input")
                    .classed("coursebtn", true)
                    .property("type", "button")
                    .property("value", "Lees meer");
                   
                courseboxes
                    .append("input")
                    .classed("coursebtn", true)
                    .property("type", "button")
                    .property("value", "Volg cursus");    
            }
        }
    }

    getAll();
}
CoursesViewReceiver();

/*
 var xhttp = new XMLHttpRequest();
xhttp.open("GET", "api/diagrams/2", true);
xhttp.send();
var paths = null;
var rectangles = null;
var test = null;
xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        test = JSON.parse(xhttp.responseText);
        paths = test.paths;
        rectangles = test.rectangles;

    }
}

CoursesViewReceiver();
 */
