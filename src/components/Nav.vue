<script setup>
const user = useUserStore()
const router = useRouter()
const mobMenu = $ref(false)
let userMenu = $ref(false)
const mobMenuClass = computed(() => {
  if (!mobMenu)
    return 'hidden'

  else
    return 'sm:hidden'
})

const mobMenuBtnClass = computed(() => {
  if (mobMenu)
    return 'hidden'

  else
    return 'block'
})

const userMenuClass = computed(() => {
  if (!userMenu)
    return 'hidden'

  else
    return 'block'
})

const signOut = () => {
  user.address = null
  user.secretKey = null
  user.publicKey = null
  localStorage.clear()
  router.push('/')
  userMenu = false
}
</script>

<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" @click="mobMenu = !mobMenu">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" :class="mobMenuBtnClass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="h-6 w-6" :class="mobMenuClass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="text-white-300 px-3 py-2 rounded-md text-xl font-900 font-medium">
            Datatoning
          </div>
          <div class="pt-2.5">
            💎
          </div>
          <div class="hidden sm:flex justify-center items-center sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-1" aria-current="page">
                Dashboard
              </router-link>
            </div>
          </div>
        </div>
        <button class="icon-btn mx-2 color-gray-300 !outline-none" @click="toggleDark()">
          <div i="carbon-sun dark:carbon-moon" />
        </button>
        <balance />
        <div v-if="!user.publicKey" class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <div>
            <button id="user-menu-button" type="button" class="bg-gray-800 flex text-sm rounded-full" aria-expanded="false" aria-haspopup="true" @click="userMenu = !userMenu">
              <router-link to="/signin">
                <span class="sr-only">Open user menu</span>
                <div i-carbon-login class="color-gray-300 text-2xl hover:color-white" />
              </router-link>
            </button>
          </div>
        </div>
        <div v-else class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <router-link to="/addtask">
            <button class="btn bg-blue lt-md:hidden">
              + Add new task
            </button>
            <div i-carbon-add-filled class="btn bg-blue color-white text-2xl md:hidden" />
          </router-link>
          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button id="user-menu-button" type="button" class="bg-gray-800 flex text-sm rounded-full" aria-expanded="false" aria-haspopup="true" @click="userMenu = !userMenu">
                <span class="sr-only">Open user menu</span>
                <div i-carbon-user-avatar-filled class="color-gray-300 text-2xl hover:color-white" />
              </button>
            </div>

            <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
            <div :class="userMenuClass" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">
                Your Profile
              </router-link>
              <a id="user-menu-item-2" class="block cursor-pointer px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" @click="signOut">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div id="mobile-menu" :class="mobMenuClass">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <router-link to="/" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
          Dashboard
        </router-link>
      </div>
    </div>
  </nav>
</template>

  <style lang="css" scoped>
  </style>
