import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BrandForm from './BrandForm.js';

let isSubscribe;
function BrandEditPage(props) {
    const [Brand, setBrand] = useState({
        brandIdx: 0,
        name: '',
        englishName: '',
        startCharacter: '',
        imageUrl: '',
        description: '',
        createdAt: '',
        updatedAt: '',
    });

    function postBrand(brand) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}brand/`;
        return axios
            .put(`${endpoint}${Brand.brandIdx}`, brand)
            .then((response) => {
                if (!isSubscribe) return;
                alert('수정되었습니다');
                setBrand(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getBrand(brandId) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}brand`;
        return axios
            .get(`${endpoint}/${brandId}`)
            .then((response) => {
                setBrand(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        isSubscribe = true;
        getBrand(props.match.params.brandId);
        return () => {
            isSubscribe = false;
        };
    }, [props.match.params.brandId]);

    return <BrandForm Brand={Brand} onSubmit={postBrand} />;
}

export default BrandEditPage;
