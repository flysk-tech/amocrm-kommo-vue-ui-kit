import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { h } from 'vue'

import { Text, TextPrimaryTheme } from '@/components/Text'
import { Accordion, AccordionItemTheme, AccordionTheme } from '../index'
import type { AccordionSingleImplProps } from '../components/AccordionSingle/AccordionSingle.types'
import type { AccordionMultipleImplProps } from '../components/AccordionMultiple/AccordionMultiple.types'
import styles from '../components/Item/Item.module.scss'

const DATA_ACCORDION_TEST_ID = 'Accordion'
const DATA_ACCORDION_ITEM_TEST_ID = 'AccordionItem'

const AccordionItem = Accordion.Item

const defaultItems = [
  {
    value: '1',
    title: 'Item 1',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.',
    theme: AccordionItemTheme,
  },
  {
    value: '2',
    title: 'Item 2',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.',
    theme: AccordionItemTheme,
  },
  {
    value: '3',
    title: 'Item 3',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.',
    theme: AccordionItemTheme,
  },
]

const renderAccordionSingle = (
  props?: Partial<AccordionSingleImplProps>,
  items = defaultItems
) => {
  const onChangeMock = vi.fn()

  const renderResult = render(Accordion, {
    props: {
      role: 'accordion',
      'data-testid': DATA_ACCORDION_TEST_ID,
      theme: AccordionTheme,
      type: 'single',
      onChange: onChangeMock,
      ...props,
    } as any,
    slots: {
      default: () =>
        items.map(({ value, children, ...rest }) =>
          h(
            AccordionItem,
            {
              'data-testid': DATA_ACCORDION_ITEM_TEST_ID,
              key: value,
              value,
              ...rest,
            },
            {
              default: () =>
                h(Text, { theme: TextPrimaryTheme, size: 'l' }, () => children),
            }
          )
        ),
    },
  })

  return { ...renderResult, onChangeMock }
}

describe('AccordionSingle', () => {
  it('should renders the Accordion component', () => {
    renderAccordionSingle()

    const accordion = screen.getByTestId(DATA_ACCORDION_TEST_ID)

    expect(accordion).toBeInTheDocument()
  })

  it('should open item by click and remain open by click again if not collapsible', async () => {
    const { onChangeMock } = renderAccordionSingle({ isCollapsible: false })

    const itemHeaderText = screen.getByText(defaultItems[0].title)

    await fireEvent.click(itemHeaderText)

    expect(onChangeMock).toHaveBeenCalledWith(defaultItems[0].value)

    const items = screen.getAllByTestId(DATA_ACCORDION_ITEM_TEST_ID)

    await waitFor(() => {
      expect(items[0]).toHaveClass(styles.active)
    })

    await fireEvent.click(itemHeaderText)

    expect(onChangeMock).toHaveBeenCalledWith(defaultItems[0].value)

    await waitFor(() => {
      expect(items[0]).toHaveClass(styles.active)
    })
  })

  it('should open item by click and close click again if collapsible', async () => {
    const { onChangeMock } = renderAccordionSingle({ isCollapsible: true })

    const itemHeaderText = screen.getByText(defaultItems[0].title)

    await fireEvent.click(itemHeaderText)

    expect(onChangeMock).toHaveBeenCalledWith(defaultItems[0].value)

    const items = screen.getAllByTestId(DATA_ACCORDION_ITEM_TEST_ID)

    await waitFor(() => {
      expect(items[0]).toHaveClass(styles.active)
    })

    await fireEvent.click(itemHeaderText)

    expect(onChangeMock).toHaveBeenCalledWith(defaultItems[0].value)

    await waitFor(() => {
      expect(items[0]).not.toHaveClass(styles.active)
    })
  })
})

const renderAccordionMultiple = (
  props?: Partial<AccordionMultipleImplProps>,
  items = defaultItems
) => {
  const onChangeMock = vi.fn()

  const renderResult = render(Accordion, {
    props: {
      role: 'accordion',
      'data-testid': DATA_ACCORDION_TEST_ID,
      theme: AccordionTheme,
      type: 'multiple',
      onChange: onChangeMock,
      ...props,
    } as any,
    slots: {
      default: () =>
        items.map(({ value, children, ...rest }) =>
          h(
            AccordionItem,
            {
              'data-testid': DATA_ACCORDION_ITEM_TEST_ID,
              key: value,
              value,
              ...rest,
            },
            {
              default: () =>
                h(Text, { theme: TextPrimaryTheme, size: 'l' }, () => children),
            }
          )
        ),
    },
  })

  return { ...renderResult, onChangeMock }
}

describe('AccordionMultiple', () => {
  it('should renders the Accordion component', () => {
    renderAccordionMultiple()

    const accordion = screen.getByTestId(DATA_ACCORDION_TEST_ID)

    expect(accordion).toBeInTheDocument()
  })

  it('should open and close several items at once', async () => {
    const { onChangeMock } = renderAccordionMultiple()

    const firstItemHeaderText = screen.getByText(defaultItems[0].title)

    await fireEvent.click(firstItemHeaderText)

    expect(onChangeMock).toHaveBeenCalledWith([defaultItems[0].value])

    const items = screen.getAllByTestId(DATA_ACCORDION_ITEM_TEST_ID)

    await waitFor(() => {
      expect(items[0]).toHaveClass(styles.active)
    })

    const secondItemHeaderText = screen.getByText(defaultItems[1].title)

    await fireEvent.click(secondItemHeaderText)

    expect(onChangeMock).toHaveBeenLastCalledWith([
      defaultItems[0].value,
      defaultItems[1].value,
    ])

    await waitFor(() => {
      expect(items[0]).toHaveClass(styles.active)
      expect(items[1]).toHaveClass(styles.active)
    })

    await fireEvent.click(firstItemHeaderText)

    expect(onChangeMock).toHaveBeenLastCalledWith([defaultItems[1].value])

    await waitFor(() => {
      expect(items[0]).not.toHaveClass(styles.active)
      expect(items[1]).toHaveClass(styles.active)
    })
  })
})
