import React  from 'react';
import './Datatable.css';
import { string } from 'prop-types';

class Cell extends React.Component 
{
    sortingInfo = {
        column : string,
        direction : string
    }

    constructor(props) {
        super(props);
        this.sortConfig = {};
    }

    onSort(e,colName){
        let direction;
        if(this.sortConfig.column === colName)
        {
            direction = this.sortConfig.direction === "asc" ? "desc" : "asc";
            this.sortConfig.direction = direction;
        }
        else
        {
            this.sortConfig.direction = "asc";
            this.sortConfig.column = colName;
        }
        this.props.onSort(colName, direction);
    }

    onFilter(e,colName) {
        this.props.onFilter(colName, e.target.value);
    }
    render() {

        var {header, content} = this.props;
        const cellMarkup = header ? (
                <th className="Cell Cell-header" onClick={e=> this.onSort(e,content)}>
                    <label>{content}</label>
                    <br/>
                    <input type="text" onChange = {e => this.onFilter(e,content)}/>
                </th>
          ) : (
            <td className="Cell">
              {content}
            </td>
          );
        
          return (cellMarkup);
    }
}

export default Cell;