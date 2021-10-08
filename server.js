const app = require('express')();
require('dotenv').config({path:'./config.env'});
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const deepai = require('deepai');

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }))
app.use(cors());
app.use(morgan("dev"));

deepai.setApiKey('196e6806-f01c-4674-a021-c4ba8a7fdcf9');
const port = 8000;

app.use('/api/auth',require('./routes/toonifyRoute'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})