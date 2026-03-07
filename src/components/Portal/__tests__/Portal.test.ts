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

  it('should teleport content outside the render container', () => {
    const { container } = render(Portal, {
      attrs: {
        class: 'portal-outside',
      },
      slots: {
        default: '<p>Teleported</p>',
      },
    })

    // The render container should not contain the portal content
    expect(container.querySelector('.portal-outside')).toBeNull()
    // But body should have it
    const portalEl = document.body.querySelector('.portal-outside')
    expect(portalEl).not.toBeNull()
    expect(portalEl!.innerHTML).toContain('Teleported')
  })

  it('should render multiple children in the portal', () => {
    render(Portal, {
      attrs: {
        class: 'portal-multi',
      },
      slots: {
        default: '<span>Child 1</span><span>Child 2</span>',
      },
    })

    const portalEl = document.body.querySelector('.portal-multi')
    expect(portalEl).not.toBeNull()
    const spans = portalEl!.querySelectorAll('span')
    expect(spans).toHaveLength(2)
    expect(spans[0].textContent).toBe('Child 1')
    expect(spans[1].textContent).toBe('Child 2')
  })

  it('should pass through attributes to the wrapper div', () => {
    render(Portal, {
      attrs: {
        'data-testid': 'portal-wrapper',
        id: 'my-portal',
      },
      slots: {
        default: 'Content',
      },
    })

    const portalEl = document.body.querySelector('#my-portal')
    expect(portalEl).not.toBeNull()
    expect(portalEl!.getAttribute('data-testid')).toBe('portal-wrapper')
  })

  it('should render into a custom container element', () => {
    const customContainer = document.createElement('section')
    customContainer.id = 'custom-portal-target'
    document.body.appendChild(customContainer)

    render(Portal, {
      props: {
        container: customContainer,
      },
      attrs: {
        class: 'portal-custom',
      },
      slots: {
        default: 'Custom Content',
      },
    })

    expect(customContainer.querySelector('.portal-custom')).not.toBeNull()
    expect(customContainer.querySelector('.portal-custom')!.textContent).toBe('Custom Content')

    document.body.removeChild(customContainer)
  })

  it('should render an empty portal without errors', () => {
    render(Portal, {
      attrs: {
        class: 'empty-portal',
      },
    })

    const portalEl = document.body.querySelector('.empty-portal')
    expect(portalEl).not.toBeNull()
    expect(portalEl!.textContent).toBe('')
  })
})
