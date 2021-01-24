import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeriesForm from './Sections/SeriesForm.js';

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
    }

    useEffect(() => {
        isSubscribe = true;
        getSeries(props.match.params.seriesId);
        return () => {
            isSubscribe = false;
        };
    }, [props.match.params.seriesId]);

    return <SeriesForm Series={Series} onSubmit={postSeries} />;
}

export default SeriesEditPage;
