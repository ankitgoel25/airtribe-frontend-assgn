<template>
  <div
    class="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur bg-black/10 z-50"
  >
    <div
      class="relative flex flex-col w-[45vw] lg:w-[35vw] bg-white shadow rounded-md px-6 py-4"
    >
      <button
        class="cursor-pointer absolute right-4 top-4 w-8 h-8 hover:bg-black/10 rounded-full flex items-center justify-center"
        @click="handleModal"
      >
        <fa :icon="['fas', 'xmark']" />
      </button>
      <h2 class="text-xl font-bold">Add a new task</h2>
      <form class="flex flex-col my-4 space-y-4" @submit="handleSubmit">
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
              v-for="column in status"
              :key="column.id"
              :value="column.id"
            >
              {{ column.name }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          class="self-start px-6 py-2 bg-cyan-500 hover:bg-cyan-600 font-medium rounded text-white"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardModal',
  props: {
    status: {
      type: Array,
      default() {
        return []
      }
    },
    handleModal: {
      type: Function,
      default: () => {}
    },
    colId: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      title: '',
      desc: '',
      selectedStatus: this.colId,
      styles: {
        inputBox: 'flex flex-col',
        input: 'text-base py-2 px-3 rounded border mt-1',
        label: 'text-sm'
      }
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      if (this.title === '' || this.desc === '') return
      this.$store.commit('status/addCard', {
        title: this.title,
        desc: this.desc,
        colId: this.selectedStatus
      })
      this.handleModal()
    }
  }
}
</script>
