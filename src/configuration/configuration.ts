export default () => ({
  grupouma: {
    server: process.env.SERVER_URL_UMA_CA,
    clientId: process.env.CLIENT_ID_UMA_CA,
    secretKey: process.env.CLIENT_SECRET_UMA_CA,
    uri: process.env.APIKEY_JOTFORMS_UMA_CA,
    webhookJotform: process.env.APIKEY_JOTFORMS_UMA_CA,
    appUrl: process.env.APP_URL_UMA_CA,
  },
  grupoumacolombia: {
    server: process.env.SERVER_URL_UMA_COLOMBIA,
    clientId: process.env.CLIENT_ID_UMA_COLOMBIA,
    secretKey: process.env.CLIENT_SECRET_UMA_COLOMBIA,
    uri: process.env.APIKEY_JOTFORMS_UMA_COLOMBIA,
    webhookJotform: process.env.APIKEY_JOTFORMS_UMA_COLOMBIA,
    appUrl: process.env.APP_URL_UMA_COLOMBIA,
  },
});
