import { d as defineComponent, c as createBlock, o as openBlock, w as withCtx, a as createVNode, m as mergeProps, b as createSlots, e as createTextVNode, f as createBaseVNode } from './index-yRJguHhP.js';
import { B as Button, C as ComponentPlayground, a as ButtonPrimaryTheme, _ as _export_sfc } from './Button.themes-BIVBibom.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ButtonPrimaryPlayground",
  props: {
    appearance: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const defaultPropsSet = {
      isLoading: [true, false],
      isDisabled: [true, false]
    };
    const iconsPropsSet = {
      before: [true, void 0],
      after: [true, void 0]
    };
    const __returned__ = { defaultPropsSet, iconsPropsSet, ComponentPlayground, Button, get ButtonPrimaryTheme() {
      return ButtonPrimaryTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["ComponentPlayground"], {
    appearance: $props.appearance,
    propSets: [$setup.defaultPropsSet, $setup.iconsPropsSet]
  }, {
    default: withCtx(({ props: itemProps }) => [
      createVNode($setup["Button"], mergeProps(itemProps, { theme: $setup.ButtonPrimaryTheme }), createSlots({
        default: withCtx(() => [
          _cache[2] || (_cache[2] = createTextVNode(
            " Button ",
            -1
            /* CACHED */
          ))
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        itemProps.before ? {
          name: "before",
          fn: withCtx(() => [
            _cache[0] || (_cache[0] = createBaseVNode(
              "span",
              null,
              "📅",
              -1
              /* CACHED */
            ))
          ]),
          key: "0"
        } : void 0,
        itemProps.after ? {
          name: "after",
          fn: withCtx(() => [
            _cache[1] || (_cache[1] = createBaseVNode(
              "span",
              null,
              "📋",
              -1
              /* CACHED */
            ))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["theme"])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["appearance", "propSets"]);
}
const ButtonPrimaryPlayground = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ButtonPrimaryPlayground.vue"]]);

export { ButtonPrimaryPlayground as default };
//# sourceMappingURL=ButtonPrimaryPlayground-BP5D_HbL.js.map
