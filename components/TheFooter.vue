<template>
  <footer
    class="flex items-center justify-between py-4 px-20 shadow-xl bg-white shadow-black w-full absolute bottom-0 left-0 z-50"
  >
    <div class="flex items-baseline">
      <span>Made by</span>
      <a
        target="_blank"
        href="https://linktr.ee/AnkitGoel"
        class="hover:underline ml-2"
      >
        <span class="font-semibold text-lg">Ankit Goel</span>
      </a>
    </div>
    <div class="flex items-center space-x-8">
      <button type="button" :class="styles.clear" @click="clearStorage">
        Clear Local Storage
      </button>
      <a
        href="https://www.linkedin.com/in/ankitgoel25/"
        target="_blank"
        :class="styles.icon"
      >
        <fa :icon="['fab', 'linkedin']" />
      </a>
      <a
        href="https://twitter.com/ankitgoel_25"
        target="_blank"
        :class="styles.icon"
      >
        <fa :icon="['fab', 'twitter']" />
      </a>
      <a
        href="https://linktr.ee/AnkitGoel"
        target="_blank"
        :class="styles.icon"
      >
        <fa :icon="['fas', 'tree']" />
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      styles: {
        clear:
          'py-2 px-4 rounded bg-black/5 hover:bg-black/10 text-base ml-4 cursor-pointer',
        icon: 'w-10 h-10 flex items-center justify-center hover:bg-black/10 rounded-full text-xl cursor-pointer'
      }
    }
  },
  methods: {
    clearStorage() {
      localStorage.clear()
      window.location.reload(true)
    }
  }
}
</script>
