import React from 'react';
import { Col } from 'antd';

function BrandCards(props) {

    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={props.href}>
                <img style={{ width: '100%', height: '320px' }} 
                    src={props.image || 'https://file.mk.co.kr/tour/content/image/2019/11/11/2019111112003546006718.png'} 
                    alt={props.name}
                />
                </a>
                <div>{props.name}</div>
            </div>
        </Col>
    )
}

export default BrandCards
