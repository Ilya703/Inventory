import TableRow from '../tableRow/tableRow';
import TableHeader from '../tableHeader/TableHeader';

import './table.css';

const Table = ({ data, filter }) => {
    return (
        <div className="table">
          <TableHeader />
          {data.map((object, index) => <TableRow styleRow="commonRow" key={index} object={object}/>)}
        </div>
    );
  };

export default Table;