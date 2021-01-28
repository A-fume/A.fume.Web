import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IngredientForm from './Sections/IngredientForm.js';

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

    useEffect(() => {
        isSubscribe = true;
        getBrand(props.match.params.ingredientId);
        return () => {
            isSubscribe = false;
        };
    }, [props.match.params.ingredientId]);

    return <IngredientForm Ingredient={Ingredient} onSubmit={postIngredient} />;
}

export default IngredientEditPage;
