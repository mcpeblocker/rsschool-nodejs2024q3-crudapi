import { server } from "./core/server";
import routes from "./routes";
import config from "./utils/config";
import router from "./utils/router";

server.on('request', router(routes));

server.listen(config.PORT, () => {
    console.log(`Server is listening at port ${config.PORT}`);
});