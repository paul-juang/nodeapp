//demo of async.js for both server and browser
$(function() {
let jsonarr = ["acctchartAllx.json","acctclassref.json"];

      async.map(jsonarr,function(json,callback) {
        $.getJSON(json,function(result) {
          callback(null,result)
        })        },
        function(err,result) {
          if (err) {
            console.log(err)
          }
          let arg1 = result[0].filter(function(arr) {return arr[0].length == 4})
          let arg2 = result[1];
          console.log(arg1)
          console.log(arg2)
          printAcctChart(arg1,arg2);
        })

  function printAcctChart(arrofstrarr,acctclassref) {
          $("<h2>").text("會計科目").css({textAlign: "center"}).appendTo('body');   
          $("<br>").appendTo('body');
          
          arrofstrarr.forEach(function(arr,index) {
            
            //let classname = acctclassref[arr[0]][0].acctclass;
            let classname = acctclassref[arr[0]] //property of acctclassref obj - an arr
                                            [0]  //the first and only arr of obj - an obj
                                            .acctclass;  //acctclass property of the aboveobj


            $("<h4>").text("科目代號:  " + arr[0]).css({position:"relative",left: 268})
              .appendTo('body')

            $("<table>").attr({class: "table table-bordered table-striped text-center"})
            .append($("<thead>").attr({class: "thead-light"})
              .append($("<tr>")
                .append($("<th>").text("科目名稱"))
                .append($("<th>").text("科目類別"))   
                .append($("<th>").text(""))
                )
              )
            .append($("<tbody>").attr({id: function() { return "tbody" + index; }}))
            .appendTo('body')
                
            let id = "#" + "tbody" + index;
                let tbody = $(id);


            $("<tr>").css({textAlign:"center"})                         
            .append($("<td>")   
              .append($("<input>").attr({type:"text"}).css({textAlign:"center",fontWeight:"bold",fontSize:"16px"})  
                       .prop("readonly",true) .val(arr[1]))
              )
            .append($("<td>") 
              .append($("<input>").attr({type:"text"}).css({textAlign:"center",fontWeight:"bold",fontSize:"16px"})  
                       .prop("readonly",true) .val(classname))
              )

            .appendTo(tbody);

          })

         } //end of printAcctChart

})
