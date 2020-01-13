import React  from 'react';
import './Popup.css';

class EventDetail extends React.Component 
{
    render() {

        var row = this.props.row;
        console.log("selected row is " + row.id);
        return (
            <div className='popup'>
            <div className='popup_inner'>
              <h3 className='popup-header'>Event details :</h3>
              <h4>{row.title}</h4>
              <label>{row.categories.map(e => (<p key = {e.id}><b>Category</b> : {e.title}</p>))}</label>
              <label>{row.sources.map(e => (<p key = {e.id}><b>Source</b> : {e.id} | {e.url}</p>))}</label>
              <label>{row.geometries.map(e => 
                    (<p key = {e.id}><b>Date</b> : {e.date}
                        <br/><b>Type</b> : {e.type}
                        <br/><b>Coordinates</b> : {e.coordinates[0] + "," + e.coordinates[1]}
                        </p>))}</label>
            </div>
            <button id="closebtn" className="popup-close-btn" onClick={this.props.closePopup}>X</button>
          </div>
        )
    }
}

export default EventDetail