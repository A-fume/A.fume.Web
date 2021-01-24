import React from 'react';
import axios from 'axios';
import SeriesForm from './Sections/SeriesForm.js';

function SeriesAddPage(props) {
    function postSeries(brand) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}series/`;
        return axios
            .post(endpoint, brand)
            .then((response) => {
                alert('생성 되었습니다');
                props.history.replace(`/series`);
            })
            .catch((err) => {
                if (err.response.data) {
                    alert(err.response.data.message);
                }
                console.log(err.message);
            });
    }

    return (
        <SeriesForm
            Series={{
                seriesIdx: 0,
                name: '',
                englishName: '',
                description: '',
                createdAt: '',
                updatedAt: '',
            }}
            onSubmit={postSeries}
        />
    );
}

export default SeriesAddPage;
