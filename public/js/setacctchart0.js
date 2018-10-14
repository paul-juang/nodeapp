//process ledger accounts

$.extend(jQuery.expr[':'], {
  focusable: function (el, index, selector) {
    return $(el).is('a, button, :input, [tabindex]');
  }
});

$(document).on('keypress', 'input,select', function (e) {
  if (e.which == 13) {
    e.preventDefault();
  var $canfocus = $(':focusable');  // Get all focusable elements on the page
  var index = $canfocus.index(this) + 1;
  if (index >= $canfocus.length) index = 0;
  $canfocus.eq(index).focus();
  }
});

$(function() {
  $("#submit").prop("disabled",true)
  $("#save").prop("disabled",true)

  $("<a>").attr({href:"\home",id:"return",title:"返回首頁"}).text("\u21B6").appendTo('body');
  $("<a>").attr({href:"\acctchartdraw",id:"print",title:"列印"}).text("\u2399").appendTo('body');
  $("<br>").appendTo('body');

  let jsonarr = ["acctChartAllx.json","acctClassRef.json","acctchart.json", "acctclassx.json"];
  
  async.map(jsonarr,function(json,callback) {
    $.getJSON(json,function(result) {
      callback(null,result)
    })        
  },
  function(err,result) {
    if (err) {
      console.log(err)
    }
    let acctchart1 = result[0];
    let acctclass1 = result[1];
    let acctchart2 = result[2];
    let acctclass2 = result[3];
    console.log("acctchart: ", acctchart1)
    console.log("acctclass: ", acctclass1);
    console.log("acctchart2: ", acctchart2)
    console.log("acctclass2: ", acctclass2);

//temparary

    let tempresult = acctchart1; 
    let acctclass = tempresult.filter(function(arr) {
          return arr[0].length == 2;
         })
         .reduce(function(reduceobj,arr) {
          reduceobj[arr[0]] = arr[1];
          return reduceobj;
         },{})
    console.log("acctclass",acctclass)
    let lastindex = 0;
    let tempArr = result.filter(function(arr) {
           return  arr[0].length === 4;
         })
         .reduce(function(reducearr,arr) {
              let subno = arr[0].substr(0,2)
              reducearr.push(
                {
                 acctno: arr[0],
                 acctname:  arr[1],
                 lastindex: lastindex,
                 cindex: "index" + lastindex,
                 listorder: subno,
                 classname: acctclass[subno]
               }
             )
              lastindex++;
              return reducearr;
        },[]);

    renderTablex(tempArr);     

//
    processLedger(acctchart,acctclass)
  });


  function processLedger(acctchart,acctclass) {

/*
    let today = new Date(); 
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10) {
      dd = '0'+dd
    } 
    if(mm<10) {
      mm = '0'+mm
    } 
    today = yyyy + '-' + mm + '-' + dd;
    $("#today").val(today);
*/
   // $("table").hide();
    $("#acctno").focus(); 

    let sugChart = [];
    let acctChart = acctchart.filter(function(arr) {
      return arr[0].length === 4;
    });

    for(let prop in acctChart) {
      sugChart.push({
        value: acctChart[prop][0] + " " + acctChart[prop][1],
        data: acctChart[prop][1]
      })     
    }
    console.log("sugChart: ",sugChart)
    $('#acctno').autocomplete({
      lookup: sugChart,
      minChars: 1,
      lookupLimit: 10,
      lookupFilter: function (suggestion, query, queryLowerCase) {
        return suggestion.value.toLowerCase().indexOf(queryLowerCase) === 0;
      },
      onSelect: function (suggestion) {
        let sacctno = suggestion.value.substr(0,4);
        let sacctname = suggestion.data
        $("#acctno").val(sacctno);
        $("#acctname").val(sacctname);
        $("#dr").focus();
      }
    });


    $("#acctno").on("keypress",function() {
      //$("#submit").prop("disabled",false);
      //$("#acctno").removeClass('danger');
     // $('#acctname').removeClass('danger');
      //$("#errmsg1").text('');
      //$("#errmsg2").text('');
    });

    $("#acctno").on("blur",function(e) {
       let prop = $(this).val();
         if (!acctclass[prop]) {
          $(this).val("");
          $("#acctname").val("");
        }
        else {
          $("#acctname").val(acctclass[prop][0].acctname);
         // $("#acctno").removeClass('danger');
         // $('#acctname').removeClass('danger');
         // $("#errmsg1").text('');
         // $("#errmsg1").text('');
          //$("#dr").focus();
        }
    });

/*

    $("#acctname").on("focus",function() {
      $("#dr").focus();
    })

    $("#dr").on("keypress",function() {
       $("#dr").removeClass('danger');
       $("#cr").removeClass('danger');
    })

    $("#cr").on("keypress",function() {
       $("#dr").removeClass('danger');
       $("#cr").removeClass('danger');
    })

*/
    let tempArr = [];
    
    $('#create-form').on('submit', function(e) {
      e.preventDefault();
      let createacctno = $('#acctno').val().trim();
      let createacctname = $('#acctname').val().trim();
      let createdr = $('#dr').val().trim();
      let createcr = $('#cr').val().trim();
      let createref = $('#ref').val().trim();
      let createdate = $('#today').val();
      if (!createacctno) {
        $("#acctno").addClass("danger");
        $("#errmsg1").text('科目代號不可空白');
        return false;
      }
      else {
        if (!acctclass[createacctno]) {
          $("#acctno").addClass("danger");
          $("#errmsg1").text('查無科目代號');
          return false;
        }
      }

      if (!createdr && !createcr) {
       $("#dr").addClass('danger'); 
       $("#cr").addClass('danger'); 
       $("#errmsg1").text('借貸必須輸入其一');
        return false;
      }

      if (createdr && createcr) {
        $("#cr").val('');
        $("#dr").val(''); 
        $("#dr").addClass('danger'); 
        $("#cr").addClass('danger'); 
        $("#errmsg1").text('借貸只可輸入其一');
        return false;
      }

     //validation ok
      $("#errmsg1").text('');
      $("#submit").prop("disabled",true);
      $("#save").prop("disabled",false);

      let id = 0;
      let ttldr = 0;
      let ttlcr = 0;
      //
      if (tempArr.length === 0) {
        id = 0;
      }
      else {
       id = tempArr[tempArr.length-1]["id"] + 1;
     }
     console.log("id:",id)
     let obj = {
      date: createdate,
      acctno: createacctno,
      acctname: createacctname,
      dr: createdr,
      cr: createcr,
      reference: createref,
      id: id,
      cindex: "index" + id
    };
    tempArr.push(obj);
    ttldr += +createdr;
    ttlcr += +createcr;
    $("table").show();
     renderTable();
    });

    $('table').on('click', '.update-button', function(e) {
      /*
      //for reference find element position when button is clicked
      let cons = e.pageY + 16;    
      let offsetadj = e.offsetY - 14;     
      let top = cons - offsetadj;
      */
      let rowEl = $(this).closest('tr');     
      let acctnoEl = rowEl.find('.acctno');
      let acctnameEl = rowEl.find('.acctname');
      let drEl = rowEl.find('.dr');
      let crEl = rowEl.find('.cr');
      
      let newacctno = rowEl.find('.acctno').val().trim();
      let newacctname = rowEl.find('.acctname').val().trim();
      let newdr = rowEl.find('.dr').val().trim();
      let newcr = rowEl.find('.cr').val().trim();
      let newref = rowEl.find('.ref').val();
      let cindex = rowEl.find('.index').text();   

      
      if (!newacctno) {
        rowEl.find('.acctno').addClass("danger");
        $("#errmsg2") .css({fontSize:"0.8em",color:"red"}) .text('代號不可空白');

        return false; 
      }
      else {
        if (!acctclass[newacctno]) {
          newacctno = "";
          newacctname = "";
          rowEl.find('.acctno').addClass("danger");
          $("#errmsg2") .css({fontSize:"0.8em",color:"red"}) .text('查無科目代號');
          return false;
        }
        else {
          rowEl.find('.acctname').val(acctclass[newacctno][0].acctname)
          newacctname = acctclass[newacctno][0].acctname;
          //rowEl.find('.acctno').addClass("danger")
        }
      }
     
      if (!newdr && !newcr) {
        rowEl.find('.cr').val('');
        rowEl.find('.dr').val('');
        rowEl.find('.dr').addClass("danger");
        rowEl.find('.cr').addClass("danger");
        $("#errmsg2").text('借貸必須輸入其一');
        return false;     
      }
      if (newdr && newcr) {
        rowEl.find('.cr').val('');
        rowEl.find('.dr').val('');
        rowEl.find('.dr').addClass("danger");
        rowEl.find('.cr').addClass("danger");
        $("#errmsg2").text('借貸借貸只可輸入其一');
        return false;     
      }

      //update validation ok
      rowEl.find('.acctno').removeClass("danger");
      rowEl.find('.dr').removeClass("danger");
      rowEl.find('.cr').removeClass("danger");
      $("#errmsg2").text('');

      for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i].cindex === cindex) {
          tempArr[i].acctno = newacctno;
          tempArr[i].acctname = newacctname;
          tempArr[i].dr = newdr;
          tempArr[i].cr = newcr;
          tempArr[i].reference = newref;
          break;
        }
      } 
      renderTable();
      console.log("update tempArr ",tempArr)
    });


    $('table').on('click', '.delete-button', function() {
      $("#msg").hide();
      let rowEl = $(this).closest('tr');      
      let cindex = rowEl.find('.index').text();   
      for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i].cindex === cindex) {
         tempArr.splice(i,1);
         break;
       }
     } 
     renderTable();
   });

   
   function renderTablex(tempArr) {
          tempArr.sort(function(a,b) {
            aPro = a.listorder;
            bPro = b.listorder;
            return ((aPro < bPro) ? -1 : ((aPro > bPro) ? 1 : 0));
          })
          tempArr.forEach(function(obj) {
            $("<tr>") 
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"acctno"}).val(obj.acctno))
              )
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"acctname"}).css("width","400px").val(obj.acctname))
              )
            .append($("<td>")
              .append($("<input>").attr({type:"text",class:"classname"}).css("width","240px").prop("readonly",true).val(obj.classname))
              )                         
            .append($("<td>")
              .append($("<button>").attr({class:"update-button btn btn-success"}).text("修改"))
              )
            .append($("<td>")
              .append($("<button>").attr({class:"delete-button btn btn-danger"}).text("刪除"))
              )
            .append($("<td>").attr({class:"index"}).css({color:"rgba(3,3,3,0)",width:0}).text(obj.cindex))              
            .appendTo($('tbody'))
          }); //end of forEach 

      } //end of renderTable



   function renderTable() {
      $('#acctno').val("");   
      $('#acctname').val("");   
      $('#dr').val("");    
      $('#cr').val("");   
      $('#ref').val("");   
      $('#acctno').focus();
      var tbodyEl = $('tbody');
      tbodyEl.html('');
      tempArr.forEach(function(obj) {
        $("<tr>") 
        .append($("<td>")
          .append($("<input>").attr({type:"text",class:"acctno"}).val(obj.acctno))
          )
        .append($("<td>")
          .append($("<input>").attr({type:"text",class:"acctname"}).prop("readonly",true).val(obj.acctname))
          )
        .append($("<td>")
          .append($("<input>").attr({type:"number",class:"dr"}).val(obj.dr))
          ) 
        .append($("<td>")
          .append($("<input>").attr({type:"number",class:"cr"}).val(obj.cr))
          )                          
        .append($("<td>")
          .append($("<input>").attr({type:"text",class:"ref"}).val(obj.reference))
          ) 
        .append($("<td>")
          .append($("<button>").attr({class:"update-button btn btn-success"}).text("修改"))
          )
        .append($("<td>")
          .append($("<button>").attr({class:"delete-button btn btn-danger"}).text("刪除"))
          )
        .append($("<td>").attr({class:"index"}).css("color","rgba(0,0,0,0)").text(obj.cindex))              
        .appendTo($('tbody'))
      }); 
    }

    $("#save").on("click",function(e) {
      let cons = e.pageY + 16;    
      let offsetadj = e.offsetY - 14;     
      let top = cons - offsetadj;

      $("table").show();
      renderTable();
      let drttl = 0;
      let crttl = 0;
      tempArr.forEach(function(obj) {
       drttl += +obj.dr;
       crttl += +obj.cr;
     })
     if (drttl !== crttl ) {
        $("#errmsg2").text('借貸不平衡');
        return false;
      }

      //
      console.log("save tempArr ",tempArr);
      console.log("save tempArr onSelect",tempArr);
      console.log("save tempArr on enter keypress",tempArr);
      tempArr = [];
      renderTable();
      $("#acctno").focus();   
      
/*
// tempoarary turn off for testing - not submit data to server
      $.ajax({
        url: '/ledger',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ arrOfobj: tempArr }),
        success: function(response) {
          console.log(response);
          $("#msg").hide();
          tempArr = [];
          renderTable();
        }
      });
*/

    }) //end of save on click

    
  } //end of processLedger
  
}) //end of $(function())

