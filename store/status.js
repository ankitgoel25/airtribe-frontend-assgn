import { generateItems } from '~/utils/helpers'

const columnNames = ['Lorem', 'Ipsum', 'Consectetur', 'Eiusmod']
const cardColors = [
  'azure',
  'beige',
  'bisque',
  'blanchedalmond',
  'burlywood',
  'cornsilk',
  'gainsboro',
  'ghostwhite',
  'ivory',
  'khaki'
]

const pickColor = () => {
  const rand = Math.floor(Math.random() * 10)
  return cardColors[rand]
}

export const state = () => ({
  list: {
    type: 'container',
    props: {
      orientation: 'horizontal'
    },
    children: generateItems(3, (i) => ({
      id: `column${i}`,
      type: 'container',
      name: columnNames[i],
      props: {
        orientation: 'vertical',
        className: '',
        style: { backgroundColor: pickColor() }
      },
      children: generateItems(+(Math.random() * 10).toFixed() + 2, (j) => ({
        type: 'draggable',
        id: `${i}${j}`,
        data: `Col ${i + 1} - Card ${j + 1}`
      }))
    }))
  }
})

export const mutations = {
  newChildren(state, newChildren) {
    state.list.children = newChildren
  },
  spliceChildren(state, { start, deleteCount, item }) {
    if (item) {
      state.list.children.splice(start, deleteCount, item)
    }
  }
}
