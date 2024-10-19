import http from 'node:http';

export type Route = {
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: RegExp;
    handler: http.RequestListener<
                typeof http.IncomingMessage,
                typeof http.ServerResponse
            >;
}