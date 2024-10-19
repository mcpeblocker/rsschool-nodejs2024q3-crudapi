import database from "../core/database";
import { Route } from "../types/Route";
import { ApplicationError, getErrorHandler, serverError } from "../utils/errors";

const matchesBasePath = /\api\/users(\/)?$/;
const matchesPathWithId = /\/api\/users\/(.+)$/;

const subroutes: Route[] = [
    {
        method: "GET",
        path: matchesBasePath,
        handler: (_, res) => {
            const users = database.getUsers();
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.write(JSON.stringify(users));
            res.end();
        }
    },
    {
        method: "GET",
        path: matchesPathWithId,
        handler: (req, res) => {
            let url = req.url?.at(-1) === "/" ? req.url.slice(0, -1) : req.url;
            const id = url?.split("/").pop() || "";
            const user = database.findUser(id);
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.write(JSON.stringify(user));
            res.end();
        }
    },
    {
        method: "POST",
        path: matchesBasePath,
        handler: (req, res) => {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
                try {
                    const user = database.addUser(JSON.parse(data));
                    res.writeHead(201, {
                        "Content-Type": "application/json"
                    });
                    res.write(JSON.stringify(user));
                    res.end();
                } catch (error) {
                    getErrorHandler(
                        error instanceof ApplicationError ? error : serverError
                    )(res);
                }
            });
        }
    },
    {
        method: "PUT",
        path: matchesPathWithId,
        handler: (req, res) => {
            let url = req.url?.at(-1) === "/" ? req.url.slice(0, -1) : req.url;
            const id = url?.split("/").pop() || "";
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
                try {
                    const user = database.editUser(id, JSON.parse(data));
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    res.write(JSON.stringify(user));
                    res.end();
                } catch (error) {
                    getErrorHandler(
                        error instanceof ApplicationError ? error : serverError
                    )(res);
                }
            });
        }
    },
    {
        method: "DELETE",
        path: matchesPathWithId,
        handler: (req, res) => {
            let url = req.url?.at(-1) === "/" ? req.url.slice(0, -1) : req.url;
            const id = url?.split("/").pop() || "";
            database.deleteUser(id);
            res.writeHead(204);
            res.end();
        }
    },
]


export default subroutes;