import { useState } from 'react';

import typeFilters from '../../resources/img/typeFilters.png';

import './sideMenu.css';

const SideMenu = ({ types, setTypes, setPage }) => {
    const [allTypes, setAllTypes] = useState(true);

    const changeAllTypes = (checked) => {
        setAllTypes(checked);
        setPage(1);

        setTypes(types.map(type => {
            return {
                ...type,
                checked
            };
        }));
    };

    const onCheckboxChange = (e) => {
        const newTypes = types.map(type => {
            if (e.target.value === type.id) {
                return {
                    ...type,
                    checked: !type.checked
                };
            } else return type;
        });

        const cnt = newTypes.reduce((cnt, type) => {
            if (type.checked) return cnt + 1;
            else return cnt;
        }, 0);

        setPage(1);
        setTypes(newTypes);

        if (cnt === types.length) setAllTypes(true);
        else setAllTypes(false);
    };

    const onInputChange = (e) => {
        // setCheckboxes(types.filter(type => type.name.toLowerCase().startsWith(e.target.value.toLowerCase())));
        
        // setPage(1);

        // setAllTypes(true);
    };

    return (
        <div className="typesBlock">
            <h1>Типы объектов</h1>
            {/* <div>
                <h2>Фильтр по названию</h2>
                <div className="typeFilter">
                    <input placeholder="Введите от 3-х символов" onChange={(e) => onInputChange(e)}/>
                    <img src={typeFilters} alt={"Фильтр по типам"}/>
                </div>
            </div> */}
            <fieldset>
                <label className={allTypes ? "checkedLabel" : ""}>
                    <input value={"Выбрать все"} onChange={() => changeAllTypes(!allTypes)} type="checkbox"/>{"Выбрать все"}
                </label>
                { types.map((type, index) => (
                    <label key={index} className={type.checked ? "checkedLabel" : ""}>
                        <input value={type.id} onChange={(e) => onCheckboxChange(e)} type="checkbox"/>{type.name}
                    </label>
                ))}
            </fieldset>
        </div>
    );
};

export default SideMenu;