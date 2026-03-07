import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
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

describe('VisuallyHiddenInput', () => {
  it('renders an input element', () => {
    const wrapper = mount(VisuallyHiddenInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('passes name prop to input', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { name: 'test-name' },
    })
    expect(wrapper.find('input').attributes('name')).toBe('test-name')
  })

  it('passes value prop to input', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { value: 'test-value' },
    })
    expect(wrapper.find('input').attributes('value')).toBe('test-value')
  })

  it('passes numeric value prop to input', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { value: 42 },
    })
    expect(wrapper.find('input').attributes('value')).toBe('42')
  })

  it('sets disabled state', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isDisabled: true },
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('sets readonly state', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isReadonly: true },
    })
    expect(wrapper.find('input').element.readOnly).toBe(true)
  })

  it('sets id on input', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { id: 'my-input' },
    })
    expect(wrapper.find('input').attributes('id')).toBe('my-input')
  })

  it('sets checked when isChecked is true', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isChecked: true },
    })
    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('sets checked=false when isChecked is false', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isChecked: false },
    })
    expect(wrapper.find('input').element.checked).toBe(false)
  })

  it('sets default checked on mount', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isDefaultChecked: true },
    })
    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('does not set checked when isDefaultChecked is false', () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isDefaultChecked: false },
    })
    expect(wrapper.find('input').element.checked).toBe(false)
  })

  it('updates checked when isChecked prop changes', async () => {
    const wrapper = mount(VisuallyHiddenInput, {
      props: { isChecked: false },
    })
    expect(wrapper.find('input').element.checked).toBe(false)

    await wrapper.setProps({ isChecked: true })
    await nextTick()
    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('renders without any props', () => {
    const wrapper = mount(VisuallyHiddenInput)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.disabled).toBe(false)
    expect(input.element.readOnly).toBe(false)
  })

  it('applies visually hidden styles class', () => {
    const wrapper = mount(VisuallyHiddenInput)
    const input = wrapper.find('input')
    const hasInputClass = input.classes().some(c => c.includes('input'))
    expect(hasInputClass).toBe(true)
  })
})
