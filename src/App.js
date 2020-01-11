import React  from 'react';
import './App.css';
import { string } from 'prop-types';
import DataTable from './Datatable.js';

class App extends React.Component{

  state = {
       events : [],
       title: string,
       desc: string
  }
  

  componentDidMount()
  {
    const url = "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events";
    fetch(url).then(res => res.json())
              .then(json => {
                  this.setState({  events : json.events , title : json.title, desc: json.description})
              });
  }

  onSort = (colName) => {
    console.log("App will sort");

    const sortedData = this.state.events.sort((a, b) => {
        if (colName === 'Category') {
          console.log(a.categories.title);
          const nameA = a.categories[0].title.toUpperCase(); // ignore upper and lowercase
          const nameB = b.categories[0].title.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
  
          // names must be equal
          return 0;
        } 
        else {
          return a.contractValue - b.contractValue;
        }
      });
        
      // if (direction === 'desc') {
      //   sortedData.reverse();
      // }
      
      this.setState({
        events: sortedData,
        // sort: {
        //   column,
        //   direction,
        // }
      });
  }

  render()
  {
    var {desc, events ,title} = this.state;

    const headings = [desc , "Date", "Status" , "Category"]
    if(!events)
    {
      return (
          <div>No events!!</div>
        );
    }
    else
    {
      return (
        <div className="App">
          <h3>{title}</h3>
          <DataTable headings={headings} rows={events} onSort={this.onSort}/>
        </div>
      );
    }
  }
}

export default App;
