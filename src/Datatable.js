import React  from 'react';
import Cell from './Cell.js';
import './Datatable.css';

class DataTable extends React.Component
{
    showPopup = false;

    onSort = (colName,direction) => {
        this.props.onSort(colName,direction);
    }
    
    onFilter = (colName, filterValue) => {
        this.props.onFilter(colName, filterValue);
    }
    
    renderHeadingRow = (_cell, cellIndex) => {
        const {headings} = this.props;
    
        return (
          <Cell
            key={`heading-${cellIndex}`}
            content={headings[cellIndex]}
            header={true}
            onSort={this.onSort}
            onFilter={this.onFilter}
          />
        )
      };

    showDetails = (row) => {
        console.log("showing popup")
        this.props.showDetails(row);
    }

    renderRows = (_row, rowIndex) => {
        const {rows} = this.props;

    return (
        <tr key={rows[rowIndex].id} className={rows[rowIndex].closed ? "closed" : ""}
            onClick={e => this.showDetails(rows[rowIndex])}>
            <Cell
                key={rows[rowIndex].id + ' title'}
                content={rows[rowIndex].title}
            />
            <Cell
                key={rows[rowIndex].id + ' date'}
                content={rows[rowIndex].geometries[0].date}
            />
            <Cell
                key={rows[rowIndex].id +' status'} 
                content={rows[rowIndex].closed ? "Closed": "Open"}
            />
            <Cell
                key={rows[rowIndex].id +' category'}
                content={rows[rowIndex].categories[0].title}
            />
        </tr>
        )
    }

    render() {
        const {headings,rows} = this.props;
    
        this.renderHeadingRow = this.renderHeadingRow.bind(this);
        this.renderRow = this.renderRows.bind(this);
        this.showDetails = this.showDetails.bind(this);
        
        const theadMarkup = (
      <tr key="heading">
        {headings.map(this.renderHeadingRow)}
      </tr>
    );
    
        const tbodyMarkup = rows.map(this.renderRow);
      
        return (
            <div className="DataTable">
                <table className="Table">
                    <thead>{theadMarkup}</thead>
                    <tbody>{tbodyMarkup}</tbody>
                </table>
            </div>
        );
      }
}

export default DataTable;