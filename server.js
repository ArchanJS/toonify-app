const app = require('express')();
require('dotenv').config({ path: './config.env' });
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }))
app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT || 8000;

app.use('/api/auth', require('./routes/toonifyRoute'));

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})