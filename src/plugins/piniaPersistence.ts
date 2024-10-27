import type { PiniaPluginContext } from 'pinia'

function encode(data: string): string {
  return btoa(data)
}

function decode(data: string): string {
  return atob(data)
}

export const piniaPersistPlugin = (context: PiniaPluginContext) => {
  const { store } = context
  const key = `pinia-${store.$id}`

  const savedState = localStorage.getItem(key)
  if (savedState) {
    try {
      store.$patch(JSON.parse(decode(savedState)))
    } catch (error) {
      console.error('Error decoding state:', error)
    }
  }

  store.$subscribe((_, state) => {
    const encodedState = encode(JSON.stringify(state))
    localStorage.setItem(key, encodedState)
  })
}
