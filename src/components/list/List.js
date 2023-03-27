import Table from '../table/Table';

import { PER_PAGE } from '../constants';

import './list.css';

const List = ({ types, data, page, setPage, total }) => {
    types = types.filter(type => type.checked);

    const onDotChange = (e) => {
        setPage(+e.target.value);
    };

    const getPages = () => {
        const dots = [];
        const maxDots = Math.ceil(total / PER_PAGE);

        for(let i = 1; i <= maxDots; i++) {
            if (i >= page - 1 && i <= page + 1) {
                dots.push(<button key={i} className={page === i ? "active" : ""} value={i} onClick={(e) => onDotChange(e)}>{i}</button>);
            } else if (i === maxDots) {
                if (page + 2 < maxDots) {
                    dots.push(<button key={i}>...</button>);
                }

                dots.push(<button key={i} className={page === i ? "active" : ""} value={i} onClick={(e) => onDotChange(e)}>{i}</button>);
            }
        }

        return dots;
    };

    return (
        <div className="list">
            <h1>Список объектов</h1>
            {/* <h2>
                Выбраны: 
                {types.reduce((result, type, index) => {
                    if (index !== types.length - 1) return result += ` ${type.name},`;
                    else return result += ` ${type.name}`;
                }, '')}
            </h2> */}
            <Table data={data}/>
            <div className="dots">
                { getPages() }
            </div>
        </div>
    );
};

export default List;