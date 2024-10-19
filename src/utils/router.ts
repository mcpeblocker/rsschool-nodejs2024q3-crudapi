import http from 'http';
import { Route } from "../types/Route";
import notFoundHandler from '../handlers/notFound';
import { ApplicationError } from './errors';

const router = (routes: Route[]) => (req: http.IncomingMessage, res: http.ServerResponse) => {
    const handler =
        routes.find(route => req.method === route.method && req.url && route.path.test(req.url))?.handler
        || notFoundHandler;
    try {
        handler(req, res);
    } catch(error) {
        if (error instanceof ApplicationError) {
            res.statusCode = error.statusCode;
            res.write(error.message);
            res.end();
        } else {
            res.statusCode = 500;
            res.write("An unexpected error occurred.");
            res.end();
        }
    }
}

export default router;