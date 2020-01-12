import React  from 'react';
import Cell from './Cell.js';
import './Datatable.css';

class DataTable extends React.Component
{
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

    renderRows = (_row, rowIndex) => {
        const {rows} = this.props;

    return (
        <tr key={`row-${rowIndex}`} className={rows[rowIndex].closed ? "closed" : ""}>
            <Cell
                key={`${rowIndex}-'title'`}
                content={rows[rowIndex].title}
            />
            <Cell
                key={`${rowIndex}-'date'`}
                content={rows[rowIndex].geometries[0].date}
            />
            <Cell
                key={`${rowIndex}-'status'`} 
                content={rows[rowIndex].closed ? "Closed": "Open"}
            />
            <Cell
                key={`${rowIndex}-'category'`}
                content={rows[rowIndex].categories[0].title}
            />
        </tr>
        )
    }

    render() {
        const {headings,rows} = this.props;
    
        this.renderHeadingRow = this.renderHeadingRow.bind(this);
        this.renderRow = this.renderRows.bind(this);
        
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