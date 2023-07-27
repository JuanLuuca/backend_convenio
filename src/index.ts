require('dotenv').config();
import * as express from "express";
import * as cors from "cors";
import router from "./routes/rotas";

const server = express();

server.use(cors());
server.use(express.json());

server.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' })
})
    
server.use(router);

server.listen(process.env.PORT, function () {
  console.log(`--------SERVIDOR CONECTADO RODANDO NA PORTA ${process.env.PORT}--------`);
});