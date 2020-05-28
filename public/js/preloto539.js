//for app
$(function() {

  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  $("<br>").appendTo('body');

  $("#return").on("click",function() {
    $(this).attr("href","/")
  })

  let date = loto539[0].date;
  let minrecords = 26;
  let arrmax = loto539.slice(0,loto539.length);
  let arrmin = loto539.slice(0,loto539.length - minrecords);
  let arr60 = loto539.slice(0,60);
  console.log("arrmax: ",arrmax);
  console.log("arrmin: ",arrmin);
  console.log("arr60: ",arr60);

  let obj60 = getDiffnProb(arr60)
  console.log("obj60: ", obj60);

  let objmindiff = getMindiff(arrmin)
  console.log("objmindiff: ", objmindiff); 

  let objmaxdiff = getMindiff(arrmax)
  console.log("objmaxdiff: ", objmaxdiff); 


  let summary = [];
  
  for (let i = 1; i <= 39; i++) {

    let tempobj = {}, cn = "";

    if (i < 10) {
      cn = "0" + i;
    }else {
      cn = String(i);
    }
 
    let diff = obj60[cn]["deviation"]

    let intv = obj60[cn]["neardist"];
    let p = obj60[cn]["prob"];
   
    let mindiff = objmindiff[cn]["deviation"];
    let maxdiff = objmaxdiff[cn]["deviation"];

    tempobj['num'] = cn;
    tempobj['diff'] = diff;
    tempobj['mindiff'] = mindiff;
    tempobj['maxdiff'] = maxdiff;
    tempobj['intv'] = intv;
    tempobj['p'] = p;
    summary.push(tempobj)

  }

  let prenum539 = [{date: date, summary: summary}]; //forced to be arr of a single obj

  console.log("prenum539: ", prenum539); 
  renderTable(prenum539);




function renderTable(objarr) {
  let begdate = objarr[0].date;
  let yyyyb = begdate.substr(0,4);
  let mmb = begdate.substr(5,2);
  let ddb = begdate.substr(8,2);
  begdate = yyyyb + "/" + mmb + "/" + ddb;
  let enddate = objarr[objarr.length-1].date;
  let yyyye = enddate.substr(0,4);
  let mme = enddate.substr(5,2);
  let dde = enddate.substr(8,2);
  enddate = yyyye + "/" + mme + "/" + dde;
  let dateperiod = enddate + " - " + begdate;
  $("<h4>").text("今彩539號碼01-39摘要").css({textAlign: "center",fontWeight:"bold",color:"blue"})
  .appendTo('body');


  objarr.forEach(function(obj,index) {
    $("<h5>").text("日期: "+obj.date)
    .css({textAlign:"center",fontSize:"1.2em",fontWeight:"bold",color:"red"})
    .appendTo('body');

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
    .append($("<tbody>").attr({id:function() { return "tbody" + index }}))
    .appendTo('body');
    let id = "#" + "tbody" + index;
    let tbody = $(id);

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
         .val(String(obj.p).substr(0,6)))
       )              
      .appendTo(tbody);
    })
  $("<br>").appendTo('body');

  })

}

  function getDiffnProb(arrofobj) {  

    let reversearr = [];   //revserse order of arrofobj elements
       for (var i = arrofobj.length - 1; i >= 0; i--) {
         reversearr.push(arrofobj[i]);
       }

    let arrofarr = reversearr.reduce((numarr,numobj)=> {

        let num = numobj.lotonum;
        numarr.push(num)
        return numarr;

        },[]);


    let numarr = [],max = 40;

       for (let i = 1; i < max ; i++) {

        let n = i;
        if (n < 10) { 
         n = "0" + n;
        }else {
         n = String(n);
        }
        numarr.push(n);

      }

      
    let p = 0, mean = 0,totalarr = arrofobj.length;

        p = 1/39 + 1/38 + 1/37 + 1/36 + 1/35;

        mean = Math.round(totalarr * p);

    let resultobj = numarr.reduce((obj,cn) => {

                    let count = 0;
                    let position = [];
                    arrofarr.forEach((arr,index) => {

                      arr.forEach((cx) => {
                        if (cx === cn) {
                          count += 1;
                          position.push(index + 1);
                        }
                      })

                    })

                    let tempobj = {},
                        neardistance = position.length === 0 ? totalarr+1 : totalarr - position[position.length - 1]+1,
                        deviation = count - mean;
                        tempobj["deviation"] = deviation;
                        tempobj["neardist"] = neardistance;
                        tempobj["prob"] = 1 - Math.pow(1-p,neardistance);
                        obj[cn] = tempobj;
                        
                    return obj;

                 },{});
       console.log("resultobj: ", resultobj); 

       return resultobj;

  } //getdiffnprob

  function getMindiff(arrofobj) {  

    let reversearr = [];   //revserse order of arrofobj elements
       for (var i = arrofobj.length - 1; i >= 0; i--) {
         reversearr.push(arrofobj[i]);
       }

    let arrofarr = reversearr.reduce((numarr,numobj)=> {

        let num = numobj.lotonum;
        numarr.push(num)
        return numarr;

        },[]);


    let numarr = [],max = 40;

       for (let i = 1; i < max ; i++) {

        let n = i;
        if (n < 10) { 
         n = "0" + n;
        }else {
         n = String(n);
        }
        numarr.push(n);

      }

      
    let p = 0, mean = 0,totalarr = arrofobj.length;

        p = 1/39 + 1/38 + 1/37 + 1/36 + 1/35;

        mean = Math.round(totalarr * p);

    let resultobj = numarr.reduce((obj,cn) => {

                    let count = 0;
                    let position = [];
                    arrofarr.forEach((arr,index) => {

                      arr.forEach((cx) => {
                        if (cx === cn) {
                          count += 1;
                          position.push(index + 1);
                        }
                      })

                    })

                    let tempobj = {},
                        //neardistance = position.length === 0 ? totalarr+1 : totalarr - position[position.length - 1]+1,
                        deviation = count - mean;
                        tempobj["deviation"] = deviation;
                        //tempobj["neardist"] = neardistance;
                        //tempobj["prob"] = 1 - Math.pow(1-p,neardistance);
                        obj[cn] = tempobj;
                        
                    return obj;

                 },{});
       console.log("resultobj: ", resultobj); 

       return resultobj;

  } //getmindiff

  function getMaxdiff(arrofobj) {  

    let reversearr = [];   //revserse order of arrofobj elements
       for (var i = arrofobj.length - 1; i >= 0; i--) {
         reversearr.push(arrofobj[i]);
       }

    let arrofarr = reversearr.reduce((numarr,numobj)=> {

        let num = numobj.lotonum;
        numarr.push(num)
        return numarr;

        },[]);


    let numarr = [],max = 40;

       for (let i = 1; i < max ; i++) {

        let n = i;
        if (n < 10) { 
         n = "0" + n;
        }else {
         n = String(n);
        }
        numarr.push(n);

      }

      
    let p = 0, mean = 0,totalarr = arrofobj.length;

        p = 1/39 + 1/38 + 1/37 + 1/36 + 1/35;

        mean = Math.round(totalarr * p);

    let resultobj = numarr.reduce((obj,cn) => {

                    let count = 0;
                    let position = [];
                    arrofarr.forEach((arr,index) => {

                      arr.forEach((cx) => {
                        if (cx === cn) {
                          count += 1;
                          position.push(index + 1);
                        }
                      })

                    })

                    let tempobj = {},
                        //neardistance = position.length === 0 ? totalarr+1 : totalarr - position[position.length - 1]+1,
                        deviation = count - mean;
                        //tempobj["deviation"] = deviation;
                        //tempobj["neardist"] = neardistance;
                        //tempobj["prob"] = 1 - Math.pow(1-p,neardistance);
                        obj[cn] = tempobj;
                        
                    return obj;

                 },{});
       console.log("resultobj: ", resultobj); 

       return resultobj;

  } //getMaxdiff
  

  //renderTable(arrofobj);

})

