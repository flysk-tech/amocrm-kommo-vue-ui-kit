import { onMounted, onUnmounted, type Ref } from 'vue'

export interface UseOnOutsideClickOptions {
  ref: Ref<HTMLElement | null>
  handler: () => void
}

export const useOnOutsideClick = ({ ref, handler }: UseOnOutsideClickOptions) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.value && !ref.value.contains(event.target as Node)) {
      handler()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClick)
  })
}
