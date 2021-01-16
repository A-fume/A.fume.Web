import React from 'react';
import { useSortBy, useTable } from 'react-table';
import './BrandSheet.css';
import dayUtil from '../../util/dayUtil.js';
const { diffFromNow, dateString } = dayUtil;

function BrandSheet(props) {
    const { Brands, Brand, onItemSelect } = props;

    const columns = React.useMemo(
        () => [
            {
                Header: 'no',
                accessor: 'brandIdx',
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: Brands }, useSortBy);

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => {
                            return (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    style={{
                                        width: column.width,
                                        border: 'solid 1px grey',
                                        background: 'aliceblue',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' ▼'
                                                : ' ▲'
                                            : ''}
                                    </span>
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            onClick={() => onItemSelect(row)}
                            className={`${
                                Brand &&
                                row.original.brandIdx === Brand.brandIdx
                                    ? 'selected'
                                    : ''
                            } ${row.index % 2 === 1 ? 'odd' : 'even'}`}
                        >
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default BrandSheet;
