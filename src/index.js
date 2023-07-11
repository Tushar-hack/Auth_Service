const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);
const prepareAndStartServer = () => {
    app.listen(PORT, () => {
        console.log(`Server Started on Port: ${PORT}`);
    });
}

prepareAndStartServer();