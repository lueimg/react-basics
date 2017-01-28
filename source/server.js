import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { createServerRenderContext, ServerRouter } from 'react-router';

import Pages from './pages/containers/page.jsx';

function requestHandler (request , response) {
    // const html = renderToString(
    //     React.DOM.h1 (null, 'hola')
    // );

    const context = createServerRenderContext();

    let html = renderToString(
        <ServerRouter location={request.url} context={context}>
            <Pages />
        </ServerRouter>
    );

    const result = context.getResult();

    response.setHeader('Content-type', 'text/html');

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

    response.write(html);
    response.end();
}

const server  = http.createServer(requestHandler);

server.listen(3000)
