//statistics of num649
$(function() {
  console.log("new")
  //let filterArr = loto649.slice(0,10)
  let filterArr = loto649.filter(obj => obj["summary"] )
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
  displayUl(reduceArr)
})

function displayUl(reduceArr) {
  let sortedArr = Object.keys(reduceArr).sort((a,b) => a-b)

  let ulArr = sortedArr.reduce((numObj, num) => {
                let numObj[num] = numObj[num] = [];
                let ln0 = reduceArr[num]['1.count']
                let temparr = Object.keys(reduceArr[num]['2.diff'])
                              .sort((a,b) => a-b)
                let arr0 = []
                temparr.forEach(num => {
                  let ln = `${num}:${reduceArr[num]['2.diff']['count']次}`
                  arr0.push(ln)
                })
                ln1 = arr0.join(",")
                return numObj[num].push(ln0,ln1)
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
