import { defineStore } from 'pinia'
import type { Item } from '@/types/item'

const seed: Item[] = [
  {
    id: 'itm_001',
    name: 'Coworking Seat',
    description: 'Hot-desk for a day',
    price: 300,
    location: 'Kyiv',
    geometry: { type: 'Point', coordinates: [30.5238, 50.4547] }
  },
  {
    id: 'itm_002',
    name: 'Server Rack U',
    description: '1U colocation, month',
    price: 2500,
    location: 'Lviv',
    geometry: { type: 'Point', coordinates: [24.0316, 49.8429] }
  }
]

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: seed as Item[]
  }),

  getters: {
    byId: (state) => (id: string) => state.items.find(i => i.id === id),
    byLocation: (state) => (loc: string) =>
      state.items.filter(i => i.location.toLowerCase() === loc.toLowerCase()),
    totalPrice: (state) => state.items.reduce((s, i) => s + i.price, 0)
  },

  actions: {
    add(item: Item) {
      if (this.items.some(i => i.id === item.id)) {
        throw new Error(`Item with id "${item.id}" already exists`)
      }
      this.items.push(item)
    },
    update(id: string, patch: Partial<Item>) {
      const idx = this.items.findIndex(i => i.id === id)
      if (idx === -1) throw new Error('Not found')
      this.items[idx] = { ...this.items[idx], ...patch }
    },
    remove(id: string) {
      this.items = this.items.filter(i => i.id !== id)
    }
  }
})
