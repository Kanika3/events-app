import React  from 'react';
import './Popup.css'

class EventDetail extends React.Component 
{
    render() {

        var row = this.props.row;
        console.log("selected row is " + row.id);
        return (
            <div className='popup'>
            <div className='popup_inner'>
              <h1>Event details :</h1>
              <h3>{row.title}</h3>
              <label>{row.categories.map(e => (<p key = {e.id}>Category : {e.title}</p>))}</label>
              <label>{row.sources.map(e => (<p key = {e.id}>Source : {e.id} | {e.url}</p>))}</label>
              <label>{row.geometries.map(e => 
                    (<p key = {e.id}>Date : {e.date}
                        <br/>Type : {e.type}
                        <br/>Coordinates : {e.coordinates[0] + "," + e.coordinates[1]}
                        </p>))}</label>
            </div>
            <button id="closebtn" className="popup-close-btn" onClick={this.props.closePopup}>X</button>
          </div>
        )
    }
}

export default EventDetail