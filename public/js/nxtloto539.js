//predict next winning number by combining preloto539/analoto539.js
$(function() {
  let filterarr = loto539.filter(function(obj) {
      return obj["summary"];
    })

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
  
  filterarr.forEach(obj => {
    $("<option>").attr({class:"option",value:obj.date}).text(obj.date)
    .appendTo($("#selectdate"))
  })

  $("#selectdate").val("").on("change", function() {

    let prevfile = loto539.filter(function(obj) {
      return obj["date"] > $("#selectdate").val()
    })
    let prelotonum = []
    if (prevfile.length > 0 ) prelotonum = prevfile[(prevfile.length)-1]["lotonum"]

    let arrOnChange = loto539.filter(obj => obj["date"] <= $("#selectdate").val())
    let baseArr = arrOnChange.slice(1,arrOnChange.length)
    let basefilerarr = baseArr.filter(obj => obj["summary"])
    let summaryArr = basefilerarr.map(obj => obj["summary"])
    let totalrecord = summaryArr.length
    let reduceObj = getreduceObj(summaryArr)
    //
    let allStatArr = getStatAll(summaryArr)  //just for reference
    //
    updPcnt(reduceObj,totalrecord)
    getMaxnSum(reduceObj)

    let date = arrOnChange[0].date;
    let minrecords = 26;
    let arrmax = arrOnChange.slice(0,arrOnChange.length);
    let arrmin = arrOnChange.slice(0,arrOnChange.length - minrecords);
    let arr60 = arrOnChange.slice(0,60);

    let obj60 = getDiffnProb(arr60)
    let objmindiff = getMindiff(arrmin)
    let objmaxdiff = getMindiff(arrmax)

    let summary = [];
    Object.keys(reduceObj).sort((a,b)=>a-b).forEach(num => {
      let tempobj = {}  
      let diff = obj60[num]["deviation"]
      let intv = obj60[num]["neardist"];
      let p = obj60[num]["prob"];    
      let mindiff = objmindiff[num]["deviation"];
      let maxdiff = objmaxdiff[num]["deviation"];

      let diffpcnt = 0,mindiffpcnt = 0,maxdiffpcnt = 0,intvpcnt = 0 
      if (reduceObj[num]["2.diff"][diff]) {
        diffpcnt = reduceObj[num]["2.diff"][diff]["pcnt"]
      }
      if (reduceObj[num]["3.mindiff"][mindiff]) {
        mindiffpcnt = reduceObj[num]["3.mindiff"][mindiff]["pcnt"]
      }
      if (reduceObj[num]["4.maxdiff"][maxdiff]) {
        maxdiffpcnt = reduceObj[num]["4.maxdiff"][maxdiff]["pcnt"]
      }
      if (reduceObj[num]["5.intv"][intv]) {
        intvpcnt = reduceObj[num]["5.intv"][intv]["pcnt"]
      }
      let ttlrec = reduceObj[num]["1.count"]
      let numpcnt = ttlrec/totalrecord
      //option 1
      let pn = 0+(diffpcnt+mindiffpcnt+maxdiffpcnt+intvpcnt)
      //option2
      //let pn = numpcnt+(diffpcnt+mindiffpcnt+maxdiffpcnt+intvpcnt)
      //option3
      //let pn = numpcnt*(diffpcnt+mindiffpcnt+maxdiffpcnt+intvpcnt)

      tempobj['num'] = num;
      tempobj['diff'] = diff;
      tempobj['mindiff'] = mindiff;
      tempobj['maxdiff'] = maxdiff;
      tempobj['intv'] = intv;
      tempobj['p'] = p;
      tempobj['pn'] = pn;
      summary.push(tempobj)      
    })  


    let statArr = getStat(summary)       
    console.log("reduceObj:", reduceObj)
    let prenum539 = [{date: date, summary: summary}];
    prenum539[0].summary.sort((a, b) => b.pn - a.pn)
    //prenum539[0].summary.sort((a, b) => a - b)
    renderTable(prenum539, prelotonum);
   })
})


function getStat(summaryArr) {
    let arrStat = []
    summaryArr.forEach(obj => {
        if (obj.diff === obj.mindiff || obj.diff === obj.maxdiff || 
          obj.mindiff === obj.maxdiff) {
          arrStat.push(obj)
        }
    })
    return arrStat
  }

function getStatAll(summaryArr) {
  let len = summaryArr.length
  let arrStat1 = []
  let totalhits = 0
  summaryArr.forEach(arrofobj => {
    let hit = false
    arrofobj.forEach(obj => {
       if (obj.diff === obj.mindiff || obj.diff === obj.maxdiff || 
         obj.mindiff === obj.maxdiff) {
          arrStat1.push(obj)
          hit = true
       }
    })
    if (hit) totalhits++
  })
 //console.log("arrStat1", arrStat1)
 arrStat1.sort((a, b) => a.num - b.num)
 //console.log("arrStat1", arrStat1)
 let reduceStarObj = arrStat1.reduce((reduceobj, obj) => {
     if (obj.diff === obj.mindiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}

        if (reduceobj[obj.num]["count"]) reduceobj[obj.num]["count"]++
          else  reduceobj[obj.num]["count"] = 1
        
        reduceobj[obj.num]["type1"] = reduceobj[obj.num]["type1"] || {} 
        if (reduceobj[obj.num]["type1"][obj.diff]) reduceobj[obj.num]["type1"][obj.diff]++
          else reduceobj[obj.num]["type1"][obj.diff] = 1   
     }

     if (obj.diff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}

        if (reduceobj[obj.num]["count"]) reduceobj[obj.num]["count"]++
          else  reduceobj[obj.num]["count"] = 1
        
        reduceobj[obj.num]["type2"] = reduceobj[obj.num]["type2"] || {} 
        if (reduceobj[obj.num]["type2"][obj.diff]) reduceobj[obj.num]["type2"][obj.diff]++
          else reduceobj[obj.num]["type2"][obj.diff] = 1   
     }

     if (obj.mindiff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}

        if (reduceobj[obj.num]["count"]) reduceobj[obj.num]["count"]++
          else  reduceobj[obj.num]["count"] = 1
        
        reduceobj[obj.num]["type3"] = reduceobj[obj.num]["type3"] || {} 
        if (reduceobj[obj.num]["type3"][obj.mindiff]) reduceobj[obj.num]["type3"][obj.mindiff]++
          else reduceobj[obj.num]["type3"][obj.mindiff] = 1

        if (obj.diff === obj.mindiff && obj.diff === obj.maxdiff && obj.mindiff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}

        //no double count
        //if (reduceobj[obj.num]["count"]) reduceobj[obj.num]["count"]++
        //  else  reduceobj[obj.num]["count"] = 1
        
        reduceobj[obj.num]["type4"] = reduceobj[obj.num]["type4"] || {} 
        if (reduceobj[obj.num]["type4"][obj.diff]) reduceobj[obj.num]["type4"][obj.diff]++
          else reduceobj[obj.num]["type4"][obj.diff] = 1   
     }   
     }  
   return reduceobj   
 }, {})

 //total type1
 let type1ttl = 0
 let type2ttl = 0
 let type3ttl = 0
 let type4ttl = 0

 Object.keys(reduceStarObj).forEach(num => {
    if (reduceStarObj[num]["type1"]) {
      Object.keys(reduceStarObj[num]["type1"]).forEach(key => 
            type1ttl = type1ttl + reduceStarObj[num]["type1"][key])
    }

    if (reduceStarObj[num]["type2"]) {
      Object.keys(reduceStarObj[num]["type2"]).forEach(key => 
            type2ttl = type2ttl + reduceStarObj[num]["type2"][key])
    }

    if (reduceStarObj[num]["type3"]) {
      Object.keys(reduceStarObj[num]["type3"]).forEach(key => 
            type3ttl = type3ttl + reduceStarObj[num]["type3"][key])
    }

    if (reduceStarObj[num]["type4"]) {
      Object.keys(reduceStarObj[num]["type4"]).forEach(key => 
            type4ttl = type4ttl + reduceStarObj[num]["type4"][key])
    }

 })
 
 let typetotall = type1ttl + type2ttl + type3ttl
 reduceStarObj['totalhits'] = totalhits+"  "+((totalhits/len)*100).toFixed(2)+"%"
 reduceStarObj["type1"] = type1ttl+"  "+((type1ttl/typetotall)*100).toFixed(2)+"%"
 reduceStarObj["type2"] = type2ttl+"  "+((type2ttl/typetotall)*100).toFixed(2)+"%"
 reduceStarObj["type3"] = type3ttl+"  "+((type3ttl/typetotall)*100).toFixed(2)+"%"
 reduceStarObj["type4"] = type4ttl+"  "+((type4ttl/typetotall)*100).toFixed(2)+"%"

 console.log("reduceStarObj", reduceStarObj)

}


function getreduceObj(summaryArr) {
  let reduceObj = summaryArr.reduce((sumObj, arr) => {
  arr.forEach(obj => {
    sumObj[obj.num] = sumObj[obj.num] || {}
    if (sumObj[obj.num]["1.count"]) {
      sumObj[obj.num]["1.count"]++
    } else {
      sumObj[obj.num]["1.count"] = 1
    }

    sumObj[obj.num]['2.diff'] = sumObj[obj.num]['2.diff'] || {}
    sumObj[obj.num]['2.diff'][obj.diff] = sumObj[obj.num]['2.diff'][obj.diff] || {}
    if (sumObj[obj.num]['2.diff'][obj.diff]["count"]) {
      sumObj[obj.num]['2.diff'][obj.diff]["count"]++
    } else {
      sumObj[obj.num]['2.diff'][obj.diff]["count"] = 1
      sumObj[obj.num]['2.diff'][obj.diff]["pcnt"] = 0
    }

    sumObj[obj.num]['3.mindiff'] = sumObj[obj.num]['3.mindiff'] || {}
    sumObj[obj.num]['3.mindiff'][obj.mindiff] = sumObj[obj.num]['3.mindiff'][obj.mindiff] || {}
    if (sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"]) {
      sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"]++
    } else {
      sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"] = 1
      sumObj[obj.num]['3.mindiff'][obj.mindiff]["pcnt"] = 0
    }

    sumObj[obj.num]['4.maxdiff'] = sumObj[obj.num]['4.maxdiff'] || {}
    sumObj[obj.num]['4.maxdiff'][obj.maxdiff] = sumObj[obj.num]['4.maxdiff'][obj.maxdiff] || {}
    if (sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"]) {
      sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"]++
    } else {
      sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"] = 1
      sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["pcnt"] = 0
    }

    sumObj[obj.num]['5.intv'] = sumObj[obj.num]['5.intv'] || {}
    sumObj[obj.num]['5.intv'][obj.intv] = sumObj[obj.num]['5.intv'][obj.intv] || {}
    if (sumObj[obj.num]['5.intv'][obj.intv]["count"]) {
      sumObj[obj.num]['5.intv'][obj.intv]["count"]++
    } else {
      sumObj[obj.num]['5.intv'][obj.intv]["count"] = 1
      sumObj[obj.num]['5.intv'][obj.intv]["pcnt"] = 0
    }

   }) //forEach
    return sumObj
  },{})

  return reduceObj
}

function updPcnt(reduceObj,totalrecord) {
  let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]
  Object.keys(reduceObj).sort((a,b)=> {a-b})
  .forEach(num => {
    proArr.forEach(pro => {
      Object.keys(reduceObj[num][pro]).forEach(key => {
        let ttlrec = reduceObj[num]["1.count"]
        let pcnt1 = ttlrec/totalrecord
        let pcnt2 = reduceObj[num][pro][key]["count"]/ttlrec
        //let pcnt = pcnt1 + pcnt2
        let pcnt = pcnt2
        reduceObj[num][pro][key]["pcnt"] = pcnt
      })
    })  
  })
}

function getMaxnSum(reduceObj) {
  let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]
  Object.keys(reduceObj).sort((a,b)=> {a-b})
   .forEach(num => {
      let dfpro0 = 0, dfprop = 0, dfpron = 0, mnpro0 = 0, mnprop = 0, mnpron = 0, 
          mxpro0 = 0, mxprop = 0, mxpron = 0, prol = 0, proh = 0,summary = {}
      proArr.forEach(pro => {
        let maxpro = '', max = 0
        Object.keys(reduceObj[num][pro]).forEach(key => {
          let keyn = parseInt(key)
          //for summary
          if (pro === "2.diff") {
            if (keyn < 0) {
              dfpron = dfpron+reduceObj[num][pro][key]["count"]
            } else if (keyn === 0) {
              dfpro0 = dfpro0+reduceObj[num][pro][key]["count"]
            } else{
              dfprop = dfprop+reduceObj[num][pro][key]["count"]
            }
          } else if (pro === "3.mindiff") {
            if (keyn < 0) {
              mnpron = mnpron+reduceObj[num][pro][key]["count"]
            } else if (keyn === 0) {
              mnpro0 = mnpro0+reduceObj[num][pro][key]["count"]
            } else{
              mnprop = mnprop+reduceObj[num][pro][key]["count"]
            }
          } else if (pro === "4.maxdiff") {
            if (keyn < 0) {
              mxpron = mxpron+reduceObj[num][pro][key]["count"]
            } else if (keyn === 0) {
              mxpro0 = mxpro0+reduceObj[num][pro][key]["count"]
            } else{
              mxprop = mxprop+reduceObj[num][pro][key]["count"]
            }
          } else {
            if (keyn < 16) {
              prol = prol+reduceObj[num][pro][key]["count"]
            } else {
              proh = proh+reduceObj[num][pro][key]["count"]
            }
          }
          // get max
          if (reduceObj[num][pro][key]["count"] > max) {
            maxpro = key
            max = reduceObj[num][pro][key]["count"]
          }
        })
        //for summary
        if (pro === "2.diff") {
          summary["diff"] = {}
          summary["diff"]["n"] = dfpron
          summary["diff"]["npcnt"] = Math.round(dfpron/reduceObj[num]["1.count"]*100)
          summary["diff"]["z"] = dfpro0
          summary["diff"]["zpcnt"] = Math.round(dfpro0/reduceObj[num]["1.count"]*100)
          summary["diff"]["p"] = dfprop
          summary["diff"]["ppcnt"] = Math.round(dfprop/reduceObj[num]["1.count"]*100)
        } else if (pro === "3.mindiff") {
          summary["mindiff"] = {}
          summary["mindiff"]["n"] = mnpron
          summary["mindiff"]["npcnt"] = Math.round(mnpron/reduceObj[num]["1.count"]*100)
          summary["mindiff"]["z"] = mnpro0
          summary["mindiff"]["zpcnt"] = Math.round(mnpro0/reduceObj[num]["1.count"]*100)
          summary["mindiff"]["p"] = mnprop
          summary["mindiff"]["ppcnt"] = Math.round(mnprop/reduceObj[num]["1.count"]*100)
        } else if (pro === "4.maxdiff") {
          summary["maxdiff"] = {}
          summary["maxdiff"]["n"] = mxpron
          summary["maxdiff"]["npcnt"] = Math.round(mxpron/reduceObj[num]["1.count"]*100)
          summary["maxdiff"]["z"] = mxpro0
          summary["maxdiff"]["zpcnt"] = Math.round(mxpro0/reduceObj[num]["1.count"]*100)
          summary["maxdiff"]["p"] = mxprop
          summary["maxdiff"]["ppcnt"] = Math.round(mxprop/reduceObj[num]["1.count"]*100)
        } else {
          summary["intv"] = {}
          summary["intv"]["l"] = prol
          summary["intv"]["lpcnt"] = Math.round(prol/reduceObj[num]["1.count"]*100)
          summary["intv"]["h"] = proh
          summary["intv"]["hpcnt"] = Math.round(proh/reduceObj[num]["1.count"]*100)
        }
        //for max
        reduceObj[num][pro]["max"] = {}
        reduceObj[num][pro]["max"]["count"] = `( ${maxpro}:${max} )`
        reduceObj[num][pro]["max"]["maxkey"] = maxpro
        reduceObj[num][pro]["max"]["maxcount"] = max
      })
      reduceObj[num]["6.summary"] = summary
   })
}


function renderTable(objarr, prelotonum) {
 
    $('#divtable').html("");
    $("<h4>").text("今彩539下期預測").css({textAlign: "center",fontWeight:"bold",color:"blue"})
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
        let colornum = "blue";
        let colordiff = "blue";
        let colordmindiff = "blue";
        let colormaxdiff = "blue";
        let colorintv = "blue";
        let colorp = "blue";

        prelotonum.forEach(prenum => {
          if(obj.num === prenum) colornum = "red";
        })
 
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

        if (obj.pn >= 0.9) {
          colorp = "red";
        }

        $("<tr>").css({textAlign:"center"})                        
        .append($("<td>")   
         .append($("<input>") .attr({type:"text",class:"flex num"}).css({textAlign:"center",fontWeight:"bold",color:colornum}).prop("readonly",true)
           .val(obj.num+" - "+idx))
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
         .val(String(obj.p).substr(0,6)))
         )*/          
        .append($("<td>")
         .append($("<input>").attr({type:"text",class:"flex"}).css({textAlign:"center",fontWeight:"bold",color:colorp}).prop("readonly",true)
           .val(String(obj.pn).substr(0,4)))
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

       return resultobj;

} //getMaxdiff
  

function getpn(reduceObj, obj) {
      console.log("reduceObj", reduceObj)
      console.log("obj", obj)

      let num = obj.num, diff = obj.diff, mindiff = obj.mindiff, 
      maxdiff = obj.maxdiff, intv = obj.intv
      let numcount = reduceObj[num]["1.count"]
      let numpcnt = Math.round(numcount/226*100)
      let sumobj = reduceObj[num]["6.summary"]
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

      let ttlpcnt = (dfpcnt*mnpcnt*mxpcnt*intvpcnt)
      //let ttlpcnt = (dfpcnt+mnpcnt+mxpcnt+intvpcnt)
      //let pn = numpcnt * ttlpcnt
      return ttlpcnt
}

function formatAmount(n) {
   return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }  
  
