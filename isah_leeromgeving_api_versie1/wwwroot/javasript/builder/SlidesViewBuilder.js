let SlideViewBuilder = (function () {//viewSender
    let idcourse = JSON.parse(localStorage.getItem("idcourse"));
    let namecourse = JSON.parse(localStorage.getItem("namecourse"));
    let indexslide = JSON.parse(localStorage.getItem("indexslide"));
    let lastIndex = null;

    function setLastIndex(index){
        lastIndex = index;
    }

    function buildSlide(data) {
        console.log(data);
        let width = "960px";
        let height = "540px";

        let slidelmnt = d3.select("#slide")
            .append("section")
            .style("margin", "auto")
            .style("display", "block")
            .style("width", width);

        slidelmnt
            .append("h1")
            .text(namecourse);

        slidelmnt
            .append("h2")
            .text(data.function.name);

        let videolmnt = slidelmnt
            .append("iframe")
            .attr("src", data.videoURL)
            .attr("frameborder", "0")
            .attr("allowfullscreen", "")
            .attr("width", width)
            .attr("height", height);

        if (data.videoURL.indexOf("vimeo") !== -1) {
            videolmnt
                .attr("webkitallowfullscreen", "")
                .attr("mozallowfullscreen", "");
        } else {
            videolmnt
                .attr("allow", "autoplay; encrypted-media");
        }

        let navindex = slidelmnt
            .append("section")
            .style("margin", "auto")
            .style("display", "block")
            .style("width", "240px");

        let widthnavindex = 0;
        let widthbtnnav = 120;

        if (indexslide > 1) {
            widthnavindex += widthbtnnav;
            navindex
                .append("input")
                .style("width", widthbtnnav +"px")
                .property("type", "button")
                .property("value", "vorige")
                .style("font-size", "14pt")
                .on("click", function () {
                    indexslide--;
                    localStorage.setItem("indexslide", JSON.stringify(indexslide));
                    window.location.href = "slide.html";
                });
        } 
        
        if (lastIndex > indexslide) {
            widthnavindex += widthbtnnav;
            navindex
                .append("input")
                .style("width", widthbtnnav + "px")
                .property("type", "button")
                .property("value", "volgende")
                .style("font-size", "14pt")
                .on("click", function () {
                    indexslide++;
                    localStorage.setItem("indexslide", JSON.stringify(indexslide));
                    window.location.href = "slide.html";
                });
        }

        navindex.style("width", widthnavindex + "px");
        
        if (data.questions.length > 0) {
            var questionlmnt = slidelmnt.append("section")
                .selectAll("section")
                .data(data.questions)
                .enter()
                .append("section")
                .attr("id", function (d) {
                    return "question_" + d.id;
                })
                .text(function (d) {
                    return d.questiontext;
                });

            for (let index = 0; index < data.questions.length; index++) {
                let question = document.getElementById("question_" + data.questions[index].id);
                for (let dx = 0; dx < data.questions[index].choices.length; dx++) {
                    let answer = data.questions[index].choices[dx].answer;
                    let brlmnt = document.createElement("br");
                    question.appendChild(brlmnt);

                    d3.select("#question_" + data.questions[index].id)
                        .data([data.questions[index].choices[dx]])
                        .append("input")
                        .property("type", "radio")
                        .attr("id", function (d) {
                            return "choice_" + d.id;
                        })
                        .attr("name", function (d) {
                            return "question_" + d.idquestion;
                        })
                        .property("value", answer);

                    let newContent = document.createElement("div");
                    newContent.innerHTML = answer;
                    newContent.style.display = "inline-block";
                    newContent.style.width = "70%";
                    newContent.style.margin = "5px 0";
                    newContent.classList.add("choice_" + data.questions[index].choices[dx].id);
                    question.appendChild(newContent);
                }
                let brlmnt = document.createElement("br");
                question.appendChild(brlmnt);
                let answerbtn = document.createElement("input");
                answerbtn.type = "button";
                answerbtn.value = "Beantwoorden";
                answerbtn.dataset.idquestion = "question_" + data.questions[index].id;
                answerbtn.onclick = checkantwoord;
                question.appendChild(answerbtn);
                let newContent = document.createElement("div");
                newContent.id = "txtCorrect";
                question.appendChild(newContent);
            }

            function checkantwoord(event) {
                let idquestion = d3.select(this).property("dataset").idquestion;
                var radios = d3.selectAll("input[name=" + idquestion + "]").nodes();

                for (let index = 0; index < radios.length; index++) {
                    let radiolmnt = d3.select(radios[index]);
                    let answerCorrect = radiolmnt.data()[0].correct;
                    let idchoice = radiolmnt.attr("id");
                    d3.selectAll("." + idchoice)
                        .style("color", function () {
                            if (answerCorrect == "false") {
                                return "red";
                            } else {
                                return "green";
                            }
                        });

                    if (radios[index].checked == true) {
                        let color = d3.select("." + idchoice).style("color");
                        if (color == "red") {
                            console.log("h");
                            console.log(d3.select("#txtCorrect").text("Helaas, volgende keer beter!"));
                        } else {
                            console.log("e");
                            d3.select("#txtCorrect").text("Prima, ga zo door!");
                        }
                    }
                }
            }
        }

    }

    return {
        idcourse: idcourse,
        indexslide: indexslide,
        buildSlide: buildSlide,
        setLastIndex: setLastIndex
    }
})();//SlideViewSender