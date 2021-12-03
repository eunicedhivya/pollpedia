function drawAccTable(data, selector, labels, textLabels){
	// console.log("Share data:"+data);
    d3.select(selector).html('')
    
    var table = d3.select(selector).append('table')
    var thead = table.append('thead')
    var	tbody = table.append('tbody')

    // append the header row
		thead.append('tr')
        .selectAll('th')
        .data(labels).enter()
        .append('th')
          .text(function (column) { return textLabels[column]; });

    partyRow = tbody.selectAll('.partyRow')
      .data(data)
      .enter()
      .append('tr')
      .attr("class", function(d){
        console.log(d.status);
        return "partyRow "+d.status;
      })
      .style("background-color", function(d){
          console.log(d.status)
          if(d.status === "Won"){
              return "#DFFAD2";
          }
      })
      .style("font-style", function(d){
          console.log(d.status)
          if(d.status === "Won"){
              return "italic";
          }
      })

      var partyCell = partyRow.selectAll('td')
          .data(function (row) {
            return labels.map(function (column) {
              // console.log(column)
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
          .attr('class', function(d,i){
            // "candName", "party", "votes", "votes%", "status"
            if(d.column === "candName"){
              return "stateRow";
            }else{
              return "districtRow"
            }
          })
          .attr('data-label', function(d,i){
            return textLabels[d.column];
          })
          .html(function (d) { 
              // console.log(d)
              // return d.value;
              if(d.column === "party" ||  d.column === "id"){
                return "<span style='margin-left:18px'>"+d.value+"</span>";
              }if(d.column === "votes%" ){
                return formatNumberPer(d.value);
              }else{
                return d.value;
              }
          });
    
    return table;
    
}






// $(document).ready(function(){

//   $('.alliance-list').click(function(){
//     var selectedparty = $(this).data();
//   })

// });