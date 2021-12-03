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
    "BJP":	"#ff9900",
    "SBSP":	"#ff9900",
    "BSP":	"#ff9900",
    "SP":	"red",
    "IND":	"red",
    "Congress":	"red",
    "APS":	"grey",
    "RLD":	"blue",
    "NISHAD":	"green"
}

function drawAssemblyMap(selector, mapdata, settings){
    var width = 430, height = 350; 
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
        .offset([60, 154])
        .html(function(d) { 
            var fdTrendData2017 = constwisetrenddata2017.filter(function(obj){
                    return obj["constNo"] === d.properties[settings.constnokey];
                })
                // partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]]    

            var html = '<div class="tooltip-container">'
            html += '<div class="tooltip-header">'
            html +=     '<p>'+d.properties[settings.constnamekey]+'</p>'
            html +=     '<p>General</p>'
            html += '</div>'
            html += '<div class="tooltip-content">'
            html +=     '<div class="datapoint">'
            html +=         '<p>2006</p>'
            html +=         '<span>BJP</span>'
            html +=     '</div>'
            html +=     '<div class="datapoint">'
            html +=         '<p>2017</p>'
            html +=         '<span style="color:'+partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]]+'">'+party_abrev[fdTrendData2017[0]["leadingParty"]]+'</span>'
            html +=     '</div>'
            html +=     '<div class="datapoint">'
            html +=         '<p>2022</p>'
            html +=         '<span>BJP</span>'
            html +=     '</div>'
            html += '</div>'
            html += '<div class="gotoLink">'
            html +=     '<a href="#">Go to Constituency >></a>'
            html += '</div>'
            html += '</div>'




            return html; 
        });
    svg.call(tool_tip);

    var projection = d3.geoMercator()
        .scale(settings.scale)
        .center(settings.center)
        .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)
    
    // d3.json(source, function(error, stateShape){
        
        // Converts and extracts topojson to map
        // var stateconst = topojson.feature(stateShape, stateShape.objects.collection).features;
        // console.log(stateconst);

    var constituency =  svg.selectAll(".const")
            .data(mapdata).enter().append("path")
            .attr("d", geoPath)
            .attr("class", function(d) {
                return "const c" + d.properties[settings.constnokey];
            })
            .attr('stroke', "#fff")
            .attr('stroke-width', "0.4")
    
    if(settings.type == "constituency"){
        constituency.attr('fill', "#ccc")
    }else if(settings.type == "state"){
      constituency.attr('fill', "#ccc")
    }else if(settings.type == 'party-state'){
        constituency.attr('fill', "red")
    }
            
    if(settings.enableEvents !== false){
        constituency.on('mouseover', tool_tip.show) // to enable d3tip tooltips
            .on('mouseout', tool_tip.hide) // to disable d3tip tooltips
            .on('click', function(d){

                d3.selectAll(".const").attr('stroke', "#fff").attr('stroke-width', "0.4")
                d3.select(".c"+d.properties[settings.constnokey]).attr("stroke", "#ff2020").attr('stroke-width', "5")

                var groupElement2 = document.querySelector(".c"+d.properties[settings.constnokey]).getBBox();
                // console.log(groupElement2)

                d3.select(".inset-rect").transition().duration(500)
                    .attr("x", groupElement2.x-2)
                    .attr("y", groupElement2.y-2)
                    .attr("width", groupElement2.width + 5)
                    .attr("height", groupElement2.height + 5)

                
            })
    } // end of settings.enableEvents if true
    

            d3.select(".c"+settings.defaultconst).attr("stroke", "#ff2020")
            .attr("stroke-width", "5")

            // create Inset if True
            // ================================================================
            if(settings.inset === true){

                svg.append("rect")
                .attr("class", "inset-rect")
                .attr("x", 0)
                .attr("width", width)
                .attr("y", 0)
                .attr("height", height)
                .attr("stroke-opacity", 0);
                
                var groupElement = document.querySelector(".c"+settings.defaultconst).getBBox();
                // console.log(groupElement)

                d3.select(".inset-rect").transition().duration(1500)
                    .attr("x", groupElement.x-4)
                    .attr("y", groupElement.y-4)
                    .attr("width", groupElement.width + 10)
                    .attr("height", groupElement.height + 10)
                    .attr("stroke-opacity", 1);
            }

            // ====================================
            // Create Dropdown from map source            

           if(settings.type === "state"){
                var selectDropdown = d3.select("#const-list");
                
                selectDropdown.html(null);

                // console.log(mapdata);

                var options = selectDropdown.selectAll('option')
                    .data(mapdata).enter()
                    .append('option')
                    .attr("value", function (d) { 
                        return d.properties[settings.constnokey]; 
                    })
                    .attr("data-id", function (d) { 
                        return d.properties[settings.constnokey]; 
                    })
                    .text(function (d) {
                        return d.properties[settings.constnamekey];
                    }); 

           }


            $('#const-list').val(settings.defaultconst).trigger('change')

    // }) // Statelevel Source

    
 

} // end of mapfunction

// function displayConstituency(){

//     var chosenOption = $("#const-list").val();

//     d3.selectAll(".const").attr("stroke", "#fff").attr("stroke-width", "0.5")
    
//     d3.select(".c"+chosenOption).attr("stroke", "black").attr("stroke-width", "5")

//     filterNDisplay2017(parseInt(chosenOption));

// }


// function filterNDisplay2017(acno){
    
//     var fdTrendData2017 = constwisetrenddata2017.filter(function(obj){
//         return obj["constNo"] === acno;
//     })

//     d3.select(".const_name").html(fdTrendData2017[0]["constituency"])
//     d3.select(".status").html(fdTrendData2017[0]["status"])
//     d3.select(".leadCandName").html(fdTrendData2017[0]["leadingCandidate"] + " <span>("+party_abrev[fdTrendData2017[0]["leadingParty"]]+")</span>")
//     d3.select(".trailingCandName").html(fdTrendData2017[0]["trailingCandidate"] + " <span>("+party_abrev[fdTrendData2017[0]["trailingParty"]]+")</span>")
//     d3.select(".margin").html(fdTrendData2017[0]["margin"].toLocaleString('en-IN'))
// }