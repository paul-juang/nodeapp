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
  constructor(props) {
      super(props);
      this.state = {
       name: "",
       parent: "",
       idx: ""

     };
   }

   onChange = (event) => {
        this.setState({
           [event.target.name]: event.target.value     
        });    
   }
   
   onClick = () => {
        this.setState({
           name: "",
           parent: "",
           idx: ""     
        });    
   }

  render() {
    return (
    <div className="content-padding clearfix" id = "create-div">  
      <div className="form-group">
      <input value={this.state.name} onChange={this.onChange} type="text" className="form-group" placeholder="球號" name="name" id="name" />
      <input value={this.state.parent} onChange={this.onChange} type="text" className="form-group" placeholder="安置"   name="parent" id="parent" />
      <input value={this.state.idx} onChange={this.onChange} type="text" className="form-group" placeholder="引導"  name="idx" id="idx" />
      <button onClick={this.onClick} type="submit" className="btn btn-primary" id ="submit">加入</button>
      </div>
    </div>

      );
    }
  }


  class Table extends React.Component {

    render() {
      const rows = this.props.tablerow.map((obj,i) => {
        return (
          <tr key = {i}>
           <td><input value={obj.name} readOnly type="text"/></td>
           <td><input value={obj.parent} readOnly type="text"/></td>
           <td><input value={obj.idx} readOnly type="text"/></td>
           <td><button className="btn btn-success">修改</button></td>         
           <td><button className="btn btn-danger">刪除</button></td>         
          </tr>
          )
      })
      return (    
      <table className="table table-bordered table-striped">
        <thead className="thead-light">
          <tr>    
          <th>球號</th>
          <th>安置</th>
          <th>引導</th>
          <th></th>
          <th></th>            
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>

      );
    }
  }


  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       stack: []
     };
   }

   getdata = () => {
      $.getJSON("treeData.json", (json) => {
        this.setState({
           stack: json     
        });
    })
  }
   


   render() {
    this.getdata();
    const tablerow = [...this.state.stack]

    return (
      <div>
        <div><Form /></div>
        <div><Table tablerow = {tablerow} /></div>
      </div>

    );
  }

}
// ========================================
$(function() {
  console.log("here we go")
  ReactDOM.render(<App />, document.querySelector("#root"));

})

