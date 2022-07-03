import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const publicKey = ref(null)
  const secretKey = ref(null)
  const address = ref(null)

  async function signUp() {
    try {
      const res = await axios.post(`http://${import.meta.env.VITE_HOST}:8888/signup`)
      if (res.data && res.data.publicKey && res.data.secretKey && res.data.address) {
        publicKey.value = res.data.publicKey
        secretKey.value = res.data.secretKey
        address.value = res.data.address

        return 'success'
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  async function signIn(secret: any) {
    try {
      const res = await axios.post(`http://${import.meta.env.VITE_HOST}:8888/signin`, { secret })
      if (res.data && res.data.publicKey && res.data.address) {
        publicKey.value = res.data.publicKey
        secretKey.value = secret
        address.value = res.data.address

        return 'success'
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  return {
    signUp,
    signIn,
    publicKey,
    secretKey,
    address,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
