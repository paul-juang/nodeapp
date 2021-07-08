//move focus to next input field
jQuery.extend(jQuery.expr[':'], {
  focusable: function (el, index, selector) {
    return $(el).is('a, button, :input, [tabindex]');
  }
});

$(document).on('keypress', 'input,select', function (e) {
  if (e.which == 13) {
    e.preventDefault();
            // Get all focusable elements on the page
            var $canfocus = $(':focusable');
            var index = $canfocus.index(this) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
          }
        });



class Form extends React.Component {
    
   onSumit = () => {
    
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
        if (!this.props.acctclass[createacctno]) {
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
      if (this.props.stack.length === 0) {
        id = 0;
      }
      else {
       id = this.props.stack[this.props.stack.length-1]["id"] + 1;
     }
     console.log("id:",id)
     let obj = {
      date: createdate,
      acctno: createacctno,
      acctname: createacctname,
      dr: createdr,
      cr: createcr,
      ref: createref,
      id: id,
      cindex: "index" + id
    };

    this.props.onSumit(obj)
    $('#acctno').val("");   
    $('#acctname').val("");   
    $('#dr').val("");    
    $('#cr').val("");   
    $('#ref').val("");   
    $('#acctno').focus();
    
   }

   onSave = () => {
        
   }

  render() {
    return (
   
   
    <div className="content-padding clearfix" id="divform">
      <div>
        <h6>普通分錄</h6>
        <hr/>
        <label>日期 : </label><input id="today" type="date" />
        
      </div>
      <div>
        <p id="errmsg1"></p>
        <input  type="text" placeholder="代號" name="acctno" id="acctno" />
        <input  type="text" placeholder="科目名稱" name="acctname" id="acctname" />
        <input  type="number" placeholder="借方" name="dr" id="dr"/>
        <input  type="number" placeholder="貸方" name="cr" id="cr"/>
        <input  type="text" placeholder="備註"  name="ref" id="ref"/>      
        <button onClick= {this.onSumit} type="button" className="btn btn-primary" id ="submit">加入</button>
        <button onClick= {this.props.onSave} type="button" className="btn btn-warning" id ="save">存檔</button>
        <hr/>
      </div>
   </div>
      );
    }
  }


  class Table extends React.Component {

    render() {
      const rows = this.props.stack.map((obj,i) => {
        return (
          <tr key = {i}>
           <td><input value={obj.acctno} onChange={this.onChange} className="acctno" name={"acctno"+i} type="text"/></td>
           <td><input value={obj.acctno} onChange={this.onChange} className="acctname"  type="text"/></td>
           <td><input value={obj.dr} onChange={this.onChange} className="dr" type="text"/></td>
           <td><input value={obj.cr} onChange={this.onChange} className="cr"  type="text"/></td>
           <td><input value={obj.ref} onChange={this.onChange} className="ref"  type="text"/></td>
           <td><button className="update-button btn btn-success">修改</button></td>         
           <td><button className="delete-button btn btn-danger">刪除</button></td>         
          </tr>
          )
      })
      return ( 
      <div>
        <p id="errmsg2"></p>   
        <table className="table table-bordered table-striped">
          <thead className="thead-light">
            <tr>    
            <th>代號</th>
            <th>科目名稱</th>
            <th>借方</th>
            <th>貸方</th>
            <th>備註</th>
            <th></th>
            <th></th>
            <th></th>             
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>

      );
    }
  
   onChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    })
    
   }

  }


  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       stack: [],
       acctclass: []
     };
   }

   getAcctClass = () => {
      $.getJSON("acctclassx.json", (json) => {
        this.setState({
           acctclass: json     
        });
    })
   }

   onSumit = (obj) => {  
      this.setState({
           stack: [...this.state.stack,obj]     
        });    
   }

   onSave = () => {
      this.setState(state => {
           stack: []     
        });   
   }

   render() {
    this.getAcctClass()


    return (
      <div>
        <div>
          <Form acctclass={this.state.acctclass}
                onSumit={this.onSumit}
                onSave={this.onSave}
                stack={this.state.stack}/>
        </div>
        <div>
          <Table stack={this.state.stack}/>
        </div>     
      </div>

      
    );

    
   
  }

}
// ========================================
$(function() {
  ReactDOM.render(<App />, document.querySelector("#root"));

  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  $("<br>").appendTo('body'); 
  $("#return").on("click",function() {
      $(this).attr("href","/")
   })
  
  let jsonarr = ["acctchart.json", "acctclassx.json"];
  async.map(jsonarr,function(json,callback) {
    $.getJSON(json,function(result) {
      callback(null,result);
    })        
  },
  function(err,result) {
    if (err) {
      console.log(err);
    }
    let acctchart = result[0];
    let acctclass = result[1];
    let acctChart = acctchart.filter(function(arr) {
      return arr[0].length === 4;
    });

    let sugChart = [];
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
        $("#acctname").val(sacctname);
        $("#dr").focus();
      }
    });

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

    $("#submit").prop("disabled",true);
    $("#save").prop("disabled",true);

    $("#acctno").on("keypress",function() {
      $("#submit").prop("disabled",false);
      $("#save").prop("disabled",false);
      $("#acctno").removeClass('danger');
      $('#acctname').removeClass('danger');
      $("#errmsg1").text('');
      $("#errmsg2").text('');
    });

    $("#acctno").on("blur",function(e) {
       let prop = $(this).val();
         if (!acctclass[prop]) {
          $(this).val("");
          $("#acctname").val("");
        }
        else {
          $("#acctname").val(acctclass[prop][0].acctname);
          $("#acctno").removeClass('danger');
          $('#acctname').removeClass('danger');
          $("#errmsg1").text('');
          $("#errmsg1").text('');
          $("#dr").focus();
        }
    });

    $("#dr").on("keypress",function() {
       $("#dr").removeClass('danger');
       $("#cr").removeClass('danger');
       $("#errmsg1").text('');
       $("#errmsg2").text('');
    })

    $("#cr").on("keypress",function() {
       $("#dr").removeClass('danger');
       $("#cr").removeClass('danger');
       $("#errmsg1").text('');
       $("#errmsg2").text('');
    })

  });
  
})

