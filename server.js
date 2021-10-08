const app = require('express')();
require('dotenv').config({path:'./config.env'});
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }))
app.use(cors());
app.use(morgan("dev"));

const port = 8000;

app.use('/api/auth',require('./routes/toonifyRoute'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
