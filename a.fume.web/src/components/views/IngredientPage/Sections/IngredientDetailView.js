import React from 'react';
import { Row } from 'antd';
import Card from '../../Common/Card/Card.js';

function IngredientDetailView(props) {
    const { SeriesList } = props;

    return (
        <div className="form-container">
            <h4>해당하는 계열 리스트</h4>
            <input
                type="text"
                placeholder="추가하고자 하는 계열 이름을 입력해주세요"
            />
            <Row gutter={[16, 16]}>
                {SeriesList.map((series, index) => (
                    <React.Fragment key={index}>
                        <Card
                            href={`/series/edit/${series.seriesIdx}`}
                            image={series.imageUrl}
                            id={series.seriesIdx}
                            title={series.name}
                        />
                    </React.Fragment>
                ))}
            </Row>
        </div>
    );
}

export default IngredientDetailView;
