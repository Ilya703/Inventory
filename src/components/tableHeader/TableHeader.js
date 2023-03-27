import TableRow from "../tableRow/tableRow";

import './tableHeader.css';

const TableHeader = () => {
    const header = [{ id: 'ID', number: 'Инвентарный номер', type: 'Тип объекта', location: 'Размещение' }];

    return (
        header.map((object, index) => <TableRow styleRow="header" key={index} object={object}/>)
    );
};

export default TableHeader;