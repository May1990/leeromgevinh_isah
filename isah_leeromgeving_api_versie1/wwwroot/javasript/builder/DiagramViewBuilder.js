let DiagramsViewBuilder = (function(){
    let iddiagram = JSON.parse(localStorage.getItem("iddiagram"));

    function buildTableDiagrams(data) {
        console.log(data);
        let table = d3.select('#alldiagrams').append('table');
        let thead = table.append('thead');
        let tbody = table.append('tbody');
        let columns = [{ column: "id", diavariable: "id", class: "txt"}, { column: "Naam", diavariable: "name", class: "txt"}];

        thead.append('tr')
            .selectAll('th')
            .data(columns).enter()
            .append('th')
            .text(function (d) {
                return d.column;
            });

        let rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .on("click", function (d) {
                localStorage.setItem("iddiagram",JSON.stringify(d.id));
                window.location.href = "diagram.html";
            });

        var cells = rows.selectAll('td')
            .data(function (row) {
                return columns.map(function (d) {
                    return { column: d.column, value: row[d.diavariable] };
                });
            })
            .enter()
            .append('td')
            .text(function (d) {
                return d.value;
            });
    }

    function buildDiagram(data) {
        console.log(data);
        let lastidrec = 0;
        for (var i = 0; i < data.rectangles.length; i++) {
            let rectangle = data.rectangles[i];
            let g = createG(rectangle.rectanglecode, rectangle.x, rectangle.y, rectangle.width, rectangle.height, "rectangle");
            createRectangle(g, rectangle.fill, 4, rectangle.text)
            let rectid = Number(rectangle.rectanglecode.match(/\d+/)[0]);
            if (rectid > lastidrec) {
                lastidrec = rectid;
            }
        }

        let lastidtxt = 0;
        for (var i = 0; i < data.texts.length; i++) {
            let text = data.texts[i];
            let g = createG(text.textcode, text.x, text.y, text.width, text.height, "text");
            createText(g, text.textOfText);
            let txtid = Number(text.textcode.match(/\d+/)[0]);
            if (txtid > lastidtxt) {
                lastidtxt = txtid;
            }
        }

        let firstid = "dot_";
        let scndid = 1;

        let lastidpath = 0;
        for (var i = 0; i < data.paths.length; i++) {
            let pathdata = data.paths[i];
            let positions = pathdata.positions;
            let path = createPath(positions[0].x, positions[0].y, pathdata.pathcode, firstid + scndid);
            addLineDot(positions[0].x, positions[0].y, pathdata.pathcode, 1, firstid + scndid);

            for (var dx = 1; dx < positions.length; dx++) {
                scndid++
                addLinePoint(path, dx, positions[dx].x, positions[dx].y, firstid + scndid);
                addLineDot(positions[dx].x, positions[dx].y, pathdata.pathcode, dx, firstid + scndid); 
            }

            let pathid = Number(pathdata.pathcode.match(/\d+/)[0]);
            if (pathid > lastidpath) {
                lastidpath = pathid;
            }

            let newdata = path.data()[0];
            newdata.strokedasharray = JSON.parse(pathdata.dashed);
            newdata.arrowheadstart = JSON.parse(pathdata.startarrow);
            newdata.arrowheadend = JSON.parse(pathdata.endarrow);
            path.data(newdata);
            path
                .style("stroke-dasharray", function (d) {
                    console.log(d);
                    if (d.strokedasharray == true) {
                        return ("3, 3");
                    } else {
                        return "none";
                    }
                })
                .attr("marker-start", function (d) {
                    if (d.arrowheadstart == true) {
                        return "url(#arrowstart)";
                    } else {
                        return "";
                    }
                })
                .attr("marker-end", function (d) {
                    if (d.arrowheadend == true) {
                        return "url(#arrowend)";
                    } else {
                        return "";
                    }
                });

            localStorage.setItem("lastidrect", JSON.stringify(lastidrec));
            localStorage.setItem("lastidtxt", JSON.stringify(lastidtxt));
            localStorage.setItem("lastidpath", JSON.stringify(lastidpath));
            localStorage.setItem("lastiddot", JSON.stringify(scndid));
        }
    }

    return {
        iddiagram: iddiagram,
        buildTableDiagrams: buildTableDiagrams,
        buildDiagram: buildDiagram
    }
})();