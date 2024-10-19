import dotenv from 'dotenv';

dotenv.config();

let port = process.env['PORT'];
if (!port) throw new Error("Environment variable PORT is required to be set.");

const config = {
    PORT: parseInt(port)
}
export default config;