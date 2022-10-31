// ----------------------------------------------------------------
// Code Ref.: https://www.youtube.com/watch?v=IlsygSzikOQ
// ----------------------------------------------------------------

require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
    const res2 = await axios.get(`${TELEGRAM_API}/getMe`)
    console.log(res2.data)
    const res3 = await axios.get(`${TELEGRAM_API}/getWebhookInfo`)
    console.log(res3.data)
}

app.post(URI, async (req, res) => {
    console.log(">>>>>   " + req.body)

    const chatId = req.body.message.chat.id
    const text = req.body.message.text

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
    })
    return res.send()
})

app.listen(process.env.INSIDE_APP_PORT || 6000, async () => {
    console.log('🚀 app running on port', process.env.INSIDE_APP_PORT || 6000)
    await init()
})