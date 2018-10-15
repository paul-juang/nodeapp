const fs = require('fs');
const async = require("async");
 async.waterfall([
    function(callback) {
      let arrofobjarr = fs.readFileSync("acctchart.txt","utf8")
      .trim()
      .split("\n")
      .map(function(line) {return line.split("\r")})
      .reduce(function(reducearr,arr) {
        reducearr.push(arr[0]);
        return reducearr;
      },[])
      .map(function(line) { 
        return line.split("\t")
      })
      .map(function(arr) {
        return arr.join("\t")
      })
      .map(function(line) {
        return line.split("\t")
      })
      let json = JSON.stringify(arrofobjarr);    
      fs.writeFile('acctchart.json', json, 'utf8', function(err,result){ 
        if(err) {
          console.log("write acctchart.json error");
        }else {}
        console.log("write acctchart.json success!")
      }); 
      callback(null,arrofobjarr)
    },
    function(arg1,callback) {
          let temparr = arg1; //save arg1 original
          let acctclass = temparr.filter(function(arr) {
            return arr[0].length == 2;
          })
          .reduce(function(reduceobj,arr) {
            reduceobj[arr[0]] = arr[1];
            return reduceobj;
          },{})
          let acctclassref = arg1.filter(function(arr) {
           return arr[0].length === 4;
         })
          .reduce(function(reduceobj,arr) {  
           let nosubstr = arr[0].substr(0,2);
           reduceobj[arr[0]] = reduceobj[arr[0]] || [];
           reduceobj[arr[0]].push(
           {
            acctname: arr[1],
            acctclass: acctclass[nosubstr]
          }
          )
           return reduceobj;
         },{})
          let filterarr = arg1.filter(function(arr) {
           return arr[0].length === 4;
         }) 
          let json = JSON.stringify(acctclassref);  
          fs.writeFile('acctclassx.json', json, 'utf8', function(err,result){ 
            if(err) {
              console.log("write acctclassx.json error!");
            }else {
              console.log("write acctclassx.json success!");
            }
          })   
          let returnobj = {acctclassref: acctclassref, arrofstrarr: filterarr}
          callback(null,returnobj) 
        }],
        function(err,results) {
          if (err) {
            console.log(err);
          }
         // res.send(results) //res.json(results) same result
          console.log("Operation Success!!")
        })
/*
  async.waterfall([
    function(callback) {
      let arrofobjarr = fs.readFileSync("acctchart.txt","utf8")
      .trim()
      .split("\n")
      .map(function(line) {return line.split("\r")})
      .reduce(function(reducearr,arr) {
        reducearr.push(arr[0]);
        return reducearr;
      },[])
      .map(function(line) { 
        return line.split("\t")
      })
      .map(function(arr) {
        return arr.join("\t")
      })
      .map(function(line) {
        return line.split("\t")
      })
      console.log("arrofobjarr:",JSON.stringify(arrofobjarr,null,2))

      let json = JSON.stringify(arrofobjarr);    
      fs.writeFile('acctchart.json', json, 'utf8', function(err,result){ 
        if(err) {
          console.log("write acctchart.json error");
        }else {}
         console.log("write acctchart.json success!")
      }); 
      callback(null,arrofobjarr)
    },
    function(arg1,callback) {
      let temparr = arg1; //save arg1 original
      let acctclass = temparr.filter(function(arr) {
        return arr[0].length == 2;
      })
      .reduce(function(reduceobj,arr) {
        reduceobj[arr[0]] = arr[1];
        return reduceobj;
      },{})

      let acctclassref = arg1.filter(function(arr) {
         return arr[0].length === 4;
      })
      .reduce(function(reduceobj,arr) {  
         let nosubstr = arr[0].substr(0,2);
         reduceobj[arr[0]] = reduceobj[arr[0]] || [];
         reduceobj[arr[0]].push(
           {
            acctname: arr[1],
            acctclass: acctclass[nosubstr]
           }
          )
         return reduceobj;
       },{})

      let json = JSON.stringify(acctclassref);   

       fs.writeFile('acctClassRef.json', json, 'utf8', function(err,result){ 
        if(err) {
          console.log("write acctClassRef.json error!");
        }else {
          console.log("write acctClassRef.json success!");
        }
       })    

      callback(null,"all operations success!") 
    }],
    function(err,result) {
      if (err) {
        console.log(err)
      }
        console.log(result)   
    })
*/


/*
let arrofobjarr = fs.readFileSync("acctclassref.json",'utf8').trim();
let json = JSON.parse(arrofobjarr,"utf8");    
console.log(typeof json)
console.log(json["1111"][0].acctname)
console.log(json["1111"][0].acctclass)
*/
 
    
/*
//test - get all accts by steps
console.log("Beginning...")

//step1
let step1 = fs.readFileSync("test.txt","utf8")
.trim()
.split("\n")
console.log("step1:",JSON.stringify(step1,null,2))

//step2
let step2 = step1.map(function(line) {return line.split("\r")})
console.log("step12:",JSON.stringify(step2,null,2))

//step3
let step3 =step2.reduce(function(reducearr,arr) {
 reducearr.push(arr[0]);
 return reducearr;
},[])
console.log("step3:",JSON.stringify(step3,null,2))

//step4
let step4 = step3.map(function(line) { 
  return line.split("\t")
})
console.log("step4:",JSON.stringify(step4,null,2))

//step5
let step5 = step4.map(function(arr) {
  return arr.join("\t")
})
console.log("step5:",JSON.stringify(step5,null,2))

//step6
let step6 = step5.map(function(line) {
  return line.split("\t")
})
console.log("step6:",JSON.stringify(step6,null,2))

//step7 
let step7 = step6.reduce(function(reduceobj,arr) { 
  if (arr[0].length === 4) {
    reduceobj[arr[0]] = reduceobj[arr[0]] || [];
    reduceobj[arr[0]].push(
      {
       cacctname: arr[1],
       eacctname: arr[2]
      }
   )
  }         
  return reduceobj;
},{})
console.log("step7:",JSON.stringify(step7,null,2))
*/


/*
//async.each example
let idx = 1;
let jsonarr = ["acctchartAllx.json","acctclassref.json"];

async.each(jsonarr,function(json,callback) {
    fs.readFile(json,"utf8",function(err,result) {
      if (err) {
        return callback("read error!")
      }
     let jsonobj = JSON.parse(result);
     if (idx === 1) {
         console.log("read an arr of strarr: jsonobj[0][1]",jsonobj[0][1]);
     }
     else {
         console.log("read an obj of arr of obj: jsonobj['1111']",jsonobj["1111"]);
     }

      idx++;
      callback("read success!")
    })
   
}
,function(err) {
  if (err) {
    console.log(err)
  }
  else {
    console.log("Each Operation Succeeds")
  }

})

*/

/*
//acctchart.txt
11  流動資產  current 
12  流動資產  property
13  長期資產  property , plant, and 
14  固定資產  current 
17  無形資產  intangible assets
18  其它資產  other assets
1111  庫存現金  cash on hand
1112  零用金/周轉金 petty cash/revolving funds
1113  銀行存款  cash in banks
1114  應收票據  notes receivable
1115  應收票據貼現  discounted notes receivable
1120  應收帳款  accounts receivable
1121  備抵呆帳-應收帳款 allowance for uncollec-tible accounts-accounts receivable
1211  商品存貨  merchandise inventory
1212  預付租金  prepaid rents
1213  預付保險費 prepaid insurance
1214  預付所得稅 prepaid income tax
1215  預付貨款  prepayment for purchases
1216  暫付款 temporary payments
1217  員工借支  advances to employees
1286  存出保證金 refundable deposits
1411  土地  land
1412  房屋及建物 buildings
1413  累積折舊-房屋及建物  accumulated depreciation-buildings
1414  機(器)具 machinery
1415  累積折舊-機(器)具  accumulated depreciation-machinery
1711  商標權 trademarks
1721  專利權 patents
1731  特許權 franchise
1741  著作權 copyright
1751  電腦軟體  computer software cost
1761  商譽  goodwill
1771  開辦費 organization 
21  流動負債  current 
22  流動負債  current 
23  長期負債  long-term liabilities
28  其它負債  other liabilities
2111  銀行借款  bank overdraft
2113  銀行透支  bank loan
2114  應付帳款  accounts payable
2131  應付票據  notes payable
2161  應付所得稅 income tax payable
2171  應付薪工  accrued payroll
2172  應付租金  accrued rent payable
2173  應付利息  accrued interest payable
2174  應付營業稅 accrued VAT payable
2175  應付稅捐-其它 accrued taxes payable-other
2198  其它應付款-其它  other payables-other
2261  預收貨款  sales revenue received in advance
2262  預收收入  revenue received in advance
2263  存入保證金 guarantee deposit received
31  資本  capital
32  資本公積  additional paid-in capital
33  保留盈餘(或累積虧損) retained earnings (accumulated deficit)
3114  資本  capital
3351  累積盈虧  accumulated profit or loss
3353  本期損益  net income or loss for current period
41  營業收入  operating revenue
4111  銷貨收入  sales revenue
4112  銷貨退回  sales revenue
4113  銷貨折讓  sales revenue
51  銷貨成本  operating costs
5111  銷貨成本  cost of goods sold
5121  進貨  purchases
5123  進貨退出  purchase returns
5124  進貨折讓  charges on purchased merchandise
61  營業費用  operating expenses
62  營業費用  operating expenses
6111  文具用品  office supplies (expense)
6112  旅費  travelling expense, travel
6113  運費  shipping expenses, freight
6114  郵電費 postage (expenses)
6115  修繕費 repair(s) and maintenance (expense)
6116  廣告費 advertisement expense, advertisement
6117  水電瓦斯費 utilities (expense)
6118  保險費 insurance (expense)
6119  交際費 entertainment (expense)
6120  伙食費 meal (expenses)
6166  稅捐  taxes
6167  呆帳損失  loss on uncollectible accounts
6168  折舊  depreciation expense
6213  薪資支出  payroll expense 
6214  租金支出  rent expense, rent
71  營業外收入及費用  non-operating revenue and expenses, other income(expense)
7111  利息收入  interest revenue/income
7112  租金收入  rent revenue/income
7113  佣金收入  commission revenue/income
7114  其它營業外收入-其它  other non-operating revenue-other items
7115  利息費用  interest expense
9999  本期損益摘要  net income or loss summary


*/