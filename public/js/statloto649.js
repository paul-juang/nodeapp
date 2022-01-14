//statistics of num649 winning numbers
$(function() {
  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  
  $("#return").on("click",function() {
    $(this).attr("href","/")  
  })
  $("<br>").appendTo('body');

  let filterArr = loto649.filter(obj => obj["summary"] && obj["date"] )
  console.log("filterArr", filterArr)
  let begdate = filterArr[0].date;
  let yyyyb = begdate.substr(0,4);
  let mmb = begdate.substr(5,2);
  let ddb = begdate.substr(8,2);
  begdate = yyyyb + "/" + mmb + "/" + ddb;
  let enddate = filterArr[filterArr.length-1].date;
  let yyyye = enddate.substr(0,4);
  let mme = enddate.substr(5,2);
  let dde = enddate.substr(8,2);
  enddate = yyyye + "/" + mme + "/" + dde;
  let dateperiod = enddate + " - " + begdate;
  let totalrecord = filterArr.length

  let summaryArr = filterArr.map(obj => obj["summary"])
  console.log("summaryArr", summaryArr)
  let reduceArr = summaryArr.reduce((sumObj,arr) => {
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
      }

      sumObj[obj.num]['3.mindiff'] = sumObj[obj.num]['3.mindiff'] || {}
      sumObj[obj.num]['3.mindiff'][obj.mindiff] = sumObj[obj.num]['3.mindiff'][obj.mindiff] || {}
      if (sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"]) {
        sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"]++
      } else {
        sumObj[obj.num]['3.mindiff'][obj.mindiff]["count"] = 1
      }

      sumObj[obj.num]['4.maxdiff'] = sumObj[obj.num]['4.maxdiff'] || {}
      sumObj[obj.num]['4.maxdiff'][obj.maxdiff] = sumObj[obj.num]['4.maxdiff'][obj.maxdiff] || {}
      if (sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"]) {
        sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"]++
      } else {
        sumObj[obj.num]['4.maxdiff'][obj.maxdiff]["count"] = 1
      }

      sumObj[obj.num]['5.intv'] = sumObj[obj.num]['5.intv'] || {}
      sumObj[obj.num]['5.intv'][obj.intv] = sumObj[obj.num]['5.intv'][obj.intv] || {}
      if (sumObj[obj.num]['5.intv'][obj.intv]["count"]) {
        sumObj[obj.num]['5.intv'][obj.intv]["count"]++
      } else {
        sumObj[obj.num]['5.intv'][obj.intv]["count"] = 1
      }

  }) //forEach
    return sumObj
  }, {})

  console.log("reduceArr", reduceArr)
  displayUl(reduceArr,dateperiod,totalrecord)

})


function displayUl(reduceArr,dateperiod,totalrecord) {
  let sortedArr = Object.keys(reduceArr).sort((a,b) => a-b)
  let ulArr = sortedArr.reduce((numObj, num) => {
    numObj[num] = numObj[num] || [];
    let ln0 = reduceArr[num]['1.count']
    numObj[num].push(ln0)

    let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]
    proArr.forEach(pro => {
      let keyarr = Object.keys(reduceArr[num][pro])
      let arr0 = []
      keyarr.forEach(key => {
        let n = reduceArr[num][pro][key]['count'] 
        let cn = String(n)
        if (n < 10) cn = " "+cn
          let ln = `${key}:${cn}` 
        arr0.push(ln)
        }) //keyarr.forEach
      let ln = arr0.join(',\u2002\u2002')
      numObj[num].push(ln)
      })  // proArr.forEach

    return numObj
  }, {})
  console.log("ulArr",ulArr)
  $("<h4>").text("大樂透中獎號碼統計分析").css({textAlign: "center",fontWeight:"bold",color:"blue"})
  .appendTo('body')
  $("<h5>").text(`${dateperiod}  共${totalrecord}期`).css({textAlign: "center",fontWeight:"bold",color:"blue"})
  .appendTo('body')

  Object.keys(ulArr).sort((a,b)=>a-b).forEach(key => {
    let pernt = Math.round(ulArr[key][0]/totalrecord*100)
    $("<span>").css({fontSize:"1.2rem",fontWeight:"bold",color:"blue"})
    .text(`號碼:\u2002${key}\u2002\u2002次數:\u2002${ulArr[key][0]}\u2002\u2002${pernt}%`).appendTo('body');
    $("<ul>").attr({id: "ul"}).css({fontSize:"1.2rem",fontWeight:"bold",color:"blue"})
    .append($("<li>").text(`差數:\u2002\u2002\u2002\u2002${ulArr[key][1]}`))
    .append($("<li>").text(`mn差數: ${ulArr[key][2]}`))
    .append($("<li>").text(`mx差數: ${ulArr[key][3]}`))   
    .append($("<li>").text(`間距:\u2002\u2002\u2002\u2002${ulArr[key][4]}`)) 
    .appendTo('body')  
  })
}


function displayDiv(reduceArr) {
   let sortedArr = Object.keys(reduceArr).sort((a,b) => a-b)  
   $('<div>').attr({class:"container"})
   .html(`
    <ul>
    ${sortedArr.map(num => {
      return `
      <li>號碼:${num} 共出現${reduceArr[num]["1.count"]}次
      <ul>
      <li>diff:
      <ul>
      ${Object.keys(reduceArr[num]["2.diff"])
      .map(key=>{
        return `
        <li>${key}: ${reduceArr[num]["2.diff"][key]["count"]}次</li>
        `
      }).join('')
    }
    </ul>
    </li>
    <li>mindiff:
    <ul>
    ${Object.keys(reduceArr[num]["3.mindiff"])
    .map(key=>{
      return `
      <li>${key}: ${reduceArr[num]["3.mindiff"][key]["count"]}次</li>
      `
    }).join('')
  }
  </ul>
  </li>
  <li>maxdiff:
  <ul>
  ${Object.keys(reduceArr[num]["4.maxdiff"])
  .map(key=>{
    return `
    <li>${key}: ${reduceArr[num]["4.maxdiff"][key]["count"]}次</li>
    `
  }).join('')
  }
  </ul>
  </li>
  <li>intv:
  <ul>
  ${Object.keys(reduceArr[num]["5.intv"])
  .map(key=>{
    return `
    <li>${key}: ${reduceArr[num]["5.intv"][key]["count"]}次</li>
    `
  }).join('')
  }
  </ul>
  </li>
  </ul>
  </li>
  `
  }).join('')}

    </ul>
    `)
   .appendTo('body')
}
