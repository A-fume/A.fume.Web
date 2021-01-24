import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, PlusSquareOutlined } from '@ant-design/icons';
import SeriesForm from './Sections/SeriesForm.js';
import SeriesSheet from './Sections/SeriesSheet.js';

function SeriesSheetPage(props) {
    const [SeriesList, setSeriesList] = useState([]);
    const [Series, setSeries] = useState(null);

    function getSeriesList() {
        const endpoint = `${process.env.REACT_APP_PROXY_API}series/all`;
        return axios
            .get(endpoint)
            .then((response) => {
                setSeriesList(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function postSeries(series) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}series/`;
        return axios
            .put(`${endpoint}${Series.seriesIdx}`, series)
            .then((response) => {
                alert('수정되었습니다');
                setSeries(response.data);
                getSeriesList();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onItemSelect(row) {
        if (Series && Series.seriesIdx === row.original.seriesIdx) {
            setSeries(null);
            return;
        }
        setSeries(row.original);
    }

    useEffect(() => {
        getSeriesList();
    }, []);

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <div style={{ width: '95%', margin: '1rem auto' }}>
                <Row type="flex">
                    <Col
                        flex="1"
                        style={{
                            overflow: 'auto',
                            height: '80vh',
                            overflowY: 'auto',
                        }}
                    >
                        <Row>
                            <h2>
                                향수 계열 리스트
                                <Link to="/series">
                                    <AppstoreOutlined />
                                </Link>
                                <Link to="/series/add">
                                    <PlusSquareOutlined />
                                </Link>
                            </h2>
                        </Row>
                        <SeriesSheet
                            SeriesList={SeriesList}
                            Series={Series}
                            onItemSelect={onItemSelect}
                        />
                    </Col>
                    <Col flex={Series ? '200px' : '0px'}>
                        {Series && (
                            <SeriesForm Series={Series} onSubmit={postSeries} />
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SeriesSheetPage;
