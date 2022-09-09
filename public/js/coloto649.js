//print winning numbers statistic summary
$(function() {
  let loto649 = getNum649(num649)
  let filterarr = loto649.filter(function(obj) {
    return obj["summary"];
  })
  let n = filterarr.length;
  let arrofobj = loto649.slice(0,n);
  console.log(arrofobj);

  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  
  $("#return").on("click",function() {
    $(this).attr("href","/")
  })
  $("<br>").appendTo('body');

  renderTable(arrofobj);

})
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

  $("<h4>").text("大樂透中獎號碼摘要").css({textAlign: "center",fontWeight:"bold",color:"blue"})
  .appendTo('body');
  $("<h5>").text(dateperiod).css({textAlign: "center",fontWeight:"bold",color:"blue"})
  .appendTo('body');
  $("<br>").appendTo('body');
  
  objarr.forEach(function(obj,index) {
    $("<h5>").text("中獎號碼: "+ obj.lotonum.join(' ') + "  日期: "+obj.date)
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
      let colormaxdiff = "blue";
      let colormindiff = "blue";

      let colorp = "blue";

      if (obj.diff < 0) {
        colordiff = "red";
      }

      if (obj.maxdiff < 0) {
        colormaxdiff = "red";
      } 

      if (obj.mindiff < 0) {
        colormindiff = "red";
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
       .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colormindiff}).prop("readonly",true)
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
         .val(obj.p.toFixed(4)))
       )              
      .appendTo(tbody);
    })
  $("<br>").appendTo('body');

  })

}

function getNum649(num649) {
  let loto649 = []
  let filterarr = num649.filter(obj => obj["date"] >="2019/12/31")

  let allDate = []
  filterarr.forEach(obj => allDate.push(obj.date))

  allDate.forEach(date0 => {
    let prevfile = num649.filter(obj => obj["date"] > date0)

    let prelotonum = [],predate = "", prebonus
    if (prevfile.length > 0 ) {
      prelotonum = prevfile[(prevfile.length)-1]["lotonum"]
      predate = prevfile[(prevfile.length)-1]["date"]
      prebonus = prevfile[(prevfile.length)-1]["bonus"]
    }

    if (prelotonum.length != 0  ) {
      let arrOnChange = num649.filter(obj => obj["date"] <= date0)
      let baseArr = arrOnChange.slice(0,arrOnChange.length)
      let basefilerarr = baseArr.filter(obj => obj["summary"])
      let date = arrOnChange[0].date;
      let lotonum = arrOnChange[0].lotonum
      let minrecords = 108;
      let arrmax = arrOnChange.slice(0,arrOnChange.length);
      let arrmin = arrOnChange.slice(0,arrOnChange.length - minrecords);
      let arr60 = arrOnChange.slice(0,60);

      let obj60 = getDiffnProb(arr60)
      let objmindiff = getMinMaxdiff(arrmin)
      let objmaxdiff = getMinMaxdiff(arrmax)

      let numarr = [],max = 50
      for (let i = 1; i < max ; i++) {
        let n = i;
        if (n < 10) n = "0" + n;
        else  n = String(n);
        numarr.push(n);
      }

      let summary = getSummary(numarr, obj60, objmindiff, objmaxdiff, prelotonum)
      summary.sort((a,b) => a.num - b.num)

      let temp = {}
      temp['date'] = predate
      temp['bonus'] = prebonus
      temp['lotonum'] = prelotonum
      temp['summary'] = summary
      loto649.push(temp)
    }

  })

  loto649.forEach(obj => {
    let summary = obj.summary
    let lotonum = obj.lotonum
    let sumarr = []
    lotonum.forEach(num => {
      let sumobj = {}
      summary.forEach(obj0 => {
        if (num === obj0.num) {
          sumobj["num"] = obj0.num
          sumobj["diff"] = obj0.diff
          sumobj["mindiff"] = obj0.mindiff
          sumobj["maxdiff"] = obj0.maxdiff
          sumobj["intv"] = obj0.intv
          sumobj["p"] = obj0.p
        }
      })
      sumarr.push(sumobj)
    })
    obj["summary"] = sumarr
  })
  let therest = num649.slice(loto649.length)
  loto649 = [...loto649, ...therest]
  return loto649

  // functions
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
        if (n < 10) n = "0" + n;
        else n = String(n);
        numarr.push(n);
      }

      let p = 0, mean = 0,totalarr = arrofobj.length;
      p = 1/49 + 1/48 + 1/47 + 1/46 + 1/45 + 1/44;
      mean = Math.round(totalarr * p);
      let resultobj = numarr.reduce((obj,cn) => { 
        let count = 0;
        let position = [];
        arrofarr.forEach((arr,index) => {
          arr.forEach(cx => {
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
        return resultobj;
    }

    function getMinMaxdiff(arrofobj) {
      let reversearr = [];  
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
        if (n < 10) n = "0" + n;
        else n = String(n);
        numarr.push(n);
      }
      let p = 0, mean = 0,totalarr = arrofobj.length;
      p = 1/49 + 1/48 + 1/47 + 1/46 + 1/45 + 1/44;
      mean = Math.round(totalarr * p);
      let resultobj = numarr.reduce((obj,cn) => { 
        let count = 0;
        let position = [];
        arrofarr.forEach((arr,index) => {
          arr.forEach(cx => {
            if (cx === cn) {
              count += 1;
              position.push(index + 1);
            }
          })
        })

        let tempobj = {},
        deviation = count - mean;
        tempobj["deviation"] = deviation;
        obj[cn] = tempobj;
        return obj;
        },{});
        return resultobj;
    }

    function getSummary(numarr, obj60, objmindiff, objmaxdiff) {
      let summary = [];
      numarr.forEach(num => {      
      let tempobj = {}
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
      summary.push(tempobj)
    })
     return summary    
   }
}

