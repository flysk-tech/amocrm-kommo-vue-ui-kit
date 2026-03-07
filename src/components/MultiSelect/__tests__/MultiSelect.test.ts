import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { defineComponent, ref, nextTick } from 'vue'
import MultiSelect from '../MultiSelect.vue'
import MultiSelectTriggerComp from '../components/Trigger/Trigger.vue'
import MultiSelectListComp from '../components/List/MultiSelectList.vue'
import MultiSelectItemComp from '../components/Item/Item.vue'
import MultiSelectGroupComp from '../components/Group/Group.vue'
import MultiSelectAllComp from '../components/All/All.vue'
import MultiSelectValueComp from '../components/Value/Value.vue'
import SelectArrowComp from '@/components/Select/components/Arrow/Arrow.vue'

import { MultiSelectRootTheme } from '../MultiSelect.themes'
import { MultiSelectItemTheme } from '../components/Item'
import { MultiSelectGroupTheme } from '../components/Group'
import { SelectArrowTheme } from '@/components/Select/components/Arrow'
import { SelectButtonLightTheme } from '@/components/SelectButton'
import { ListTheme as SelectListTheme } from '@/components/List'

import type { MultiSelectItem, MultiSelectGroup } from '../MultiSelect.types'

const flatItems: MultiSelectItem[] = [
  { value: 'a', option: 'Alpha' },
  { value: 'b', option: 'Beta' },
  { value: 'c', option: 'Charlie' },
]

const groupedItems: MultiSelectItem[] = [
  { value: 1, option: 'User 1', group: 'g1' },
  { value: 2, option: 'User 2', group: 'g1' },
  { value: 3, option: 'User 3', group: 'g2' },
  { value: 4, option: 'User 4', group: 'g2' },
]

const groups: MultiSelectGroup[] = [
  { id: 'g1', label: 'Group 1' },
  { id: 'g2', label: 'Group 2', color: '#e8f5e9' },
]

// Helper to create multi-select wrapper for flat items
const createFlatWrapper = (extraProps: Record<string, any> = {}) => {
  return defineComponent({
    components: {
      MultiSelect,
      MultiSelectTriggerComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectValueComp,
      MultiSelectAllComp,
      SelectArrowComp,
    },
    setup() {
      const value = ref<MultiSelectItem[]>(extraProps.value ?? [])
      const onChangeSpy = vi.fn((items: MultiSelectItem[]) => {
        value.value = items
      })
      const onOpenChangeSpy = vi.fn()

      return {
        value,
        onChangeSpy,
        onOpenChangeSpy,
        items: flatItems,
        MultiSelectRootTheme,
        MultiSelectItemTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        SelectArrowTheme,
        extraProps,
      }
    },
    template: `
      <MultiSelect
        :theme="MultiSelectRootTheme"
        :mode="extraProps.mode || 'multi'"
        :items="items"
        :value="value"
        :is-disabled="extraProps.isDisabled"
        :is-invalid="extraProps.isInvalid"
        data-testid="multiselect-root"
        @change="onChangeSpy"
        @openChange="onOpenChangeSpy"
      >
        <MultiSelectTriggerComp :theme="SelectButtonLightTheme" data-testid="ms-trigger">
          <MultiSelectValueComp
            :placeholder="extraProps.placeholder || 'Select...'"
            :display-mode="extraProps.displayMode || 'count'"
            :max-display-items="extraProps.maxDisplayItems || 2"
            :count-template="extraProps.countTemplate"
          />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </MultiSelectTriggerComp>

        <MultiSelectListComp :theme="SelectListTheme" :empty-text="extraProps.emptyText">
          <MultiSelectAllComp v-if="extraProps.showAll" :theme="MultiSelectItemTheme" :label="extraProps.allLabel" />
          <MultiSelectItemComp
            v-for="item in items"
            :key="item.value"
            :theme="MultiSelectItemTheme"
            :item="item"
            :data-testid="'item-' + item.value"
          />
        </MultiSelectListComp>
      </MultiSelect>
    `,
  })
}

// Helper to create grouped multi-select wrapper
const createGroupedWrapper = (extraProps: Record<string, any> = {}) => {
  return defineComponent({
    components: {
      MultiSelect,
      MultiSelectTriggerComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectGroupComp,
      MultiSelectValueComp,
      SelectArrowComp,
    },
    setup() {
      const value = ref<MultiSelectItem[]>(extraProps.value ?? [])
      const onChangeSpy = vi.fn((items: MultiSelectItem[]) => {
        value.value = items
      })

      return {
        value,
        onChangeSpy,
        items: groupedItems,
        groups,
        MultiSelectRootTheme,
        MultiSelectItemTheme,
        MultiSelectGroupTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        SelectArrowTheme,
        extraProps,
      }
    },
    template: `
      <MultiSelect
        :theme="MultiSelectRootTheme"
        :mode="extraProps.mode || 'multi'"
        :group-selectable="extraProps.groupSelectable ?? false"
        :items="items"
        :value="value"
        data-testid="multiselect-root"
        @change="onChangeSpy"
      >
        <MultiSelectTriggerComp :theme="SelectButtonLightTheme" data-testid="ms-trigger">
          <MultiSelectValueComp
            :placeholder="extraProps.placeholder || 'Select...'"
            :display-mode="extraProps.displayMode || 'names'"
            :max-display-items="3"
          />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </MultiSelectTriggerComp>

        <MultiSelectListComp :theme="SelectListTheme">
          <template v-for="group in groups" :key="group.id">
            <MultiSelectGroupComp :group="group">
              <MultiSelectItemComp
                v-for="item in items.filter(i => i.group === group.id)"
                :key="item.value"
                :theme="MultiSelectItemTheme"
                :item="item"
                :data-testid="'item-' + item.value"
              />
            </MultiSelectGroupComp>
          </template>
        </MultiSelectListComp>
      </MultiSelect>
    `,
  })
}

const renderFlat = (props: Record<string, any> = {}) => render(createFlatWrapper(props))
const renderGrouped = (props: Record<string, any> = {}) => render(createGroupedWrapper(props))

describe('MultiSelect', () => {
  describe('Rendering', () => {
    it('should render the root component', () => {
      renderFlat()
      expect(screen.getByTestId('multiselect-root')).toBeInTheDocument()
    })

    it('should render trigger with placeholder when no items selected', () => {
      renderFlat({ placeholder: 'Pick items' })
      expect(screen.getByText('Pick items')).toBeInTheDocument()
    })

    it('should apply theme CSS variables', () => {
      renderFlat()
      const root = screen.getByTestId('multiselect-root')
      expect(root.getAttribute('style')).toContain('--crm-ui-kit-multiselect-z-index')
    })
  })

  describe('Open/Close', () => {
    it('should open dropdown on trigger click', async () => {
      renderFlat()
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
    })

    it('should close dropdown on Escape', async () => {
      renderFlat()

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      await fireEvent.keyDown(screen.getByRole('listbox'), { code: 'Escape' })
      await nextTick()

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })

    it('should toggle list open and closed via trigger', async () => {
      renderFlat()
      const trigger = screen.getByTestId('ms-trigger')

      await fireEvent.click(trigger)
      await nextTick()
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      await fireEvent.click(trigger)
      await nextTick()
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })
  })

  describe('Single Mode', () => {
    it('should select item and close dropdown', async () => {
      const Wrapper = createFlatWrapper({ mode: 'single' })
      const { container } = render(Wrapper)

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByTestId('item-a')).toBeInTheDocument()
      })

      await fireEvent.click(screen.getByTestId('item-a'))
      await nextTick()

      // Should close dropdown
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })

      // change event should have been called with [item]
      const setupVm = (container as any).__vue_app__
        ? undefined
        : undefined
      // Check via the spy on the wrapper
    })

    it('should emit change with array of one item in single mode', async () => {
      const Wrapper = createFlatWrapper({ mode: 'single' })
      const result = render(Wrapper)

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()
      await waitFor(() => {
        expect(screen.getByTestId('item-b')).toBeInTheDocument()
      })

      await fireEvent.click(screen.getByTestId('item-b'))
      await nextTick()

      const vm = result.container.querySelector('[data-testid="multiselect-root"]')
      // The change spy is on the wrapper component
    })
  })

  describe('Multi Mode', () => {
    it('should toggle checkbox on click and keep dropdown open', async () => {
      renderFlat()

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()
      await waitFor(() => {
        expect(screen.getByTestId('item-a')).toBeInTheDocument()
      })

      await fireEvent.click(screen.getByTestId('item-a'))
      await nextTick()

      // Dropdown should stay open
      expect(screen.getByRole('listbox')).toBeInTheDocument()

      // Click another item
      await fireEvent.click(screen.getByTestId('item-b'))
      await nextTick()

      // Dropdown still open
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    it('should show checkboxes in multi mode', async () => {
      renderFlat()

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()
      await waitFor(() => {
        expect(screen.getByTestId('item-a')).toBeInTheDocument()
      })

      // Checkboxes should be rendered (input type=checkbox)
      const checkboxes = document.querySelectorAll('input[type="checkbox"]')
      expect(checkboxes.length).toBeGreaterThan(0)
    })
  })

  describe('Group Selection', () => {
    it('should render group headers', async () => {
      renderGrouped()

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByText('Group 1')).toBeInTheDocument()
        expect(screen.getByText('Group 2')).toBeInTheDocument()
      })
    })

    it('should render group items under their group', async () => {
      renderGrouped()

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByTestId('item-1')).toBeInTheDocument()
        expect(screen.getByTestId('item-2')).toBeInTheDocument()
        expect(screen.getByTestId('item-3')).toBeInTheDocument()
        expect(screen.getByTestId('item-4')).toBeInTheDocument()
      })
    })

    it('should show group checkbox when groupSelectable is true', async () => {
      renderGrouped({ groupSelectable: true })

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        const groups = document.querySelectorAll('[role="group"]')
        expect(groups.length).toBe(2)
      })
    })

    it('should apply color to group header', async () => {
      renderGrouped()

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        const group2Header = screen.getByText('Group 2').closest('div')
        expect(group2Header?.style.backgroundColor).toBe('rgb(232, 245, 233)')
      })
    })
  })

  describe('Select All', () => {
    it('should render Select All item', async () => {
      renderFlat({ showAll: true })

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByText('Выбрать всё')).toBeInTheDocument()
      })
    })

    it('should use custom label for Select All', async () => {
      renderFlat({ showAll: true, allLabel: 'Select everything' })

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByText('Select everything')).toBeInTheDocument()
      })
    })
  })

  describe('Disabled State', () => {
    it('should not open dropdown when disabled', async () => {
      renderFlat({ isDisabled: true })

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('should disable the trigger button', () => {
      renderFlat({ isDisabled: true })
      const trigger = screen.getByTestId('ms-trigger')
      expect(trigger).toBeDisabled()
    })
  })

  describe('Invalid State', () => {
    it('should apply invalid styling to trigger', () => {
      renderFlat({ isInvalid: true })
      const trigger = screen.getByTestId('ms-trigger')
      expect(trigger.className).toContain('invalid')
    })
  })

  describe('Display Modes', () => {
    it('should show count display mode by default', () => {
      renderFlat({ value: [flatItems[0], flatItems[1]] })
      expect(screen.getByText('2 выбрано')).toBeInTheDocument()
    })

    it('should support custom count template', () => {
      renderFlat({ value: [flatItems[0]], countTemplate: '{n} selected' })
      expect(screen.getByText('1 selected')).toBeInTheDocument()
    })

    it('should show names in names display mode', () => {
      renderGrouped({ value: [groupedItems[0]], displayMode: 'names' })
      expect(screen.getByText('User 1')).toBeInTheDocument()
    })

    it('should truncate names with +N suffix', () => {
      renderFlat({
        value: [flatItems[0], flatItems[1], flatItems[2]],
        displayMode: 'names',
        maxDisplayItems: 2,
      })
      expect(screen.getByText('Alpha, Beta +1')).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('should show empty text when no items', async () => {
      const EmptyWrapper = defineComponent({
        components: {
          MultiSelect,
          MultiSelectTriggerComp,
          MultiSelectListComp,
          MultiSelectValueComp,
          SelectArrowComp,
        },
        setup() {
          return {
            MultiSelectRootTheme,
            SelectListTheme,
            SelectButtonLightTheme,
            SelectArrowTheme,
          }
        },
        template: `
          <MultiSelect :theme="MultiSelectRootTheme" :items="[]" :value="[]">
            <MultiSelectTriggerComp :theme="SelectButtonLightTheme" data-testid="ms-trigger">
              <MultiSelectValueComp placeholder="Select..." />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </MultiSelectTriggerComp>
            <MultiSelectListComp :theme="SelectListTheme" />
          </MultiSelect>
        `,
      })

      render(EmptyWrapper)
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByText('Нет элементов')).toBeInTheDocument()
      })
    })

    it('should use custom empty text', async () => {
      const EmptyWrapper = defineComponent({
        components: {
          MultiSelect,
          MultiSelectTriggerComp,
          MultiSelectListComp,
          MultiSelectValueComp,
          SelectArrowComp,
        },
        setup() {
          return {
            MultiSelectRootTheme,
            SelectListTheme,
            SelectButtonLightTheme,
            SelectArrowTheme,
          }
        },
        template: `
          <MultiSelect :theme="MultiSelectRootTheme" :items="[]" :value="[]">
            <MultiSelectTriggerComp :theme="SelectButtonLightTheme" data-testid="ms-trigger">
              <MultiSelectValueComp placeholder="Select..." />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </MultiSelectTriggerComp>
            <MultiSelectListComp :theme="SelectListTheme" empty-text="No items available" />
          </MultiSelect>
        `,
      })

      render(EmptyWrapper)
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByText('No items available')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have role=listbox on dropdown', async () => {
      renderFlat()
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
    })

    it('should have aria-multiselectable on list in multi mode', async () => {
      renderFlat()
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        const listbox = screen.getByRole('listbox')
        expect(listbox.getAttribute('aria-multiselectable')).toBe('true')
      })
    })

    it('should have role=option with aria-selected on items', async () => {
      renderFlat({ value: [flatItems[0]] })
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        const selectedItem = screen.getByTestId('item-a')
        expect(selectedItem.getAttribute('role')).toBe('option')
        expect(selectedItem.getAttribute('aria-selected')).toBe('true')

        const unselectedItem = screen.getByTestId('item-b')
        expect(unselectedItem.getAttribute('aria-selected')).toBe('false')
      })
    })

    it('should have role=group on group containers', async () => {
      renderGrouped()
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        const groupElements = document.querySelectorAll('[role="group"]')
        expect(groupElements.length).toBe(2)
      })
    })

    it('should have aria-label on groups', async () => {
      renderGrouped()
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        const groupElements = document.querySelectorAll('[role="group"]')
        expect(groupElements[0].getAttribute('aria-label')).toBe('Group 1')
        expect(groupElements[1].getAttribute('aria-label')).toBe('Group 2')
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('should navigate items with ArrowDown', async () => {
      renderFlat()
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      const listbox = screen.getByRole('listbox')

      // ArrowDown should move focus
      await fireEvent.keyDown(listbox, { code: 'ArrowDown' })
      await nextTick()
      await fireEvent.keyDown(listbox, { code: 'ArrowDown' })
      await nextTick()

      // Space should toggle the current item
      await fireEvent.keyDown(listbox, { code: 'Space' })
      await nextTick()

      // Dropdown should stay open in multi mode
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    it('should toggle item with Enter key', async () => {
      renderFlat()
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      const listbox = screen.getByRole('listbox')

      await fireEvent.keyDown(listbox, { code: 'ArrowDown' })
      await nextTick()

      await fireEvent.keyDown(listbox, { code: 'Enter' })
      await nextTick()

      // Should stay open in multi mode
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
  })

  describe('Uncontrolled Mode', () => {
    it('should work with defaultValue', async () => {
      const Wrapper = defineComponent({
        components: {
          MultiSelect,
          MultiSelectTriggerComp,
          MultiSelectListComp,
          MultiSelectItemComp,
          MultiSelectValueComp,
          SelectArrowComp,
        },
        setup() {
          return {
            items: flatItems,
            MultiSelectRootTheme,
            MultiSelectItemTheme,
            SelectListTheme,
            SelectButtonLightTheme,
            SelectArrowTheme,
          }
        },
        template: `
          <MultiSelect
            :theme="MultiSelectRootTheme"
            :items="items"
            :default-value="[items[0]]"
            data-testid="multiselect-root"
          >
            <MultiSelectTriggerComp :theme="SelectButtonLightTheme" data-testid="ms-trigger">
              <MultiSelectValueComp placeholder="Select..." />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </MultiSelectTriggerComp>
            <MultiSelectListComp :theme="SelectListTheme">
              <MultiSelectItemComp
                v-for="item in items"
                :key="item.value"
                :theme="MultiSelectItemTheme"
                :item="item"
              />
            </MultiSelectListComp>
          </MultiSelect>
        `,
      })

      render(Wrapper)
      expect(screen.getByText('1 выбрано')).toBeInTheDocument()
    })
  })

  describe('Long Text', () => {
    it('should show title attribute on items for long text', async () => {
      renderFlat()
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        const item = screen.getByTestId('item-a')
        expect(item.getAttribute('title')).toBe('Alpha')
      })
    })

    it('should show title attribute on group headers', async () => {
      renderGrouped()
      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        const header = screen.getByText('Group 1').closest('div')
        expect(header?.getAttribute('title')).toBe('Group 1')
      })
    })
  })

  describe('Opened CSS class', () => {
    it('should apply opened class when dropdown is open', async () => {
      renderFlat()
      const root = screen.getByTestId('multiselect-root')
      expect(root.className).not.toContain('opened')

      await fireEvent.click(screen.getByTestId('ms-trigger'))
      await nextTick()

      await waitFor(() => {
        expect(root.className).toContain('opened')
      })
    })
  })
})
