import app from "./app.js";
import connectionMongoDB from "./config/db.js";


const serverStart = async () => {
    const {
        PORT = 5000,
        APP_URL = "http://localhost",
        NODE_ENV = "development"
    } = process.env;

    await connectionMongoDB();

    app.listen(PORT, () => {
        console.log(
            `🚀 Server running on ${APP_URL}:${PORT} [${NODE_ENV}]`
        );
    });
};

serverStart();