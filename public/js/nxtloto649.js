const indx1 = 60, indx2 = 108
const ztable = {
  '0.0':0.0000,'0.1':0.0398,'0.2':0.0793,'0.3':0.1179,'0.4':0.1554,
  '0.5':0.1915,'0.6':0.2257,'0.7':0.2580,'0.8':0.2881,'0.9':0.3159,
  '1.0':0.3413,'1.1':0.3643,'1.2':0.3849,'1.3':0.4032,'1.4':0.4192,
  '1.5':0.4332,'1.6':0.4452,'1.7':0.4554,'1.8':0.4641,'1.9':0.4713,
  '2.0':0.4772,'2.1':0.4821,'2.2':0.4861,'2.3':0.4893,'2.4':0.4918,
  '2.5':0.4938,'2.6':0.4953,'2.7':0.4965,'2.8':0.4974,'2.9':0.4981,
  '3.0':0.4987,'3.1':0.4990,'3.2':0.4993,'3.3':0.4995,'3.4':0.4997,
  '3.5':0.4998,'3.6':0.4998,'3.7':0.4999,'3.8':0.4999  
}

$(function() {
  $("ul").hide();
  $("#return").attr({title:"返回首頁"})
  .css({color: "rgb(0,0,255)",fontWeight:"bold"})
  .text("\u21B6") //.appendTo('body');
  
  $("#return").on("click",function() {
    $(this).attr("href","/")
  });
  $("<br>").appendTo('body');
  $("<br>").appendTo('body');

  $("<div>").attr({id:"divtable",class:"content-padding clearfix"})  
  .appendTo('body');

  let loto649 = getNum649(num649)
  console.log("loto649", loto649 )
 
  let filterarr = loto649.filter(obj => obj["summary"])

  filterarr.forEach(obj => {
    $("<option>").attr({class:"option",value:obj.date}).text(obj.date)
    .appendTo($("#selectdate"))
  })

  $("#selectdate").val("").on("change", function() {
    $("ul").show();

    let prevfile = loto649.filter(function(obj) {
      return obj["date"] > $("#selectdate").val()
    })
    let prelotonum = []
    if (prevfile.length > 0 ) 
      prelotonum = prevfile[(prevfile.length)-1]["lotonum"].sort((a,b) => a-b)
    
    let arrOnChange = loto649.filter(obj => obj["date"] <= $("#selectdate").val())
    let baseArr = arrOnChange.slice(0,arrOnChange.length)
    let basefilerarr = baseArr.filter(obj => obj["summary"])
    let basemaparr = basefilerarr.map(obj => obj["summary"])
    let totalrecord = basemaparr.length

    let reduceObj = getreduceObj(basemaparr)
    console.log("reduceObj", reduceObj)

    let date = arrOnChange[0].date;
    let arr60 = arrOnChange.slice(0,indx1) //arrOnChange.slice(0,60);
    let arrmin = arrOnChange.slice(0,arrOnChange.length-indx2) //arrOnChange.slice(0,arrOnChange.length -108);
    let arrmax = arrOnChange.slice(0,arrOnChange.length)

    let obj60 = getDiffnProb(arr60)
    let objmindiff = getMinMaxdiff(arrmin)
    let objmaxdiff = getMinMaxdiff(arrmax)
    let numarr = [],max = 50
    for (let i = 1; i < max ; i++) {
        let n = i
        if (n < 10) n = "0" + n
         else  n = String(n)
        numarr.push(n)
    }
    let summary = getSummary(numarr, obj60, objmindiff, objmaxdiff, prelotonum)
    summary.sort((a, b) => a.num - b.num)
    console.log("summary", summary)
    getSummaryP1(reduceObj, summary)
    getSummaryP2(reduceObj, summary)
    let p3arr = getp3arr(summary) 
    console.log("p3arr:", p3arr)
    let p3obj = getp3obj(basemaparr)
    console.log("p3obj", p3obj)
    getSummaryP3(summary, p3arr, p3obj)

    let prenum649 = [{date: date, summary: summary}]
    prenum649[0].summary.sort((a, b) => a.num - b.num)
    renderTable(prenum649, prelotonum, reduceObj, p3arr)
    document.querySelectorAll("button").forEach((button, index) => {
      if (index === 0) {
        button.onclick = () => {
          prenum649[0].summary.forEach(obj => obj.pn = obj.p1) 
          prenum649[0].summary.sort((a, b) => b.pn - a.pn)
          renderzTable(prenum649, prelotonum, reduceObj, p3arr)
        }
      }

      if (index === 1) {
        button.onclick = () => {
          prenum649[0].summary.forEach(obj => obj.pn = obj.p2)
          prenum649[0].summary.sort((a, b) => b.pn - a.pn)
          renderzTable(prenum649, prelotonum, reduceObj, p3arr)
        }
      }

      if (index === 2) {
        button.onclick = () => {
          prenum649[0].summary.forEach(obj => obj.pn = obj.p1+obj.p3)
          prenum649[0].summary.sort((a, b) => (b.p1+b.p3) - (a.p1+a.p3))
          renderzTable(prenum649, prelotonum, reduceObj, p3arr)
        }
      }

      if (index === 3) {
        button.onclick = () => {
          prenum649[0].summary.forEach(obj => obj.pn = obj.p2+obj.p3)
          prenum649[0].summary.sort((a, b) => (b.p2+b.p3) - (a.p2+a.p3))
          renderzTable(prenum649, prelotonum, reduceObj, p3arr)
        }
      }
      
      /*if (index === 4) {
        button.onclick = () => {
          prenum649[0].summary.forEach(obj => obj.pn = 0)
          prenum649[0].summary.forEach(obj => obj.pn = obj.p1+obj.p3)
          prenum649[0].summary.sort((a, b) => (b.p1+b.p3+pi) - (a.p1+a.p3+pi))
          renderzTable(prenum649, prelotonum, reduceObj, p3arr)
        }
      }

      if (index === 5) {
        button.onclick = () => {
          prenum649[0].summary.forEach(obj => obj.pn = 0)
          prenum649[0].summary.forEach(obj => obj.pn = obj.p1+obj.p3)
          prenum649[0].summary.sort((a, b) => (b.p2+b.p3+pi) - (a.p1+a.p3+pi))
          renderzTable(prenum649, prelotonum, reduceObj, p3arr)
        }
      }*/
    })
  })
})

function getreduceObj(basemaparr) {
  let reversearr = [];  
  for (let i = basemaparr.length - 1; i >= 0; i--) {
    reversearr.push(basemaparr[i]);
  }

  let reduceObj = reversearr.reduce((sumObj, arrofobj, index) => {
    arrofobj.forEach(obj => {
     sumObj[obj.num] = sumObj[obj.num] || {}
     sumObj[obj.num]["count"] ? sumObj[obj.num]["count"]++ 
     : sumObj[obj.num]["count"] = 1
     Object.keys(obj).forEach(key => {
       if (key === "diff" || key === "mindiff" 
         || key === "maxdiff" || key === "intv") 
       {
         sumObj[obj.num][key] = sumObj[obj.num][key] || {}
         sumObj[obj.num][key][obj[key]] = sumObj[obj.num][key][obj[key]] || {}
         sumObj[obj.num][key][obj[key]]["count"] ? sumObj[obj.num][key][obj[key]]["count"]++ 
         : sumObj[obj.num][key][obj[key]]["count"] = 1
       }
     })
   })
    return sumObj
  },{})
  Object.keys(reduceObj).sort((a, b) => a - b)
  .forEach(num => {
      let ttlcount = reduceObj[num]["count"] 
      Object.keys(reduceObj[num]).forEach(key => {
        if (key === "diff" || key === "mindiff" 
         || key === "maxdiff" || key === "intv") 
        {
          Object.keys(reduceObj[num][key]).forEach(x => {
            let pcnt = reduceObj[num][key][x]["count"]/ttlcount
            reduceObj[num][key][x]["pcnt"] = pcnt
          })
        } 
      })
    })
  return reduceObj
}

function getSummaryP1(reduceObj, summary) {
  let numArr = Object.keys(reduceObj)
  summary.forEach(obj => { 
  if (numArr.indexOf(obj.num) === -1 ) obj["p1"] = 0
  if (numArr.indexOf(obj.num) != -1 ) {
    let diff = obj["diff"], mindiff = obj["mindiff"], 
        maxdiff = obj["maxdiff"], intv = obj["intv"], p1 = 0
    let diffpcnt1 = 0,mindiffpcnt1 = 0,maxdiffpcnt1 = 0,intvpcnt1 = 0 

    if (reduceObj[obj.num]["diff"][diff])
      diffpcnt1 = reduceObj[obj.num]["diff"][diff]["pcnt"]
    if (reduceObj[obj.num]["mindiff"][mindiff]) 
          mindiffpcnt1 = reduceObj[obj.num]["mindiff"][mindiff]["pcnt"]
    if (reduceObj[obj.num]["maxdiff"][maxdiff]) 
      maxdiffpcnt1 = reduceObj[obj.num]["maxdiff"][maxdiff]["pcnt"]
    if (reduceObj[obj.num]["intv"][intv]) 
      intvpcnt1 = reduceObj[obj.num]["intv"][intv]["pcnt"]
    
    p1 = diffpcnt1+mindiffpcnt1+maxdiffpcnt1+intvpcnt1
    obj['diffpcnt1'] = diffpcnt1
    obj['mindiffpcnt1'] = mindiffpcnt1
    obj['maxdiffpcnt1'] = maxdiffpcnt1
    obj['intvpcnt1'] = intvpcnt1
    obj['p1'] = p1
  }
  })
}

function getSummaryP2(reduceObj, summary) {
  let numArr = Object.keys(reduceObj)
  summary.forEach(obj => {
  if (numArr.indexOf(obj.num) === -1 ) obj["p2"] = 0
  if (numArr.indexOf(obj.num) != -1 ) {
    let diff = obj["diff"], mindiff = obj["mindiff"], 
        maxdiff = obj["maxdiff"], intv = obj["intv"]
    let num = obj["num"], diffpcnt2 = 0, mindiffpcnt2 = 0, 
        maxdiffpcnt2 = 0, intvpcnt2 = 0, p2 = 0

    diffpcnt2 = getzp(reduceObj, num, "diff", diff)
    mindiffpcnt2 = getzp(reduceObj, num, "mindiff", mindiff)
    maxdiffpcnt2 = getzp(reduceObj, num, "maxdiff", maxdiff)
    intvpcnt2 = getzp(reduceObj, num, "intv", intv)
    p2 = diffpcnt2+mindiffpcnt2+maxdiffpcnt2+intvpcnt2
    obj['diffpcnt2'] = diffpcnt2
    obj['mindiffpcnt2'] = mindiffpcnt2
    obj['maxdiffpcnt2'] = maxdiffpcnt2
    obj['intvpcnt2'] = intvpcnt2
    obj['p2'] = p2 
  }
  })
}

function getzp(reduceObj, num, option, x) {
  let n = reduceObj[num]["count"]
  let ttlx = Object.keys(reduceObj[num][option]).reduce((sum, x) => {
         return sum += parseInt(x)*reduceObj[num][option][x]['count']  
       }, 0)
  let mean = ttlx/n
  let s2 = Object.keys(reduceObj[num][option]).reduce((sum, x) => {
        return sum + Math.pow((parseInt(x) - mean), 2)
       }, 0)
  let sd = Math.sqrt(s2/(n-1))
  let z = Math.abs((x - mean))/sd
  let zc = z.toFixed(1)
  let zp = 0.0001
  if (zc <=  "3.8") {
    zp = 0.5 - ztable[zc]
  } 

  reduceObj[num][option]["x"] = x
  reduceObj[num][option]["mean"] = mean
  reduceObj[num][option]["sd"] = sd
  reduceObj[num][option]["z"] = z
  reduceObj[num][option]["zc"] = zc
  reduceObj[num][option]["zp"] = zp
  reduceObj[num]["zps"] = reduceObj[num]["zps"] || {}
  reduceObj[num]["zps"][option] = zp
  return zp
}

function getp3arr(summary) {
    let arrStat = []
    summary.forEach(obj => {
        if (obj.diff === obj.mindiff || obj.diff === obj.maxdiff || 
          obj.mindiff === obj.maxdiff) {
          arrStat.push(obj)
        }
    })
    return arrStat
}

function getp3obj(basemaparr) {
  let totalwinnum = basemaparr.length*6
  let arrStat1 = []
  let totalhits = 0
  basemaparr.forEach(arrofobj => {
    //let hit = false
    arrofobj.forEach(obj => {
       if (obj.diff === obj.mindiff || obj.diff === obj.maxdiff || 
         obj.mindiff === obj.maxdiff) {
          arrStat1.push(obj)
          //hit = true
          totalhits++
       }
    })
    //if (hit) totalhits++
  })
 //console.log("ttlhits === length", totalhits === arrStat1.length)
 arrStat1.sort((a, b) => a.num - b.num)
 let p3obj = arrStat1.reduce((reduceobj, obj) => {
     if (obj.diff === obj.mindiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["count"] ? reduceobj[obj.num]["count"]++
                                : reduceobj[obj.num]["count"] = 1
        reduceobj[obj.num]["type1"] = reduceobj[obj.num]["type1"] || {} 
        reduceobj[obj.num]["type1"][obj.diff] ? reduceobj[obj.num]["type1"][obj.diff]++
                                : reduceobj[obj.num]["type1"][obj.diff] = 1
     }

     if (obj.diff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["count"] ? reduceobj[obj.num]["count"]++
                                : reduceobj[obj.num]["count"] = 1
        reduceobj[obj.num]["type2"] = reduceobj[obj.num]["type2"] || {} 
        reduceobj[obj.num]["type2"][obj.diff] ? reduceobj[obj.num]["type2"][obj.diff]++
                                : reduceobj[obj.num]["type2"][obj.diff] = 1
     }

     if (obj.mindiff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["count"] ? reduceobj[obj.num]["count"]++
                                : reduceobj[obj.num]["count"] = 1
        reduceobj[obj.num]["type3"] = reduceobj[obj.num]["type3"] || {} 
        reduceobj[obj.num]["type3"][obj.diff] ? reduceobj[obj.num]["type3"][obj.diff]++
                                : reduceobj[obj.num]["type3"][obj.diff] = 1
     }  

     if (obj.diff === obj.mindiff && obj.diff === obj.maxdiff && obj.mindiff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["count"] ? reduceobj[obj.num]["count"]++
                                : reduceobj[obj.num]["count"] = 1
        reduceobj[obj.num]["type4"] = reduceobj[obj.num]["type4"] || {} 
        reduceobj[obj.num]["type4"][obj.diff] ? reduceobj[obj.num]["type4"][obj.diff]++
                                : reduceobj[obj.num]["type4"][obj.diff] = 1
     }
   return reduceobj   
 }, {})

 let type1ttl = 0
 let type2ttl = 0
 let type3ttl = 0
 let type4ttl = 0

 Object.keys(p3obj).forEach(num => {
    if (p3obj[num]["type1"]) {
      Object.keys(p3obj[num]["type1"]).forEach(key => 
            type1ttl = type1ttl + p3obj[num]["type1"][key])
    }

    if (p3obj[num]["type2"]) {
      Object.keys(p3obj[num]["type2"]).forEach(key => 
            type2ttl = type2ttl + p3obj[num]["type2"][key])
    }

    if (p3obj[num]["type3"]) {
      Object.keys(p3obj[num]["type3"]).forEach(key => 
            type3ttl = type3ttl + p3obj[num]["type3"][key])
    }

    if (p3obj[num]["type4"]) {
      Object.keys(p3obj[num]["type4"]).forEach(key => 
            type4ttl = type4ttl + p3obj[num]["type4"][key])
    }
 })
 
 let typetotall = type1ttl + type2ttl + type3ttl
console.log("typetotall === length", typetotall === arrStat1.length)
console.log("typetotall === totalhits", typetotall, totalhits)

console.log("typetotall === totalhits", typetotall, totalhits)

 p3obj['p(E|W)'] = totalhits/totalwinnum
 p3obj["type1"] = type1ttl/typetotall
 p3obj["type2"] = type2ttl/typetotall 
 p3obj["type3"] = type3ttl/typetotall 
 p3obj["type4"] = type4ttl/typetotall 
 return p3obj
}

function getSummaryP3(summary, p3arr, p3obj) {
  summary.forEach(obj => {
    let diff = obj.diff, mindiff = obj.mindiff, maxdiff = obj.maxdiff
    obj['p3'] = 0
    p3arr.forEach(stobj => {
      if (obj.num === stobj.num) {
        if (diff === mindiff) {
          let p3 = p3obj["type1"] * p3obj["totalhits"]
          obj['p3'] = p3
        }

        if (diff === maxdiff) {
          let p3 = p3obj["type2"] * p3obj["totalhits"]
          obj['p3'] = p3
        }

        if (mindiff === maxdiff) {
          let p3 = p3obj["type3"] * p3obj["totalhits"]
          obj['p3'] = p3
        }

        if (diff === mindiff && diff === maxdiff && mindiff === maxdiff) {
          let p3 = p3obj["type1"] * p3obj["totalhits"] +
                   p3obj["type2"] * p3obj["totalhits"] +
                   p3obj["type3"] * p3obj["totalhits"]
          obj['p3'] = p3
        }
      }
    })
  })
}

function getDiffnProb(arrofobj) {

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
    tempobj['pn'] = 0;
    summary.push(tempobj)
  })
  return summary    
}

function renderzTable(objarr, prelotonum, reduceObj, p3arr) {
    $('#divtable').html("");
    $("<h4>").text("大樂透下期預測").css({textAlign: "center",fontWeight:"bold",color:"blue"})
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
          .append($("<th>").text("預測值")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
          )
        )
      .append($("<tbody>").attr({id:function() { return "tbody" + index }}))
      .appendTo($('#divtable'));

      let id = "#" + "tbody" + index;
      let tbody = $(id);

      obj.summary.forEach(function(obj, idx) {
        let diffzp = reduceObj[obj.num]["zps"]["diff"].toFixed(4)
        let mindiffzp = reduceObj[obj.num]["zps"]["mindiff"].toFixed(4)
        let maxdiffzp = reduceObj[obj.num]["zps"]["maxdiff"].toFixed(4)
        let intvzp = reduceObj[obj.num]["zps"]["intv"].toFixed(4)

        let colornum = "blue"
        let colordiff = "blue";
        let colordmindiff = "blue";
        let colormaxdiff = "blue";
        let colorintv = "blue";
        let colorp = "blue";
        
        prelotonum.forEach(prenum => {
          if(obj.num === prenum) colornum = "red"
        })

        /*if (!prelotonum.length) {
          p3arr.forEach(stobj => {
            if (obj.num === stobj.num) colornum = "red"
          })
        }*/

        if (obj.diff < 0) {
          colordiff = "red";
        }

        if (obj.maxdiff < 0) {
          colormaxdiff = "red";
        }

        if (obj.mindiff < 0) {
          colordmindiff = "red";
        }

        if (obj.intv >= 16) {
          colorintv = "red";
        }

        if (obj.pn >= 99.9) {
          colorp = "red";
        }

        $("<tr>").css({textAlign:"center"})                        
        .append($("<td>")   
         .append($("<input>") .attr({type:"text",class:"flex num"}).css({textAlign:"center",fontWeight:"bold",color:colornum}).prop("readonly",true)
           .val(obj.num+" - "+idx))
         )
        .append($("<td>") 
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colordiff}).prop("readonly",true)
           .val(`${obj.diff}    (${diffzp})`))
         )     
        .append($("<td>") 
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colordmindiff}).prop("readonly",true)
           .val(`${obj.mindiff}    (${mindiffzp})`))
         )
        .append($("<td>") 
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colormaxdiff}).prop("readonly",true)
           .val(`${obj.maxdiff}    (${maxdiffzp})`))
         )     
        .append($("<td>")   
         .append($("<input>") .attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorintv}).prop("readonly",true)
           .val(`${obj.intv}    (${intvzp})`))
         )
        /*.append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
         .val(obj.p.toFixed(4)))
         )*/          
        .append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
           .val(obj.pn.toFixed(4)))
         )
        .appendTo(tbody);
      })

      document.querySelectorAll(".num").forEach(num => {
        num.onclick = () => {
          num.style.color === "red" ? num.style.color = "blue" : num.style.color = "red"
        }
      })
   
    })

}

function renderTable(objarr, prelotonum, reduceObj) {
 
    $('#divtable').html("");
    $("<h4>").text("大樂透下期預測").css({textAlign: "center",fontWeight:"bold",color:"blue"})
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
          .append($("<th>").text("預測值")).css({textAlign:"center",fontSize:"0.9em",fontWeight:"bold"}) 
          )
        )
      .append($("<tbody>").attr({id:function() { return "tbody" + index }}))
      .appendTo($('#divtable'));

      let id = "#" + "tbody" + index;
      let tbody = $(id);

      obj.summary.forEach(function(obj, idx) {
        let colornum = "blue"
        let colordiff = "blue";
        let colordmindiff = "blue";
        let colormaxdiff = "blue";
        let colorintv = "blue";
        let colorp = "blue";
        
        /*prelotonum.forEach(prenum => {
          if(obj.num === prenum) colornum = "red"
        })*/

        if (obj.diff < 0) {
          colordiff = "red";
        }

        if (obj.maxdiff < 0) {
          colormaxdiff = "red";
        }

        if (obj.mindiff < 0) {
          colordmindiff = "red";
        }

        if (obj.intv >= 16) {
          colorintv = "red";
        }

        if (obj.pn >= 1.9) {
          colorp = "red";
        }

        $("<tr>").css({textAlign:"center"})                        
        .append($("<td>")   
         .append($("<input>") .attr({type:"text",class:"flex num"}).css({textAlign:"center",fontWeight:"bold",color:colornum}).prop("readonly",true)
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
         .append($("<input>") .attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorintv}).prop("readonly",true)
           .val(obj.intv))
         )
        /*.append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
         .val(obj.p.toFixed(4)))
         )*/          
        .append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
           //.val(obj.p1.toFixed(4)))
           .val(obj.pn.toFixed(4)))
         )
        .appendTo(tbody);
      })

      document.querySelectorAll(".num").forEach(num => {
        num.onclick = () => {
          num.style.color === "red" ? num.style.color = "blue" : num.style.color = "red"
        }
      })
   
    })
}

function formatAmount(n) {
   return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      //let minrecords = 108;
      let arr60 = arrOnChange.slice(0,indx1);
      let arrmin = arrOnChange.slice(0,arrOnChange.length - indx2);
      let arrmax = arrOnChange.slice(0,arrOnChange.length);
      
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
      
      let numofe = 0, numofneg = 0, numofintv = 0, lototemp = {}, sumarr = []
      summary.forEach(obj => {
        if (obj.intv >= 16) numofintv++
        if (obj.diff < 0 && obj.mindiff < 0 && obj.maxdiff < 0) numofneg++
        if (obj.diff === obj.mindiff || obj.diff === obj.maxdiff 
             || obj.mindiff === obj.maxdiff) numofe++
      })
      let pofintv = +((numofintv/49).toFixed(4))
      let pofneg = +((numofneg/49).toFixed(4))
      let pofe = +((numofe/49).toFixed(4))
      lototemp['date'] = predate
      lototemp['bonus'] = prebonus
      lototemp['lotonum'] = prelotonum
      lototemp['pofintv'] = pofintv
      lototemp['pofneg'] = pofneg
      lototemp['pofe'] = pofe
      summary.forEach(obj => {
        let sumobj = {}
        if (prelotonum.indexOf(obj.num) != -1) {
          sumobj['num'] = obj.num
          sumobj['diff'] = obj.diff
          sumobj['mindiff'] = obj.mindiff
          sumobj['maxdiff'] = obj.maxdiff
          sumobj['intv'] = obj.intv
          sumobj['p'] = obj.p
          sumarr.push(sumobj)
        }
      })
      lototemp['summary'] = sumarr
      loto649.push(lototemp)
    }

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