const https = require('https');

const fs = require('fs');

const async = require("async");

const express = require('express');

const path = require('path');

const app = express();

require('dotenv').config()

const mongoose = require('mongoose');


//mongoose.Promise = global.Promise;
//const uri = 'mongodb+srv://paul:Jyuhnbor1234@cluster0.khrxx.mongodb.net/nodeappdb?retryWrites=true&w=majority'||process.env.MONGODB_URI;
/*mongoose.connect(uri,{useUnifiedTopology:true, useNewUrlParser:true}) 
.then(function(){
    console.log("Database connected ...");
});

*/
mongoose.connect(process.env.MONGODB_URI,{
  useUnifiedTopology:true, 
  useNewUrlParser:true,
  useCreateIndex:true
}); 
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected ...");
});

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

//app.set
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const Ledger = require("./models/ledger")
 
//home page
app.get("/",function(req, res) {
  res.render("homec");
});

//for agk menu

app.get("/treedata",function(req, res) {
  res.render("treedata_s");
});

app.get("/getdata",function(req, res) {
  fs.readFile("treeData.json","utf8", function(err,results) {  
      if (err) {
        return err;
      }
      else {
        let treedata = JSON.parse(results);
        res.send({treedata: treedata})
      }
    })
  
});

app.get("/agkdraw",function(req, res) {
  res.render("agkdraw");
});

app.get("/drawtree",function(req, res) {
  res.render("drawtree_s");
});



//test
app.get("/reactapp",function(req, res) {
 res.render("reactapp");
});

app.get("/reactapp3",function(req, res) {
 res.render("reactapp3");
});

app.get("/test", function(req, res) {
  res.render("test");
});

//starwar
app.get("/starwar",function(req, res) {
 res.render("starwar");
});

app.get("/getHttps",function(req, res) {

  let output = '';

  https.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",function(resp) {
    resp.on("data",function(chunk) {
      output += chunk;
    })
    
    resp.on("end",function() {
      output = JSON.parse(output);
      res.json({imgUrl:output.hdurl});
    })

  }).on("error",function(err) {
     console.log(err);
     res.send("error in getting NASA url")
    })
  
});

app.get("/nasa",function(req, resp) {

  
let hdUrl = "";

  https
  .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", res=>{
    let data = ""
    res.on("data", chunk => {
        data += chunk
    })

    res.on("end", () => {
        let url = JSON.parse(data).hdurl
        hdUrl = url
        resp.json({hdurl: hdUrl})
/*
        https.get(url, res =>{
          //response should be an image
          if (res.statusCode === 200 && res.headers['content-type'] === 'image/jpeg') {
            let img = new Stream()

            res.on("data", chunk => {
              img.push(chunk)
            })

            res.on("end", () => {
              let filename = __dirname + "/apod.jpg" 
              fs.writeFileSync(filename, img.read())
            })
          }
        })*/        
    })
  })
  .on("error", err => {
    console.log("error: " + err.mssage())
  })

});

//setacctchart   
app.get("/setacctchart",function(req, res) {
 res.render("setacctchart");
});

//acctchartdraw
app.get("/acctchartdraw",function(req, res) {
  res.render("acctchartdraw");
});


app.get("/ledger",function(req, res) {
  res.render("ledger");
});

/*
app.post("/ledger",function(req, res) {

  let arrOfobj = req.body.arrOfobj;

  async.waterfall([
    function(callback) {
      Ledger.collection.insert(arrOfobj, function(err,data) {
        if (err) {
          return callback(err)
        }
        res.send("insert collection success!");
        callback(null) 
      })
    },
    function(callback) {
      Ledger.find({}, function(err,data) {
        if (err) {
          return callback(err)
        }
        callback(null,data) 
      }) 
    },
    function(arg1,callback) {
      let filterarr = arg1.filter(function(obj) {
         return /^\d{4}-\d{2}-\d{2}$/.test(obj.date) && obj.date > "2018-08-31";
        // return /^\d{4}-\d{2}-\d{2}$/.test(obj.date);
     })
//
     let json = JSON.stringify(filterarr);
      fs.writeFile('acctdate.json', json, 'utf8', function(err) { 
        if (err) {
          console.log("write acctdate.json error!")
        }
      })
//
      callback(null,filterarr) 
    },
    function(arg1,callback) {
      let arrofaccts = arg1;
      arrofaccts.sort(function(a,b) {
        aPro = a.acctno + a.date;
        bPro = b.acctno + b.date;
        return ((aPro < bPro) ? -1 : ((aPro > bPro) ? 1 : 0));
      });
      let acctObj = arrofaccts.reduce(function(acctobj,obj) {
       acctobj[obj.acctno] = acctobj[obj.acctno] || [];
       acctobj[obj.acctno].push(
       {
        acctno: obj.acctno,
        acctname: obj.acctname,
        dr:obj.dr,
        cr:obj.cr,
        date:obj.date
      }
      )
       return acctobj; 
     }, {});

      for (let i in acctObj) {

       let drttl = 0;
       let crttl = 0;

       acctObj[i].forEach(function(obj) {

         if (obj.dr) {
           drttl = drttl + obj.dr;
         }

         if (obj.cr) {
           crttl = crttl + obj.cr;
         }

       })

       let bal = drttl - crttl;
       if (bal > 0) {
         drbal = bal;
         acctObj[i].push(
         {
          acctname: "",
          dr: drbal, 
          cr: null,
          date: "結餘"
        }
        )
       }

       if (bal < 0) {
         bal = Math.abs(bal)
         crbal = bal;
         acctObj[i].push(
         {
          acctname: "",
          dr: null,
          cr: crbal,
          date: "結餘"
        }
        )
       }

     }
     let json = JSON.stringify(acctObj);
     fs.writeFile('Ledger.json', json, 'utf8', function(err) { 
      if (err) {
        console.log("write Ledger.json error!")
      }
    }) 
     callback(null, arrofaccts)     
   },
   function(arg1,callback) {
    let jsonArr = arg1;
    fs.readFile("acctclassx.json","utf8", function(err,results) {  //acctClassRef
      if (err) {
        return callback(err);
      }
      let acctclassref = JSON.parse(results);
      callback(null,jsonArr,acctclassref);
    })
  },
  function(arg1,arg2,callback) { 

    //temparary fix - duplicate bank liabity account
let filtertemp = arg1.filter(function(obj) {
   return obj.acctno !== "2112";
  })
//
    let jsonArr = filtertemp;
    let acctclassref = arg2;

    let acctObj = jsonArr.reduce(function(acctobj,obj) {
     acctobj[obj.acctno] = acctobj[obj.acctno] || [];
     acctobj[obj.acctno].push(
     {
      acctno: obj.acctno,
      acctname: obj.acctname,
      dr:obj.dr,
      cr:obj.cr,
      date:obj.date
    }
    )
     return acctobj; 
   }, {});

    let  totalAcctArr = [];

    for (let i in acctObj) {

      let drttl = 0;
      let crttl = 0;
      let printorder = i.substr(0,2);
      let acctclass = "";
      if (acctclassref[i]) {
        acctclass = acctclassref[i][0].acctclass;
      }
      else {            // fix for acctno has no acctclass
        switch(i) {
          case "1120":
          acctclass = "流動資產";
          break;

          case "1217":
          acctclass = "流動資產";
          break;

          case "1412 ":
          acctclass = "固定資產";
          break;

          case "1414":
          acctclass = "固定資產";
          break;

          case "1431":
          acctclass = "固定資產";
          break;

          case "1441":
          acctclass = "固定資產";
          break;

          case "2141":
          acctclass = "流動負債";
          break;

          case "2114":
          acctclass = "流動負債";
          break;


          case "3114":
          acctclass = "資本";
          break;

          case "4111":
          acctclass = "銷貨收入"
          break;

          case "4112":
          acctclass = "銷貨收入";
          break;

          case "4113":
          acctclass = "銷貨收入";
          break;

          case "5121":
          acctclass = "進貨成本"
          break;

          case "5122":
          acctclass = "進貨成本"
          break;

          case "5123":
          acctclass = "進貨成本"
          break;

          default:
          acctclass = i + "???";
          
        }
      }

      let tempobj = {};

      tempobj.acctno = acctObj[i][0].acctno;
      tempobj.acctname = acctObj[i][0].acctname;

      acctObj[i].forEach(function(arr,index) {
        if (acctObj[i][index].dr) {
          drttl = drttl + acctObj[i][index].dr;
        }
        if (acctObj[i][index].cr) {
          crttl = crttl + acctObj[i][index].cr;
        }  
        let diff = drttl - crttl;
        let drbal = 0;
        let crbal = 0;
        if (diff > 0) { 
          drbal = diff;
        }
        if (diff < 0) { 
          crbal = Math.abs(diff);
        }
        tempobj.drttl = drbal;
        tempobj.crttl = crbal;        
        tempobj.acctclass = acctclass;
        tempobj.printorder = printorder;
      })

      totalAcctArr.push(tempobj);

    }
    let trialBalance = totalAcctArr;

    let gttldr = 0;
    let gttlcr = 0;
    totalAcctArr.forEach(function(obj) {
      gttldr += obj.drttl;
      gttlcr += obj.crttl;
    })

    totalAcctArr.push(
    {
      acctname: "總計",
      drttl: gttldr,
      crttl: gttlcr
    }
    )

    let json = JSON.stringify(totalAcctArr);
    fs.writeFile('trialBalance.json', json, 'utf8', function(err) { 
      if (err) {
        console.log("write trialBalance.json error!")
      }
    })

    callback(null, trialBalance)
  },
  function(arg1,callback) {

  let filterrevnue = arg1.filter(function(obj) {
   return obj.acctno >= "4000" && obj.acctno < "5000"
  })
  let reducerevenue = filterrevnue.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

  let filterpurchase = arg1.filter(function(obj) {
   return obj.acctno >= "5000" && obj.acctno < "6000"
  })
  let reducepurchase = filterpurchase.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});


  let filterexpense = arg1.filter(function(obj) {
   return obj.acctno >= "6000" && obj.acctno < "7000"
  })

  let reduceexpense = filterexpense.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

    //calculatr net incom or loss
    let filternet = arg1.filter(function(obj) {
        return obj.acctno >= "4000" && obj.acctno < "7000"
    });

    let gttldr = 0;
    let gttlcr = 0;

    filternet.forEach(function(obj) {
       gttldr += obj.drttl;
       gttlcr += obj.crttl;

    })

    let diff = gttlcr - gttldr;
    let bal = 0;
    let ndrttl = 0;
    let ncrttl = 0;
    let gdrttl = 0;
    let gcrttl = 0;

    if (diff >= 0) {
       bal = diff;
       ndrttl = bal;
       gdrttl = gttldr + bal;
       gcrttl = gttlcr;
    }
    else {
       bal = Math.abs(diff);
       ncrttl = bal;
       gdrttl = gttldr;
       gcrttl = gttlcr + bal;
    }

    let netobj = {
       本期損益 : [
         {
          acctname: "本期損益",
          drttl: ndrttl,
          crttl: ncrttl
         },
         {
          acctname: "總計",
          drttl: gdrttl,
          crttl: gcrttl
         }
       ]
    }
  let incomestatementArr = [
      reducerevenue,
      reducepurchase,
      reduceexpense,
      netobj
  ];

  let json = JSON.stringify(incomestatementArr);
    fs.writeFile('incomeStatement.json', json, 'utf8', function(err) { 
      if (err) {
        console.log("write incomestatementArr.json error!")
      }
    })

  callback(null,arg1);

},


function(arg1,callback) {
  let filtercurrentasset = arg1.filter(function(obj) {
   return obj.acctno >= "1000" && obj.acctno < "1400";
 })

  let reducecurrentasset = filtercurrentasset.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

  let filterfixedasset = arg1.filter(function(obj) {
   return obj.acctno >= "1411" && obj.acctno < "1600"
 })

  let reducefixedasset = filterfixedasset.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

  let filtercurrentliability = arg1.filter(function(obj) {
   return obj.acctno >= "2000" && obj.acctno < "2300"
 })
  let reducecurrentliability = filtercurrentliability.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

  let filterlongtermliability = arg1.filter(function(obj) {
   return obj.acctno >= "2321" && obj.acctno < "2400";
 })
  let reducelongtermliability = filterlongtermliability.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

  let filtercapital = arg1.filter(function(obj) {
   return obj.acctno >= "3111" && obj.acctno < "3200";
 })
  let reducecapital = filtercapital.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

  let filterretainedearning = arg1.filter(function(obj) {
   return obj.acctno >= "3351" && obj.acctno < "3400"
 })

  let reduceretainedearing = filterretainedearning.reduce(function(reduceobj,obj) {
    reduceobj[obj.acctclass] = reduceobj[obj.acctclass] || [];
    reduceobj[obj.acctclass].push(
    {
      acctname: obj.acctname,
      drttl: obj.drttl,
      crttl: obj.crttl
    }

    )
    return reduceobj;
  },{});

  let balancesheetArr = [
        reducecurrentasset,
        reducefixedasset,
        reducecurrentliability,
        reducelongtermliability,
        reducecapital,
        reduceretainedearing
     ];

  let json = JSON.stringify(balancesheetArr);
  fs.writeFile('balanceSheet.json', json, 'utf8', function(err) { 
    if (err) {
      console.log("write balancesheet.json error!")
    }
  })
  callback(null,"waterfall operation success!")

}

],
function(err,results) {
  if (err) {
    console.log("err");
  }
  else {
    console.log(results)
  } 
 })
})

*/



//generalledger
app.get("/generalledger",function(req, res) {
  res.render("generalledger");
  });


//adjustledger
app.get("/adjustledger",function(req, res) {
  res.render("adjustledger");
  });
     
app.get("/ledgerdraw",function(req, res) {
  res.render("ledgerdraw");
  });

app.get("/trialbalance",function(req, res) {
    res.render("trialbalance");
  });

app.get("/incomestatement",function(req, res) {
    res.render("incomestatement");
  });

app.get("/balancesheet",function(req, res) {
    res.render("balancesheet");
  });


//account init
app.get("/acctinit",function(req, res) {
  res.render("acctinit");
});


//initial set up with ajac call from acctinit
app.get("/init",function(req, res) {
  async.waterfall([
    function(callback) {
      let arrofobjarr = fs.readFileSync("acctchartx.txt","utf8")
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
          console.log("write acctChartAllx.json error");
        }else {}
        console.log("write acctChartAllx.json success!")
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
          fs.writeFile('acctClassRef.json', json, 'utf8', function(err,result){ 
            if(err) {
              console.log("write acctClassRef.json error!");
            }else {
              console.log("write acctClassRef.json success!");
            }
          })   
          let returnobj = {acctclassref: acctclassref, arrofstrarr: filterarr}
          callback(null,returnobj) 
        }],
        function(err,results) {
          if (err) {
            console.log(err);
          }
          res.send(results) //res.json(results) same result
          console.log("Operation Success!!")
        })
});


app.get("/d3test",function(req, res) {
  res.render("d3test");
});

app.get("/imggallery",function(req, res) {
  res.render("imggallery");
});

app.get("/loto539",function(req, res) {
  res.render("loto539");
});

app.get("/loto649",function(req, res) {
  res.render("loto649");
});

//for heroku demo system
app.get("/loto539x",function(req, res) {
  res.render("loto539x");
  });

app.get("/loto649x",function(req, res) {
  res.render("loto649x");
  });

app.get("/asloto649",function(req, res) {
  res.render("asloto649");
});

app.get("/asloto539",function(req, res) {
  res.render("asloto539");
});

app.get("/coloto649",function(req, res) {
 res.render("coloto649");
});

app.get("/coloto649x",function(req, res) {
 res.render("coloto649x");
});

app.get("/coloto539",function(req, res) {
 res.render("coloto539");
});

app.get("/coloto539x",function(req, res) {
 res.render("coloto539x");
});

app.get("/suloto649",function(req, res) {
 res.render("suloto649");
});

app.get("/suloto539",function(req, res) {
 res.render("suloto539");
});

app.get("/suloto649x",function(req, res) {
 res.render("suloto649x");
});

app.get("/suloto539x",function(req, res) {
 res.render("suloto539x");
});

app.get("/preloto649",function(req, res) {
 res.render("preloto649");
});

app.get("/preloto649x",function(req, res) {
 res.render("preloto649x");
});

app.get("/preloto539",function(req, res) {
 res.render("preloto539");
});

app.get("/preloto539x",function(req, res) {
 res.render("preloto539x");
});


/*
//use app
app.use(require('./routes/tree'));

app.use(require('./routes/ledger'));

app.use(require('./routes/agk'));

app.use(require('./routes/loto'));
*/

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});

