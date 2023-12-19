const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const ServerHttp = require("./http");
const {sendMessageChatWood} = require("./services/chatwood");

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAction(
    async (ctx, {flowDynamic}) => {
        const message = "*Gracias*";
        await sendMessageChatWood(message, 'incoming');
        await flowDynamic(message);
    }
);

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['Hola', 'Buena noches', 'Buenos días', 'Buenos dias', 'Buenas tardes',
    'Buen día', 'Buen dia', 'buena noche','Buena tarde'])
    .addAnswer('🙌 Hola bienvenido a *Importadora Pro|Machines*')
    .addAnswer(
        [
            'Gracias por contactarnos en un momento respondemos tu requerimiento. ',
            '',
            '🏭 CENTRO COMERCIAL QUITUS LOCAL # 415 PASILLO 6, SEGUNDO PISO',
            '',
            '🕚HORARIOS DE ATENCIÓN 🕔 LUNES A  SÁBADO 10 am- 17:30pm',
            '',
            'Echale un ojo a nuestro catálogo 👀👇🏻👇🏻👇🏻',
            '',
            'https://wa.me/c/593986654694'
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    const server = new ServerHttp(adapterProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    console.log(process.env.CHATWOOT_TOKEN);
    QRPortalWeb();
    server.start();
}

main();
