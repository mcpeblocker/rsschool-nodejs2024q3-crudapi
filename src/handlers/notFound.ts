import http from 'node:http';

const notFoundHandler = (_: http.IncomingMessage, res: http.ServerResponse) => {
    res.statusCode = 404;
    res.write("The requested resource was not found in the server.")
    res.end();
}

export default notFoundHandler;