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

  $("<a>").attr({href:"/",id:"return",title:"返回首頁"}).text("\u21B6").appendTo('body');
  $("<br>").appendTo('body');


  let jsonarr = ["acctchart.json", "acctclassx.json"];
  
  async.map(jsonarr,function(json,callback) {
    $.getJSON(json,function(result) {
      callback(null,result)
    })        
  },
  function(err,result) {
    if (err) {
      console.log(err)
    }
    let acctchart = result[0];
    let acctclass = result[1];
    
    console.log("acctchart: ", acctchart)
    console.log("acctclass: ", acctclass);
    processLedger(acctchart,acctclass)
  });


  function processLedger(acctchart,acctclass) {
    //$("<a>").attr({href:"\home",id:"return",title:"返回首頁"}).text("\u21B6").appendTo('body');
    //$("<br>").appendTo('body');
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
    $("table").hide();
    $("#acctno").focus(); 
    let sugChart = [];
    let acctChart = {};
    let filerarr = acctchart.filter(function(arr) {
      return arr[0].length === 4;
    });

    acctChart = filerarr;
    for(let prop in acctChart) {
      sugChart.push({
        value: acctChart[prop][0] + " " + acctChart[prop][1],
        data: acctChart[prop][1]
      })     
    }

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
        $("#acctname").val(sacctname)
        $("#dr").focus();
      }
    });

    $("#acctno").on("keypress",function(e) {
      if (e.which === 13) {
        let pro = $(this).val();
        if (!acctclass[pro]) {
          $("#acctname").val("");
          $(this).val("");
          $(this).focus();
        }
        else {
          $("#msg").hide();
          $("#acctname").val(acctclass[pro][0].acctname);
          $("#dr").focus();
        }
      }
      else{
       $("#acctname").val("");
       $("table").hide();
       $("#msg").hide();
     }
    });

    $("#acctname").on("focus",function() {
      $("#dr").focus();
    })

    $("#dr").on("keypress",function() {
      $("#msg").hide();
    })

    $("#cr").on("keypress",function() {
      $("#msg").hide();
    })

    $("#dr").on("blur",function() {
      $("#date").focus();
    })

    $("#cr").on("blur",function() {
      $("#date").focus();
    })

    let tempArr = [];
    let id = 0;
    let ttldr = 0;
    let ttlcr = 0;
    $('#create-form').on('submit', function(event) {
      event.preventDefault();
      let createacctno = $('#acctno').val().trim();
      let createacctname = $('#acctname').val().trim();
      let createdr = $('#dr').val().trim();
      let createcr = $('#cr').val().trim();
      let createref = $('#ref').val().trim();
      let createdate = $('#today').val();
      if (!createacctno) {
        $("#msg").css({position:"absolute",top:"216px",left:"72px",color:"red",fontSize: 12}).text('科目代號不可空白').show()
        $("#acctno").focus();    
        return false;
      }
      else {
        if (!acctclass[createacctno]) {
          $("#acctno").val("");   
          $("#acctname").val("");   
          return false;
        }
      }
      if (!createacctname) {
        $("#msg").css({position:"absolute",top:"216px",left:"72px",color:"red",fontSize: 12}).text('輸入代號後須按輸入鍵').show()
        $("#acctname").focus();
        return false;
      }
      if (!createdr && !createcr) {
        $("#cr").val('');
        $("#msg").css({position:"absolute",top:"216px",left:"482px",color:"red",fontSize: 12}).text('借貸方必須輸入其一').show()
        $("#dr").val('').focus(); 
        return false;
      }
      if (createdr && createcr) {
        $("#cr").val('');
        $("#msg").css({position:"absolute",top:"216px",left:"482px",color:"red",fontSize: 12}).text('借貸方只能輸入其一').show()
        $("#dr").val('').focus();       
        return false;
      }
      if (tempArr.length === 0) {
        id = 0;
      }
      else {
       id = tempArr[tempArr.length-1]["id"] + 1;
     }
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
      let cons = e.pageY + 16;    
      let offsetadj = e.offsetY - 14;     
      let top = cons - offsetadj;

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
        $("#msg").css({position:"absolute",top: top,left:"80px",color:"red",fontSize: 12}).text('科目代號不可空白').show()
        rowEl.find('.acctno').focus();
        return false; 
      }
      else {
        if (!acctclass[newacctno]) {
          newacctno = "";
          newacctname = "";
          return false;
        }
        else {
          rowEl.find('.acctname').val(acctclass[newacctno][0].acctname)
           newacctname = acctclass[newacctno][0].acctname;
        }
      }

      if (!newacctname) {
        $("#msg").css({position:"absolute",top: top,left:"260px",color:"red",fontSize: 12}).text('科目不可空白').show()
        rowEl.find('.acctname').focus();
        return false;     
      }

      if (!newdr && !newcr) {
        $("#msg").css({position:"absolute",top: top,left:"520px",color:"red",fontSize: 12}).text('借貸方必須輸入其一').show()
        rowEl.find('.cr').val('');
        rowEl.find('.dr').val('').focus();
        return false;     
      }
      if (newdr && newcr) {
        $("#msg").css({position:"absolute",top: top,left:"520px",color:"red",fontSize: 12}).text('借貸方只能輸入其一').show()
        rowEl.find('.cr').val('');
        rowEl.find('.dr').val('').focus();
        return false;     
      }
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
        .append($("<td>").attr({class:"index"}).text(obj.cindex))              
        .appendTo($('tbody'))
      }); 
    }

    $("#save").on("click",function() {
      $("table").show();
      renderTable();
      let drttl = 0;
      let crttl = 0;
      tempArr.forEach(function(obj) {
       drttl += +obj.dr;
       crttl += +obj.cr;
     })
     if (drttl !== crttl ) {
        $("#msg").css({position:"absolute",top: "216px",left:"948px",color:"red",fontSize: 12}).text('借貸不平衡').show()
        return false;
      }
     else {
        $("#msg").css({position:"absolute",top: "216px",left:"956px",color:"",fontSize: 12}).text('處理中...').show()
      }
      console.log("save tempArr ",tempArr)
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

    })
    $("#msg").on("click", function() {
      $(this).hide();
    })
  }
  
}) //end of $(function())

