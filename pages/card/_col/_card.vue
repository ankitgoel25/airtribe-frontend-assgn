<template>
  <div>
    <div class="mx-10 my-8 md:mx-20">
      <h2 class="text-3xl font-bold">Update Task</h2>
      <form class="flex flex-col my-8 space-y-5" @submit.prevent="handleSubmit">
        <div :class="styles.inputBox">
          <label for="title" :class="styles.label">Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="Enter Title"
            :class="styles.input"
          />
        </div>
        <div :class="styles.inputBox">
          <label for="desc" :class="styles.label">Description</label>
          <textarea
            id="desc"
            v-model="desc"
            type="text"
            placeholder="Enter Description"
            :class="styles.input"
            rows="4"
          />
        </div>
        <div :class="styles.inputBox">
          <label for="status" :class="styles.label">Status</label>
          <select id="status" v-model="selectedStatus" :class="styles.input">
            <option
              v-for="column in list.children"
              :key="column.id"
              :value="column.id"
            >
              {{ column.name }}
            </option>
          </select>
        </div>
        <div class="flex space-x-8">
          <button
            type="submit"
            class="self-start px-6 py-2 bg-cyan-500 hover:bg-cyan-600 font-medium rounded text-white"
          >
            Update
          </button>
          <button
            type="button"
            class="self-start px-6 py-2 bg-red-500 hover:bg-red-600 font-medium rounded text-white"
            @click="deleteCard"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicCard',
  data() {
    return {
      styles: {
        inputBox: 'flex flex-col',
        input: 'text-base py-2 px-3 rounded border mt-1',
        label: 'text-lg'
      },
      title: this.$store.state.status.list.children[
        this.$route.params.col
      ].children.filter((i) => i.key === this.$route.params.card)[0].title,
      desc: this.$store.state.status.list.children[
        this.$route.params.col
      ].children.filter((i) => i.key === this.$route.params.card)[0]
        .description,
      selectedStatus: this.$route.params.col,
      cardKey: this.$route.params.card,
      colId: this.$route.params.col
    }
  },
  computed: {
    list() {
      return this.$store.state.status.list
    }
  },
  methods: {
    handleSubmit() {
      this.$store.commit('status/updateCard', {
        cardKey: this.cardKey,
        oldColId: this.colId,
        colId: this.selectedStatus,
        title: this.title,
        desc: this.desc
      })
      this.$router.push('/')
    },
    deleteCard() {
      this.$store.commit('status/deleteCard', {
        cardKey: this.cardKey,
        colId: this.colId
      })
      this.$router.push('/')
    }
  }
}
</script>
