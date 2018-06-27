let CoursesViewBuilder = (function (viewSender) {
    let infoAllCourses = "Wanneer u gebruik maakt van Isah Business Software, is het belangrijk dat gebruikers de functionaliteiten van het Isah systeem kennen en deze optimaal benutten. Om dit te bereiken, bieden wij alle gebruikers van het Isah systeem online en offline cursussen aan. Tijdens een cursus krijgen gebruikers concrete handreikingen waarmee ze direct aan de slag kunnen in de praktijk.";
    var dataTabCourse = [{ idtab: "btnInfoAll", value: "Online cursussen", idsection: "infoAll", info: infoAllCourses },
    { idtab: "btnInfoCourse", value: "Lees meer", idsection: "infoCourse", info: "" }];

    function coursesTab() {
        d3.select("#coursesTab").append("menu")
            .classed("tab", true);

        d3.select("#coursesTab menu")
            .selectAll(".tablink")
            .data(dataTabCourse)
            .enter()
                .append("input")
                .property("type", "button")
                .property("value", function (d) {
                    return d.value;
                })
                .classed("tablink", true)
                .attr("id", function (d) {
                    return d.idtab;
                })
                .on("click", function (d) {
                    d3.selectAll(".tabcontent")
                        .style("display", "none");

                    d3.selectAll(".tablink")
                        .classed("active", false);

                    d3.select("#" + d.idsection)
                        .style("display", "block");

                    d3.select("#" + d.idtab)
                        .classed("active", true);
            });

        d3.select("#coursesTab").selectAll(".tabcontent")
            .data(dataTabCourse)
            .enter()
                .append("section")
                .property("value", function (d) {
                    return d.value;
                })
                .classed("centerlmnt", true)
                .classed("tabcontent", true)
                .attr("id", function (d) {
                    return d.idsection;
            })
            .text(function (d) {
                return d.info;
            });

        d3.select("#" + dataTabCourse[0].idtab)
            .classed("active", true);

        d3.select("#" + dataTabCourse[0].idsection)
            .style("display", "block");

        d3.select("#" + dataTabCourse[1].idtab)
            .style("display", "none");
    }
    coursesTab();

    function readMoreCourse(data) {
        d3.select("#" + dataTabCourse[0].idtab)
            .classed("active", false);

        d3.select("#" + dataTabCourse[0].idsection)
            .style("display", "none");

        d3.select("#" + dataTabCourse[1].idtab)
            .style("display", "block")
            .classed("active", true)
            .property("value", data.name);

        d3.select("#" + dataTabCourse[1].idsection)
            .style("display", "block")
            .text(data.description);
    }

    return {
        buildCourseBoxes: function (data) {
            let courseboxes = d3.select("#onlinecourses").selectAll(".coursebox").data(data)
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
                .property("value", "Lees meer")
                .on("click", function (data) {
                    readMoreCourse(data);
                });

            courseboxes
                .append("input")
                .classed("coursebtn", true)
                .property("type", "button")
                .property("value", "Volg cursus")
                .on("click", function (d) {
                    localStorage.setItem("idcourse", JSON.stringify(d.id));
                    window.location.href = "slide.html";
                }); 
        }
    }
})(CoursesViewSender);