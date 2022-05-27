<template>
  <div>
    <CardModal
      v-if="isModalOpen.card"
      :col-id="modalId"
      :status="list.children"
      :handle-modal="() => handleModal('card')"
    />
    <StatusModal
      v-if="isModalOpen.status"
      :handle-modal="() => handleModal('status')"
    />
    <button
      type="button"
      class="self-start px-6 py-2 bg-cyan-500 hover:bg-cyan-600 font-medium rounded text-white"
      @click="() => handleModal('status')"
    >
      Add a new status
    </button>
    <div class="flex">
      <Container
        orientation="horizontal"
        drag-handle-selector=".column-drag-handle"
        :drop-placeholder="upperDropPlaceholderOptions"
        @drop="onColumnDrop($event)"
      >
        <Draggable v-for="column in list.children" :key="column.id">
          <div
            :class="column.props.className"
            class="mx-5 w-[28vw] lg:w-[20vw] max-h-[90vh] overflow-auto my-scrollbar px-4"
          >
            <div class="py-1">
              <span class="column-drag-handle cursor-move">&#x2630;</span>
              <span :class="column.props.color" class="px-2 py-0.5 rounded">{{
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
                  class="relative group px-4 py-3 border rounded my-2 border-black/[0.15] shadow bg-white cursor-default"
                >
                  <div
                    class="absolute right-5 top-1.5 opacity-0 group-hover:opacity-80 transition"
                  >
                    <NuxtLink to="/card/[id]">
                      <button type="button">
                        <fa :icon="['fas', 'arrow-up-right-from-square']" />
                      </button>
                    </NuxtLink>
                  </div>
                  <p>{{ card.title }}</p>
                  <p class="text-xs text-black/60 truncate">
                    {{ card.description }} Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Modi corporis quidem earum
                    fuga commodi. Id, dolore accusamus quasi exercitationem
                    fugit eius voluptas, laboriosam commodi distinctio,
                    blanditiis doloribus neque et suscipit!
                  </p>
                </div>
              </Draggable>
              <button
                type="button"
                class="w-full text-black/40 px-3 hover:bg-black/10 hover:text-black flex items-center rounded py-2 my-1"
                @click="() => handleModal('card', column.id)"
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
      modalId: null,
      isModalOpen: { card: false, status: false },
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
    handleModal(type, colId = null) {
      this.modalId = colId
      this.isModalOpen[type] = !this.isModalOpen[type]
    },
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.list)
      this.$store.commit(
        'status/newColumns',
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
        this.$store.commit('status/spliceColumn', {
          start: scene.children.indexOf(column),
          deleteCount: 1,
          item: newColumn
        })
        // localStorage.setItem('scene', scene)}
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.list.children.filter((p) => p.id === columnId)[0].children[
          index
        ]
      }
    }
    // addStatus() {

    // }
  }
}
</script>
