import './searchPanel.css';

import photo from '../../resources/img/photo.png';
import search from '../../resources/img/search.png';
import filters from '../../resources/img/filters.png';

const SearchPanel = ({ onSearchInput }) => {
    return (
        <div className="panel">
            <div className="searchInput">
                <img src={search} alt={"Лупа поиска"}/>
                <input onChange={(e) => onSearchInput(e)} className="searchBar" placeholder="Поиск по всем объектам"/>
                <img src={filters} alt={"Фильтры"} className="filters"/>
            </div>
            <div className="user">
                <img src={photo} alt={"Аватар"}/>
                <div className="userName">Петров Иван Иванович</div>
            </div>
        </div>
    )
};

export default SearchPanel;