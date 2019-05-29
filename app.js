const express = require("express");
const morgan = require("morgan");
const path = require('path');
const con = require("./db/db");

const pageRouter = require("./routes/page");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use("/", pageRouter);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});