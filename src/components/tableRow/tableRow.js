import TableCell from "../tableCell/tableCell";

import './tableRow.css';

const TableRow = ({ object, styleRow }) => {
    const {
      id,
      number,
      type,
      location
    } = object;
  
  
    return (
      <div className={`tableRow ${styleRow}`}>
        <TableCell item={id} />
        <TableCell item={number} />
        <TableCell item={type} />
        <TableCell item={location} />
      </div>
    )
};

export default TableRow;