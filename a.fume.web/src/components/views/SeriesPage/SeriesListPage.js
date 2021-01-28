import React, { useState, useEffect } from 'react';
import { Button, Row } from 'antd';
import axios from 'axios';
import Card from '../Common/Card/Card.js';
import SubFilterView from '../Common/SubFilter/SubFilterView.js';
import queryString from 'query-string';
import PaginationBarView from '../Common/PaginationBar/PaginationBarView.js';
import { Link } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';

function SeriesListPage(props) {
    const defaultQuery = {
        pagingIndex: 1,
        pagingSize: 20,
        sort: 'createdAt_desc',
    };

    const [Query, setQuery] = useState(
        Object.assign(defaultQuery, queryString.parse(props.location.search))
    );
    const [SeriesList, setSeriesList] = useState([]);
    const [TotalCount, setTotalCount] = useState(0);
    const [TotalPage, setTotalPage] = useState(0);

    function getSeriesList(query) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}series/search/all`;
        return axios
            .get(`${endpoint}?${queryString.stringify(query)}`)
            .then((response) => {
                setTotalCount(response.data.count);
                setTotalPage(
                    parseInt(response.data.count / query.pagingSize) + 1
                );
                setSeriesList(response.data.rows);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getSeriesList(Query);
    }, [Query]);

    function updateQueryParams(it) {
        const query = Object.assign(Query, it);
        Object.keys(query).forEach((key) => {
            if (query[key] === undefined) {
                delete query[key];
            }
        });
        props.history.replace(`/series?${queryString.stringify(query)}`);
        setQuery(Object.assign(defaultQuery, query));
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>
                    향수 계열 리스트
                    <Link to="series/sheet">
                        <FileTextOutlined />
                    </Link>
                </h2>

                <hr />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <SubFilterView
                        pagingSize={Query.pagingSize}
                        sortCriteriaList={[
                            { name: '이름순', value: 'name' },
                            { name: '영어이름순', value: 'englishName' },
                            { name: '최신순', value: 'createdAt' },
                        ]}
                        sort={Query.sort}
                        onUpdate={(it) => updateQueryParams(it)}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/series/add">
                        <Button type="primary">재료 추가</Button>{' '}
                    </Link>
                </div>
                <div>{TotalCount} 개의 재료가 검색 되었습니다.</div>
                <Row gutter={[16, 16]}>
                    {SeriesList &&
                        SeriesList.map((Series, index) => (
                            <React.Fragment key={index}>
                                <Card
                                    href={`/series/edit/${Series.seriesIdx}`}
                                    image={Series.imageUrl}
                                    id={Series.seriesIdx}
                                    title={Series.name}
                                />
                            </React.Fragment>
                        ))}
                </Row>
            </div>

            <PaginationBarView
                pagingIndex={Query.pagingIndex}
                totalPage={TotalPage}
                onUpdatePagingIndex={(pagingIndex) => {
                    updateQueryParams({ pagingIndex });
                }}
            />
        </div>
    );
}

export default SeriesListPage;
