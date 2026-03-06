import React, { type FC } from 'react';
import { ColorPalette, ColorItem } from '@storybook/addon-docs/blocks';

import { type Props } from './DesignTokens.props';

export const DesignTokens: FC<Props> = ({ colorValues }) => {
  return (
    <>
      <h2>Токены дизайна</h2>

      <ColorPalette>
        {colorValues.map(({ key, value }) => (
          <ColorItem
            key={key}
            title={key}
            subtitle={value.variableName || ''}
            colors={
              value.alternativeColor
                ? [value.defaultColor, value.alternativeColor]
                : [value.defaultColor]
            }
          />
        ))}
      </ColorPalette>
    </>
  );
};
