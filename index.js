import express from "express";
import { fileURLToPath } from "url"
import { dirname } from "path";
import { _opdCharName } from "./src/opdCharName.js";
import { _getHeaders } from "./src/getHeaders.js";

const OK = 200;
const BAD_REQUEST = 400;
const INTERNAL_ERROR = 500;

const server = express();
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

server.get("/", (req, res) => {
    console.log("Requested from ip: " + req.ip);
    return res.sendFile(__dirname + "/src/pages/requestPage.html");
})

server.get("/styles/requestPage.css", (req, res) => {
    return res.sendFile(__dirname + "/src/styles/requestPage.css");
})

server.get("/images/spinner.svg", (req, res) => {
    return res.sendFile(__dirname + "/src/images/spinner.svg");
})

server.get("/scripts/requestPage.js", (req, res) => {
    return res.sendFile(__dirname + "/src/scripts/requestPage.js");
})

// Exemplo de uso: curl "192.168.1.69:3000/element?site=https://github.com/Hartye&element=p&showOnConsole=true"
server.get("/element", async (req, res) => {
    // Getting values from query
    const url = await decodeURI(req.query.site);
    const el = await decodeURI(req.query.element);
    console.table(req.query);

    // Working the info
    const chars = await _getHeaders(String(url), String(el));

    // Check if request wants to print the data on console
    const showOnConsole = await decodeURI(req.query.showOnConsole);
    if (showOnConsole === "true") { console.log(chars); };

    // Returning the fetched values
    return chars !== false ? res.json(chars) : res.sendStatus(INTERNAL_ERROR);
})

server.get("/names", async (req, res) => {
    
    const url = await decodeURI(req.query.site);
    console.table(req.query);
    const chars = await _opdCharName(String(url));
    return res.json(chars);
})

server.get("/info", async (req, res) => {
    console.log(
        {
            Headers: req.headers["user-agent"],
            Cookies: req.cookies
        });
    return res.sendStatus(OK);
})

const PORT = 3000;
const HOST = "192.168.1.69";
server.listen(PORT, () => console.log(`Listenning on port *${HOST}:${PORT}`));
