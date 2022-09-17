const indx1 = 60, indx2 = 120
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
   let stat649 = getStat649(num649)
   console.log("stat649 with (summary)", stat649)
   let statbad = stat649.filter(obj => !obj["summary"])
   console.log("statbad with (summary)", statbad)
//
   let stat649n = stat649.slice(0,30)
   //console.log("stat649n", stat649n)
   let arr1 = stat6490.filter(obj => obj["indexarr"]).map(obj => obj["indexarr"])
              .map(obj => obj["option1"]).map(obj => obj["arr2"])
   let arr2 = stat6490.filter(obj => obj["indexarr"]).map(obj => obj["indexarr"])
              .map(obj => obj["option2"]).map(obj => obj["arr2"])
   let arr3 = stat6490.filter(obj => obj["indexarr"]).map(obj => obj["indexarr"])
              .map(obj => obj["option3"]).map(obj => obj["arr2"])
   let arr4 = stat6490.filter(obj => obj["indexarr"]).map(obj => obj["indexarr"])
              .map(obj => obj["option4"]).map(obj => obj["arr2"]) 
   let indexarr = [arr1, arr2, arr3, arr4] 
   let indexobj = indexarr.reduce((indexobj, arrofarr, index) => {
       let option = ""
       if (index === 0) option = "option1"
       if (index === 1) option = "option2"
       if (index === 2) option = "option3"
       if (index === 3) option = "option4"
       arrofarr.forEach(arr => {
            arr.forEach(indx => {
              indexobj[option] = indexobj[option] || {}
              if (indexobj[option][indx]) indexobj[option][indx]++
                else indexobj[option][indx] = 1
            })
       })
       return indexobj
   }, {})         
  //console.log("indexobj", indexobj)
  let sum1 = Object.keys(indexobj['option1']).reduce((sum, n) => {
    let count = indexobj['option1'][n]
    return sum+(count*parseInt(n))
  }, 0)
  let sum2 = Object.keys(indexobj['option2']).reduce((sum, n) => {
    let count = indexobj['option2'][n]
    return sum+(count*parseInt(n))
  }, 0)
  let sum3 = Object.keys(indexobj['option3']).reduce((sum, n) => {
    let count = indexobj['option3'][n]
    return sum+(count*parseInt(n))
  }, 0)
  let sum4 = Object.keys(indexobj['option4']).reduce((sum, n) => {
    let count = indexobj['option4'][n]
    return sum+(count*parseInt(n))
  }, 0)

  //console.log("mean", sum1/180,sum2/180,sum3/180,sum4/180)
 let mean4 = sum4/180
 let var4 = Object.keys(indexobj['option4']).reduce((sum, n) => {
    let x = indexobj['option4'][n]
    return sum + (Math.pow((x-mean4), 2))/180
  }, 0)
 //console.log("var4", var4)
 let sd4 = Math.sqrt(var4)
 //console.log("sd4", sd4)
 
})

function getStat649(num649) {
  let stat649 = []
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
      let basemaparr = basefilerarr.map(obj => obj["summary"])
      let totalrecord = basemaparr.length
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
     //console.log("summary", summary)
      let reduceObj = getreduceObj(basemaparr, totalrecord)
      //console.log("reduceObj", reduceObj)
      getSummaryP1(reduceObj, summary)
      getSummaryP2(reduceObj, summary)
      let p3arr = getp3arr(summary)
      //console.log("sarr:", p3arr)
      let p3obj = getp3obj(basemaparr)
      //console.log("p3obj", p3obj)
      getSummaryP3(summary, p3arr, p3obj)
      
      let temp = {}
      temp['date'] = predate
      temp['bonus'] = prebonus
      temp['lotonum'] = prelotonum
      temp['summary'] = summary
      stat649.push(temp)
    }
  })
  stat6490 = stat649.filter(obj => obj["summary"])
  stat6490.forEach(obj => {
    let summary = obj.summary
    let lotonum = obj.lotonum
    let indexarr = {}
    let indexarr1 = getindexarr(summary,lotonum,"option1")
    let indexarr2 = getindexarr(summary,lotonum,"option2")
    let indexarr3 = getindexarr(summary,lotonum,"option3")
    let indexarr4 = getindexarr(summary,lotonum,"option4")
    indexarr["option1"] = indexarr1
    indexarr["option2"] = indexarr2
    indexarr["option3"] = indexarr3
    indexarr["option4"] = indexarr4
    obj['indexarr'] = indexarr
  })

  stat649.forEach(obj => {
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
          sumobj["p1"] = obj0.p1
          sumobj["p2"] = obj0.p2
          sumobj["p3"] = obj0.p3
          sumobj["pn"] = 0
        }
      })
      sumarr.push(sumobj)
    })
    obj["summary"] = sumarr
  })
  let therest = num649.slice(stat649.length)
  stat649 = [...stat649, ...therest]
  return stat649
  // functions
//----
function getSummaryP1(reduceObj, summary) {
  let numArr = Object.keys(reduceObj)
  summary.forEach(obj => { 
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
    obj['p1'] = p1
    }
  })
}

function getSummaryP2(reduceObj, summary) {
  let numArr = Object.keys(reduceObj)
  summary.forEach(obj => {
  if (numArr.indexOf(obj.num) != -1 ) {
    let diff = obj["diff"], mindiff = obj["mindiff"], 
    maxdiff = obj["maxdiff"], intv = obj["intv"]
    let diffpcnt2 = 0, mindiffpcnt2 = 0, maxdiffpcnt2 = 0, intvpcnt2 = 0
    let num = obj["num"], p2 = 0 

    diffpcnt2 = getzp(reduceObj, num, "diff", diff)
    mindiffpcnt2 = getzp(reduceObj, num, "mindiff", mindiff)
    maxdiffpcnt2 = getzp(reduceObj, num, "maxdiff", maxdiff)
    intvpcnt2 = getzp(reduceObj, num, "intv", intv)
    p2 = diffpcnt2+mindiffpcnt2+maxdiffpcnt2+intvpcnt2
    obj['p2'] = p2;
  }
   
  })
}



function getp3obj(basemaparr) {
  let len = basemaparr.length
  let arrStat1 = []
  let totalhits = 0
  basemaparr.forEach(arrofobj => {
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

 arrStat1.sort((a, b) => a.num - b.num)
 let p3obj = arrStat1.reduce((reduceobj, obj) => {
     if (obj.diff === obj.mindiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["count"] ? reduceobj[obj.num]["count"]++
                                : reduceobj[obj.num]["count"] = 1
        //if (reduceobj[obj.num]["count"]) reduceobj[obj.num]["count"]++
        //  else  reduceobj[obj.num]["count"] = 1
        reduceobj[obj.num]["type1"] = reduceobj[obj.num]["type1"] || {} 
        reduceobj[obj.num]["type1"][obj.diff] ? reduceobj[obj.num]["type1"][obj.diff]++
                                : reduceobj[obj.num]["type1"][obj.diff] = 1
        //if (reduceobj[obj.num]["type1"][obj.diff]) reduceobj[obj.num]["type1"][obj.diff]++
        //  else reduceobj[obj.num]["type1"][obj.diff] = 1   
     }

     if (obj.diff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["count"] ? reduceobj[obj.num]["count"]++
                                : reduceobj[obj.num]["count"] = 1

        //if (reduceobj[obj.num]["count"]) reduceobj[obj.num]["count"]++
         // else  reduceobj[obj.num]["count"] = 1
        
        reduceobj[obj.num]["type2"] = reduceobj[obj.num]["type2"] || {} 
        reduceobj[obj.num]["type2"][obj.diff] ? reduceobj[obj.num]["type2"][obj.diff]++
                                : reduceobj[obj.num]["type2"][obj.diff] = 1
        //if (reduceobj[obj.num]["type2"][obj.diff]) reduceobj[obj.num]["type2"][obj.diff]++
        //  else reduceobj[obj.num]["type2"][obj.diff] = 1   
     }

     if (obj.mindiff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["count"] ? reduceobj[obj.num]["count"]++
                                : reduceobj[obj.num]["count"] = 1

        //if (reduceobj[obj.num]["count"]) reduceobj[obj.num]["count"]++
        //  else  reduceobj[obj.num]["count"] = 1
        
        reduceobj[obj.num]["type3"] = reduceobj[obj.num]["type3"] || {} 
        reduceobj[obj.num]["type3"][obj.diff] ? reduceobj[obj.num]["type3"][obj.diff]++
                                : reduceobj[obj.num]["type3"][obj.diff] = 1
        //if (reduceobj[obj.num]["type3"][obj.mindiff]) reduceobj[obj.num]["type3"][obj.mindiff]++
          //else reduceobj[obj.num]["type3"][obj.mindiff] = 1   
     }  

     if (obj.diff === obj.mindiff && obj.diff === obj.maxdiff && obj.mindiff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["count"] ? reduceobj[obj.num]["count"]++
                                : reduceobj[obj.num]["count"] = 1
        reduceobj[obj.num]["type4"] = reduceobj[obj.num]["type4"] || {} 
        reduceobj[obj.num]["type4"][obj.diff] ? reduceobj[obj.num]["type4"][obj.diff]++
                                : reduceobj[obj.num]["type4"][obj.diff] = 1
        //if (reduceobj[obj.num]["type4"][obj.diff]) reduceobj[obj.num]["type4"][obj.diff]++
         // else reduceobj[obj.num]["type4"][obj.diff] = 1   
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
 p3obj['totalhits'] = totalhits/len  
 p3obj["type1"] = type1ttl/typetotall
 p3obj["type2"] = type2ttl/typetotall 
 p3obj["type3"] = type3ttl/typetotall 
 p3obj["type4"] = type4ttl/typetotall 
 return p3obj
}

}  //end of getStat649

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

function getreduceObj(basemaparr, totalrecord) {
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
         sumObj[obj.num][key][obj[key]]["count"] ? sumObj[obj.num][key][obj[key]]["count"]
         : sumObj[obj.num][key][obj[key]]["count"] = 1
       }
     })
   })
    return sumObj
  },{})
  Object.keys(reduceObj).sort((a, b) => a - b)
  .forEach(num => {
      let ttlcount = reduceObj[num]["count"] //totalrecord???
      Object.keys(reduceObj[num]).forEach(key => {
        Object.keys(reduceObj[num][key]).forEach(x => {
          let pcnt = reduceObj[num][key][x]["count"]/ttlcount
          reduceObj[num][key][x]["pcnt"] = pcnt
        })
      })
    })
  //console.log("reduceObj", reduceObj)
  return reduceObj
}

function getSummary(numarr, obj60, objmindiff, objmaxdiff, prelotonum) {
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

function getSummaryP1x(reduceObj, summary) {
  //up to 291 ok with summar.forEach
  let bad1cnt = 0
  Object.keys(reduceObj).sort((a,b)=>a-b).forEach((num, index) => {
    let diff = summary[index]["diff"],mindiff = summary[index]["mindiff"],     
        maxdiff = summary[index]["maxdiff"],intv = summary[index]["intv"]          
    let diffpcnt1 = 0,mindiffpcnt1 = 0,maxdiffpcnt1 = 0,intvpcnt1 = 0,
        p1 = 0    
    //if (!diff || !mindiff || !maxdiff || !intv) {
    if (diff === undefined || mindiff === undefined || maxdiff === undefined  || intv === undefined ) {
      console.log(`bad1 ${num} ${index}`)
      bad1cnt++
    }

  //if (diff != undefined && mindiff != undefined && maxdiff != undefined && intv != undefined) {
      if (reduceObj[num]["diff"][diff]) 
        diffpcnt1 = reduceObj[num]["diff"][diff]["pcnt"]
      if (reduceObj[num]["mindiff"][mindiff])
        mindiffpcnt1 = reduceObj[num]["mindiff"][mindiff]["pcnt"]
      if (reduceObj[num]["maxdiff"][maxdiff]) 
        maxdiffpcnt1 = reduceObj[num]["maxdiff"][maxdiff]["pcnt"]
      if (reduceObj[num]["intv"][intv]) 
        intvpcnt1 = reduceObj[num]["intv"][intv]["pcnt"]
    //}
    p1 = diffpcnt1+mindiffpcnt1+maxdiffpcnt1+intvpcnt1
    summary[index]['p1'] = p1;
    //p1 = diffpcnt1+mindiffpcnt1+maxdiffpcnt1+intvpcnt1
    //summary[index]['diffpcnt1'] = diffpcnt1;
    //summary[index]['mindiffpcnt1'] = mindiffpcnt1;
    //summary[index]['maxdiffpcnt1'] = maxdiffpcnt1;
    //summary[index]['intvpcnt1'] = intvpcnt1;
    //summary[index]['p1'] = p1;
  })
  if (bad1cnt > 0) console.log("bad1cnt", bad1cnt)

 /*summary.forEach(obj => { 
   try {
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
    obj['p1'] = p1
   }
   catch(err) {
     console.log("err", err.message)
   }    
  })*/
}

function getSummaryP2x(reduceObj, summary) {
  let bad2cnt = 0
  Object.keys(reduceObj).sort((a,b)=>a-b).forEach((num, index) => { 
    let diffpcnt2 = 0, mindiffpcnt2 = 0, maxdiffpcnt2 = 0, intvpcnt2 = 0,
        p2 = 0
    let diff = summary[index]["diff"],mindiff = summary[index]["mindiff"],     
        maxdiff = summary[index]["maxdiff"],intv = summary[index]["intv"]          
    
    //if (!diff || !mindiff || !maxdiff || !intv) {
      if (diff === undefined || mindiff === undefined || maxdiff === undefined  || intv === undefined ) {
      console.log(`bad2 ${num} ${index}`)
      bad2cnt++
     }

  //if (diff != undefined && mindiff != undefined && maxdiff != undefined && intv != undefined) {
      diffpcnt2 = getzp(reduceObj, num, "diff", diff)
      mindiffpcnt2 = getzp(reduceObj, num, "mindiff", mindiff)
      maxdiffpcnt2 = getzp(reduceObj, num, "maxdiff", maxdiff)
      intvpcnt2 = getzp(reduceObj, num, "intv", intv)
   // }
    p2 = diffpcnt2+mindiffpcnt2+maxdiffpcnt2+intvpcnt2
    summary[index]['p2'] = p2;
    //p2 = diffpcnt2+mindiffpcnt2+maxdiffpcnt2+intvpcnt2
    //summary[index]['diffpcnt2'] = diffpcnt2;
    //summary[index]['mindiffpcnt2'] = mindiffpcnt2;
    //summary[index]['maxdiffpcnt2'] = maxdiffpcnt2;
    //summary[index]['intvpcnt2'] = intvpcnt2;
    //summary[index]['p2'] = p2;
  })
  if (bad2cnt > 0) ("bad2cnt", bad2cnt)

  /*summary.forEach(obj => {
    try {
      let diff = obj["diff"], mindiff = obj["mindiff"], 
      maxdiff = obj["maxdiff"], intv = obj["intv"]
      let diffpcnt2 = 0, mindiffpcnt2 = 0, maxdiffpcnt2 = 0, intvpcnt2 = 0
      let num = obj["num"], p2 = 0 

      diffpcnt2 = getzp(reduceObj, num, "diff", diff)
      mindiffpcnt2 = getzp(reduceObj, num, "mindiff", mindiff)
      maxdiffpcnt2 = getzp(reduceObj, num, "maxdiff", maxdiff)
      intvpcnt2 = getzp(reduceObj, num, "intv", intv)
      p2 = diffpcnt2+mindiffpcnt2+maxdiffpcnt2+intvpcnt2
  //obj['diffpcnt2'] = diffpcnt2;
  //obj['mindiffpcnt2'] = mindiffpcnt2;
  //obj['maxdiffpcnt2'] = maxdiffpcnt2;
  //obj['intvpcnt2'] = intvpcnt2;
      obj['p2'] = p2;
      }
      catch(err){
        console.log("err", err.message)
      }
    })*/
}

function getzp(reduceObj, num, option, diff) {
  let keyarr = Object.keys(reduceObj[num][option])
  let ttlcnt = reduceObj[num]["count"]
  let ttl = Object.keys(reduceObj[num][option]).reduce((sum, x) => {
   let count = reduceObj[num][option][x]['count']
   return sum += count * parseInt(x)
  }, 0)

  let n = Object.keys(reduceObj[num][option]).reduce((sum, x) => {
   let count = reduceObj[num][option][x]['count']
   return sum += count 
  }, 0)
  let mean = ttl/n
  let s2 = Object.keys(reduceObj[num][option]).reduce((sum, x) => {
  let diff = Math.pow((parseInt(x) - mean), 2)
   return sum + diff
  }, 0)

  let sd = Math.sqrt(s2/(n-1))
  let z = Math.abs((diff - mean))/sd
  let zc = z.toFixed(1)
  let zp = 0.001
  if (zc <=  "3.8") {
    zp = 0.5 - ztable[zc]
  } 
  return zp
/*reduceObj[num][option]["mean"] = mean
reduceObj[num][option]["sd"] = sd
reduceObj[num][option]["z"] = z
reduceObj[num][option]["zp"] = zp 
reduceObj[num]["zps"] = reduceObj[num]["zps"] || {}
let key = option.substr(2)
reduceObj[num]["zps"][key] = zp*/
}
/*
function getp3obj(basemaparr) {
  let len = basemaparr.length
  let arrStat1 = []
  let totalhits = 0
  basemaparr.forEach(arrofobj => {
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

 arrStat1.sort((a, b) => a.num - b.num)
 let p3obj = arrStat1.reduce((reduceobj, obj) => {
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
     }  

     if (obj.diff === obj.mindiff && obj.diff === obj.maxdiff && obj.mindiff === obj.maxdiff) {
        reduceobj[obj.num] = reduceobj[obj.num] || {}
        reduceobj[obj.num]["type4"] = reduceobj[obj.num]["type4"] || {} 
        if (reduceobj[obj.num]["type4"][obj.diff]) reduceobj[obj.num]["type4"][obj.diff]++
          else reduceobj[obj.num]["type4"][obj.diff] = 1   
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
 p3obj['totalhits'] = totalhits/len  
 p3obj["type1"] = type1ttl/typetotall
 p3obj["type2"] = type2ttl/typetotall 
 p3obj["type3"] = type3ttl/typetotall 
 p3obj["type4"] = type4ttl/typetotall 
 return p3obj
}
*/

function getp3arr(basemaparr) {
  let arrStat = []
  basemaparr.forEach(obj => {
      if (obj.diff === obj.mindiff || obj.diff === obj.maxdiff || 
        obj.mindiff === obj.maxdiff) {
        arrStat.push(obj)
      }
  })
  return arrStat
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

function getindexarr(summary, lotonum, option) {
  if (option === "option1") summary.forEach(obj => obj["pn"] = obj["p1"])
  if (option === "option2") summary.forEach(obj => obj["pn"] = obj["p2"])
  if (option === "option3") summary.forEach(obj => obj["pn"] = obj["p1"]+obj["p3"])
  if (option === "option4") summary.forEach(obj => obj["pn"] = obj["p2"]+obj["p3"])
  summary.sort((a, b) => b.pn -a.pn)
  let indexarr = {}
  let arr1 = []
  let arr2 = []
  lotonum.forEach(num => {
    summary.forEach((obj, index) => {
      if (num === obj.num) {
        arr1.push(`${num}:${index}`)
        arr2.push(index)
      }
    })
  })
  indexarr["arr1"] = arr1
  indexarr["arr2"] = arr2.sort((a, b) => a - b)
  return indexarr 
}
