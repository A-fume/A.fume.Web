import React from 'react';
import axios from 'axios';
import BrandForm from './Sections/BrandForm.js';

function BrandAddPage(props) {
    function postBrand(brand) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}brand/`;
        return axios
            .post(endpoint, brand)
            .then((response) => {
                alert('생성 되었습니다');
                props.history.replace(`/brand`);
            })
            .catch((err) => {
                if (err.response.data) {
                    alert(err.response.data.message);
                }
                console.log(err.message);
            });
    }

    return (
        <BrandForm
            Brand={{
                brandIdx: 0,
                name: '',
                englishName: '',
                startCharacter: '',
                imageUrl: '',
                description: '',
                createdAt: '',
                updatedAt: '',
            }}
            onSubmit={postBrand}
        />
    );
}

export default BrandAddPage;
