<script setup>
const user = useUserStore()
const router = useRouter()
const secretKey = $ref('')

const signUp = async () => {
  const res = await user.signUp()
  if (res === 'success')
    router.push('/profile')
}
const signIn = async () => {
  if (secretKey && secretKey.length === 88) {
    const res = await user.signIn(secretKey)
    if (res === 'success')
      router.push('/')
    if (document.getElementById('remember-me').checked) {
      localStorage.setItem('secretKey', user.secretKey)
      localStorage.setItem('publicKey', user.publicKey)
      localStorage.setItem('address', user.address)
    }
  }
}

const remember = async () => {
  console.log('event working')
  if (document.getElementById('remember-me').checked)
    console.log('rememberd you')
}
</script>

<template>
  <div class="relative z-10" aria-labelledby="modal-title">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
          <div class="min-h-full flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
              <form class="mt-8 space-y-6" @submit.prevent>
                <div class="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label for="password" class="sr-only">Password</label>
                    <input id="password" v-model="secretKey" name="password" type="password" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Your private key">
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
                  </div>
                </div>

                <div>
                  <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="signIn">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <!-- Heroicon name: solid/lock-closed -->
                      <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    Sign in
                  </button>
                </div>
                <hr class="color-gray-300">
                <div class="text-center bottom-16 left-46% text-2xl font-medium py-0.5 px-2 bg-white absolute">
                  or
                </div>
                <div>
                  <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100" @click="signUp()">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <!-- Heroicon name: solid/lock-closed -->
                      <svg class="h-5 w-5 text-indigo-200 group-hover:text-indigo-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
