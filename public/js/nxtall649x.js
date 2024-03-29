const indx1 = 60, indx2 = 120
$(function() {
   let stat649 = getStat649(num649)
   let stat6490 = stat649.slice(0,30)
   console.log("stat649", stat649)
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
      summary.sort((a,b) => a.num - b.num)
      
      let statArr = getStatArr(summary)
      //console.log("sarr:", statArr)

      let reduceObj = getreduceObj(basemaparr, totalrecord)
      //console.log("reduceObj", reduceObj)
      let reduceStatObj = getreduceStatObj(basemaparr)
      //console.log("reduceStatObj", reduceStatObj)

      getSummaryP1(reduceObj, summary)
      getSummaryP2(reduceObj, summary)
      getSummaryP3(summary, statArr, reduceStatObj)

      //console.log("summary", summary)

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
}

function getSummaryP1(reduceObj, summary) {
  Object.keys(reduceObj).sort((a,b)=>a-b).forEach((num, index) => {
    let diff = summary[index]["diff"],mindiff = summary[index]["mindiff"],     
        maxdiff = summary[index]["maxdiff"],intv = summary[index]["intv"]          
    let diffpcnt1 = 0,mindiffpcnt1 = 0,maxdiffpcnt1 = 0,intvpcnt1 = 0 
    if (reduceObj[num]["2.diff"][diff]) {
      diffpcnt1 = reduceObj[num]["2.diff"][diff]["pcnt"]
    }
    if (reduceObj[num]["3.mindiff"][mindiff]) {
      mindiffpcnt1 = reduceObj[num]["3.mindiff"][mindiff]["pcnt"]
    }
    if (reduceObj[num]["4.maxdiff"][maxdiff]) {
      maxdiffpcnt1 = reduceObj[num]["4.maxdiff"][maxdiff]["pcnt"]
    }
    if (reduceObj[num]["5.intv"][intv]) {
      intvpcnt1 = reduceObj[num]["5.intv"][intv]["pcnt"]
    }
    let p1 = diffpcnt1+mindiffpcnt1+maxdiffpcnt1+intvpcnt1
    summary[index]['diffpcnt1'] = diffpcnt1;
    summary[index]['mindiffpcnt1'] = mindiffpcnt1;
    summary[index]['maxdiffpcnt1'] = maxdiffpcnt1;
    summary[index]['intvpcnt1'] = intvpcnt1;
    summary[index]['p1'] = p1;
  })
}

function getSummaryP2(reduceObj, summary) {
  Object.keys(reduceObj).sort((a,b)=>a-b).forEach((num, index) => { 
    let diff = summary[index]["diff"],mindiff = summary[index]["mindiff"],     
        maxdiff = summary[index]["maxdiff"],intv = summary[index]["intv"]          
    let diffpcnt2 = getzp(reduceObj, num, "2.diff", diff)
    let mindiffpcnt2 = getzp(reduceObj, num, "3.mindiff", mindiff)
    let maxdiffpcnt2 = getzp(reduceObj, num, "4.maxdiff", maxdiff)
    let intvpcnt2 = getzp(reduceObj, num, "5.intv", intv)
    let p2 = diffpcnt2+mindiffpcnt2+maxdiffpcnt2+intvpcnt2
    summary[index]['diffpcnt2'] = diffpcnt2;
    summary[index]['mindiffpcnt2'] = mindiffpcnt2;
    summary[index]['maxdiffpcnt2'] = maxdiffpcnt2;
    summary[index]['intvpcnt2'] = intvpcnt2;
    summary[index]['p2'] = p2;
  })
}

function getSummaryP3(summary, statArr, reduceStatObj) {
  summary.forEach(obj => {
    let diff = obj.diff, mindiff = obj.mindiff, maxdiff = obj.maxdiff
    obj['p3'] = 0
    statArr.forEach(stobj => {
      if (obj.num === stobj.num) {
        if (diff === mindiff) {
          let p3 = reduceStatObj["type1"] * reduceStatObj["totalhits"]
          obj['p3'] = p3
        }

        if (diff === maxdiff) {
          let p3 = reduceStatObj["type2"] * reduceStatObj["totalhits"]
          obj['p3'] = p3
        }

        if (mindiff === maxdiff) {
          let p3 = reduceStatObj["type3"] * reduceStatObj["totalhits"]
          obj['p3'] = p3
        }

        if (diff === mindiff && diff === maxdiff && mindiff === maxdiff) {
          let p3 = reduceStatObj["type1"] * reduceStatObj["totalhits"] +
                   reduceStatObj["type2"] * reduceStatObj["totalhits"] +
                   reduceStatObj["type3"] * reduceStatObj["totalhits"]
          obj['p3'] = p3
        }
      }
    })
  })
}

function getreduceObj(basemaparr, totalrecord) {
  let reversearr = [];  
  for (var i = basemaparr.length - 1; i >= 0; i--) {
         reversearr.push(basemaparr[i]);
       }

  let reduceObj = reversearr.reduce((sumObj, arr, index) => {
    arr.forEach(obj => {
    sumObj[obj.num] = sumObj[obj.num] || {}
    if (sumObj[obj.num]["0.index"]) {
      sumObj[obj.num]["0.index"].push(index)
    } else{
      sumObj[obj.num]["0.index"]= [index]
    }

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

   })
    return sumObj
  },{})

  updPcnt(reduceObj,totalrecord)
  //getMaxnSum(reduceObj)
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

function getreduceStatObj(basemaparr) {
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
 let reduceStatObj = arrStat1.reduce((reduceobj, obj) => {
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

 Object.keys(reduceStatObj).forEach(num => {
    if (reduceStatObj[num]["type1"]) {
      Object.keys(reduceStatObj[num]["type1"]).forEach(key => 
            type1ttl = type1ttl + reduceStatObj[num]["type1"][key])
    }

    if (reduceStatObj[num]["type2"]) {
      Object.keys(reduceStatObj[num]["type2"]).forEach(key => 
            type2ttl = type2ttl + reduceStatObj[num]["type2"][key])
    }

    if (reduceStatObj[num]["type3"]) {
      Object.keys(reduceStatObj[num]["type3"]).forEach(key => 
            type3ttl = type3ttl + reduceStatObj[num]["type3"][key])
    }

    if (reduceStatObj[num]["type4"]) {
      Object.keys(reduceStatObj[num]["type4"]).forEach(key => 
            type4ttl = type4ttl + reduceStatObj[num]["type4"][key])
    }
 })
 
 let typetotall = type1ttl + type2ttl + type3ttl

 reduceStatObj['totalhits'] = totalhits/len  
 reduceStatObj["type1"] = type1ttl/typetotall
 reduceStatObj["type2"] = type2ttl/typetotall 
 reduceStatObj["type3"] = type3ttl/typetotall 
 reduceStatObj["type4"] = type4ttl/typetotall 
 return reduceStatObj
}

function getStatArr(basemaparr) {
    let arrStat = []
    basemaparr.forEach(obj => {
        if (obj.diff === obj.mindiff || obj.diff === obj.maxdiff || 
          obj.mindiff === obj.maxdiff) {
          arrStat.push(obj)
        }
    })
    return arrStat
}

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

function getzp(reduceObj, num, option, diff, prelotonum) {
  let diffobj = reduceObj[num][option]
  let diffkeys = Object.keys(diffobj)
  let keyarr = diffkeys.reduce((arr, num) => {
      let obj = {}
      //if (num !="max") {
         obj[num] = diffobj[num]["count"]
         arr.push(obj)
      //}
      return arr
  }, [])
//console.log("keyarr", keyarr)
  let ttl = 0
  let n = 0
  keyarr.forEach(obj => {
  for (let key in obj) {
    ttl = ttl + (key * obj[key])
    n = n + obj[key]
   }
 })
 let mean = ttl/n

 let ttls2 = 0
 keyarr.forEach(obj => {
  for (let key in obj) {
    let s2 = Math.pow((key - mean),2) * obj[key]
    ttls2 = ttls2 + s2
   }
 })
 let sd = Math.sqrt(ttls2/(n-1))
 //let sd = Math.sqrt(ttls2/n)
 let z = Math.abs((diff - mean))/sd
 let zc = z.toFixed(1)
 let zp = 0.001

 if (zc <=  "3.8") {
  zp = 0.5 - ztable[zc]
 } 

 reduceObj[num][option]["mean"] = mean
 reduceObj[num][option]["sd"] = sd
 reduceObj[num][option]["z"] = z
 reduceObj[num][option]["zp"] = zp

 reduceObj[num]["zps"] = reduceObj[num]["zps"] || {}
 let key = option.substr(2)
 reduceObj[num]["zps"][key] = zp
 return zp
}

function getintvzp(reduceObj, num, option, diff, prelotonum) {
  let idxArr = reduceObj[num]["0.index"]
    let intvarr = []
    for (let i = 0; i < idxArr.length-1; i++) {
      let intv = idxArr[i+1] - idxArr[i]
      intvarr.push(intv)
    }

    let len = intvarr.length   
    let ttlval = intvarr.reduce((sum, val) => sum + val)
    let mean = ttlval/intvarr.length
    let s2 = 0 
    intvarr.forEach(num => {
      s2 = s2 + Math.pow((num - mean), 2)
    })

    let sd = Math.sqrt(s2)
    let z = Math.abs((diff - mean))/sd
    let zc = z.toFixed(1)
    let zp = 0.001

    if (zc <=  "3.8") {
      zp = 0.5 - ztable[zc]
    } 

    let key = option.substr(2)+"2"
    reduceObj[num]["zps"] = reduceObj[num]["zps"] || {}
    reduceObj[num]["zps"][key] = zp
    return zp
}

//------------------

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
      //reduceObj[num]["6.summary"] = summary
   })
}

function getpn(reduceObj, obj) {
     
      let num = obj.num, diff = obj.diff, mindiff = obj.mindiff, 
      maxdiff = obj.maxdiff, intv = obj.intv
      let numcount = reduceObj[num]["1.count"]
      let numpcnt = Math.round(numcount/226*100)
      let sumobj = reduceObj[num]["6.summary"]
      let dfpcnt = 0, mnpcnt = 0, mxpcnt =0, intvpcnt = 0  
      //console.log(num)    
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
  