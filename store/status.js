import { cardColors } from '~/utils/constants'
import { generateItems } from '~/utils/helpers'

const pickColor = () => {
  const randomId = +((Math.random() * 10) % cardColors.length).toFixed()
  return cardColors[randomId].color
}

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi delectus distinctio molestiae accusantium, similique facilis. Aperiam at voluptate cum quisquam?'

export const state = () => ({
  list: JSON.parse(localStorage.getItem('list')) || {
    type: 'container',
    props: {
      orientation: 'horizontal'
    },
    children: generateItems(5, (i) => ({
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
          key: `${Math.random()}`.slice(2),
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
    localStorage.setItem('list', JSON.stringify(state.list))
  },
  spliceColumn(state, { start, deleteCount, item }) {
    if (item) {
      state.list.children.splice(start, deleteCount, item)
      localStorage.setItem('list', JSON.stringify(state.list))
    }
  },
  addCard(state, data) {
    state.list.children[data.colId].children.push({
      type: 'draggable',
      key: `${data.title}${data.colId}${length}`,
      title: data.title,
      description: data.desc
    })
    localStorage.setItem('list', JSON.stringify(state.list))
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
    localStorage.setItem('list', JSON.stringify(state.list))
  },
  editColumn(state, col) {
    const column = state.list.children.find((c) => c.id === col.colId)
    column.name = col.name
    column.props.color = col.color
    localStorage.setItem('list', JSON.stringify(state.list))
  },
  updateCard(state, data) {
    const { cardKey, oldColId, colId, title, desc } = data
    let prevIndex
    const card = state.list.children[oldColId].children.find((i, idx) => {
      prevIndex = idx
      return i.key === cardKey
    })
    card.title = title
    card.description = desc
    if (oldColId !== colId) {
      state.list.children[oldColId].children.splice(prevIndex, 1)
      state.list.children[colId].children.push(card)
    }
    localStorage.setItem('list', JSON.stringify(state.list))
  },
  deleteCard(state, { cardKey, colId }) {
    const prevIndex = state.list.children[colId].children.findIndex(
      (i) => i.key === cardKey
    )
    state.list.children[colId].children.splice(prevIndex, 1)
    localStorage.setItem('list', JSON.stringify(state.list))
  },
  deleteColumn(state, colId) {
    const prevIndex = state.list.children.findIndex((i) => i.id === colId)
    state.list.children.splice(prevIndex, 1)
    localStorage.setItem('list', JSON.stringify(state.list))
  }
}
