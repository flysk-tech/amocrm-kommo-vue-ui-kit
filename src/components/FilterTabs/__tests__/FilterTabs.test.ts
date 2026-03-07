import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { defineComponent } from 'vue'
import { FilterTabs, FilterTabsTheme, FilterTabsItemRootTheme, TabPrimaryTheme } from '..'
import { ItemRoot } from '../components/ItemRoot'
import { Tab } from '../components/Tab'
import { ItemRootReset, TabReset } from '../components/ItemRootReset'

const defaultItems = [
  { name: 'tab1', theme: FilterTabsItemRootTheme },
  { name: 'tab2', theme: FilterTabsItemRootTheme },
  { name: 'tab3', theme: FilterTabsItemRootTheme },
]

const renderFilterTabs = (props: any = {}, items = defaultItems) => {
  const onChangeMock = vi.fn()

  const Wrapper = defineComponent({
    components: { FilterTabs, ItemRoot, Tab, ItemRootReset, TabReset },
    setup() {
      return { items, onChangeMock, TabPrimaryTheme, FilterTabsItemRootTheme }
    },
    template: `
      <FilterTabs
        :theme="$attrs.groupTheme"
        data-testid="filter-tabs"
        v-bind="$attrs.groupProps"
        @change="onChangeMock"
      >
        <ItemRootReset :theme="FilterTabsItemRootTheme">
          <TabReset :theme="TabPrimaryTheme" data-testid="tab-reset">All</TabReset>
        </ItemRootReset>

        <ItemRoot
          v-for="item in items"
          :key="item.name"
          v-bind="item"
        >
          <Tab :theme="TabPrimaryTheme" :data-testid="'tab-' + item.name">{{ item.name }}</Tab>
        </ItemRoot>
      </FilterTabs>
    `,
  })

  const result = render(Wrapper, {
    attrs: {
      groupTheme: FilterTabsTheme,
      groupProps: props,
    },
  })

  return { ...result, onChangeMock }
}

const renderFilterTabsWithoutReset = (props: any = {}, items = defaultItems) => {
  const onChangeMock = vi.fn()

  const Wrapper = defineComponent({
    components: { FilterTabs, ItemRoot, Tab },
    setup() {
      return { items, onChangeMock, TabPrimaryTheme }
    },
    template: `
      <FilterTabs
        :theme="$attrs.groupTheme"
        data-testid="filter-tabs"
        v-bind="$attrs.groupProps"
        @change="onChangeMock"
      >
        <ItemRoot
          v-for="item in items"
          :key="item.name"
          v-bind="item"
        >
          <Tab :theme="TabPrimaryTheme" :data-testid="'tab-' + item.name">{{ item.name }}</Tab>
        </ItemRoot>
      </FilterTabs>
    `,
  })

  const result = render(Wrapper, {
    attrs: {
      groupTheme: FilterTabsTheme,
      groupProps: props,
    },
  })

  return { ...result, onChangeMock }
}

describe('FilterTabs', () => {
  it('should render FilterTabs with children', () => {
    renderFilterTabs()

    expect(screen.getByTestId('filter-tabs')).toBeInTheDocument()
    expect(screen.getByTestId('tab-tab1')).toBeInTheDocument()
    expect(screen.getByTestId('tab-tab2')).toBeInTheDocument()
    expect(screen.getByTestId('tab-tab3')).toBeInTheDocument()
  })

  it('should render reset tab', () => {
    renderFilterTabs()

    expect(screen.getByTestId('tab-reset')).toBeInTheDocument()
  })

  it('should apply horizontal orientation by default', () => {
    renderFilterTabs()

    const tabs = screen.getByTestId('filter-tabs')
    expect(tabs.className).toContain('horizontal')
  })

  it('should apply vertical orientation', () => {
    renderFilterTabs({ orientation: 'vertical' })

    const tabs = screen.getByTestId('filter-tabs')
    expect(tabs.className).not.toContain('horizontal')
  })

  it('should emit change when tab clicked in single select mode', async () => {
    const { onChangeMock } = renderFilterTabs()

    const tab1 = screen.getByTestId('tab-tab1')
    await fireEvent.click(tab1)

    expect(onChangeMock).toHaveBeenCalledWith(['tab1'], 'tab1')
  })

  it('should select only one tab at a time in single select mode', async () => {
    const { onChangeMock } = renderFilterTabs()

    const tab1 = screen.getByTestId('tab-tab1')
    const tab2 = screen.getByTestId('tab-tab2')

    await fireEvent.click(tab1)
    expect(onChangeMock).toHaveBeenLastCalledWith(['tab1'], 'tab1')

    await fireEvent.click(tab2)
    expect(onChangeMock).toHaveBeenLastCalledWith(['tab2'], 'tab2')
  })

  it('should not deselect in single select mode when clicking same tab', async () => {
    const { onChangeMock } = renderFilterTabs()

    const tab1 = screen.getByTestId('tab-tab1')

    await fireEvent.click(tab1)
    await fireEvent.click(tab1)

    // Should still be selected (single select doesn't toggle)
    expect(onChangeMock).toHaveBeenCalledTimes(2)
  })

  it('should allow multiple selections in multi-select mode', async () => {
    const { onChangeMock } = renderFilterTabs({ isMultiSelect: true })

    const tab1 = screen.getByTestId('tab-tab1')
    const tab2 = screen.getByTestId('tab-tab2')

    await fireEvent.click(tab1)
    expect(onChangeMock).toHaveBeenLastCalledWith(['tab1'], 'tab1')

    await fireEvent.click(tab2)
    expect(onChangeMock).toHaveBeenLastCalledWith(['tab1', 'tab2'], 'tab2')
  })

  it('should toggle selection in multi-select mode', async () => {
    const { onChangeMock } = renderFilterTabs({ isMultiSelect: true })

    const tab1 = screen.getByTestId('tab-tab1')

    await fireEvent.click(tab1)
    expect(onChangeMock).toHaveBeenLastCalledWith(['tab1'], 'tab1')

    await fireEvent.click(tab1)
    expect(onChangeMock).toHaveBeenLastCalledWith([], 'tab1')
  })

  it('should reset all selections via reset tab', async () => {
    const { onChangeMock } = renderFilterTabs({ isMultiSelect: true })

    const tab1 = screen.getByTestId('tab-tab1')
    const tab2 = screen.getByTestId('tab-tab2')
    const resetTab = screen.getByTestId('tab-reset')

    await fireEvent.click(tab1)
    await fireEvent.click(tab2)
    await fireEvent.click(resetTab)

    expect(onChangeMock).toHaveBeenLastCalledWith([], undefined)
  })

  it('should disable all tabs when isDisabled', () => {
    renderFilterTabs({ isDisabled: true })

    const tab1 = screen.getByTestId('tab-tab1')
    const tab2 = screen.getByTestId('tab-tab2')
    const tab3 = screen.getByTestId('tab-tab3')
    const resetTab = screen.getByTestId('tab-reset')

    expect(tab1).toBeDisabled()
    expect(tab2).toBeDisabled()
    expect(tab3).toBeDisabled()
    expect(resetTab).toBeDisabled()
  })

  it('should disable individual tabs', () => {
    const items = [
      { name: 'tab1', theme: FilterTabsItemRootTheme, isDisabled: true },
      { name: 'tab2', theme: FilterTabsItemRootTheme },
    ]
    renderFilterTabsWithoutReset({}, items)

    const tab1 = screen.getByTestId('tab-tab1')
    const tab2 = screen.getByTestId('tab-tab2')

    expect(tab1).toBeDisabled()
    expect(tab2).not.toBeDisabled()
  })

  it('should apply selected class to active tab', async () => {
    renderFilterTabsWithoutReset()

    const tab1 = screen.getByTestId('tab-tab1')

    await fireEvent.click(tab1)

    await waitFor(() => {
      expect(tab1.className).toContain('selected')
    })
  })

  it('should show reset tab as selected when no tabs active', () => {
    renderFilterTabs()

    const resetTab = screen.getByTestId('tab-reset')
    expect(resetTab.className).toContain('selected')
  })

  it('should render with isDefaultActive items', async () => {
    const items = [
      { name: 'tab1', theme: FilterTabsItemRootTheme, isDefaultActive: true },
      { name: 'tab2', theme: FilterTabsItemRootTheme },
    ]
    renderFilterTabsWithoutReset({}, items)

    await waitFor(() => {
      const tab1 = screen.getByTestId('tab-tab1')
      expect(tab1.className).toContain('selected')
    })
  })

  it('should register multiple default active items in multi-select', async () => {
    const items = [
      { name: 'tab1', theme: FilterTabsItemRootTheme, isDefaultActive: true },
      { name: 'tab2', theme: FilterTabsItemRootTheme, isDefaultActive: true },
      { name: 'tab3', theme: FilterTabsItemRootTheme },
    ]
    renderFilterTabsWithoutReset({ isMultiSelect: true }, items)

    await waitFor(() => {
      const tab1 = screen.getByTestId('tab-tab1')
      const tab2 = screen.getByTestId('tab-tab2')
      expect(tab1.className).toContain('selected')
      expect(tab2.className).toContain('selected')
    })
  })

  it('should render tab content from slot', () => {
    renderFilterTabs()

    expect(screen.getByText('tab1')).toBeInTheDocument()
    expect(screen.getByText('tab2')).toBeInTheDocument()
    expect(screen.getByText('All')).toBeInTheDocument()
  })
})
