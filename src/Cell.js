import React  from 'react';
import './Datatable.css';
import { string } from 'prop-types';
import Button from '@material-ui/core/Button';

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
                <th className="Cell Cell-header" >
                    <label>{content}</label>
                    <Button onClick={e=> this.onSort(e,content)} className="sort-button"
                         color="primary" size="small">Sort</Button>
                    <br/>
                    {content !== "Status" ?<input type="text" onChange = {e => this.onFilter(e,content)}/>
                    : <select onChange = {e => this.onFilter(e,content)}>
                        <option>Open</option>
                        <option>Closed</option>
                    </select>}
                </th>
          ) : (
                <td className="Cell" >
                    {content}
                </td>
          );
        
          return (cellMarkup);
    }
}

export default Cell;