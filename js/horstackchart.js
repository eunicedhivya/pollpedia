// votesharedata = 



function drawHorizontalStackChart(selection, stackdata, props) {
    // console.log(stackdata);
    
    var hordivcont = d3.select(selection)
    hordivcont.html(null)

    var addContainer = hordivcont.append("div")
        .attr("class", "horbarchart")
        .attr("data-label", props.type)

    var addLegend = hordivcont.append("div")
        .attr("class", "horbarchart-legend")
        .style("width", "fit-content")
        .style("margin", "0 auto")

    addContainer.selectAll(".block")
        .data(stackdata).enter()
        .append("div").attr("class", "block")
        .style("display",  "inline-block")
        .style("height", "28px")
        .transition().duration(800)
        .style("background-color",  function(d,i){
            if(d[props["label"]] !== "No Data Yet"){
                return partycolors[d[props["label"]]];
            }else{
                return "#e8e8e8"
            }
        })
        .style("width", function(d,i){
            return d[props["valueper"]]+"%";
        })

    addLegend.selectAll(".legend-block")
        .data(stackdata).enter()
        .append("div").attr("class", "legend-block")
        .style("background-color",  function(d,i){
            if(d[props["label"]] !== "No Data Yet"){
                return partycolors[d[props["label"]]];
            }else{
                return "#e8e8e8"
            }
        })
        .style("width", "30px")
        .style("height", "8px")
        .style("text-align", "center")
        .style("font-size", "14px")
        .style("display", "inline-block")
        .html(function(d,i){
            return '<span class="partylabel" style="display:block;font-weight:bold;margin: 10px 0 0 0;line-height:18px;">'+d[props["label"]]+'</span> <span class="value">'+d[props["value"]]+'</span>';
        })
        .style("margin", "0 10px 0 10px")
        .style("transform", "translateY(-20px)")
        .style("opacity", 0)
        .transition().duration(800)
        .style("transform", "translateY(0)")
        .style("opacity", 1)
        
        

} // end of horstackchart

