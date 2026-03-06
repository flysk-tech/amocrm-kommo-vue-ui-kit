import { create } from 'storybook/theming';

import { Appearance } from '@/components';

const fontProps = {
  fontBase: 'PT Sans, Nunito Sans, sans-serif',
  fontCode: 'monospace',
};

const brandingProps = {
  brandTitle: 'amoCRM Vue UI Kit',
  brandUrl: 'https://github.com/amocrm',
  brandTarget: '_blank',
};

const darkTheme = create({
  base: 'dark',
  ...fontProps,
  ...brandingProps,
  brandImage: '/img/logoLight.svg',
});

const lightTheme = create({
  base: 'light',
  ...fontProps,
  ...brandingProps,
  brandImage: '/img/logoDark.svg',
});

const getPreferredColorScheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return Appearance.DEFAULT;
  }

  const isDarkThemePreferred = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return isDarkThemePreferred ? Appearance.ALTERNATIVE : Appearance.DEFAULT;
};

export const getTheme = (appearence: Appearance) => {
  return appearence === Appearance.DEFAULT ? lightTheme : darkTheme;
};

export const initialTheme = getPreferredColorScheme();
export const initialThemeItem = getTheme(initialTheme);
