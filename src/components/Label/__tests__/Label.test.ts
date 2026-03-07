import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { Label, LabelGroup, LabelTheme, LabelGroupTheme } from '..'

const hasClass = (el: Element | null, name: string) =>
  Array.from(el?.classList ?? []).some((c) => c.includes(name))

const hasClassEl = (container: HTMLElement, selector: string, name: string) => {
  const el = container.querySelector(selector)
  return el ? hasClass(el, name) : false
}

const DEFAULT_TEXT = 'Test Label'
const DEFAULT_CHILD_TEXT = 'Test Child'

const renderLabel = (props: any = {}, slots: any = {}, attrs: any = {}) => {
  return render(Label, {
    props: { theme: LabelTheme, text: DEFAULT_TEXT, ...props },
    slots: { default: DEFAULT_CHILD_TEXT, ...slots },
    attrs,
  })
}

describe('Label', () => {
  it('renders label with text prop', () => {
    renderLabel()
    expect(screen.getByText(DEFAULT_TEXT)).toBeInTheDocument()
  })

  it('renders children via default slot', () => {
    renderLabel()
    expect(screen.getByText(DEFAULT_CHILD_TEXT)).toBeInTheDocument()
  })

  it('applies theme CSS variables', () => {
    const { container } = renderLabel()
    const label = container.querySelector('label')
    expect(label).toHaveStyle({
      '--crm-ui-kit-label-spacing': '4px',
      '--crm-ui-kit-label-description-spacing': '4px',
      '--crm-ui-kit-label-text-width': 'auto',
    })
  })

  it('applies external class via Vue class binding', () => {
    const { container } = renderLabel({}, {}, { class: 'custom-class' })
    const label = container.querySelector('label')
    expect(label?.classList.contains('custom-class')).toBe(true)
  })

  it('renders as a label element', () => {
    const { container } = renderLabel()
    const label = container.querySelector('label')
    expect(label).toBeInTheDocument()
    expect(label?.tagName).toBe('LABEL')
  })

  describe('description prop', () => {
    it('renders with description', () => {
      renderLabel({ description: 'Helper text' })
      expect(screen.getByText('Helper text')).toBeInTheDocument()
    })

    it('renders description container with text_description class', () => {
      const { container } = renderLabel({ description: 'Helper text' })
      expect(hasClassEl(container, 'div[class*="text_description"]', 'text_description')).toBe(true)
    })

    it('does not render description when not provided', () => {
      const { container } = renderLabel({ text: DEFAULT_TEXT, description: undefined })
      const descEls = container.querySelectorAll('div[class*="text_description"]')
      expect(descEls).toHaveLength(0)
    })
  })

  describe('textPlacement prop', () => {
    it('applies top class by default', () => {
      const { container } = renderLabel()
      const label = container.querySelector('label')
      expect(hasClass(label, 'top')).toBe(true)
    })

    it('applies left class when textPlacement is left', () => {
      const { container } = renderLabel({ textPlacement: 'left' })
      const label = container.querySelector('label')
      expect(hasClass(label, 'left')).toBe(true)
    })

    it('applies right class when textPlacement is right', () => {
      const { container } = renderLabel({ textPlacement: 'right' })
      const label = container.querySelector('label')
      expect(hasClass(label, 'right')).toBe(true)
    })
  })

  describe('isCentered prop', () => {
    it('does not apply centered class by default', () => {
      const { container } = renderLabel()
      const label = container.querySelector('label')
      expect(hasClass(label, 'centered')).toBe(false)
    })

    it('applies centered class when isCentered is true', () => {
      const { container } = renderLabel({ isCentered: true })
      const label = container.querySelector('label')
      expect(hasClass(label, 'centered')).toBe(true)
    })
  })

  describe('text_container visibility', () => {
    it('renders text_container when text prop is provided', () => {
      const { container } = renderLabel({ text: 'Label text' })
      const textContainer = container.querySelector('div[class*="text_container"]')
      expect(textContainer).toBeInTheDocument()
    })

    it('renders text_container when description prop is provided', () => {
      const { container } = renderLabel({ text: undefined, description: 'Desc' })
      const textContainer = container.querySelector('div[class*="text_container"]')
      expect(textContainer).toBeInTheDocument()
    })

    it('does not render text_container when no text and no description', () => {
      const { container } = renderLabel({ text: undefined, description: undefined })
      const textContainer = container.querySelector('div[class*="text_container"]')
      expect(textContainer).not.toBeInTheDocument()
    })
  })

  describe('slots', () => {
    it('renders text slot instead of text prop', () => {
      const { container } = render(Label, {
        props: { theme: LabelTheme },
        slots: {
          text: '<strong>Slot Text</strong>',
          default: DEFAULT_CHILD_TEXT,
        },
      })
      expect(container.querySelector('strong')?.textContent).toBe('Slot Text')
    })

    it('renders description slot instead of description prop', () => {
      const { container } = render(Label, {
        props: { theme: LabelTheme, text: DEFAULT_TEXT },
        slots: {
          description: '<em>Slot Description</em>',
          default: DEFAULT_CHILD_TEXT,
        },
      })
      expect(container.querySelector('em')?.textContent).toBe('Slot Description')
    })
  })

  it('forwards additional attributes via $attrs', () => {
    const { container } = renderLabel({}, {}, { 'data-testid': 'my-label', id: 'label-1' })
    const label = container.querySelector('label')
    expect(label?.getAttribute('data-testid')).toBe('my-label')
    expect(label?.getAttribute('id')).toBe('label-1')
  })
})

describe('LabelGroup', () => {
  it('renders children in group', () => {
    render({
      components: { LabelGroup, Label },
      template: `
        <LabelGroup :theme="theme">
          <Label :theme="labelTheme" text="Label 1">Child 1</Label>
          <Label :theme="labelTheme" text="Label 2">Child 2</Label>
        </LabelGroup>
      `,
      setup() {
        return { theme: LabelGroupTheme, labelTheme: LabelTheme }
      },
    })

    expect(screen.getByText('Label 1')).toBeInTheDocument()
    expect(screen.getByText('Label 2')).toBeInTheDocument()
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('applies theme CSS variables to wrappers', () => {
    const { container } = render({
      components: { LabelGroup, Label },
      template: `
        <LabelGroup :theme="theme">
          <Label :theme="labelTheme" text="Label 1">Child 1</Label>
        </LabelGroup>
      `,
      setup() {
        return { theme: LabelGroupTheme, labelTheme: LabelTheme }
      },
    })

    const wrapper = container.querySelector('div[class*="wrapper"]')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveStyle({
      '--crm-ui-kit-label-group-margin-bottom': '16px',
    })
  })

  it('wraps each child in a wrapper div', () => {
    const { container } = render({
      components: { LabelGroup, Label },
      template: `
        <LabelGroup :theme="theme">
          <Label :theme="labelTheme" text="Label 1">Child 1</Label>
          <Label :theme="labelTheme" text="Label 2">Child 2</Label>
          <Label :theme="labelTheme" text="Label 3">Child 3</Label>
        </LabelGroup>
      `,
      setup() {
        return { theme: LabelGroupTheme, labelTheme: LabelTheme }
      },
    })

    const wrappers = container.querySelectorAll('div[class*="wrapper"]')
    expect(wrappers).toHaveLength(3)
  })

  it('renders empty when no children provided', () => {
    const { container } = render({
      components: { LabelGroup },
      template: `<LabelGroup :theme="theme" />`,
      setup() {
        return { theme: LabelGroupTheme }
      },
    })

    const wrappers = container.querySelectorAll('div[class*="wrapper"]')
    expect(wrappers).toHaveLength(0)
  })
})
