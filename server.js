require('dotenv').config()

const TonWeb = require('tonweb')
const BN = TonWeb.utils.BN
const toNano = TonWeb.utils.toNano

const providerUrl = process.env.VITE_NETWORK
const apiKey = process.env.VITE_API_KEY
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

    const response = await axios.post(`http://${process.env.VITE_HOST}:3000/users`, {
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

    const response = await axios.get(`http://${process.env.VITE_HOST}:3000/users?seed1=${seed1}&seed2=${seed2}&seed3=${seed3}`)

    if (response.data) {
      const publicKey = TonWeb.utils.base64ToBytes(req.body.secret).slice(32)
      const wallet = tonweb.wallet.create({
        publicKey,
      })

      const walletAddress = await wallet.getAddress()

      const balanceNano = await tonweb.getBalance(walletAddress)

      const userData = {
        publicKey: TonWeb.utils.bytesToBase64(publicKey),
        address: walletAddress.toString(true, true, true),
        balance: TonWeb.utils.fromNano(new BN(balanceNano)),
      }
      console.log(userData)

      res.json(userData)
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

app.post('/channelprepare', async (req, res) => {
  // NOT FINISHED NEED YEAT
  if (!req.body.customerPublicKey || req.body.workerPublicKey)
    res.status(400).json({ e: 'worng publickeys please try again' })

  try {
    const customerPublicKey = TonWeb.utils.base64ToBytes(req.body.customerPublicKey)
    const customerWallet = tonweb.wallet.create(customerPublicKey)
    const customerWalletAddress = await customerWallet.getAddress()
    const customerBalanceNano = await tonweb.getBalance(customerWalletAddress)

    const workerPublicKey = TonWeb.utils.base64ToBytes(req.body.workerPublicKey)
    const workerWallet = tonweb.wallet.create(workerPublicKey)
    const workerWalletAddress = await workerWallet.getAddress()
    const workerBalanceNano = await tonweb.getBalance(workerWalletAddress)

    const channelInitState = {
      customerBalance: customerBalanceNano,
      workerBalance: workerBalanceNano,
      seqnoCustomer: new BN(0),
      seqnoWorker: new BN(0),
    }

    const channelConfig = {
      channelId: new BN(222), // Channel ID, for each new channel there must be a new ID
      customerAddress: customerWalletAddress, // A's will be withdrawn to this wallet address after the channel is closed
      workerAddress: workerWalletAddress, // B's will be withdrawn to this wallet address after the channel is closed
      initBalanceCustomer: channelInitState.customerBalance,
      initBalanceWorker: channelInitState.workerBalance,
    }

    const customerChannel = tonweb.payments.createChannel({
      ...channelConfig,
      isA: true,
      customerKeyPair: customerkeyPair,
      workerPublicKey: keyPairB.publicKey,
    })
    const channelAddress = await customerChannel.getAddress() // address of this payment channel smart-contract in blockchain
    console.log('channelAddress=', channelAddress.toString(true, true, true))

    const workerChannel = tonweb.payments.createChannel({
      ...channelConfig,
      isA: false,
      workerKeyPair: keyPairB,
      customerPublicKey: keyPairA.publicKey,
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
