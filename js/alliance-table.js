function displayAllianceList(selectedparty){
  console.log('test', selectedparty, defaultYear, btn_data);

  var alliancedata = alliance_2021[btn_data][selectedparty.party];



    d3.select(".alliancemodal").style('display', 'block');
    d3.select(".blackscreen").style('display', 'block');
    d3.select(".alliancelistblock").html('');

    d3.select("#chosenAllianceParty").text(selectedparty)

    var ul = d3.select(".alliancelistblock").append('ul')

    li = ul.selectAll('.alliancemember')
      .data(alliance_2021[btn_data][selectedparty])
      .enter()
      .append('li')
      .attr("class", "alliancemember")
      .html(function (d) { 
        return d;
      })

}

function closeAllBox(){
  d3.select(".alliancemodal").style('display', 'none');
  d3.select(".blackscreen").style('display', 'none');
}

// $('.closeAllBox').click(function(){
//   d3.select(".alliancemodal").style('display', 'none');
//   d3.select(".blackscreen").style('display', 'none');
// });

function drawAccTable(data, selector, labels){
	d3.select(selector).html('');
    var table = d3.select(selector).append('table')
    var thead = table.append('thead')
    var	tbody = table.append('tbody')

    // append the header row
		thead.append('tr')
        .selectAll('th')
        .data(labels).enter()
        .append('th')
          .text(function (column) { return column; });

    partyRow = tbody.selectAll('.partyRow')
      .data(data)
      .enter()
      .append('tr')
      .attr("class", "partyRow");

      var partyCell = partyRow.selectAll('td')
          .data(function (row) {
			 console.log("Row:"+JSON.stringify(row));
            return labels.map(function (column) {
              // console.log(column)
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
          .html(function (d) {
             
              if(d.column === "party"){
                if(d.value != 'Other') {
                  if(defaultYear === '2021' && selector === "#partywise-table"){
                    return "<button class='alliance-list' onclick='displayAllianceList(\""+d.value+"\")' data-party='"+d.value+"'> + </button> "+d.value;
                  }else{
                    return d.value
                  }
                } else {
                  return "<span style='margin-left:18px'>"+d.value+"</span>";
                }
              }else{
                return d.value;
              }
          });
    
    return table;

    
    
    
}

var alliance_2021 = {
  "tn":{
    "AIADMK +": ["AIADMK","PMK","BJP","TMCM","PTMK","TMMK","MMK","AIMMK","PBK","PDK"],
    "DMK +": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"]
  },
  "kl":{
    "CPIM +": ["CPI", "CPIM", "KCM", "JDS", "NCP", "LJD", "INL", "CS", "KSB", "JK"],
    "INC +": ["INC", "IUML", "KCJ", "RSP", "NCK", "KCJ", "CMP", "RMPS", "Independent"]
  },
  "wb":{
    "TMC +": ["AIADMK","PMK","BJP","TMCM","PTMK","TMMK","MMK","AIMMK","PBK","PDK"],
    "BJP +": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"],
    "Others": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"]
  },
  "as":{
    "BJP +": ["AIADMK","PMK","BJP","TMCM","PTMK","TMMK","MMK","AIMMK","PBK","PDK"],
    "INC +": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"],
    "Others": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"]
  },
  "pd":{
    "INC +": ["AIADMK","PMK","BJP","TMCM","PTMK","TMMK","MMK","AIMMK","PBK","PDK"],
    "AINRC +": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"],
    "Others": ["DMK", "INC", "CPI", "CPIM", "VCK", "MDMK", "IUML", "KMDK", "MMK", "AIFB", "TVK", "MVK", "ATP"]
  }
}





// $(document).ready(function(){

  // $('.alliance-list').click(function(){
  //   var selectedparty = $(this).data();
  //   console.log('test', selectedparty, defaultYear, btn_data);

  //   var alliancedata = alliance_2021[btn_data][selectedparty.party];



  //   d3.select(".alliancemodal").style('display', 'block');
  //   d3.select(".blackscreen").style('display', 'block');
  //   d3.select(".alliancelistblock").html('');

  //   var ul = d3.select(".alliancelistblock").append('ul')

  //   li = ul.selectAll('.alliancemember')
  //     .data(alliance_2021[btn_data][selectedparty.party])
  //     .enter()
  //     .append('li')
  //     .attr("class", "alliancemember")
  //     .html(function (d) { 
  //       return d;
  //     })

  // })

//   $('.closeAllBox').click(function(){
//     d3.select(".alliancemodal").style('display', 'none');
//     d3.select(".blackscreen").style('display', 'none');
//   });

// });