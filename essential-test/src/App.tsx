import * as React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Dispatch, Unsubscribe } from 'redux';
import ReactHtmlParser from 'react-html-parser'; 

import { 
  FetchingDataType,
  ReinitStateFetchingDataType,
  
  fetchingData,
  reinitStateFetchingData
 } from './actions/FetchingDataActions'
import store from './store/Store';
import { 
  FetchingDataStateType, 
  initialState,
 } from './reducers/FetchingDataReducer';

interface PropsFromDispatch {
  fetchingData (): FetchingDataType,
  reinitState() : ReinitStateFetchingDataType
}

interface State {
  data : [],
  displayData: []
  statusCode: number,
  searchingKey: string
}

class App extends React.Component<PropsFromDispatch, State> {

  fetchingDataState : FetchingDataStateType = initialState;

  unsubscribe : Unsubscribe = store.subscribe(() => {
    this.fetchingDataState = store.getState().fetchingData;

    if(this.fetchingDataState.statusCode === 200){
      this.setState({
        ...this.state,
        data: this.fetchingDataState.resultData,
        displayData: this.fetchingDataState.resultData,
        statusCode: this.fetchingDataState.statusCode
      });

      // reset reducer state
      this.props.reinitState();
    }

  });

  constructor(props: PropsFromDispatch){
    super(props);
    this.dataItem = this.dataItem.bind(this);
    this.searching = this.searching.bind(this);
    this.state = {
      data: initialState.resultData,
      displayData: initialState.resultData,
      statusCode: initialState.statusCode,
      searchingKey: ""
    }
  }

  shouldComponentUpdate(nextProps: PropsFromDispatch, nextState: State){
    if(nextState.statusCode === 200){
      this.setState({
        ...nextState,
        statusCode: initialState.statusCode
      });

      return true
    }

    if(nextState.searchingKey !== this.state.searchingKey){
      if(nextState.searchingKey === ""){
        this.setState({
          ...this.state,
          searchingKey: "",
          displayData: this.state.data
        });
      }
      return true;
    }

    if(nextState.displayData !== this.state.displayData){
      return true;
    }
    
    return false;
  }
  
  componentDidMount(){
    // state fetching data from API
    this.props.fetchingData();
  }

  dataItem = ( item: any ) => {
    return (
      <section className="data-item"  key={item.author_id}>-----------------------------------------------------------------
        <section>
          <span> Title: </span><h2>{ item.title }</h2>
          <span> Author: </span><h4>{ item.author }</h4>
          {
            item.tags === "" ? null : <section><span> Tags: </span><p>{ item.tags }</p></section>
          }
          <span> Link to hi-resolution image: </span><a href={item.link} target="_blank">{ item.link }</a>
        </section>
        
        <section>
        <span>Description: </span>
        {
          ReactHtmlParser (item.description)
        }
        </section>
      </section>
    )
  } 

  searching = (e : React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      searchingKey: e.target.value
    })
  }

  findMatchItem = (item: any , searchingKey: string) : boolean => {
    const key = searchingKey.toLowerCase()
    if(item.title.toLowerCase().includes(key.toLowerCase())){
      return true;
    } 
    else if (item.author.toLowerCase().includes(key.toLowerCase())) {
      return true;
    }
    else if (item.tags.toLowerCase().includes(key.toLowerCase())) {
      return true;
    }
    else if (item.link.toLowerCase().includes(key.toLowerCase())) {
      return true;
    }
    else if (item.description.toLowerCase().includes(key.toLowerCase())) {
      return true;
    }
    return false;
  }

  render() {
    const { data, searchingKey } = this.state;
    let i = 0;
    return (
      <div className="App">
        <input type="text" value={searchingKey} onChange={this.searching}/>
        {
          data.length > 0 
          ?
          data.map((item)=>{
            if(this.findMatchItem(item, searchingKey)){
              console.log(i++);
              return this.dataItem(item);
            }
            return null;
          })
          :
          <p>Data not found</p>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchingData: () => dispatch(fetchingData()),
  reinitState: () => dispatch(reinitStateFetchingData()),
});

export default connect(null, mapDispatchToProps)(App);
