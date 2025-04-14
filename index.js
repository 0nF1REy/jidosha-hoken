const express = require("express");
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cors = require('cors');

// Importações dos módulos
const { enviarNotificacao } = require('./enviar-notificacao');
const { listarSeguros, salvarSeguro } = require('./seguro-service');
const { adicionaPushSubscriber } = require('./adiciona-push-subscriber');

// Chaves VAPID para notificações push
const vapidKeys = {
    publicKey: "BBl5Vw0PCEM8nbonAjahMaBPAR3MEibrU-zwkXHd0vp_bL4w43ej_K41pLBWOIjCW_3TnotZvskdY_Xmg0Hde3I",
    privateKey: "QHznI0Lrhm5c8ByTsuNyuJKZamqo7qSXwuyBfSD7sIs"
};

// Configuração do webpush
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

app.route('/api/seguros')
    .get(listarSeguros)
    .post(salvarSeguro);

app.route('/api/notificacao')
    .post(adicionaPushSubscriber);

app.route('/api/notificacao/enviar')
    .post(enviarNotificacao);

const PORT = 9000;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`✅ HTTP Server running at http://${HOST}:${PORT}`);
});
