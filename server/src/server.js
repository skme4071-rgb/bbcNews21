import app from "./app.js";

const PORT = process.env.PORT || 5000;
const APP_URL = process.env.APP_URL;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on APP_URL  ${APP_URL + PORT} [${process.env.NODE_ENV}]`
    );
});
