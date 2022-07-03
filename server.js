require('dotenv').config()

const TonWeb = require('tonweb')
const BN = TonWeb.utils.BN
const toNano = TonWeb.utils.toNano

const providerUrl = process.env.NETWORK
const apiKey = process.env.API_KEY
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, { apiKey }))

const axios = require('axios')

const cors = require('cors')

const express = require('express')
const app = express()
app.use(cors({ origin: true }))
app.use(express.json())
const port = 8888

app.post('/signup', async (req, res) => {
  try {
    const seed = TonWeb.utils.newSeed()

    const keyPair = TonWeb.utils.keyPairFromSeed(seed)

    const wallet = tonweb.wallet.create({
      publicKey: keyPair.publicKey,
    })

    const walletAddress = await wallet.getAddress() // address of this wallet in blockchain

    const keyPairObj = {
      publicKey: TonWeb.utils.bytesToBase64(keyPair.publicKey),
      secretKey: TonWeb.utils.bytesToBase64(keyPair.secretKey),
      address: walletAddress.toString(true, true, true),
    }

    // Coz our fake db cant handle big string we need split it
    const base64seed = TonWeb.utils.bytesToBase64(seed)
    const seed1 = base64seed.slice(0, 15)
    const seed2 = base64seed.slice(15, 30)
    const seed3 = base64seed.slice(30)

    const response = await axios.post('http://localhost:3000/users', {
      seed1,
      seed2,
      seed3,
    })

    if (response.data.id)
      res.json(keyPairObj)

    else
      res.json({ error: 'Something went wrong' })
  }
  catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

app.post('/signin', async (req, res) => {
  try {
    const seed = TonWeb.utils.bytesToBase64(TonWeb.utils.base64ToBytes(req.body.secret).slice(0, 32))
    const seed1 = seed.slice(0, 15)
    const seed2 = seed.slice(15, 30)
    const seed3 = seed.slice(30)

    const response = await axios.get(`http://localhost:3000/users?seed1=${seed1}&seed2=${seed2}&seed3=${seed3}`)

    if (response.data) {
      const publicKey = TonWeb.utils.base64ToBytes(req.body.secret).slice(32)
      const wallet = tonweb.wallet.create({
        publicKey,
      })

      const walletAddress = await wallet.getAddress()

      const keyPairObj = {
        publicKey: TonWeb.utils.bytesToBase64(publicKey),
        address: walletAddress.toString(true, true, true),
      }

      res.json(keyPairObj)
    }
    else {
      res.json({ error: 'Account doesn\'t exist' })
    }
  }
  catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
