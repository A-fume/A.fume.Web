import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth.js';

import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
//import PerfumeListPage from './views/PerfumeListPage/PerfumeListPage.js';
import BrandListPage from './views/BrandPage/BrandListPage.js';
import BrandAddPage from './views/BrandPage/BrandAddPage.js';
import BrandEditPage from './views/BrandPage/BrandEditPage.js';
import BrandSheetPage from './views/BrandPage/BrandSheetPage.js';
import IngredientListPage from './views/IngredientPage/IngredientListPage.js';
import IngredientAddPage from './views/IngredientPage/IngredientAddPage.js';
import IngredientEditPage from './views/IngredientPage/IngredientEditPage.js';
import IngredientSheetPage from './views/IngredientPage/IngredientSheetPage.js';
import SeriesListPage from './views/SeriesPage/SeriesListPage.js';
import SeriesAddPage from './views/SeriesPage/SeriesAddPage.js';
import SeriesEditPage from './views/SeriesPage/SeriesEditPage.js';
import SeriesSheetPage from './views/SeriesPage/SeriesSheetPage.js';
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
                        path="/brand/sheet"
                        component={Auth(BrandSheetPage, true)}
                    />
                    <Route
                        exact
                        path="/brand"
                        component={Auth(BrandListPage, true)}
                    />
                    <Route
                        exact
                        path="/brand/edit/:brandId"
                        component={Auth(BrandEditPage, true)}
                    />
                    <Route
                        exact
                        path="/brand/add"
                        component={Auth(BrandAddPage, true)}
                    />
                    <Route
                        exact
                        path="/series/sheet"
                        component={Auth(SeriesSheetPage, true)}
                    />
                    <Route
                        exact
                        path="/series"
                        component={Auth(SeriesListPage, true)}
                    />
                    <Route
                        exact
                        path="/series/edit/:seriesId"
                        component={Auth(SeriesEditPage, true)}
                    />
                    <Route
                        exact
                        path="/series/add"
                        component={Auth(SeriesAddPage, true)}
                    />
                    <Route
                        exact
                        path="/ingredient/sheet"
                        component={Auth(IngredientSheetPage, true)}
                    />
                    <Route
                        exact
                        path="/ingredient"
                        component={Auth(IngredientListPage, true)}
                    />
                    <Route
                        exact
                        path="/ingredient/edit/:ingredientId"
                        component={Auth(IngredientEditPage, true)}
                    />
                    <Route
                        exact
                        path="/ingredient/add"
                        component={Auth(IngredientAddPage, true)}
                    />
                    <Route
                        exact
                        path="/perfume"
                        component={Auth(PerfumeListPage, true)}
                    />*/}
                    {/* <Route exact path='/perfume/:perfumeId' component={Auth(PerfumeDetail, null)} />*/}
                </Switch>
            </div>
            <Footer />
        </Suspense>
    );
}

export default App;
