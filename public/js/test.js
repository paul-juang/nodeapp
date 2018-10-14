

router.post("/ledger",function(req, res) {

  let arrOfobj = req.body.arrOfobj;

  async.waterfall([
    function(callback) {
      Ledger.collection.insert(arrOfobj, function(err,data) {
        if (err) {
          return callback(err)
        }
        console.log("insert collection success!")
        callback(null) 
      })
    },
    function(callback) {
      Ledger.find({}, function(err,data) {
        if (err) {
          return callback(err)
        }
        console.log("find all documents success!")
        callback(null,data) 
      }) 
    },
    function(arg1,callback) {
      let filterarr = arg1.filter(function(obj) {
       return /^\d{4}-\d{2}-\d{2}$/.test(obj.date);
     })
      callback(null,filterarr) 
    },
    function(arg1,callback) {
      let arrofaccts = arg1;
      let json = JSON.stringify(arrofaccts);
      fs.writeFile('Ledger.json', json, 'utf8', function(err) { 
        if (err) {
          console.log("write Ledger.json error!")
        }
        else{
          console.log("write Ledger.json success!")
        }
      }) 
      callback(null, arrofaccts)     
    },
    function(arg1,callback) {

      fs.readFile("acctClassRef.json","utf8", function(err,results) {
        if (err) {
          return callback(err);
        }
        let acctclassref = JSON.parse(results);
        callback(arg1,acctclassref);
      })

    }
    function(arg1,arg2,callback) { 

      let jsonArr = arg1;
      let acctclassref = arg2;

      jsonArr.sort(function(a,b) {
        let aPro = a["acctno"] + a["date"];
        let bPro = b["acctno"] + b["date"];
        return ((aPro < bPro) ? -1 : ((aPro > bPro) ? 1 : 0));
      });

      let acctObj = jsonArr.reduce(function(acctobj,obj) {
       acctobj[obj.acctno] = acctobj[obj.acctno] || [];
       acctobj[obj.acctno].push(
         {acctname: obj.acctname,dr:obj.dr,cr:obj.cr,date:obj.date}
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
          actclass = acctclassref[i];
        }
        else {
          acctclass = "";
        }

        let tempobj = {};

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
          tempobj.actclass = actclass;
          tempobj.printorder = printorder;
        })

        totalAcctArr.push(tempobj);

      }
      let json = JSON.stringify(totalAcctArr);
      fs.writeFile('trialBalance.json', json, 'utf8', function(err) { 
        if (err) {
          console.log("write trialBalance.json error!")
        }
        else{
          console.log("write trialBalance.json success!")
        }
      }) 
      callback(null, "waterfall operation success!")
    }],

    function(err,results) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(results)
        res.send("insert collection success!");
      } 
    })
})

