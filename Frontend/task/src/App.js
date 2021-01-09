import React, { Component } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class App extends Component {
  
  constructor(){
    super();
    this.state ={
      date: new Date(),
      url:'',
      explanation:'',
    };
  }
  onChange = date =>this.setState({date})

  async componentDidMount() {
    const url = "http://localhost:5000/nasa";
    
    const response = await fetch(url);
    //fetch(url,{"method": "POST"}).then(data => console.log(data)).catch(error => console.log(error))
    const data = await response.json();
    this.setState({ url:data.url, explanation:data.explanation})
  }
  
  render() {
    return (
      <div className="App">
        <header>Nasa API</header>
        <image>{this.state.url}</image>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <h5>{this.state.explanation}</h5>
      </div>
    );
  }
}

export default App;