import React from 'react';
import dayUtil from '../../../util/dayUtil.js';
import Sheet from '../../Common/Sheet/Sheet.js';
const { diffFromNow, dateString } = dayUtil;

function SeriesSheet(props) {
    const { SeriesList, Series, onItemSelect } = props;

    const columns = React.useMemo(
        () => [
            {
                Header: 'no',
                accessor: 'seriesIdx',
                width: '30px',
            },
            {
                Header: '이름',
                accessor: 'name',
                width: '150px',
            },
            {
                Header: 'name',
                accessor: 'englishName',
                width: '150px',
            },
            {
                Header: '설명',
                accessor: 'description',
                width: 'auto',
            },
            {
                Header: '생성 시간',
                accessor: 'createdAt',
                Cell: (props) => <span>{dateString(props.value)}</span>,
                width: '80px',
            },
            {
                Header: '수정 시간',
                accessor: 'updatedAt',
                Cell: (props) => {
                    return <span>{diffFromNow(props.value)}</span>;
                },
                width: '70px',
            },
        ],
        []
    );

    return (
        <Sheet
            columns={columns}
            ItemList={SeriesList}
            Item={Series}
            onItemSelect={onItemSelect}
        />
    );
}

export default SeriesSheet;
