//print loto539 01-09 statistic summary
$(function() {
  console.log(preloto539);
  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  
  $("#return").on("click",function() {
    $(this).attr("href","/")  
  })
  $("<br>").appendTo('body');

  let today = new Date(); 
  let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd < 10) {
      dd = '0'+dd
    } 
    if(mm < 10) {
      mm = '0'+mm
    } 
    today = yyyy + '-' + mm + '-' + dd;
    $("#today").val(today);

    $('#get-button').on('click', function() {
      let mdate = $("#today").val();
      let xyr = mdate.substr(0,4);
      let xm = mdate.substr(5,2)
      let xd = mdate.substr(8,2)
      mdate = xyr + "/" + xm + "/" + xd;

      let filterarr = preloto539.filter(function(obj) {
        return obj.date === mdate;
      })
      renderTable(filterarr);

    }); //end of onclick

})

function renderTable(objarr) {
  let begdate = objarr[0].date;
  
  $("<h4>").text("今彩539號碼01-39摘要").css({textAlign: "center",fontWeight:"bold"})
  .appendTo('body');
  $("<h5>").text(begdate).css({textAlign: "center",fontWeight:"bold"})
  .appendTo('body');
  $("<br>").appendTo('body');

  
  $("<table>").css({width:"100% !important",margin:"auto"})
  .append($("<thead>")  .css({textAlign:"center",fontWeight:"bold"}) 
    .append($("<tr>")
      .append($("<th>").text("號碼")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
      .append($("<th>").text("差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("min差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("max差數")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})    
      .append($("<th>").text("間距")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
      .append($("<th>").text("估計機率")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
      )
    )
  .append($("<tbody>").attr({id:"tbody" }))
  .appendTo('body');

  objarr.forEach(function(obj,index) {

    let mdate = obj.date;
    obj.summary.forEach(function(obj) {
      let colordiff = "blue";
      let colordmindiff = "blue";
      let colormaxdiff = "blue";
      let colorp = "blue";

      if (obj.diff < 0) {
        colordiff = "red";
      }

      if (obj.maxdiff < 0) {
        colormaxdiff = "red";
      }

      if (obj.mindiff < 0) {
        colordmindiff = "red";
      }

      if (obj.p > 0.89) {
        colorp = "red";
      }

      $("<tr>").css({textAlign:"center"})                        
      
      .append($("<td>")   
       .append($("<input>") .attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(obj.num))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colordiff}).prop("readonly",true)
         .val(obj.diff))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colordmindiff}).prop("readonly",true)
         .val(obj.mindiff))
       )
      .append($("<td>") 
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colormaxdiff}).prop("readonly",true)
         .val(obj.maxdiff))
       )
      .append($("<td>")   
       .append($("<input>") .attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:"blue"}).prop("readonly",true)
         .val(obj.intv))
       )
      .append($("<td>")
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
         .val(obj.p))
       )              
      .appendTo(tbody);
    })
    $("<br>").appendTo('body');

  })

}
