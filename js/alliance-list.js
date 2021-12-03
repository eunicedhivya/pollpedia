function allianceList(data){
    
    var selectAllListcont = d3.select(".alliance-list")

    selectAllListcont.html("")

    var allList = selectAllListcont.selectAll(".alliance-item")
        .data(data).enter().append("li")
        .attr("class", "alliance-item")
        .html(function(d){
            return d
        })
        .style("transform", "translateY(-10px)")
        .style("opacity", 0)
        .transition().duration(800)
        .style("transform", "translateY(0)")
        .style("opacity", 1)
}