import AccordionComponent from './Accordion.vue'
import Item from './components/Item/Item.vue'

export * from './Accordion.types'
export * from './Accordion.themes'
export { AccordionItemTheme, type AccordionItemThemeType } from './components/Item'

// Create compound component
const Accordion = AccordionComponent as typeof AccordionComponent & {
  Item: typeof Item
}

Accordion.Item = Item

export { Accordion }
export default Accordion
