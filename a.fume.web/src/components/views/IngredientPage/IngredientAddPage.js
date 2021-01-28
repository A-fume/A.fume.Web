import React from 'react';
import axios from 'axios';
import IngredientForm from './Sections/IngredientForm.js';

function IngredientAddPage(props) {
    function postIngredient(brand) {
        const endpoint = `${process.env.REACT_APP_PROXY_API}ingredient/`;
        return axios
            .post(endpoint, brand)
            .then((response) => {
                alert('생성 되었습니다');
                props.history.replace(`/ingredient`);
            })
            .catch((err) => {
                if (err.response.data) {
                    alert(err.response.data.message);
                }
                console.log(err.message);
            });
    }

    return (
        <IngredientForm
            Ingredient={{
                ingredientIdx: 0,
                name: '',
                englishName: '',
                imageUrl: '',
                description: '',
                createdAt: '',
                updatedAt: '',
            }}
            onSubmit={postIngredient}
        />
    );
}

export default IngredientAddPage;
