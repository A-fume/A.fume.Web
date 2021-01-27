import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, PlusSquareOutlined } from '@ant-design/icons';
import BrandForm from './Sections/BrandForm.js';
import BrandSheet from './Sections/BrandSheet.js';

function BrandSheetPage(props) {
    const [Brands, setBrands] = useState([]);
    const [Brand, setBrand] = useState(null);

    function getBrands() {
        const endpoint = `${process.env.REACT_APP_PROXY_API}brand/all`;
        return axios
            .get(endpoint)
            .then((response) => {
                setBrands(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function postBrand(brand) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}brand/`;
        return axios
            .put(`${endpoint}${Brand.brandIdx}`, brand)
            .then((response) => {
                alert('수정되었습니다');
                setBrand(response.data);
                getBrands();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onItemSelect(row) {
        if (Brand && Brand.brandIdx === row.original.brandIdx) {
            setBrand(null);
            return;
        }
        setBrand(row.original);
    }

    useEffect(() => {
        getBrands();
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
                                향수 브랜드 리스트
                                <Link to="/brand">
                                    <AppstoreOutlined />
                                </Link>
                                <Link to="/brand/add">
                                    <PlusSquareOutlined />
                                </Link>
                            </h2>
                        </Row>
                        <BrandSheet
                            Brands={Brands}
                            Brand={Brand}
                            onItemSelect={onItemSelect}
                        />
                    </Col>
                    <Col flex={Brand ? '200px' : '0px'}>
                        {Brand && (
                            <BrandForm Brand={Brand} onSubmit={postBrand} />
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default BrandSheetPage;
