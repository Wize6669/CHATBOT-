const express = require('express');
const routes = require('./routes/chatwood-hook');
class ServerHttp {
    app;
    port = process.env.PORT_SERVER ?? 3003;
    providerWhatSapp;

    constructor(_providerWhatSapp) {
        this.providerWhatSapp = _providerWhatSapp;
    }

    buildApp = () => {
        return this.app = express()
            .use(express.json())
            .use((req, _, next) => {
                req.providerWhatSapp = this.providerWhatSapp;
                next();
            })
            .use(routes)
            .listen(this.port, () => console.log(`Server up on port ${this.port}`))
            ;
    }

    start() {
        this.buildApp();
    }
}

module.exports = ServerHttp;