//for app

$(function() {

  // GET
  $('#get-button').on('click', function() {

      $.ajax({

        url: '/getdata',  
        contentType: 'application/json',
        success: function(response) {
            
           var tbodyEl = $('tbody');
           tbodyEl.html('');

          //populate tbody
           response.treedatas.forEach(function(treedata) {

            $("<tr>")

    
            .append($("<td>")
                .append($("<input>").attr({type:"text",class:"name"}).val(treedata.name))
                )
            .append($("<td>")
                .append($("<input>").attr({type:"text",class:"parent"}).val(treedata.parent))
                )
            .append($("<td>")
                .append($("<input>").attr({type:"text",class:"idx"}).val(treedata.idx))
                )
            .append($("<td>")
                .append($("<button>").attr({class:"update-button btn btn-success"}).text("UPDATE"))
                )
            .append($("<td>")
                .append($("<button>").attr({class:"delete-button btn btn-danger"}).text("DELETE"))
                )

            .append($("<td>").attr({class:"index"}).text(treedata.index))             
  
            .appendTo($('tbody'))

            
            }); //end of forEach 

         } //sucess function

      }); //end of ajax

   }); //end of onclick

 
    // POST
/*
fetch('/login',{
    method:'POST',
    headers:{
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({"user":"foo","password":"1234"})
})
.then(res=>res.json())
.then(data=>console.log(data));

*/

    $('#create-form').on('submit', function(event) {

        event.preventDefault();
        
        let createname = $('#name');
        let createparent = $('#parent');
        let createidx = $('#idx');


        $.ajax({

            url: '/treedata',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createname.val(),parent: createparent.val(),idx: createidx.val() }),
            success: function(response) {

                console.log(response);

                //reset input value
                createname.val('');
                createparent.val('');
                createidx.val('');

                $('#get-button').click(); //update tbody
            }
        });
    });


    // find contents on the row and send to server for update   
    $('table').on('click', '.update-button', function() {

        let rowEl = $(this).closest('tr');      
        let newname = rowEl.find('.name').val();
        let newparent = rowEl.find('.parent').val();
        let newidx = rowEl.find('.idx').val();
        let id = rowEl.find('.index').text();     // id of each document of the collection

        $.ajax({
            url: '/treedata/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newname: newname,newparent: newparent,newidx: newidx }),
            success: function(response) {

                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {

        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.index').text();

        $.ajax({
            url: '/treedata/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {

            console.log(response);
            $('#get-button').click();

            }
        });
    });

});

