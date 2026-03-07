import cssParser from 'css';
import themeCssRaw from '../../../../src/styles/theme.css?raw';

export const getParsedCss = () => {
  // In production builds, Vite puts CSS into <link> tags instead of <style>,
  // so we import theme.css as raw string to reliably parse it.
  return cssParser.parse(themeCssRaw);
};
