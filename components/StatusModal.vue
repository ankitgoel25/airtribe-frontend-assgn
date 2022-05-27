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
      <h2 class="text-xl font-bold">Create a new Status</h2>
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
          <label for="color" :class="styles.label">Color</label>
          <select
            id="color"
            v-model="selectedColor"
            :class="`${styles.input}`"
            :style="{ backgroundColor: cardColors[selectedColor].color }"
          >
            <option
              v-for="color in cardColors"
              :key="color.id"
              :value="color.id"
              :style="{ backgroundColor: color.color }"
            >
              {{ color.name }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          class="self-start px-6 py-2 bg-cyan-500 hover:bg-cyan-600 font-medium rounded text-white"
        >
          {{ colId ? 'Update' : 'Create' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { cardColors } from '~/utils/constants'

export default {
  name: 'StatusModal',
  props: {
    handleModal: {
      type: Function,
      default: () => {}
    },
    colId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      styles: {
        inputBox: 'flex flex-col',
        input: 'text-base py-2 px-3 rounded border mt-1',
        label: 'text-sm'
      },
      title:
        this.colId !== null
          ? this.$store.state.status.list.children.find(
              (c) => c.id === this.colId
            ).name
          : '',
      selectedColor:
        this.colId !== null
          ? cardColors.find(
              (c) =>
                c.color ===
                this.$store.state.status.list.children.find(
                  (c) => c.id === this.colId
                ).props.color
            ).id
          : 0,
      cardColors
    }
  },
  computed: {
    list() {
      console.log(this.colId)
      return null
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      if (this.title === '') return
      if (this.colId !== null) {
        this.$store.commit('status/editColumn', {
          colId: this.colId,
          name: this.title,
          color: cardColors[this.selectedColor].color
        })
      } else {
        this.$store.commit('status/addColumn', {
          name: this.title,
          color: cardColors[this.selectedColor].color
        })
      }
      this.handleModal()
    }
  }
}
</script>
