//predict next winning number by combining preloto649/test649.js
//testing 01/18/2022
$(function() {

  $("#return").attr({title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6") //.appendTo('body');
  
  $("#return").on("click",function() {
    $(this).attr("href","/")
  });
  $("<br>").appendTo('body');
  $("<br>").appendTo('body');

  $("<div>").attr({id:"divtable",class:"content-padding clearfix"})  
  .appendTo('body');
  
  
  let filterarr = loto649.filter(function(obj) {
      return obj["summary"];
    })
  
  $.getJSON("reduceArr.json", function(reduceArr) {

    filterarr.forEach(obj => {
      $("<option>").attr({class:"option",value:obj.date}).text(obj.date)
      .appendTo($("#selectdate"))
    })
    $("#selectdate").val("").on("change", function() {
      let arrOnChange = loto649.filter(function(obj) {
        return obj["date"] <= $("#selectdate").val()
      })
      let date = arrOnChange[0].date;
      let minrecords = 108;
      let arrmax = arrOnChange.slice(0,arrOnChange.length);
      let arrmin = arrOnChange.slice(0,arrOnChange.length - minrecords);
      let arr60 = arrOnChange.slice(0,60);

      let obj60 = getDiffnProb(arr60)
      let objmindiff = getMindiff(arrmin)
      let objmaxdiff = getMindiff(arrmax)

      let summary = [];

      for (let i = 1; i <= 49; i++) {
        let tempobj = {}, num = "";
        if (i < 10) {
          num = "0" + i;
        }else {
          num = String(i);
        }    

        let diff = obj60[num]["deviation"]
        let intv = obj60[num]["neardist"];
        let p = obj60[num]["prob"];    
        let mindiff = objmindiff[num]["deviation"];
        let maxdiff = objmaxdiff[num]["deviation"];

        tempobj['num'] = num;
        tempobj['diff'] = diff;
        tempobj['mindiff'] = mindiff;
        tempobj['maxdiff'] = maxdiff;
        tempobj['intv'] = intv;
        tempobj['p'] = p;

        let argobj = {num,diff,mindiff,maxdiff,intv};
        let pn = getpn(reduceArr, argobj)
        tempobj['pn'] = pn;
        summary.push(tempobj)      
      }

      let prenum649 = [{date: date, summary: summary}];
      prenum649[0].summary.sort((a, b) => b.pn - a.pn)
      renderTable(prenum649);
  })


 })

  function getpn(reduceArr, obj) {
      console.log("reduceArr", reduceArr)
      console.log("obj", obj)

      let num = obj.num, diff = obj.diff, mindiff = obj.mindiff, 
      maxdiff = obj.maxdiff, intv = obj.intv
      let numcount = reduceArr[num]["1.count"]
      let numpcnt = Math.round(numcount/226*100)
      let sumobj = reduceArr[num]["6.summary"]
      let dfpcnt = 0, mnpcnt = 0, mxpcnt =0, intvpcnt = 0  
      console.log(num)    
      if (diff < 0) {
        dfpcnt = sumobj["diff"]["npcnt"]/100
      } else if (diff === 0) {
        dfpcnt = sumobj["diff"]["zpcnt"]/100
      } else {
        dfpcnt = sumobj["diff"]["ppcnt"]/100
      }

      if (mindiff < 0) {
        mnpcnt = sumobj["mindiff"]["npcnt"]/100
      } else if (diff === 0) {
        mnpcnt = sumobj["mindiff"]["zpcnt"]/100
      } else {
        mnpcnt = sumobj["mindiff"]["ppcnt"]/100
      }

      if (maxdiff < 0) {
        mxpcnt = sumobj["maxdiff"]["npcnt"]/100
      } else if (diff === 0) {
        mxpcnt = sumobj["maxdiff"]["zpcnt"]/100
      } else {
        mxpcnt = sumobj["maxdiff"]["ppcnt"]/100
      }

      if (intv < 16) {
        intvpcnt = sumobj["intv"]["lpcnt"]/100
      } else {
        intvpcnt = sumobj["intv"]["hpcnt"]/100
      }

      let ttlpcnt = (dfpcnt+mnpcnt+mxpcnt+intvpcnt)
      let pn = numpcnt * ttlpcnt
      return pn
  }



  function renderTable(objarr) {
        //console.log("objarr",objarr)

    //console.log("pn",objarr[0]["summary"]["pn"])
        //console.log("pn",objarr[0].summary.pn)
/*
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
*/
    $('#divtable').html("");
    $("<h4>").text("大樂透號碼01-49摘要").css({textAlign: "center",fontWeight:"bold",color:"blue"})
    .appendTo($('#divtable'));

    objarr.forEach(function(obj,index) {
      $("<h5>").text("日期: "+obj.date)
      .css({textAlign:"center",fontSize:"1.2em",fontWeight:"bold",color:"red"})
      .appendTo($('#divtable'))

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
      .appendTo($('#divtable'));

      let id = "#" + "tbody" + index;
      let tbody = $(id);

      obj.summary.forEach(function(obj) {
       // console.log("obj.", obj)
        //console.log("obj.p", obj.p)
        //console.log("obj.pn", obj.pn)
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

        /*if (obj.p > 0.89) {
          colorp = "red";
        }*/

        if (obj.pn >= 35) {
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
        /*.append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
         .val(String(obj.p).substr(0,6)))
         )*/          
        .append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
           .val(String(obj.pn).substr(0,2)+"%"))
         )              
        .appendTo(tbody);
      })
   
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


    let numarr = [],max = 50;

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

        p = 1/49 + 1/48 + 1/47 + 1/46 + 1/45 + 1/44;

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


    let numarr = [],max = 50;

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

        p = 1/49 + 1/48 + 1/47 + 1/46 + 1/45 + 1/44;

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


    let numarr = [],max = 50;

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

        p = 1/49 + 1/48 + 1/47 + 1/46 + 1/45 + 1/44;

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
  


})

function formatAmount(n) {
     return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }  
  

