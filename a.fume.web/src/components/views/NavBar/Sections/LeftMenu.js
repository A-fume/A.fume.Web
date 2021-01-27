import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="perfumeList">
                <a href="/perfume">Perfume</a>
            </Menu.Item>
            <Menu.Item key="brandList">
                <a href="/brand">Brand</a>
            </Menu.Item>
            <Menu.Item key="serriesList">
                <a href="/series">Series</a>
            </Menu.Item>
            <Menu.Item key="favorite">
                <a href="/favorite">Favorite</a>
            </Menu.Item>
        </Menu>
    );
}

export default LeftMenu;
