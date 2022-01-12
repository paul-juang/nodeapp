$(function() {
//let testArr = loto649.slice(0,10)
let testArr = loto649.filter(obj => obj["summary"] )
console.log("testArr", testArr)
let summaryArr = testArr.map(obj => obj["summary"])
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
        sumObj[obj.num]['4.maxdiff'][obj.mindiff] = sumObj[obj.num]['4.maxdiff'][obj.mindiff] || {}
		if (sumObj[obj.num]['4.maxdiff'][obj.mindiff]["count"]) {
		    sumObj[obj.num]['4.maxdiff'][obj.mindiff]["count"]++
		} else {
		    sumObj[obj.num]['4.maxdiff'][obj.mindiff]["count"] = 1
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
let keyarr = Object.keys(reduceArr["01"]['2.diff'])
.map(key => {
	return `
	  <li>${key}:${reduceArr["01"]['2.diff'][key]["count"]}次</li>
      `
}).join('')
console.log("keyarr", keyarr)

displayDiv(reduceArr)
})

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

