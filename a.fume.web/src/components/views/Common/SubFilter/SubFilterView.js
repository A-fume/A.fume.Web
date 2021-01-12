import React, { useState } from 'react';

import { Select } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import './SubFilter.css';

const { Option } = Select;

const ascendingArr = ['', 'desc', 'asc'];
const ascendingSize = 3;

function SubFilterView(props) {
    const { sortCriteriaList } = props;

    const [defaultKey, defaultAscending] = props.sort.split('_');
    const [Key, setKey] = useState(defaultKey);
    const [AscendingIdx, setAscendingIdx] = useState(
        defaultAscending === 'asc' ? 2 : defaultAscending === 'desc' ? 1 : 0
    );

    function updateSort(e) {
        if (Key !== e.value) {
            setKey(e.value);
            setAscendingIdx(1);
            props.onUpdate({ sort: `${e.value}_${ascendingArr[1]}` });
            return;
        }
        const nextIdx = (AscendingIdx + 1) % ascendingSize;
        if (nextIdx === 0) {
            setKey('');
            setAscendingIdx(0);
            props.onUpdate({ sort: undefined });
            return;
        }
        props.onUpdate({ sort: `${e.value}_${ascendingArr[nextIdx]}` });
        setAscendingIdx(nextIdx);
    }
    return (
        <div className="sub_filter_container">
            {sortCriteriaList &&
                sortCriteriaList.map((sortCriteria, index) => (
                    <React.Fragment key={index}>
                        <span
                            className="sort_criteria"
                            value={sortCriteria.value}
                            onClick={updateSort.bind(this, sortCriteria)}
                        >
                            {sortCriteria.name}
                            {Key === sortCriteria.value &&
                                ((AscendingIdx === 1 && (
                                    <CaretDownOutlined />
                                )) ||
                                    (AscendingIdx === 2 && (
                                        <CaretUpOutlined />
                                    )))}
                        </span>
                    </React.Fragment>
                ))}
            <Select
                defaultValue={props.pagingSize}
                style={{ width: 120 }}
                onChange={(it) => {
                    props.onUpdate({ pagingSize: it });
                }}
            >
                <Option value={20}>20개씩 보기</Option>
                <Option value={40}>40개씩 보기</Option>
                <Option value={60}>60개씩 보기</Option>
                <Option value={80}>80개씩 보기</Option>
            </Select>
        </div>
    );
}

export default SubFilterView;
