let CoursesViewReceiver = (function (coursesViewBuilder) {
    let url = "api/courses/";

    function getAll() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                coursesViewBuilder.buildCourseBoxes(JSON.parse(xhttp.responseText));
            }
        }

        xhttp.open("GET", url, true);
        xhttp.send();
    }
    
    return {
        getCourses: getAll,
    }
})(CoursesViewBuilder);
