import React  from 'react';
import './Datatable.css';

class Cell extends React.Component 
{
    onSort(colName){
        console.log("Sort by " + colName);
        this.props.onSort(colName);
    }

    render() {

        var {header, content} = this.props;
        const cellMarkup = header ? (
            <th className="Cell Cell-header" onClick={e=> this.onSort(content)}>
              {content}
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