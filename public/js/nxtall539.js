//get loto639 
$(function() {
   let loto539 = getNum539(num539)
   /*loto539.forEach((obj, index) => {
    let summary = obj.summary
    summary.forEach(sumobj => {
      if (sumobj.diff === {} || sumobj.mindiff === {} sumobj.maxdiff === {} 
           || sumobj.intv === {} || sumobj.intv === {}
        ) 
      {}

    })
   })*/
   console.log("loto539", loto539)
})

function getNum539(num539) {
  let loto539 = []
  let filterarr = num539.filter(obj => obj["date"] >"2020/01/08")

  let allDate = []
  filterarr.forEach(obj => {
    allDate.push(obj.date)
  })

  allDate.forEach(date0 => {
    let prevfile = num539.filter(function(obj) {
      return obj["date"] > date0
    })

    let prelotonum = [],predate = ""
    if (prevfile.length > 0 ) {
      prelotonum = prevfile[(prevfile.length)-1]["lotonum"]
      predate = prevfile[(prevfile.length)-1]["date"]
    }

    if (prelotonum.length != 0  ) {
      let arrOnChange = num539.filter(obj => obj["date"] <= date0)
      let baseArr = arrOnChange.slice(0,arrOnChange.length)
      let basefilerarr = baseArr.filter(obj => obj["summary"])
      let date = arrOnChange[0].date;
      let lotonum = arrOnChange[0].lotonum
      //let minrecords = 26;
      let minrecords = 126;
      let arrmax = arrOnChange.slice(0,arrOnChange.length);
      let arrmin = arrOnChange.slice(0,arrOnChange.length - minrecords);
      let arr60 = arrOnChange.slice(0,60);

      let obj60 = getDiffnProb(arr60)
      let objmindiff = getMinMaxdiff(arrmin)
      let objmaxdiff = getMinMaxdiff(arrmax)

      let numarr = [],max = 40
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
      temp['lotonum'] = prelotonum
      temp['summary'] = summary
      loto539.push(temp)
    }

  })

  loto539.forEach(obj => {
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
  return loto539

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

      let numarr = [],max = 40;
      for (let i = 1; i < max ; i++) {
        let n = i;
        if (n < 10) n = "0" + n;
        else n = String(n);
        numarr.push(n);
      }

      let p = 0, mean = 0,totalarr = arrofobj.length;
      p = 1/39 + 1/38 + 1/37 + 1/36 + 1/35;
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

      let numarr = [],max = 40;
      for (let i = 1; i < max ; i++) {
        let n = i;
        if (n < 10) n = "0" + n;
        else n = String(n);
        numarr.push(n);
      }
      let p = 0, mean = 0,totalarr = arrofobj.length;
      p = 1/39 + 1/38 + 1/37 + 1/36 + 1/35;
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