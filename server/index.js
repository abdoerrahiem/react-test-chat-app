const express = require('express')
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const pusher = new Pusher({
  appId: '1890490',
  key: '7ab595c029964af251c4',
  secret: 'b3e6fb706144fee6ad99',
  cluster: 'ap1',
  useTLS: true,
})

app.post('/api/messages', (req, res) => {
  const { text, sender } = req.body
  pusher.trigger('chat', 'message', {
    text,
    sender,
  })
  res.status(200).send('Message sent')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
