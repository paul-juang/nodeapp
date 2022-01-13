//statistics of num649
$(function() {
  let filterArr = loto649.slice(0,4)
  //let filterArr = loto649.filter(obj => obj["summary"] )
  console.log("filterArr", filterArr)
  let summaryArr = filterArr.map(obj => obj["summary"])
  console.log("summaryArr", summaryArr)

  let proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]

  let reduceArr = summaryArr.reduce((sumObj,arr) => {
    arr.forEach(obj => {

      sumObj[obj.num] = sumObj[obj.num] || {}
      if (sumObj[obj.num]["1.count"]) {
        sumObj[obj.num]["1.count"]++
      } else {
        sumObj[obj.num]["1.count"] = 1
      }
      
      proArr.forEach(pro => {
        sumObj[obj.num][pro] = sumObj[obj.num][pro] || {}
        sumObj[obj.num][pro][obj.diff] = sumObj[obj.num][pro][obj.diff] || {}
        if (sumObj[obj.num][pro][obj.diff]["count"]) {
          sumObj[obj.num][pro][obj.diff]["count"]++
        } else {
          sumObj[obj.num][pro][obj.diff]["count"] = 1
        }
      })

    })
    return sumObj
  }, {})

  console.log("reduceArr", reduceArr)

  displayUl(reduceArr,proArr)
})

function displayUl(reduceArr,proArr) {
  let sortedArr = Object.keys(reduceArr).sort((a,b) => a-b)

  let ulArr = sortedArr.reduce((numObj, num) => {
      numObj[num] = numObj[num] || [];
      let ln0 = reduceArr[num]['1.count']
      numObj[num].push(ln0)

      //proArr = ["2.diff", "3.mindiff","4.maxdiff","5.intv"]

      proArr.forEach(pro => {
        let keyarr = Object.keys(reduceArr[num][pro])
            .sort((a,b) => a-b)
        let arr0 = []
        keyarr.forEach(key => {
            let ln = `${key}:${reduceArr[num][pro][key]['count']}次`
            arr0.push(ln)
        }) //keyarr.forEach
        let ln = arr0.join(',')
        numObj[num].push(ln)
      })  // proArr.forEach
        
      return numObj
    }, {})
  console.log("ulArr",ulArr)

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
