import { ref, readonly, onMounted, onUnmounted } from 'vue'
import type { DeepReadonly, Ref } from 'vue'

interface UsePortalReturn {
  portalTarget: DeepReadonly<Ref<HTMLElement | undefined>>
  isReady: DeepReadonly<Ref<boolean>>
}

// Композиционная функция для работы с порталами (телепортацией)
export function usePortal(targetSelector?: string): UsePortalReturn {
  const portalTarget = ref<HTMLElement>()
  const isReady = ref(false)

  const createPortalTarget = (selector: string) => {
    if (typeof document === 'undefined') return null

    let target = document.querySelector<HTMLElement>(selector)

    if (!target) {
      // Если элемент не найден, создаем его
      target = document.createElement('div')
      target.setAttribute('id', selector.replace('#', ''))
      document.body.appendChild(target)
    }

    return target
  }

  onMounted(() => {
    if (typeof document === 'undefined') return

    if (targetSelector) {
      portalTarget.value = createPortalTarget(targetSelector) || document.body
    } else {
      portalTarget.value = document.body
    }

    isReady.value = true
  })

  onUnmounted(() => {
    // Очищаем созданные нами элементы при размонтировании
    if (
      targetSelector &&
      portalTarget.value &&
      portalTarget.value !== document.body &&
      portalTarget.value.children.length === 0
    ) {
      portalTarget.value.remove()
    }
  })

  return {
    portalTarget: readonly(portalTarget),
    isReady: readonly(isReady)
  }
}

// Хелпер для создания уникального селектора портала
export function createPortalId(prefix: string = 'amocrm-portal'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

// Предустановленные порталы для различных целей
export const PORTAL_TARGETS = {
  MODAL: '#amocrm-modal-portal',
  TOOLTIP: '#amocrm-tooltip-portal',
  DROPDOWN: '#amocrm-dropdown-portal',
  NOTIFICATION: '#amocrm-notification-portal'
} as const

// Композиционная функция для модальных окон
export function useModalPortal(): UsePortalReturn {
  return usePortal(PORTAL_TARGETS.MODAL)
}

// Композиционная функция для тултипов
export function useTooltipPortal(): UsePortalReturn {
  return usePortal(PORTAL_TARGETS.TOOLTIP)
}

// Композиционная функция для выпадающих списков
export function useDropdownPortal(): UsePortalReturn {
  return usePortal(PORTAL_TARGETS.DROPDOWN)
}