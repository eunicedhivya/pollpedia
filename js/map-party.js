//format to substitute data with abreviation
var party_abrev = {
    "Bharatiya Janta Party":"BJP", 
    "Suheldev Bhartiya Samaj Party":"SBSP", 
    "Bahujan Samaj Party":"BSP", 
    "Samajwadi Party":"SP", 
    "Independent":"IND", 
    "Indian National Congress":"Congress", 
    "Apna Dal (Soneylal)":"APS", 
    "Rashtriya Lok Dal":"RLD", 
    "Nirbal Indian Shoshit Hamara Aam Dal":"NISHAD"
}

//format to substitute data with color
var partycolors = { 
    "2017":{
        "AIMIM":"#43A047", 
        "BJP":"#FF6F00", 
        "APNA DAL":"#E91E63", 
        "SBSP":"#FFD740", 
        "BSP":"#283593", 
        "NISHAD":"#9C27B0", 
        "RLD":"#4DB6AC", 
        "SP":"#EF5350", 
        "Congress":"#1565C0",
        "Others": "#aaaaaa"
    },
    "2012" :{},
    "2022":{}
}

function drawAssemblyMap(selector, filldata, mapdata, settings){
    var width = 350, height = 350; 
    var state = settings.statecode;
    var source = settings.mapsource;

    console.log(mapdata)

    // empty selected container (required for redrawing map)
    d3.select(selector).html(null)

    // create and append svg to selected container with responsive setting
    var svg = d3.select(selector)
        .append("svg")
        .attr("class", settings.vhcode+"map")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .append("g")
    
    var tool_tip = d3.tip()
        .attr("class", "map-tooltip")
        .offset([0, 50])
        .html(function(d) { 
            // console.log(d.properties[settings.constnamekey]);
            var html = d.properties[settings.constnamekey]
            return html; 
        });
    svg.call(tool_tip);

    var projection = d3.geoMercator()
        .scale(settings.scale)
        .center(settings.center)
        .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)
    
    var constituency =  svg.selectAll(".const")
            .data(mapdata).enter().append("path")
            .attr("d", geoPath)
            .attr("class", function(d) {
                return "const c" + d.properties[settings.constnokey];
            })
            .attr('stroke', "#fff")
            .attr('stroke-width', "0.4")
            .on('mouseover', tool_tip.show) // to enable d3tip tooltips
            .on('mouseout', tool_tip.hide)

    constituency.transition().duration(400)
        .attr('fill', function(d){
            var fdFillData = filldata.filter(function(obj){
                // console.log(obj)
                return parseInt(obj["constId"]) === d.properties.ac;
            })
            if(fdFillData[0] !== undefined){
                return partycolors[settings.year][settings.party];
            }else{
                return "#D2D2D2"
            }
        })
    
    d3.select("#seats-of-party").style("color", partycolors[settings.year][settings.party])
        .html(filldata.length + "/"+ mapdata.length)
    

} // end of mapfunction
