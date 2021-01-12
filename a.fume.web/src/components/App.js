import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth.js';

import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import PerfumeListPage from './views/PerfumeListPage/PerfumeListPage.js';
import BrandListPage from './views/BrandPage/BrandListPage.js';
import BrandPage from './views/BrandPage/BrandPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
            <div
                style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}
            >
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} />
                    <Route
                        exact
                        path="/login"
                        component={Auth(LoginPage, false)}
                    />
                    <Route
                        exact
                        path="/register"
                        component={Auth(RegisterPage, false)}
                    />
                    <Route
                        exact
                        path="/brand"
                        component={Auth(BrandListPage, true)}
                    />
                    <Route
                        exact
                        path="/brand/:brandId"
                        component={Auth(BrandPage, true)}
                    />
                    <Route
                        exact
                        path="/perfume"
                        component={Auth(PerfumeListPage, true)}
                    />
                    {/* <Route exact path='/perfume/:perfumeId' component={Auth(PerfumeDetail, null)} />*/}
                </Switch>
            </div>
            <Footer />
        </Suspense>
    );
}

export default App;
