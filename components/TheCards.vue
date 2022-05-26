<template>
  <div class="flex">
    <Container
      orientation="horizontal"
      drag-handle-selector=".column-drag-handle"
      :drop-placeholder="upperDropPlaceholderOptions"
      @drop="onColumnDrop($event)"
    >
      <Draggable v-for="column in list.children" :key="column.id">
        <div :class="column.props.className" class="mx-5 min-w-[20vw]">
          <div class="py-1">
            <span class="column-drag-handle cursor-move">&#x2630;</span>
            <span :style="column.props.style" class="px-2 py-0.5 rounded">{{
              column.name
            }}</span>
            <span class="text-sm text-gray-400 font-medium ml-3">{{
              column.children.length
            }}</span>
          </div>
          <Container
            group-name="col"
            :get-child-payload="getCardPayload(column.id)"
            drag-class=""
            drop-class=""
            :drop-placeholder="dropPlaceholderOptions"
            @drop="(e) => onCardDrop(column.id, e)"
          >
            <Draggable v-for="card in column.children" :key="card.id">
              <div
                class="px-4 py-3 border rounded my-2 border-black/[0.15] shadow bg-white"
              >
                <p>{{ card.data }}</p>
              </div>
            </Draggable>
            <button
              type="button"
              class="w-full text-black/40 px-3 hover:bg-black/10 hover:text-black flex items-center rounded py-2 my-1"
            >
              <span class="mr-2">
                <fa :icon="['fas', 'plus']" />
              </span>
              New
            </button>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '../utils/helpers'

export default {
  name: 'TheCards',
  components: { Container, Draggable },
  data() {
    return {
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    }
  },
  computed: {
    list() {
      return this.$store.state.status.list
    }
  },
  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.list)
      this.$store.commit(
        'status/newChildren',
        applyDrag(scene.children, dropResult)
      )
      // localStorage.setItem('scene', scene)
    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.list)
        const column = scene.children.filter((p) => p.id === columnId)[0]
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        this.$store.commit('status/spliceChildren', {
          start: scene.children.indexOf(column),
          deleteCount: 1,
          item: newColumn
        })
        // localStorage.setItem('scene', scene)}
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        const scene = Object.assign({}, this.list)
        return scene.children.filter((p) => p.id === columnId)[0].children[
          index
        ]
      }
    }
  }
}
</script>
