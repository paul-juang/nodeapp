$(function() {

  jQuery.extend(jQuery.expr[':'], {
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

  $("#acctno").on("keypress blur",function() {
    $("#msg").hide();
  })

  $("#acctname").on("keypress blur",function() {
    $("#msg").hide();
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


  $("#agkdraw").hide();
  $("#create-div").hide();
  $("#table-div").hide();


  let acct = {

    100 : {acctname:"Daaaaaaaa", dc: "d"},
    110 : {acctname:"Dbbbbbbbb", dc: "d"},
    120 : {acctname:"Dcccccccc", dc: "d"},
    130 : {acctname:"Ddddddddd", dc: "d"},
    140 : {acctname:"Deeeeeeee", dc: "d"},
    150 : {acctname:"Dxxxxxxxx", dc: "d"},
    160 : {acctname:"Dgggggggg", dc: "d"},
    170 : {acctname:"Dhhhhhhhh", dc: "d"},
    180 : {acctname:"Diiiiiiii", dc: "d"},
    190 : {acctname:"Djjjjjjjj", dc: "d"},

    200 : {acctname:"Caaaaaaaa", dc: "c"},
    210 : {acctname:"Cbbbbbbbb", dc: "c"},
    220 : {acctname:"Caaaaaaaa", dc: "c"},
    230 : {acctname:"Cbbbbbbbb", dc: "c"},
    240 : {acctname:"Cdddddddd", dc: "c"},
    250 : {acctname:"Ceeeeeeee", dc: "c"},
    260 : {acctname:"Cxxxxxxxx", dc: "c"},
    270 : {acctname:"Chhhhhhhh", dc: "c"},
    280 : {acctname:"Ciiiiiiii", dc: "c"},
    290 : {acctname:"Cjjjjjjjj", dc: "c"},

    300 : {acctname:"Eaaaaaaaa", dc: "c"},
    310 : {acctname:"Ebbbbbbbb", dc: "c"},
    320 : {acctname:"Eaaaaaaaa", dc: "c"},
    330 : {acctname:"Ebbbbbbbb", dc: "c"},
    340 : {acctname:"Eaaaaaaaa", dc: "c"}

  };   

  $("#acctno").on("blur",function() {
   let dc = ""
   let pro = $(this).val();
   
   if (!acct[pro]) {
    $(this).val("");
  }
  else {
    $("#acctname").val(acct[pro].acctname)
    dc = acct[pro].dc;
  }

  if (dc === "c" || !dc) {
    $("#cr").focus();
  }
  else {
    $("#dr").focus();
  }
 

})

  $('#get-button').on('click', function() {
    $("#agkdraw").show();
    $("#create-div").show();
    $("#table-div").show();

  $.ajax({
    url: '/getagk',  
    contentType: 'application/json',
    success: function(response) {
     var tbodyEl = $('tbody');
     tbodyEl.html('');
     response.ledge.forEach(function(agk) {
      $("<tr>") 
      .append($("<td>")
        .append($("<input>").attr({type:"text",class:"acctno"}).val(agk.acctno))
        )
      .append($("<td>")
        .append($("<input>").attr({type:"text",class:"acctname"}).val(agk.acctname))
        )
      .append($("<td>")
        .append($("<input>").attr({type:"number",class:"dr"}).val(agk.dr))
        ) 
      .append($("<td>")
        .append($("<input>").attr({type:"number",class:"cr"}).val(agk.cr))
        )                          
      .append($("<td>")
        .append($("<input>").attr({type:"date",class:"date"}).val(agk.date))
        ) 
      .append($("<td>")
        .append($("<button>").attr({class:"update-button btn btn-success"}).text("修改"))
        )
      .append($("<td>")
        .append($("<button>").attr({class:"delete-button btn btn-danger"}).text("刪除"))
        )
      .append($("<td>").attr({class:"index"}).text(agk._id))              
      .appendTo($('tbody'))
    }); 
   } 
 }); 
}); 


  $('#create-form').on('submit', function(event) {
    event.preventDefault();
    let createacctno = $('#acctno').val().trim();
    let createacctname = $('#acctname').val().trim();
    let createdr = $('#dr').val().trim();
    let createcr = $('#cr').val().trim();
    let createdate = $('#date').val();

    if (!createacctno) {
      $("#msg").css({position:"absolute",top:"216px",left:"72px",color:"red",fontSize: 12}).text('科目代號不可空白').show()
      $("#acctno").focus();    
      return false;
    }

    if (!createacctname) {
      $("#msg").css({position:"absolute",top:"216px",left:"232px",color:"red",fontSize: 12}).text('科目不可空白').show()
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
      $("#dr").val('').focus(); //
      return false;
    }

    $.ajax({
      url: '/agk',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ acctno: createacctno, acctname: createacctname, dr: createdr, cr:createcr, date: createdate}),
      success: function(response) {
       console.log(response);
       $('#acctno').val('');
       $('#acctname').val('');               
       $('#dr').val('');
       $('#cr').val('');

       $('#get-button').click();
       $("#acctno").focus();

     }
   });
  });

  $('table').on('focus', '.acctno', function(e) {

    let rowEl = $(this).closest('tr');     
    let acctnoEl = rowEl.find('.acctno');
    let acctnameEl = rowEl.find('.acctname');
    let drEl = rowEl.find('.dr');
    let crEl = rowEl.find('.cr');
    let dateEl = rowEl.find('.date');
    let updateEl = rowEl.find('.update-button');



    $(acctnoEl).on("blur",function() {
      let dc = ""
      let pro = $(this).val();

      if (!acct[pro]) {
        $(this).val("");
        $(acctnameEl).val('');
        $(drEl).val('');
        $(crEl).val('');
      }
      else {
        $(acctnameEl).val(acct[pro].acctname)
        dc = acct[pro].dc;

      }

      if (dc === "c") {
        $(drEl).val("");
        $(crEl).focus();
      }
      else{
        $(crEl).val("");
        $(drEl).focus();
      }
    })

  })



  $('table').on('click', '.update-button', function(e) {
    let cons = e.pageY + 16;    
    let offsetadj = e.offsetY - 14;     
    let top = cons - offsetadj;


    let rowEl = $(this).closest('tr');      
    let newacctno = rowEl.find('.acctno').val().trim();
    let newacctname = rowEl.find('.acctname').val().trim();
    let newdr = rowEl.find('.dr').val().trim();
    let newcr = rowEl.find('.cr').val().trim();
    let newdate = rowEl.find('.date').val();
    let id = rowEl.find('.index').text();    


    let acctnoEl = rowEl.find('.acctno');
    let acctnameEl = rowEl.find('.acctname');
    let drEl = rowEl.find('.dr');
    let crEl = rowEl.find('.cr');
    let dateEl = rowEl.find('.date');


    $(acctnoEl).on("keypress",function() {
      $("#msg").hide();
    }) 

    $(drEl).on("keypress",function() {
      $("#msg").hide();
    })

    $(crEl).on("keypress",function() {
      $("#msg").hide();
    })

    if (!newacctno) {
      $("#msg").css({position:"absolute",top: top,left:"80px",color:"red",fontSize: 12}).text('科目代號不可空白').show()
      rowEl.find('.acctno').focus();
      return false; 
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




    $.ajax({
      url: '/agk/' + id,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ newacctno: newacctno,newacctname: newacctname,newdr: newdr,newcr: newcr,newdate: newdate}),
      success: function(response) {
       console.log(response);
      $("#msg").hide();
      $('#get-button').click();  
     }     

   });

  });




  $('table').on('click', '.delete-button', function() {
    let rowEl = $(this).closest('tr');      
    let newname = rowEl.find('.name').val();
    let newparent = rowEl.find('.parent').val();
    let newidx = rowEl.find('.idx').val();
    let id = rowEl.find('.index').text();     


    $.ajax({
      url: '/agk/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response) {
       console.log(response);
       $('#get-button').click();  
     }     
   });

  });


});


function search() {
  let arr = [];
  document.querySelectorAll("tbody tr")
  .forEach((tr) => {
    let acctno = $(tr).find(".acctno").val();
    let acctname = $(tr).find(".acctname").val();
    let dr = Number($(tr).find(".dr").val());
    let cr = Number($(tr).find(".cr").val());
    let date = $(tr).find(".date").val();
    let obj = {acctno:acctno, acctname:acctname, dr:dr, cr:cr, date:date};
    arr.push(obj)

  })
  console.log(arr)
}  
