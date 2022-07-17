class CardEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      front: "",
      back: ""
    }
  }
  
  render() {

    const rows = this.props.cards.map((card,i) => {
        return (
          <tr key={i}>
             <td>{card.front}</td>
             <td>{card.back}</td>
             <td onClick={this.deleteCard} data-index={i}><button>delete</button></td>
          </tr>
         )
      })

    return (
     <div>
       <h2>Card Editor</h2>
       <table>
          <thead>
           <tr>
              <th>front</th>
              <th>back</th>
              <th>delete</th>
           </tr>
          </thead>
          <tbody>
             {rows}
          </tbody>
       </table>
       <br/>
       <input onChange={this.handleChange} name="front" placeholder="front" value={this.state.front} />
       <input onChange={this.handleChange} name="back" placeholder="back" value={this.state.back} />
       <button onClick={this.addCard}>Add Card</button>
       <hr/>
       <button onClick={this.props.switchmode}>go to views</button>
     </div>
    )
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addCard = () => {
    this.props.addCard(this.state.front,this.state.back)
    this.setState({
      front: "",
      back: ""
    })
  }

  deleteCard = (event) => {
    this.props.deleteCard(event.target.dataset.index)
  }
}

class CardViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      front: "",
      back: ""
    }
  }
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      editor: true
    }
  }
  render() {
    if (this.state.editor) {
      return (
        <CardEditor 
          cards={this.state.cards}
          switchmode={this.switchmode}
          addCard={this.addCard}
          deleteCard={this.deleteCard}
        />
      )
    } else {
      return (
       <CardViewer />
      )
    }
  }

  switchmode = () => {
    this.setState(state => {
      editor: !state.editor
    })
  }


  addCard = (front,back) => {
    this.setState(state => ({
        cards: [...state.cards, {front,back}]
    }))
  }

  deleteCard = (index) => {
    this.setState(state => {
      const cards = [...state.cards]
      cards.splice(index,1)
      return {
        cards
      }
    })
  }

}


// ========================================

  ReactDOM.render(<App />, document.querySelector("#root"));

