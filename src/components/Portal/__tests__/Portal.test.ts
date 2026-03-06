import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Portal from '../Portal.vue'

describe('Portal', () => {
  it('should render portal in document.body by default', () => {
    const { container } = render(Portal, {
      attrs: {
        class: 'portal',
      },
      slots: {
        default: 'Test Content',
      },
    })

    // Content should be teleported to body, not in the render container
    const portalEl = document.body.querySelector('.portal')
    expect(portalEl).not.toBeNull()
    expect(portalEl!.textContent).toBe('Test Content')
  })

  it('should render portal in specified container', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)

    render(Portal, {
      props: {
        container: target,
      },
      attrs: {
        class: 'portal',
      },
      slots: {
        default: 'Test Content',
      },
    })

    const portalEl = target.querySelector('.portal')
    expect(portalEl).not.toBeNull()
    expect(portalEl!.textContent).toBe('Test Content')

    document.body.removeChild(target)
  })
})
