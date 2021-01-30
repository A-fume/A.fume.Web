import React from 'react';
import { Row, Col } from 'antd';
import Card from '../../Common/Card/Card.js';

function SeriesDetailView(props) {
    const { IngredientList } = props;

    return (
        <div className="form-container">
            <h4>해당하는 재료 리스트</h4>
            <input
                type="text"
                placeholder="추가하고자 하는 재료 이름을 입력해주세요"
            />
            <Row gutter={[16, 16]}>
                {IngredientList.map((ingredient, index) => (
                    <React.Fragment key={index}>
                        <Card
                            href={`/ingredient/edit/${ingredient.ingredientIdx}`}
                            image={ingredient.imageUrl}
                            id={ingredient.ingredientIdx}
                            title={ingredient.name}
                        />
                    </React.Fragment>
                ))}
            </Row>
        </div>
    );
}

export default SeriesDetailView;
