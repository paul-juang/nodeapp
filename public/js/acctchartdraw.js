//microsoft code 3844430 for reset password 19/12/18
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
        console.log("arg1: ", arg1)
        console.log("arg2: ", arg2)
        printAcctChart(arg1,arg2);
    })

    function printAcctChart(arrofstrarr,acctclassref) {
/*

    $("<a>").attr({id:"return",title:"返回首頁"})
    .text("\u21B6").appendTo('body');

    $("<br>").appendTo('body');

    $("#return").on("click",function() {
      $(this).attr("href","/home")
    })
*/

      $("<a>").attr({id:"return",title:"返回首頁"})
       .css({color: "rgb(0,0,255)"})
       .text("\u21B6").appendTo('body');
/*
       $("<a>").attr({id:"print",title:"列印"})
       .css({color: "rgb(0,0,255)"})
       .text("\u2399").appendTo('body');
       
*/
      $("#return").on("click",function() {
      $(this).attr("href","/")
      })

      $("<h4>").text("會計科目").css({textAlign: "center"}).appendTo('body');   
      $("<br>").appendTo('body');

      arrofstrarr.forEach(function(arr,index) {

        let classname = acctclassref[arr[0]]  [0]  .acctclass; 

        $("<h5>").text("科目代號:  " + arr[0]).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"})
        .appendTo('body')

        $("<table>").css({width:"50% important",margin:"auto"})
        .append($("<thead>").css({textAlign:"center",fontWeight:"bold"}) 

          .append($("<tr>")
            .append($("<th>").text("科目名稱")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 

            .append($("<th>").text("科目類別")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
   
            .append($("<th>").text("")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 

            )
          )
        .append($("<tbody>").attr({id: function() { return "tbody" + index; }}))
        .appendTo('body')

        let id = "#" + "tbody" + index;
        let tbody = $(id);


        $("<tr>").css({textAlign:"center"})                         
        .append($("<td>")   
          .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold"})  
             .prop("readonly",true) .val(arr[1]))
          )
        .append($("<td>") 
          .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold"})  
             .prop("readonly",true) .val(classname))
          )

        .appendTo(tbody);

    })

  } 

})



/*
$(function() {
  $.getJSON("acctChartAllx.json",function(result) {
         console.log("result from json file",result)
         let tempresult = result; //save resul original

         let acctclass = tempresult.filter(function(arr) {
          return arr[0].length == 2;
         })
         .reduce(function(reduceobj,arr) {
          reduceobj[arr[0]] = arr[1];
          return reduceobj;
         },{})

         console.log("acctclass",acctclass)

         let lastindex = 0;
         let tempArr = result.filter(function(arr) {
           return  arr[0].length === 4;
         })
         .reduce(function(reducearr,arr) {
          let subno = arr[0].substr(0,2)
          reducearr.push(
            {
             acctno: arr[0],
             acctname:  arr[1],
             lastindex: lastindex,
             cindex: "index" + lastindex,
             listorder: subno,
             classname: acctclass[subno]
           }
         )
          lastindex++;
          return reducearr;
        },[])
         console.log("tempArr",tempArr)
         printAcctChart();

         function printAcctChart() {
         	$("<h2>").text("會計科目").css({textAlign: "center"}).appendTo('body');   
         	$("<br>").appendTo('body');
         	
         	tempArr.forEach(function(obj,index) {
                let classname = acctclass[obj.acctno.substr(0,2)]
         		$("<h4>").text("科目代號:  " + obj.acctno).css({position:"relative",left: 268})
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
                       .prop("readonly",true) .val(obj.acctname))
         			)
         		.append($("<td>") 
         			.append($("<input>").attr({type:"text"}).css({textAlign:"center",fontWeight:"bold",fontSize:"16px"})  
                       .prop("readonly",true) .val(classname))
         			)

         		.appendTo(tbody);

         	})

         } //end of printAcctChart
         
   })//end of getjson

}) //end of $(function())


*/