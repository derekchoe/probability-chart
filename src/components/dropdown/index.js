// @flow
import React, { Fragment, useCallback } from 'react';
import './index.css'

const Dropdown = ({ items, className = '', selected, handleClick, ...rest }) => {
    const handleItemClick = useCallback(
        (item, e) => {
            e && e.stopPropagation();
            handleClick && handleClick(item);
        },
        [handleClick]
    );
    const selectedItem = (items && items.find(item => item.value === selected.value)) || { value: '', display: '' };

    return (
        <div className="dropdown__container" {...rest} >
            {items && (
                <Fragment>
                    <select
                        value={selectedItem.value}
                        onChange={e => {
                            const { options, selectedIndex } = e.target;
                            const target = options[selectedIndex];
                            const item = items.find(item => target.value === item.value) || {};

                            item.handleItem && item.handleItem(item);
                            handleItemClick(item, e);
                        }}
                    >
                        {items.map(item => (
                            <option key={item.value} value={item.value}>
                                {item.display || item.value}
                            </option>
                        ))}
                    </select>
                </Fragment>
            )}
        </div>
    );
};

export function convertItemToString(item) {
    return (item && item.value) || '';
}

export function convertItemToNumber(item) {
    return Number(item);
}

export function convertStringsToItems(arr) {
    return (arr || []).map(item => {
        return {
            value: item,
            display: item,
        };
    });
}

export function convertNumbersToItems(arr){
    return (arr || []).map(item => {
        return {
            value: `${item}`,
            display: `${item}`,
        };
    });
}

export function convertArrayToItems(arr ) {
    const items = arr.map(item => {
        return { ...item };
    });

    return items;
}

export default Dropdown;
