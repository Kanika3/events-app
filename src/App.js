import React  from 'react';
import './App.css';
import { string } from 'prop-types';
import DataTable from './Datatable.js';

class App extends React.Component{

  state = {
       events : [],
       title: string,
       desc: string,
       data : []
  }

  componentDidMount()
  {
    const url = "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events";
    fetch(url).then(res => res.json())
              .then(json => {
                  this.setState({  events : json.events , title : json.title, desc: json.description, data: json.events})
              });
  }

  compare(nameA, nameB) {
        
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  onSort = (colName,direction) => {
    const sortedData = this.state.events.sort((a, b) => {
        if (colName === 'Category') {
          const nameA = a.categories[0].title.toUpperCase(); 
          const nameB = b.categories[0].title.toUpperCase(); 
          
          return this.compare(nameA,nameB);
        } 
        else if(colName === "Status"){
          const nameA = a.closed ? "closed" : "open" 
          const nameB = b.closed ? "closed" : "open" 
          
          return this.compare(nameA,nameB);
        }
        else if(colName === "Date") {
          const nameA = a.geometries[0].date; 
          const nameB = b.geometries[0].date;  
          
          return this.compare(nameA,nameB);
        }
        else {
          const nameA = a.title.toUpperCase(); 
          const nameB = b.title.toUpperCase();  
          
          return this.compare(nameA,nameB);
        }
      });
        
      if (direction === 'desc') {
        sortedData.reverse();
      }
      
      this.setState({
        events: sortedData,
      });
  }

  onFilter = (colName,filterValue)=> {
    console.log("filter " + colName + " text " + filterValue);

    let filteredData = []
    if(filterValue === "") {
      filteredData = this.state.data;
    }
    else {
      
      if (colName === 'Category') {
        filteredData = this.state.data.filter(d => d.categories[0].title.toUpperCase().includes(filterValue.toUpperCase()));
      } 
      else if(colName === "Status") {
        filteredData = this.state.data.filter(d => d.closed ? filterValue === "Closed": filterValue === "Open" ); 
      }
      else if(colName === "Date") {
        filteredData = this.state.data.filter(d => d.geometries[0].date === filterValue); 
      }
      else {
        filteredData = this.state.data.filter(d => d.title.toUpperCase().includes(filterValue.toUpperCase()));  
      }
    }
  this.setState({events : filteredData});
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
          <DataTable headings={headings} rows={events} onSort={this.onSort} onFilter={this.onFilter}/>
        </div>
      );
    }
  }
}

export default App;
