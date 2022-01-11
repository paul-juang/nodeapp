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

		/*sumObj[obj.num][obj.intv] = sumObj[obj.num][obj.intv] || {}
        if (sumObj[obj.num][obj.intv]["count"]) {
        	sumObj[obj.num][obj.intv]["count"]++
        } else {
        	sumObj[obj.num][obj.intv]["count"] = 1
        }*/
	})
    return sumObj
}, {})

console.log("reduceArr", reduceArr)

let sortarr = Object.keys(reduceArr)
.sort((a,b) => a-b)
.forEach( key => console.log(`
	${key}:${reduceArr[key]["1.count"]}次
	`))

})