
import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      inputWord:'',
      data:[],
      change:false
    }
  }

  PredictWord=(e)=>{
    this.setState({inputWord:e.target.value})
    this.callService(e);
   
  }

  callService=(e)=> {
   
    var para1='locale=da-DK';
      
    const Token='MjAyMS0xMC0zMQ==.ZmFyaGFkYXlhbkBnbWFpbC5jb20=.NzE3YmFmMmUyZTZkM2JkOTBlNGE4N2E4NTI2Nzk3YjQ=';
    this.setState({inputWord:e.target.value},function(){
    fetch ('https://services.lingapps.dk/misc/getPredictions?'+para1+'&text='+this.state.inputWord,
          {headers: {"Authorization" : `Bearer `+Token}})
          .then(response => response.json())
          .then(data => {this.setState({data: data})})
          .catch(error => console.log('failed to fetch', error))
        })
      }

    selectWord=(e)=>{
       let indexing=   e.target.getAttribute("data_index");
       let ind=this.state.inputWord.split(" ");
       var result=this.state.inputWord.split(ind[ind.length-1]);
       result = result.slice(0,-1);
       
       this.setState({inputWord:result + this.state.data[indexing]});
    }

    renderListing() {
      let recordList = [];

      if(this.state.data){
        this.state.data.map((record,index) => {
            return recordList.push(<li key={index} data_index={index} onClick={this.selectWord}>{record}</li>)
         
        })
      }
      return recordList.slice(0,10);
  }

  render() {

    return (
      <div >
            <label>Text</label>
            <input type="text" name="InputName" value={this.state.inputWord} onChange={this.PredictWord}/>
           
            <ul>
              {this.renderListing()}
            </ul>
           
      </div>
    );
  }
}

export default App;


