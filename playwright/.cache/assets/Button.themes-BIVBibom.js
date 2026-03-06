import { d as defineComponent, g as onMounted, h as watch, r as renderSlot, i as isVNode, j as computed, c as createBlock, o as openBlock, w as withCtx, f as createBaseVNode, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, t as toDisplayString, m as mergeProps, p as ref, q as watchEffect, s as createCommentVNode, a as createVNode, e as createTextVNode } from './index-yRJguHhP.js';

var Appearance = /* @__PURE__ */ ((Appearance2) => {
  Appearance2["DEFAULT"] = "default";
  Appearance2["ALTERNATIVE"] = "alternative";
  return Appearance2;
})(Appearance || {});
const APPEARANCE_ATTRIBUTE_NAME = "data-crm-ui-kit-theme";
const DEFAULT_APPEARANCE = "default" /* DEFAULT */;

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ConfigProvider",
  props: {
    appearance: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const setThemeAttribute = (appearance) => {
      document.documentElement.setAttribute(APPEARANCE_ATTRIBUTE_NAME, appearance);
    };
    onMounted(() => {
      setThemeAttribute(props.appearance);
    });
    watch(() => props.appearance, (newAppearance) => {
      setThemeAttribute(newAppearance);
    });
    const __returned__ = { props, setThemeAttribute };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
const ConfigProvider = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "ConfigProvider.vue"]]);

function cartesian(propDesc) {
  return Object.entries(propDesc).reduce(
    (acc, [prop, values]) => {
      const res = [];
      acc.forEach((props) => {
        values.forEach((value) => {
          res.push({ ...props, [prop]: value });
        });
      });
      return res;
    },
    [{}]
  );
}
function multiCartesian(propSets) {
  if (propSets.length === 0) {
    return [{}];
  }
  return propSets.reduce(
    (acc, ortho) => acc.concat(cartesian(ortho)),
    []
  );
}
function prettyProps(props) {
  return Object.entries(props).sort(([key1], [key2]) => Number(key1 > key2)).map(([prop, value]) => {
    if (value === void 0) {
      return `${prop}=undefined`;
    }
    if (value === true) {
      return prop;
    }
    if (isVNode(value) || Array.isArray(value) && value.every((node) => isVNode(node))) {
      return `${prop}=<jsx>`;
    }
    if (prop === "style" || prop === "src" || prop === "photos") {
      const _value = JSON.stringify(value);
      return `${prop}=${_value.replace(/"\\?data:.+?"+?/gi, "{base64}")}`;
    }
    return `${prop}=${JSON.stringify(value)}`;
  }).join(" ");
}

const TEST_CLASS_NAMES = {
  PARAMS_CONTENT: "testComponentParamsContent"
};
const DEFAULT_CROP_TO_CONTENT_SELECTOR = "#root > *";
const FOCUSABLE_ELEMENT_ID = "focusableElement";

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ComponentPlayground",
  props: {
    appearance: {},
    propSets: { default: () => [{}] }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const propsCombinations = computed(() => {
      return multiCartesian(props.propSets);
    });
    const __returned__ = { props, propsCombinations, ConfigProvider, get prettyProps() {
      return prettyProps;
    }, get TEST_CLASS_NAMES() {
      return TEST_CLASS_NAMES;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});

const _hoisted_1$1 = { style: {
  border: "8px solid var(--playwright-border)",
  background: "var(--playwright-background)"
} };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["ConfigProvider"], { appearance: $props.appearance }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList($setup.propsCombinations, (propSet, i) => {
            return openBlock(), createElementBlock("div", { key: i }, [
              createBaseVNode(
                "div",
                {
                  class: normalizeClass($setup.TEST_CLASS_NAMES.PARAMS_CONTENT)
                },
                toDisplayString($setup.prettyProps(propSet)),
                3
                /* TEXT, CLASS */
              ),
              createBaseVNode("div", null, [
                renderSlot(_ctx.$slots, "default", { props: propSet })
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["appearance"]);
}
const ComponentPlayground = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "ComponentPlayground.vue"]]);

const spinner = "Spinner-module__spinner___SZoUP";
const spinner_animation = "Spinner-module__spinner_animation___LJyzJ";
const spinnerAnimation = "Spinner-module__spinner_animation___LJyzJ";
const centered = "Spinner-module__centered___vcz-G";
const styles$1 = {
	spinner: spinner,
	spinner_animation: spinner_animation,
	spinnerAnimation: spinnerAnimation,
	centered: centered
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Spinner",
  props: {
    isCentered: { type: Boolean, default: false },
    className: { default: "" },
    theme: { default: void 0 }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get styles() {
      return styles$1;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "span",
    mergeProps({
      class: [
        $setup.styles.spinner,
        { [$setup.styles.centered]: $props.isCentered },
        $props.className
      ],
      style: $props.theme || {}
    }, _ctx.$attrs),
    null,
    16
    /* FULL_PROPS */
  );
}
const Spinner = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "Spinner.vue"]]);

function useShowInvalidAnimation() {
  const shouldShowInvalidAnimation = ref(false);
  const showInvalidAnimation = (onAnimationEnd = () => {
  }) => {
    shouldShowInvalidAnimation.value = true;
    setTimeout(() => {
      shouldShowInvalidAnimation.value = false;
      onAnimationEnd();
    }, 400);
  };
  return {
    shouldShowInvalidAnimation,
    showInvalidAnimation
  };
}
function useShowSuccessfulState() {
  const shouldShowSuccessfulState = ref(false);
  const showSuccessfulState = (onAnimationEnd = () => {
  }) => {
    shouldShowSuccessfulState.value = true;
    setTimeout(() => {
      shouldShowSuccessfulState.value = false;
      onAnimationEnd();
    }, 1500);
  };
  return {
    shouldShowSuccessfulState,
    showSuccessfulState
  };
}

const button = "Button-module__button___18Bed";
const disabled = "Button-module__disabled___UzdWL";
const content = "Button-module__content___PpYVU";
const before = "Button-module__before___iPqpW";
const after = "Button-module__after___NzIvd";
const spinner_container = "Button-module__spinner_container___FC3J2";
const spinnerContainer = "Button-module__spinner_container___FC3J2";
const invalid = "Button-module__invalid___--B-C";
const buttonShakeAnimation = "Button-module__buttonShakeAnimation___awnKy";
const success = "Button-module__success___CHTsg";
const styles = {
	button: button,
	disabled: disabled,
	content: content,
	before: before,
	after: after,
	spinner_container: spinner_container,
	spinnerContainer: spinnerContainer,
	invalid: invalid,
	buttonShakeAnimation: buttonShakeAnimation,
	success: success
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    onClick: { type: Function, default: void 0 },
    className: { default: "" },
    type: { default: "button" },
    theme: {},
    isLoading: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    before: {},
    after: {},
    children: {},
    showInvalidAnimationRef: {},
    showSuccessfulStateRef: {},
    successfulStateText: {},
    isClickableWhileDisabled: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { shouldShowInvalidAnimation, showInvalidAnimation } = useShowInvalidAnimation();
    const { shouldShowSuccessfulState, showSuccessfulState } = useShowSuccessfulState();
    watchEffect(() => {
      if (props.showInvalidAnimationRef) {
        props.showInvalidAnimationRef.value = showInvalidAnimation;
      }
    });
    watchEffect(() => {
      if (props.showSuccessfulStateRef) {
        props.showSuccessfulStateRef.value = showSuccessfulState;
      }
    });
    const spinnerThemes = computed(() => {
      const defaultTheme = {
        "--crm-ui-kit-spinner-border-color": props.theme?.["--crm-ui-kit-button-spinner-border-color"],
        "--crm-ui-kit-spinner-border-width": props.theme?.["--crm-ui-kit-button-spinner-border-width"],
        "--crm-ui-kit-spinner-circle-size": props.theme?.["--crm-ui-kit-button-spinner-circle-size"],
        "--crm-ui-kit-spinner-border-style": props.theme?.["--crm-ui-kit-button-spinner-border-style"]
      };
      const disabledTheme = {
        ...defaultTheme,
        "--crm-ui-kit-spinner-border-color": props.theme?.["--crm-ui-kit-button-spinner-disabled-border-color"]
      };
      return { defaultTheme, disabledTheme };
    });
    const handleClick = (event) => {
      if (props.isDisabled && !props.isClickableWhileDisabled) {
        return;
      }
      if (props.isLoading) {
        return;
      }
      if (props.onClick) {
        props.onClick(event);
      }
    };
    const __returned__ = { props, shouldShowInvalidAnimation, showInvalidAnimation, shouldShowSuccessfulState, showSuccessfulState, spinnerThemes, handleClick, Spinner, get styles() {
      return styles;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});

const _hoisted_1 = ["type", "disabled"];
const _hoisted_2 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", mergeProps(_ctx.$attrs, {
    type: $props.type,
    class: [
      $setup.styles.button,
      $props.className,
      {
        [$setup.styles.invalid]: $setup.shouldShowInvalidAnimation,
        [$setup.styles.success]: $setup.shouldShowSuccessfulState,
        [$setup.styles.disabled]: $props.isDisabled
      }
    ],
    style: $props.theme,
    disabled: ($props.isDisabled || $props.isLoading) && !$props.isClickableWhileDisabled,
    onClick: $setup.handleClick
  }), [
    createBaseVNode(
      "span",
      {
        class: normalizeClass($setup.styles.content)
      },
      [
        createCommentVNode(" Состояние успеха "),
        $setup.shouldShowSuccessfulState ? (openBlock(), createElementBlock(
          "span",
          _hoisted_2,
          toDisplayString($props.successfulStateText || $props.children),
          1
          /* TEXT */
        )) : $props.isLoading ? (openBlock(), createElementBlock(
          Fragment,
          { key: 1 },
          [
            createCommentVNode(" Состояние загрузки "),
            createBaseVNode(
              "span",
              {
                class: normalizeClass($setup.styles.spinner_container)
              },
              [
                createVNode($setup["Spinner"], {
                  theme: $props.isDisabled ? $setup.spinnerThemes.disabledTheme : $setup.spinnerThemes.defaultTheme,
                  isCentered: true
                }, null, 8, ["theme"])
              ],
              2
              /* CLASS */
            )
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        )) : (openBlock(), createElementBlock(
          Fragment,
          { key: 2 },
          [
            createCommentVNode(" Обычное состояние "),
            $props.before ? (openBlock(), createElementBlock(
              "span",
              {
                key: 0,
                class: normalizeClass($setup.styles.before)
              },
              [
                renderSlot(_ctx.$slots, "before", {}, () => [
                  createTextVNode(
                    toDisplayString($props.before),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            )) : createCommentVNode("v-if", true),
            createBaseVNode("span", null, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString($props.children),
                  1
                  /* TEXT */
                )
              ])
            ]),
            $props.after ? (openBlock(), createElementBlock(
              "span",
              {
                key: 1,
                class: normalizeClass($setup.styles.after)
              },
              [
                renderSlot(_ctx.$slots, "after", {}, () => [
                  createTextVNode(
                    toDisplayString($props.after),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            )) : createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ],
      2
      /* CLASS */
    )
  ], 16, _hoisted_1);
}
const Button = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Button.vue"]]);

const ButtonBaseThemeValues = {
  "--crm-ui-kit-button-z-index": "1",
  "--crm-ui-kit-button-height": "36px",
  "--crm-ui-kit-button-elements-spacing": "4px",
  "--crm-ui-kit-button-font-size": "14px",
  "--crm-ui-kit-button-line-height": "14px",
  "--crm-ui-kit-button-font-weight": "bold",
  "--crm-ui-kit-button-sibling-element-spacing": "7px",
  "--crm-ui-kit-button-disabled-opacity": "var(--crm-ui-kit-disabled-opacity)",
  "--crm-ui-kit-button-padding": "0px 10px",
  "--crm-ui-kit-button-border-width": "1px",
  "--crm-ui-kit-button-border-style": "solid",
  "--crm-ui-kit-button-border-radius": "3px",
  "--crm-ui-kit-button-hover-border-width": "1px",
  "--crm-ui-kit-button-hover-border-style": "solid",
  "--crm-ui-kit-button-hover-border-radius": "3px",
  "--crm-ui-kit-button-success-color": "var(--crm-ui-kit-color-white)",
  "--crm-ui-kit-button-success-background-color": "var(--crm-ui-kit-color-mustard-yellow)",
  "--crm-ui-kit-button-success-hover-background-color": "var(--crm-ui-kit-color-amber)",
  "--crm-ui-kit-button-success-border-color": "var(--crm-ui-kit-color-goldenrod)",
  "--crm-ui-kit-button-spinner-border-color": "var(--crm-ui-kit-color-bright-blue)",
  "--crm-ui-kit-button-spinner-disabled-border-color": "var(--crm-ui-kit-color-bright-blue)",
  "--crm-ui-kit-button-spinner-border-width": "2px",
  "--crm-ui-kit-button-spinner-circle-size": "16px",
  "--crm-ui-kit-button-spinner-border-style": "solid"
};
const ButtonNeutralTheme = {
  ...ButtonBaseThemeValues,
  "--crm-ui-kit-button-color": "var(--crm-ui-kit-palette-text-primary)",
  "--crm-ui-kit-button-border-color": "var(--crm-ui-kit-palette-border-primary)",
  "--crm-ui-kit-button-background-color": "var(--crm-ui-kit-palette-background-primary)",
  "--crm-ui-kit-button-disabled-color": "var(--crm-ui-kit-palette-text-primary)",
  "--crm-ui-kit-button-disabled-background-color": "var(--crm-ui-kit-palette-background-primary)",
  "--crm-ui-kit-button-disabled-border-color": "var(--crm-ui-kit-palette-border-primary)",
  "--crm-ui-kit-button-hover-color": "var(--crm-ui-kit-palette-text-primary)",
  "--crm-ui-kit-button-hover-background-color": "var(--crm-ui-kit-palette-button-classic-hover-background)",
  "--crm-ui-kit-button-hover-border-color": "var(--crm-ui-kit-palette-border-primary)"
};
const ButtonPrimaryTheme = {
  ...ButtonBaseThemeValues,
  "--crm-ui-kit-button-color": "var(--crm-ui-kit-color-white)",
  "--crm-ui-kit-button-border-color": "var(--crm-ui-kit-color-cerulean-blue)",
  "--crm-ui-kit-button-disabled-color": "var(--crm-ui-kit-palette-text-primary)",
  "--crm-ui-kit-button-disabled-background-color": "var(--crm-ui-kit-palette-background-primary)",
  "--crm-ui-kit-button-disabled-border-color": "var(--crm-ui-kit-palette-border-primary)",
  "--crm-ui-kit-button-background-color": "var(--crm-ui-kit-palette-active-element-900)",
  "--crm-ui-kit-button-hover-color": "var(--crm-ui-kit-color-white)",
  "--crm-ui-kit-button-hover-background-color": "var(--crm-ui-kit-color-azure-blue)",
  "--crm-ui-kit-button-hover-border-color": "var(--crm-ui-kit-color-cerulean-blue)",
  "--crm-ui-kit-button-spinner-border-color": "var(--crm-ui-kit-color-white)",
  "--crm-ui-kit-button-spinner-disabled-border-color": "var(--crm-ui-kit-color-bright-blue)"
};
const ButtonSecondaryTheme = {
  ...ButtonBaseThemeValues,
  "--crm-ui-kit-button-height": "30px",
  "--crm-ui-kit-button-color": "var(--crm-ui-kit-palette-text-secondary-light)",
  "--crm-ui-kit-button-padding": "0px 8px",
  "--crm-ui-kit-button-border-color": "transparent",
  "--crm-ui-kit-button-background-color": "inherit",
  "--crm-ui-kit-button-disabled-color": "var(--crm-ui-kit-palette-text-secondary-light)",
  "--crm-ui-kit-button-disabled-background-color": "inherit",
  "--crm-ui-kit-button-disabled-border-color": "transparent",
  "--crm-ui-kit-button-hover-background-color": "inherit",
  "--crm-ui-kit-button-hover-border-color": "transparent",
  "--crm-ui-kit-button-hover-color": "var(--crm-ui-kit-palette-text-secondary-light)"
};

export { Button as B, ComponentPlayground as C, _export_sfc as _, ButtonPrimaryTheme as a, ButtonNeutralTheme as b, ButtonSecondaryTheme as c };
//# sourceMappingURL=Button.themes-BIVBibom.js.map
