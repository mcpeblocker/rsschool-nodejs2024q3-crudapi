import http from 'http';
import { Route } from "../types/Route";
import notFoundHandler from '../handlers/notFound';
import { ApplicationError, getErrorHandler, serverError } from './errors';

const router = (routes: Route[]) => (req: http.IncomingMessage, res: http.ServerResponse) => {
    const handler =
        routes.find(route => req.method === route.method && req.url && route.path.test(req.url))?.handler
        || notFoundHandler;
    try {
        handler(req, res);
    } catch(error) {
        getErrorHandler(
            error instanceof ApplicationError ? error : serverError
        )(res);
    }
}

export default router;