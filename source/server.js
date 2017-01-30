import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { createServerRenderContext, ServerRouter } from 'react-router';

import Pages from './pages/containers/page.jsx';
import Layout from './pages/components/Layout.jsx';
import {Provider} from 'react-redux';
import store from './store';

function requestHandler (request , response) {
    const context = createServerRenderContext();

    let html = renderToString(
        <Provider store={store}>
             <ServerRouter location={request.url} context={context}>
                <Pages />
            </ServerRouter>
        </Provider>
    );
    
    const result = context.getResult();
    if (result.redirect) {
        response.writeHead(301, {
            Location: result.redirect.pathname
        });
        response.end();
    }
    if (result.missed) {
        response.writeHead(404);
        html = renderToString(
             <ServerRouter location={request.url} context={context}>
                <Pages />
            </ServerRouter>
        )
    }
    response.setHeader('Content-type', 'text/html');
    response.write(
        renderToStaticMarkup(<Layout title="Aplicacion" content={html}/>)
    );
    
    response.end();
}

const server  = http.createServer(requestHandler);
server.listen(3000)
