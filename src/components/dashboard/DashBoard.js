import { useState, useEffect } from 'react';

import SearchPanel from "../searchPanel/SearchPanel";
import SideMenu from "../sideMenu/SideMenu";
import List from "../list/List";
import Line from "../line/Line";

import { WORKSPACE_ID, PROJECT_ID, PER_PAGE, TYPES } from '../constants';

import greyBackground from '../../resources/img/greyBackground.png';

import './dashBoard.css';

const DashBoard = ({ token }) => {
    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [tree, setTree] = useState({});
    const [searchData, setSearchData] = useState([]);

    const getMetaData = async () => {
        fetch(`https://invadmin.officescheme.ru/project/${WORKSPACE_ID}/${PROJECT_ID}/API?action=meta_and_tree`, {
            method: 'POST',
            headers: {
                'x-ws-common-auth': token
            }
        })
        .then(result => result.json())
        .then(result => {
            const newTypes = [];
            const tree = {};

            const getLocations = (children, parent) => {
                children.forEach(child => {
                    if (!parent) tree[child.id] = child.name;
                    else tree[child.id] = `${parent} ${child.name}`;

                    if (child.childs.length) {
                        if (parent) getLocations(child.childs, `${parent} ${child.name}`);
                        else getLocations(child.childs, `${child.name}`);
                    }
                });

                return tree;
            };

            setTree(getLocations(result.tree, ''));
            
            result = result.metablock.nodes;

            for (let type in result) {
                newTypes.push({ checked: true, name: TYPES[type], id: type})
            };

            setTypes(newTypes);
        });
    };

    const getObjects = async (page, filter) => {
        const formData = new FormData();
    
        formData.append('perpage', PER_PAGE);
        formData.append('page', page - 1);
        formData.append('sortColumn', 'id');
        formData.append('sortDirection', 0);
        if (typeof filter !== 'undefined') formData.append('filters[name]', filter);

        fetch(`https://invadmin.officescheme.ru/project/${WORKSPACE_ID}/${PROJECT_ID}/API?action=node_list`, {
            method: 'POST',
            headers: {
                'x-ws-common-auth': token
            },
            body: formData
        })
        .then(result => result.json())
        .then(result => {
            if (typeof filter === 'undefined') setTotal(result.total);

            result = result.items.map(object => ({ id: object.id, type: object.type_name, number: object.name, location: tree[object.parent], typeObject: object.type_uid }));

            if (typeof filter === 'undefined') setData(result);
            else setSearchData(result);
        });
    };

    const onSearchInput = (e) => {
        const filter = e.target.value.trim();

        if (filter) {
            getObjects(page, e.target.value);
            setPage(1);
        } else {
            setSearchData([]);
        }
    };

    useEffect(() => {
        getMetaData();
    }, []);

    useEffect(() => {
        getObjects(page);
    }, [page, tree]);

    return (
        <div className="dashBoard">
            { searchData.length ? <ul className="searchResult">
                { searchData.map((object, ind) => {
                    return (
                        <>
                            <li key={ind}>
                                <img src={greyBackground} alt={"grey background circle"}></img>
                                <div>
                                    <h1>{object.number}</h1>
                                    <div className="flexBox">
                                        <p className="title">Тип</p>
                                        <p className="titleValue">{object.type}</p>
                                    </div>
                                    <div className="flexBox">
                                        <p className="title">Расположение</p>
                                        <p className="titleValue">{object.location}</p>
                                    </div>
                                </div>
                            </li>
                            { ind !== searchData.length - 1 ? <div className="lineSearch"></div> : '' }
                        </>
                    );
                })}
            </ul> : ''}  
            <SearchPanel onSearchInput={onSearchInput}/>
            <div className="infoTable">
                <SideMenu types={types} setTypes={setTypes} setPage={setPage}/>
                <Line />
                <List types={types} data={data} page={page} setPage={setPage} total={total} getObjects={getObjects}/>
            </div>
        </div>
    );
};

export default DashBoard;