<template>
  <header
    class="flex items-center justify-between py-6 px-20 bg-purple-400 mb-4 shadow-md"
  >
    <div class="flex items-center">
      <h1 class="text-2xl font-bold">Tello</h1>
      <span class="mx-4">for</span>
      <img
        src="https://uploads-ssl.webflow.com/6139e071178ba7042629f424/6139ea0f21c9d55daaf76391_logo%20webflow.svg"
        alt=""
      />
    </div>
    <div class="flex items-center">
      <nav>
        <Nuxtlink to="/" :class="styles.link">Home</Nuxtlink>
        <Nuxtlink to="/" :class="styles.link">About</Nuxtlink>
        <Nuxtlink to="/" :class="styles.link">Contact</Nuxtlink>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      styles: {
        link: 'py-2 px-6 rounded hover:bg-black/10 text-lg font-semibold ml-4 cursor-pointer'
      }
    }
  }
}
</script>
