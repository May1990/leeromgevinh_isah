
var selectedNode = null;
var selectedFunction = null;
var recstrokewidth = 4;
var halfstroke = recstrokewidth / 2;
var pathstrokewidth = 4;
var drawingpad = d3.select("#diagram")
    .append("svg")
    .attr("width", 856)
    .attr("height", 382);

// jo

// function for resetting and disabling shape attributescontrolers, no shape and function selected
function resetshapeattr() {
    d3.selectAll("#shapevariables input").property("disabled", true);
    d3.selectAll("#shapevariables textarea").property("disabled", true);

    updatevalX(halfstroke);
    updatevalY(halfstroke);
    updatevalHeight(halfstroke);
    updatevalWidth(halfstroke);
}

// fucntion for switching drawfunction 
function changeFunction() {
    resetFunctionBefore();
    selectedFunction = d3.select(this).classed("selectfunct", true);
    resetAttrFunction(selectedFunction.property("dataset").drawlmnt);
}

// function for resetting and selecting shape attributescontrolers appropriate to selected function
function resetAttrFunction(shape) {
    d3.selectAll("." + shape).classed("hidden", false);

    updatevalX(halfstroke);
    updatevalY(halfstroke);
    updatevalHeight(0);
    updatevalWidth(0);

    // set text of btn appropriate to shape 
    var rmvShapeBtn = d3.select("#shaperemove");
    var value = rmvShapeBtn.property("dataset")[shape];
    rmvShapeBtn.property("value", value);

    selectedNode = null;
}

// ??
function enablerecattr(selectedShape) {
    d3.selectAll("." + selectedShape)
        .property("disabled", false)
        .classed("hidden", false);

    d3.selectAll("." + selectedShape + " input, ." + selectedShape + " textarea")
        .property("disabled", false);
}

// ??
function selectShapeArrts(selectedShape) {
    resetFunctionBefore();
    selectedFunction = d3.select("#diagram [data-drawlmnt=" + selectedShape + "]").classed("selectfunct", true);
    enablerecattr(selectedShape);
}

// function to change de color from the selected rectangle
function changeColorFill() {
    var data = drawingpad.select("#" + selectedNode).data()[0];
    data.fill = d3.select(this).style("background-color");

    drawingpad.select("#" + selectedNode + " rect")
        .style("fill", function (d) {
            return d.fill;
        });
}

// function to change the start en the end from a path too arrowhead or no arrowhead
function changePathArrow() {
    var lmnt = d3.select(this);
    var value = lmnt.property("value");
    var path = drawingpad.select("#" + selectedNode);
    var data = path.data()[0];

    if (value == "no_A_and_B") {
        // geen van kanten een pijl
        data.arrowheadstart = false;
        data.arrowheadend = false;
    } else if (value == "A_and_B") {
        // beide pijlen
        data.arrowheadstart = true;
        data.arrowheadend = true;
    } else if (value == "A_to_B") {
        // eind pijl
        data.arrowheadstart = false;
        data.arrowheadend = true;
    } else if (value == "B_to_A") {
        // start pijl
        data.arrowheadstart = true;
        data.arrowheadend = false;
    }

    path.data(data);

    path
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

    if (lmnt.property("type") == "image") {
        d3.selectAll("#radioArrTypes [type=radio][value=" + this.value + "]").property("checked", true);
    }
}

d3.selectAll("#radioArrTypes [type=radio]").on("change", changePathArrow);
d3.selectAll("#radioArrTypes [type=image]").on("click", changePathArrow);

// function to remove the selected shape
function removeShape() {
    var selectlmnt = drawingpad.select("#" + selectedNode);

    if (selectedNode.indexOf("line") !== -1) {
        drawingpad.selectAll("." + selectlmnt.attr("id")).remove();
    }

    selectlmnt.remove();

    resetshapeattr();
}

var fillcolors = [{ fill: "lightblue" }, { fill: "yellow" }, { fill: "pink" }, { fill: "lightgrey" }, { fill: "lightgreen" }, { fill: "white" }, { fill: "SeaShell" }, { fill: "Wheat" }];

d3.select("#recfill").selectAll("input")
    .data(fillcolors)
    .enter()
    .append("input")
    .attr("height", "20px")
    .style("background-color", function (d) {
        return d.fill;
    })
    .property("type", "button")
    .on("click", changeColorFill);

d3.select("#shaperemove").on("click", removeShape);

d3.select("#dashedline").on("change", function () {
    var path = drawingpad.select("#" + selectedNode);
    var data = path.data()[0];
    if (d3.select(this).property("checked") == true) {
        data.strokedasharray = true;
    } else {
        data.strokedasharray = false;
    }
    path.data(data);
    path
        .style("stroke-dasharray", function (d) {
            if (d.strokedasharray == true) {
                return ("3, 3");
            } else {
                return "none";
            }
        });
});

selectedFunction = d3.select("#btnrectangle").classed("selectfunct", true);
resetAttrFunction(selectedFunction.property("dataset").drawlmnt);

d3.selectAll(".drawlmnt").on("click", changeFunction);

refreshArrwtyps(null, null);

resetshapeattr();

// add markers to give path arrowheads later
drawingpad.append("defs").append("marker")
    .attr("id", "arrowend")
    .attr("viewBox", "0 -5 10 10")
    .attr('refX', 5)
    .attr('refY', 0)
    .attr("markerWidth", 4)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("class", "arrowHead");

drawingpad.append("defs").append("marker")
    .attr("id", "arrowstart")
    .attr("viewBox", "0 -5 10 10")
    .attr('refX', 5)
    .attr('refY', 0)
    .attr("markerWidth", 4)
    .attr("markerHeight", 4)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("class", "arrowHead");


// jo


function refreshArrwtyps(pointA, pointB) {
    var arrwtypslmnt = d3.selectAll("#radioArrTypes input").classed("hidden", true);

    var starttext = "[name=";
    var endtext = "]";
    var arrwtypsRadios = null;
    if (pointA != null && pointB != null) {
        arrwtypsRadios = d3.selectAll("#radioArrTypes input" + starttext + "arrwtyps" + endtext);
    } else if (pointA == null && pointB != null) {
        arrwtypsRadios = d3.selectAll("#radioArrTypes input" + starttext + "arrwtyps_freeA" + endtext);
    } else if (pointA != null && pointB == null) {
        arrwtypsRadios = d3.selectAll("#radioArrTypes input" + starttext + "arrwtyps_freeB" + endtext);
    } else {
        arrwtypsRadios = d3.selectAll("#radioArrTypes input" + starttext + "arrwtyps_freeAB" + endtext);
    }

    arrwtypsRadios.classed("hidden", false);
}

function resetFunctionBefore() {
    var attrLmnts = null;
    if (selectedFunction != null) {
        var drawlmnt = selectedFunction.property("dataset").drawlmnt;
        attrLmnts = d3.selectAll("." + drawlmnt);
        attrLmnts.selectAll("input").property("disabled", true);
        attrLmnts.selectAll("textArea").property("disabled", true);
        attrLmnts.classed("hidden", true);
        selectedFunction.classed("selectfunct", false);
    }
}

// read a change in text input
d3.select("#texttxt").on("input", function () {
    updateShapeText(this.value);
});

// read a change in text input
d3.select("#rectext").on("input", function () {
    updateShapeText(this.value);
});

// read a change in the x input
d3.select("#recx").on("input", function () {
    updatevalX(+this.value);

    var widthsvg = drawingpad.attr("width");
    updatemaxW(widthsvg, halfstroke, this.value);

    var selectedShape = d3.select("#" + selectedNode);

    var data = selectedShape.data()[0];
    data.x = Number(this.value);
    selectedShape.data(data);

    refreshrecXY(selectedShape);
});

// read a change in the y input
d3.select("#recy").on("input", function () {
    updatevalY(+this.value);

    var heightsvg = drawingpad.attr("height");
    updatemaxH(heightsvg, halfstroke, this.value);

    var selectedShape = d3.select("#" + selectedNode);
    var data = selectedShape.data()[0];
    data.y = Number(this.value);
    selectedShape.data(data);

    refreshrecXY(selectedShape);
});

// read a change in the height input
d3.select("#recheight").on("input", function () {
    updatevalHeight(+this.value);

    var selectedShape = d3.select("#" + selectedNode);
    var data = selectedShape.data()[0];
    data.height = Number(this.value);
    selectedShape.data(data);

    var heightsvg = drawingpad.attr("height");
    updatemaxY(data.height, heightsvg, halfstroke);

    refreshrecHW(selectedShape);
});

// read a change in the width input
d3.select("#recwidth").on("input", function () {
    updatevalWidth(+this.value);

    var selectedShape = d3.select("#" + selectedNode);
    var data = selectedShape.data()[0];
    data.width = Number(this.value);
    selectedShape.data(data);

    var widthsvg = drawingpad.attr("width");
    updatemaxY(data.width, widthsvg, halfstroke);

    refreshrecHW(selectedShape);
});

d3.select("#textstroke").on("input", function () {
    var selectedShape = d3.select("#" + selectedNode);

    var data = selectedShape.data()[0];
    if (this.checked == true) {
        data.borderwidth = 2;
    } else {
        data.borderwidth = 0;
    }
    selectedShape.data(data);
    refreshTextStroke(selectedShape);
});

function updatevalX(xvalue) {
    d3.select("#recx-value").text(xvalue);
    d3.select("#recx").property("value", xvalue);
}

function updatevalY(yvalue) {
    d3.select("#recy-value").text(yvalue);
    d3.select("#recy").property("value", yvalue);
}

function updateminmaxXY(gstroke, gwidth, gheight) {
    var halfstroke = gstroke / 2;
    var heightsvg = drawingpad.attr("height");
    var widthsvg = drawingpad.attr("width");

    updatemaxX(gwidth, widthsvg, halfstroke);
    updatemaxY(gheight, heightsvg, halfstroke);
}

function updatemaxX(gwidth, widthsvg, halfstroke) {
    d3.select("#recx").property("max", widthsvg - (gwidth + halfstroke));
}

function updatemaxY(gheight, heightsvg, halfstroke) {
    d3.select("#recy").property("max", heightsvg - (gheight + halfstroke));
}

function refreshrecXY(shapeselect) {
    shapeselect
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        });
}

// Update the height attributes
function updatevalHeight(nHeight) {
    // adjust the text on the range slider
    d3.select("#recheight-value").text(nHeight);
    d3.select("#recheight").property("value", nHeight);
}

// Update the width attributes
function updatevalWidth(nWidth) {
    // adjust the text on the range slider
    d3.select("#recwidth-value").text(nWidth);
    d3.select("#recwidth").property("value", nWidth);
}

function updateminmaxHW(gstroke, yvalue, xvalue) {
    var halfstroke = gstroke / 2;
    var heightsvg = drawingpad.attr("height");
    var widthsvg = drawingpad.attr("width");

    updatemaxH(heightsvg, halfstroke, yvalue);
    updatemaxW(widthsvg, halfstroke, xvalue);
}

function updatemaxH(heightsvg, halfstroke, yvalue) {
    d3.select("#recheight").property("max", heightsvg - yvalue - halfstroke);
}

function updatemaxW(widthsvg, halfstroke, xvalue) {
    d3.select("#recwidth").property("max", widthsvg - xvalue - halfstroke);
}

function refreshrecHW(shapeselect) {
    var rect = shapeselect.select("rect")
        .attr("height", function (d) {
            return d.height;
        })
        .attr("width", function (d) {
            return d.width;
        });

    var fobject = shapeselect.select("foreignObject");

    if (rect.empty() == false) {
        fobject
            .style("line-height", function (d) {
                return d.height + "px";
            });
    }

    fobject
        .attr("height", function (d) {
            return d.height;
        })
        .attr("width", function (d) {
            return d.width;
        });
}

function updateShapeText(text) {
    var g = drawingpad.select("#" + selectedNode);
    var data = g.data()[0];
    data.textfill = text;
    g.data(data);

    drawingpad.select("#" + selectedNode + " " + "foreignObject" + " " + "p")
        .html(function (d) {
            return d.textfill;
        });
}

function refreshTextStroke(shapeselect) {
    shapeselect.select("foreignObject")
        .style("border-width", function (d) {
            return d.borderwidth;
        })
        .style("border-color", function (d) {
            return d.bordercolor;
        })
        .style("border-style", function (d) {
            return d.borderstyle;
        });
}

function updateXYHW(gselect) {
    updatevalX(Number(gselect.attr("x")));
    updatevalY(Number(gselect.attr("y")));

    var fobject = gselect.select("foreignObject");
    updatevalHeight(Number(fobject.attr("height")));
    updatevalWidth(Number(fobject.attr("width")));

    updateminmaxXY(recstrokewidth, Number(fobject.attr("width")), Number(fobject.attr("height")));
    updateminmaxHW(recstrokewidth, Number(gselect.attr("y")), Number(gselect.attr("x")));
}

function calculateDifferences(gselect) {
    var fobject = gselect.select("foreignObject");
    var mouseposition = d3.mouse(drawingpad.node());
    var mouseX = Math.round(mouseposition[0]);
    var mouseY = Math.round(mouseposition[1]);

    var difXleft = mouseX - gselect.attr("x");
    var difYleft = mouseY - gselect.attr("y");

    return {
        beginposX: mouseX,
        beginposY: mouseY,
        difXleft: difXleft,
        difYleft: difYleft,
        difXright: (Number(fobject.attr("width")) + halfstroke) - difXleft,
        difYright: (Number(fobject.attr("height")) + halfstroke) - difYleft
    };
}