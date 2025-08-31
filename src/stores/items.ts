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
    },
    {
        id: 'itm_003',
        name: 'Meeting Room',
        description: 'Room for 6 people, per hour',
        price: 500,
        location: 'Kyiv',
        geometry: { type: 'Point', coordinates: [30.5238, 50.4547] }
    },
    {
        id: 'itm_004',
        name: 'Private Office',
        description: 'Office space for 4 people, month',
        price: 12000,
        location: 'Lviv',
        geometry: { type: 'Point', coordinates: [24.0316, 49.8429] }
    },
    {
        id: 'itm_005',
        name: 'Event Hall',
        description: 'Conference hall, per day',
        price: 8000,
        location: 'Odesa',
        geometry: { type: 'Point', coordinates: [30.7326, 46.4825] }
    },
    {
        id: 'itm_006',
        name: 'Storage Box',
        description: '1m² storage, month',
        price: 1500,
        location: 'Kyiv',
        geometry: { type: 'Point', coordinates: [30.5238, 50.4547] }
    },
    {
        id: 'itm_007',
        name: 'Parking Spot',
        description: 'Underground parking, month',
        price: 2000,
        location: 'Kharkiv',
        geometry: { type: 'Point', coordinates: [36.2304, 49.9935] }
    },
    {
        id: 'itm_008',
        name: 'VR Room',
        description: 'Gaming VR room, per hour',
        price: 700,
        location: 'Odesa',
        geometry: { type: 'Point', coordinates: [30.7326, 46.4825] }
    },
    {
        id: 'itm_009',
        name: 'Podcast Studio',
        description: 'Recording studio, per hour',
        price: 1000,
        location: 'Kyiv',
        geometry: { type: 'Point', coordinates: [30.5238, 50.4547] }
    },
    {
        id: 'itm_010',
        name: 'Dedicated Desk',
        description: 'Fixed desk in open space, month',
        price: 5000,
        location: 'Dnipro',
        geometry: { type: 'Point', coordinates: [35.0458, 48.4647] }
    },
    {
        id: 'itm_011',
        name: 'Cloud VM',
        description: 'Virtual machine, month',
        price: 1800,
        location: 'Kharkiv',
        geometry: { type: 'Point', coordinates: [36.2304, 49.9935] }
    },
    {
        id: 'itm_012',
        name: 'Photo Studio',
        description: 'Studio rental, per hour',
        price: 1200,
        location: 'Odesa',
        geometry: { type: 'Point', coordinates: [30.7326, 46.4825] }
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
    totalPrice: (state) => state.items.reduce((s, i) => s + i.price, 0),
    byHotel: (state) => (query: string) => {
        state.items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
    }
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
    },
  }
})
