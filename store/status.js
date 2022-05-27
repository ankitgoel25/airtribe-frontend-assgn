import { cardColors } from '~/utils/constants'
import { generateItems } from '~/utils/helpers'

const pickColor = () => {
  const randomId = +((Math.random() * 10) % cardColors.length).toFixed()
  return cardColors[randomId].color
}

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi delectus distinctio molestiae accusantium, similique facilis. Aperiam at voluptate cum quisquam?'

export const state = () => ({
  list: {
    type: 'container',
    props: {
      orientation: 'horizontal'
    },
    children: generateItems(2, (i) => ({
      id: i,
      type: 'container',
      name: `Default ${i + 1}`,
      props: {
        orientation: 'vertical',
        className: '',
        color: pickColor()
      },
      children: generateItems(
        +((Math.random() * 10) % 4).toFixed() + 1,
        (j) => ({
          type: 'draggable',
          id: j,
          title: `Default Card ${i + 1} - ${j + 1}`,
          description: lorem.slice(+(Math.random() * 100).toFixed())
        })
      )
    }))
  }
})

export const mutations = {
  newColumns(state, newColumns) {
    state.list.children = newColumns
  },
  spliceColumn(state, { start, deleteCount, item }) {
    if (item) {
      state.list.children.splice(start, deleteCount, item)
    }
  },
  addCard(state, data) {
    const length = state.list.children[data.colId].children.length
    state.list.children[data.colId].children.push({
      type: 'draggable',
      id: length,
      title: data.title,
      description: data.desc
    })
  },
  addColumn(state, col) {
    const length = state.list.children.length
    state.list.children.push({
      id: length,
      type: 'container',
      name: col.name,
      props: {
        orientation: 'vertical',
        className: '',
        color: col.color
      },
      children: []
    })
  }
}
