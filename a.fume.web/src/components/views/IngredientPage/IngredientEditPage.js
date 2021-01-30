import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import IngredientForm from './Sections/IngredientForm.js';
import IngredientDetailView from './Sections/IngredientDetailView.js';

let isSubscribe;
function IngredientEditPage(props) {
    const [Ingredient, setIngredient] = useState({
        ingredientIdx: 0,
        name: '',
        englishName: '',
        imageUrl: '',
        description: '',
        createdAt: '',
        updatedAt: '',
    });
    const [SeriesList, setSeriesList] = useState([]);

    function postIngredient(ingredient) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}ingredient/`;
        return axios
            .put(`${endpoint}${Ingredient.ingredientIdx}`, ingredient)
            .then((response) => {
                if (!isSubscribe) return;
                alert('수정되었습니다');
                setIngredient(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getBrand(ingredientId) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}ingredient`;
        return axios
            .get(`${endpoint}/${ingredientId}`)
            .then((response) => {
                setIngredient(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getSeriesList(ingredientId) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}ingredient`;
        return axios
            .get(`${endpoint}/${ingredientId}/series`)
            .then((response) => {
                setSeriesList(response.data);
            })
            .catch(console.log);
    }

    useEffect(() => {
        isSubscribe = true;
        getBrand(props.match.params.ingredientId);
        getSeriesList(props.match.params.ingredientId);
        return () => {
            isSubscribe = false;
        };
    }, [props.match.params.ingredientId]);

    return (
        <Row gutter={[2, 1]} align="center">
            <Col flex="1">
                <IngredientForm
                    Ingredient={Ingredient}
                    onSubmit={postIngredient}
                />
            </Col>
            <Col flex="1">
                <IngredientDetailView SeriesList={SeriesList} />
            </Col>
        </Row>
    );
}

export default IngredientEditPage;
