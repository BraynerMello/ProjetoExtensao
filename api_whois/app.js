const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const fetch = require("node-fetch");
const fs = require("fs");
const https = require("https");

app.use(session({
    secret: "Brayner",
    resave: true,
    saveUninitialized:true,
    cookie: {
        maxAge: 300000
    }
}))

app.use(express.static('public'));
app.use(cors({
    origin:"*"
}));

app.get("/whois/:slug", async (req, res) => {
    var slug = req.params.slug;
    const response = await fetch(`https://rdap.registro.br/domain/${slug}`, {
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/json"
                    }
                });
    res.json(await response.json());
} );

app.get("/receita/:slug", async (req, res) => {
    var slug = req.params.slug;
    const response = await fetch(`https://receitaws.com.br/v1/cnpj/${slug}`, {
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/json"
                    }
                });
    res.json(await response.json());
} );

app.listen(80,'192.168.67.105', () => {
    console.log("API UP! ");
});

https.createServer({
    cert:fs.readFileSync('SSL/code.crt'),
    key:fs.readFileSync('SSL/code.key')
}, app).listen(3001,'192.168.67.105',() => {
    console.log("RODANDO HTTPS");
});