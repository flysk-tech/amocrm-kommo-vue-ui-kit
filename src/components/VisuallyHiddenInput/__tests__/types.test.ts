import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VisuallyHiddenInput from '../VisuallyHiddenInput.vue'

describe('VisuallyHiddenInput types', () => {
  it('renders controlled with isChecked=true', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isChecked: true },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders controlled with isChecked=false', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isChecked: false },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders uncontrolled with isDefaultChecked=true', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isDefaultChecked: true },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
