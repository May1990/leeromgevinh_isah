function drawingShapes() {
    var selectedLine = null; // hier
    var selectedShape = null;
    var countlinepoints = 0;

    var frstpidrec = "rec_";
    var scndpidrec = 0;
    var frstpidline = "line_";
    var scndpidline = 0;
    var frstpiddot = "dot_";
    var scndpiddot = 0;
    var frstpidtext = "text_";
    var scndpidtext = 0;

    let lastidrect = Number(localStorage.getItem("lastidrect"));
    let lastidtxt = Number(localStorage.getItem("lastidtxt"));
    let lastidpath = Number(localStorage.getItem("lastidpath"));
    let lastiddot = Number(localStorage.getItem("lastiddot"));

    if (lastidrect != 0) {
        scndpidrec = lastidrect;
        localStorage.setItem("lastidrect", JSON.stringify(0));
    }

    if (lastidtxt != 0) {
        scndpidtext = lastidtxt;
        localStorage.setItem("lastidtxt", JSON.stringify(0));
    }

    if (lastidpath != 0) {
        scndpidline = lastidpath;
        localStorage.setItem("lastidpath", JSON.stringify(0));
    }

    if (lastiddot != 0) {
        scndpiddot = lastiddot;
        localStorage.setItem("lastiddot", JSON.stringify(0));
    }

    var startXYinfo = null;

    drawingpad.call(
        d3.drag()
            .on("start", function () {
                var mouseposition = d3.mouse(drawingpad.node());
                var mouseX = Math.round(mouseposition[0]);
                var mouseY = Math.round(mouseposition[1]);

                drawingpad.select("#" + selectedNode)
                    .classed("selected", false);

                selectedShape = selectedFunction.property("dataset").drawlmnt;
                var g = null;
                enablerecattr(selectedShape);

                if (selectedShape == "rect") {
                    scndpidrec++;
                    selectedNode = frstpidrec + scndpidrec;

                    g = createG(selectedNode, mouseX, mouseY, 7, 7);
                    createRectangle(g, "yellow", recstrokewidth, "");

                    startXYinfo = calculateDifferences(g);
                    d3.select("#rectext").property("value", "");
                } else if (selectedShape == "text") {
                    scndpidtext++;
                    selectedNode = frstpidtext + scndpidtext;

                    g = createG(selectedNode, mouseX, mouseY, 7, 7);
                    createText(g, "");

                    var data = g.data()[0];
                    data.borderwidth = 2;
                    data.bordercolor = "grey";
                    data.borderstyle = "dotted";
                    g.data(data);

                    refreshTextStroke(g);

                    startXYinfo = calculateDifferences(g);
                    d3.select("#texttxt").property("value", "");
                    d3.select("#textstroke").property("checked", true);
                } else if (selectedShape == "line") {
                    scndpiddot++;

                    if (countlinepoints == 0) {
                        scndpidline++;
                        selectedNode = frstpidline + scndpidline;
                        selectedLine = createPath(mouseX, mouseY, selectedNode, frstpiddot + scndpiddot);
                        addLineDot(mouseX, mouseY, selectedNode, countlinepoints, frstpiddot + scndpiddot);
                    } else {
                        addLinePoint(selectedLine, countlinepoints, mouseX, mouseY, frstpiddot + scndpiddot);
                        addLineDot(mouseX, mouseY, selectedNode, countlinepoints, frstpiddot + scndpiddot);
                    }

                    countlinepoints++;
                }
            })
            .on("drag", function () {
                if (selectedShape == "line") {
                    return;
                }

                var mouseposition = d3.mouse(drawingpad.node());
                var mouseX = Math.round(mouseposition[0]);
                var mouseY = Math.round(mouseposition[1]);
                var widthsvg = drawingpad.attr("width");
                var heightsvg = drawingpad.attr("height");

                if (selectedShape == "rect" || selectedShape == "text") {
                    var g = d3.select("#" + selectedNode)
                        .classed("active", true)
                        .classed("selected", true);

                    var data = g.data()[0];

                    if (mouseX > startXYinfo.beginposX && widthsvg >= mouseX) {
                        data.x = startXYinfo.beginposX;
                        data.width = mouseX - startXYinfo.beginposX;
                    } else if (mouseX <= startXYinfo.beginposX && 0 <= startXYinfo.beginposX) {
                        data.x = mouseX;
                        data.width = startXYinfo.beginposX - mouseX;
                    }

                    if (mouseY > startXYinfo.beginposY && heightsvg >= mouseY) {
                        data.y = startXYinfo.beginposY;
                        data.height = mouseY - startXYinfo.beginposY;
                    } else if (mouseY <= startXYinfo.beginposY && 0 <= mouseY) {
                        data.y = mouseY;
                        data.height = startXYinfo.beginposY - mouseY;
                    }

                    g.data(data);

                    updateXYHW(g);
                    refreshrecHW(g);
                    refreshrecXY(g);
                }
            })
            .on("end", function () {
                if (selectedShape == "line") {
                    return;
                }

                d3.select("#" + selectedNode).classed("active", false);
                startXYinfo = null;
            })
    )
        // the mousedown and mousemove are used to draw a line
        // it is important to realize that idmouseover is set from the mouseover en mouseout of the shape itself
        .on("mousedown", function () {
            // d3.event.button === 0 --> left mousebuttom
            // d3.event.button === 1 --> scroll mousebuttom
            // d3.event.button === 2 --> right mousebuttom
            var pressedbtn = d3.event.button;

            //two is rightbuttom
            if (pressedbtn === 2 && selectedLine != null) {
                var mouseposition = d3.mouse(this);
                var mouseX = Math.round(mouseposition[0]);
                var mouseY = Math.round(mouseposition[1]);

                scndpiddot++;
                addLinePoint(selectedLine, countlinepoints, mouseX, mouseY, frstpiddot + scndpiddot);
                addLineDot(mouseX, mouseY, selectedNode, countlinepoints, frstpiddot + scndpiddot);
                countlinepoints = 0;
                selectedLine = null;
            }
        })
        //pakt hij op wanneer hij op de svg is
        .on("mousemove", function () {
            if (selectedLine != null) {
                var mouseposition = d3.mouse(this);
                var mouseX = Math.round(mouseposition[0]);
                var mouseY = Math.round(mouseposition[1]);

                addLinePoint(selectedLine, countlinepoints, mouseX, mouseY, frstpiddot + scndpiddot);
            }
        })
        .on("mouseout", function () {
            if (selectedLine != null) {
                var mouseposition = d3.mouse(this);
                var mouseX = Math.round(mouseposition[0]);
                var mouseY = Math.round(mouseposition[1]);
                var widthsvg = drawingpad.attr("width");
                var heightsvg = drawingpad.attr("height");
                var posX = null;
                var posY = null;

                if (mouseX > widthsvg || mouseX < 0 || mouseY > heightsvg || mouseY < 0) {
                    if (mouseX > widthsvg) {
                        posX = widthsvg;
                        console.log("A");
                    } else if (mouseX < 0) {
                        posX = 0;
                    } else {
                        posX = mouseX;
                    }

                    if (mouseY > heightsvg) {
                        posY = heightsvg;
                    } else if (mouseY < 0) {
                        posY = 0;
                    } else {
                        posY = mouseY;
                    }

                    scndpiddot++;
                    var dotid = frstpiddot + scndpiddot;
                    addLinePoint(selectedLine, countlinepoints, posX, posY, dotid);
                    addLineDot(posX, posY, selectedNode, countlinepoints, dotid);
                    countlinepoints = 0;
                    selectedLine = null;
                }
            }
        })
        .on("contextmenu", function (d, i) {
            d3.event.preventDefault();
        });
}

drawingShapes();

function createG(id, x, y, widthrec, heightrec, shape) {
    var startXYinfo = null;

    return g = drawingpad
        .append("g")
        .data([{ id: id, x: x, y: y, width: widthrec, height: heightrec }]) //, strokedasharray: false
        .attr("id", id)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .on("mouseover", function (d) {
            idmouseover = d.id;
        })
        .on("mouseout", function (d) {
            idmouseover = null;
        })
        .call(
            d3.drag()
                .on("start", function (d) {
                    if (selectedNode != null) {
                        drawingpad.select("#" + selectedNode)
                            .classed("selected", false);
                    }

                    selectedNode = d.id;

                    var g = d3.select(this)
                        .classed("active", true)
                        .classed("selected", true);

                    selectShapeArrts("rect");
                    d3.select("#rectext").property("value", g.select("foreignObject p").text());
                    updateXYHW(g);
                    startXYinfo = calculateDifferences(g);
                })
                .on("drag", function (d) {
                    dragG(d3.select(this), startXYinfo);
                })
                .on("end", function (d) {
                    endG(d3.select(this));
                }
                ));
}

function dragG(gselect, startXYinfo) {
    var mouseposition = d3.mouse(drawingpad.node());
    var mouseX = Math.round(mouseposition[0]);
    var mouseY = Math.round(mouseposition[1]);
    var widthsvg = drawingpad.attr("width");
    var heightsvg = drawingpad.attr("height");

    var data = gselect.data()[0];
    var datascnd = Object.assign({}, data);

    if (widthsvg > mouseX + startXYinfo.difXright && 0 < (mouseX - startXYinfo.difXleft)) {
        data.x = mouseX - startXYinfo.difXleft;
    } else if (mouseX <= startXYinfo.difXleft) {
        data.x = halfstroke;
    } else if (mouseX >= startXYinfo.difXright) {
        data.x = widthsvg - (data.width + halfstroke);
    }

    if (heightsvg > mouseY + startXYinfo.difYright && 0 < (mouseY - startXYinfo.difYleft)) {
        data.y = mouseY - startXYinfo.difYleft;
    } else if (mouseY <= startXYinfo.difYleft) {
        data.y = halfstroke;
    } else if (mouseY >= startXYinfo.difYright) {
        data.y = heightsvg - (data.height + halfstroke);
    }

    if (data != datascnd) {
        updatevalX(data.x);
        updatemaxW(widthsvg, halfstroke, data.x);
        updatevalY(data.y);
        updatemaxH(heightsvg, halfstroke, data.y);

        gselect.data(data);
        refreshrecXY(gselect);
    }
}

function endG(gselect) {
    gselect.classed("active", false);
    var widthsvg = drawingpad.attr("width");
    var heightsvg = drawingpad.attr("height");

    var mouseposition = d3.mouse(drawingpad.node());
    var mouseX = Math.round(mouseposition[0]);
    var mouseY = Math.round(mouseposition[1]);
    //var halfstroke = (recstrokewidth/2);

    var data = gselect.data()[0];
    var datascnd = Object.assign({}, data);

    if (mouseX < halfstroke) {
        data.x = halfstroke;
        updatevalX(data.x);
        updatemaxW(widthsvg, halfstroke, data.x);
    } else if (mouseX > (widthsvg - halfstroke)) {
        data.x = widthsvg - (data.width + halfstroke);
        updatevalX(data.x);
        updatemaxW(widthsvg, halfstroke, data.x);
    }

    if (mouseY < halfstroke) {
        data.y = halfstroke;
        updatevalY(data.y);
        updatemaxH(heightsvg, halfstroke, data.y);
    } else if (mouseY > (heightsvg - halfstroke)) {
        data.y = heightsvg - (data.height + halfstroke);
        updatevalY(data.y);
        updatemaxH(heightsvg, halfstroke, data.y);
    }

    if (data != datascnd) {
        gselect.data(data);
        refreshrecXY(gselect);
    }
}

function createRectangle(gselect, fill, strokewidth, textfill) {
    //var data = gselect.g.data()[0];
    var data = gselect.data()[0];
    data.fill = fill;
    data.strokewidth = strokewidth;

    gselect.data(data);

    var rect = gselect.append("rect")
        .style("fill", function (d) {
            return d.fill;
        })
        .style("stroke-width", function (d) {
            return d.strokewidth;
        })
        .attr("width", function (d) {
            return d.width;
        })
        .attr("height", function (d) {
            return d.height;
        })
        .attr("x", 0)
        .attr("y", 0);

    createText(gselect, textfill);

    var fobject = gselect.select("foreignObject")
        .style("line-height", function (d) {
            return d.height + "px";
        })
        .style("text-align", "center");

    fobject.select("p")
        .style("line-height", "1.5")
        .style("display", "inline-block")
        .style("vertical-align", "middle");
}

function createText(gselect, textfill) {
    var data = gselect.data()[0];
    data.textfill = textfill;
    gselect.data(data);

    var fobject = gselect.append("foreignObject")
        .style("fill", "none")
        .attr("width", function (d) {
            return d.width;
        })
        .attr("height", function (d) {
            return d.height;
        })
        .attr("x", 0)
        .attr("y", 0)
        .style("overflow", "hidden");

    fobject
        .append("xhtml:p")
        .html(function (d) {
            return d.textfill;
        })
        .style("overflow", "hidden")
        .style("font", "14px 'Calibri'")
        .style("margin", "5px 3px");
}

var line = d3.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; });

function createPath(startX, startY, id, dotid) {
    var data = [{
        points: [
            { x: startX, y: startY, id: dotid }
        ], strokedasharray: false, arrowheadstart: false, arrowheadend: false
    }];

    var path = drawingpad.append('path')
        .data(data)
        .attr('d', line(data[0].points))
        .attr('id', id)
        .attr('pointer-events', 'visibleStroke')
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", pathstrokewidth)
        .style("stroke-dasharray", function (d) {
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
        })
        .on("mousemove", function (d, i, a) {
            idmouseover = d.id;
        })
        .on("mouseout", function (d) {
            idmouseover = null;
        })
        .on("mousedown", function (d) {
            idmouseover = d.id;
        });

    return path;
}

function addPointOnLine() {

    // points van het path
    //naar links en naar rechts gaan tot hij er een tegen komt
}

function addLinePoint(selectpath, index, nextX, nextY, dotid) {
    var data = selectpath.data()[0];
    data.points[index] = { x: nextX, y: nextY, id: dotid };

    selectpath.data(data);
    selectpath.attr("d", line(data.points));
}

function addLineDot(x, y, lineid, countlinepoints, dotid) {
    var data = [{ x: x, y: y, lineid: lineid, nr: countlinepoints, dotid: dotid }];
    var dot = drawingpad.append("circle")
        .data(data)
        .classed(lineid, true)
        .attr("id", dotid)
        .attr("r", 5.5)
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .style("fill", "lightgrey")
        .style("opacity", "0.5")
        .on("mouseover", function (d) {
            this.style.opacity = 1;
            //idmouseover = d.id;
        })
        .on("mouseout", function (d) {
            this.style.opacity = 0.5;
            //idmouseover = null;
        })
        .on("mousedown", function (d) {
            // d3.event.button === 0 --> left mousebuttom
            // d3.event.button === 1 --> scroll mousebuttom
            // d3.event.button === 2 --> right mousebuttom
            var pressedbtn = d3.event.button;
            //two is rightbuttom
            if (pressedbtn == 2) {
                removeLinePoint(d);
            } else if (pressedbtn == 0) {
                selectedNode = d.lineid;
                //line attr refresh
                selectShapeArrts("line");
            }
        });

    dot.call(
        d3.drag()
            .on('drag', function (d) {
                var mouseposition = d3.mouse(this);
                var mouseX = Math.round(mouseposition[0]);
                var mouseY = Math.round(mouseposition[1]);

                moveLinePoint(mouseX, mouseY, d)
            })
    );
}

function moveLinePoint(x, y, data) {
    var selectpath = drawingpad.select("#" + data.lineid);
    selectedline = selectpath;
    var linedata = selectpath.data();
    var points = linedata[0].points;

    for (var index = 0; index < points.length; ++index) {
        if (points[index].id == data.dotid) {
            linedata[0].points[index].x = x;
            linedata[0].points[index].y = y;
            selectpath.data(linedata);
            selectpath.attr("d", line(linedata[0].points));
            data.x = x;
            data.y = y;
            var dot = drawingpad.select("#" + data.dotid).data([data])
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
            return;
        }
    }
}

function removeLinePoint(data) {
    var selectpath = drawingpad.select("#" + data.lineid);
    var linedata = selectpath.data();
    var points = linedata[0].points;

    console.log(data);
    for (var index = 0; index < points.length; ++index) {
        if (points[index].id == data.dotid) {
            linedata[0].points.splice(index, 1);
            selectpath.data(linedata);
            selectpath.attr("d", line(linedata[0].points));
            drawingpad.select("#" + data.dotid).remove();
            return;
        }
    }
}