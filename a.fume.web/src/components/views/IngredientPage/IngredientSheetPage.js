import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, PlusSquareOutlined } from '@ant-design/icons';
import IngredientForm from './Sections/IngredientForm.js';
import IngredientSheet from './Sections/IngredientSheet.js';

function IngredientSheetPage(props) {
    const [Ingredients, setIngredients] = useState([]);
    const [Ingredient, setIngredient] = useState(null);

    function getIngredients() {
        const endpoint = `${process.env.REACT_APP_PROXY_API}ingredient/all`;
        return axios
            .get(endpoint)
            .then((response) => {
                setIngredients(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function postIngredient(ingredient) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}ingredient/`;
        return axios
            .put(`${endpoint}${Ingredient.ingredientIdx}`, ingredient)
            .then((response) => {
                alert('수정되었습니다');
                setIngredient(response.data);
                getIngredients();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onItemSelect(row) {
        if (
            Ingredient &&
            Ingredient.ingredientIdx === row.original.ingredientIdx
        ) {
            setIngredient(null);
            return;
        }
        setIngredient(row.original);
    }

    useEffect(() => {
        getIngredients();
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
                                향수 재료 리스트
                                <Link to="/ingredient">
                                    <AppstoreOutlined />
                                </Link>
                                <Link to="/ingredient/add">
                                    <PlusSquareOutlined />
                                </Link>
                            </h2>
                        </Row>
                        <IngredientSheet
                            Ingredients={Ingredients}
                            Ingredient={Ingredient}
                            onItemSelect={onItemSelect}
                        />
                    </Col>
                    <Col flex={Ingredient ? '200px' : '0px'}>
                        {Ingredient && (
                            <IngredientForm
                                Ingredient={Ingredient}
                                onSubmit={postIngredient}
                            />
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default IngredientSheetPage;
