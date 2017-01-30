import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter} from 'react-router';
import { Provider  } from 'react-redux';

import store from './store';
import Pages from './pages/containers/Page.jsx';

render(
    <Provider store={store}>
        <BrowserRouter>
            <Pages />
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('render-target')
)