const express = require("express");
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cors = require('cors');

const { enviarNotificacao } = require('./enviar-notificacao');
const { listarSeguros, salvarSeguro } = require('./seguro-service');
const { adicionaPushSubscriber } = require('./adiciona-push-subscriber');

const vapidKeys = {
    "publicKey": "BBl5Vw0PCEM8nbonAjahMaBPAR3MEibrU-zwkXHd0vp_bL4w43ej_K41pLBWOIjCW_3TnotZvskdY_Xmg0Hde3I",
    "privateKey": "QHznI0Lrhm5c8ByTsuNyuJKZamqo7qSXwuyBfSD7sIs"
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.route('/api/seguros')
    .post(salvarSeguro)
    .get(listarSeguros);

app.route('/api/notificacao')
    .post(adicionaPushSubscriber);

app.route('/api/notificacao/enviar')
    .post(enviarNotificacao);

const PORT = 9000;
const HOST = 'localhost';

const httpServer = app.listen(PORT, HOST, () => {
    console.log("HTTP Server running at http://" + HOST + ":" + PORT);
});
