import React, { useState, useEffect } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import "./PaginationBar.css";

function PaginationBarView(props) {
    const [Pages, setPages] = useState([])

    useEffect(() => {
        const startIndex = Math.max(1, props.pagingIndex - 4);
        const endIndex = Math.min(props.pagingIndex + 4, props.totalPage);
        const arr = [];
        for(let i = startIndex; i <= endIndex; i++){
            arr.push(i);
        }
        setPages(arr);
    }, [props.pagingIndex, props.totalPage]);


    return (
        <div className='pagination_bar_container'>
        
            { 1 < props.pagingIndex && <div className='pagination_prev' onClick={ () => props.onUpdatePagingIndex(parseInt(props.pagingIndex) - 1) }><DoubleLeftOutlined />이전</div> }
            {
                Pages && Pages.map((it, index) => {
                    const pageView = parseInt(props.pagingIndex) === it
                            ? <span className='pagination_btn_page active'>{it}</span>
                            : <div className='pagination_btn_page' onClick={ () => props.onUpdatePagingIndex(it) }>{it}</div>
                    return (
                        <React.Fragment key={index}>
                            {pageView}
                        </React.Fragment>
                    )
                    
                })
            }
            { props.pagingIndex < props.totalPage && <div className='pagination_next' onClick={ () => props.onUpdatePagingIndex(parseInt(props.pagingIndex) + 1) }>다음<DoubleRightOutlined /></div> }
        </div>
    )
}

export default PaginationBarView
