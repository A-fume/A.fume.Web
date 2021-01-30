import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import SeriesForm from './Sections/SeriesForm.js';
import SeriesDetail from './Sections/SeriesDetailView.js';

let isSubscribe;
function SeriesEditPage(props) {
    const [Series, setSeries] = useState({
        seriesIdx: 0,
        name: '',
        englishName: '',
        description: '',
        createdAt: '',
        updatedAt: '',
    });
    const [IngredientList, setIngredientList] = useState([]);

    function postSeries(series) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}series/`;
        return axios
            .put(`${endpoint}${Series.seriesIdx}`, series)
            .then((response) => {
                if (!isSubscribe) return;
                alert('수정되었습니다');
                setSeries(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getSeries(seriesId) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}series`;
        return axios
            .get(`${endpoint}/${seriesId}`)
            .then((response) => {
                setSeries(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    function getIngredients(seriesId) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}series`;
        return axios
            .get(`${endpoint}/${seriesId}/ingredients`)
            .then((response) => {
                setIngredientList(response.data);
            })
            .catch(console.log);
    }

    useEffect(() => {
        isSubscribe = true;
        getSeries(props.match.params.seriesId);
        getIngredients(props.match.params.seriesId);
        return () => {
            isSubscribe = false;
        };
    }, [props.match.params.seriesId]);

    return (
        <Row gutter={[2, 1]} align="center">
            <Col flex="1">
                <SeriesForm Series={Series} onSubmit={postSeries} />
            </Col>
            <Col flex="1">
                <SeriesDetail IngredientList={IngredientList} />
            </Col>
        </Row>
    );
}

export default SeriesEditPage;
