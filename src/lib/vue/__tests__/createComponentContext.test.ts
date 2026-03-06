import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { createComponentContext } from '../createComponentContext'

describe('createComponentContext', () => {
  it('throws error when useContext called without provider', () => {
    const [, useContext] = createComponentContext<{ value: string }>('TestParent')

    const Child = defineComponent({
      setup() {
        useContext('TestChild')
        return () => h('div')
      },
    })

    expect(() => mount(Child)).toThrow(
      '`TestChild` must be used within `TestParent`'
    )
  })

  it('returns provided value when parent exists', () => {
    const [provideContext, useContext] = createComponentContext<{ value: string }>('TestParent')

    let receivedContext: { value: string } | undefined

    const Child = defineComponent({
      setup() {
        receivedContext = useContext('TestChild')
        return () => h('div', 'child')
      },
    })

    const Parent = defineComponent({
      setup() {
        provideContext({ value: 'hello' })
        return () => h(Child)
      },
    })

    mount(Parent)

    expect(receivedContext).toEqual({ value: 'hello' })
  })
})
