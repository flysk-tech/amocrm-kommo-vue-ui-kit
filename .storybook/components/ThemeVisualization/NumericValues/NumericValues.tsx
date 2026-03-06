import React, { type FC } from 'react';

import type { Props } from './NumericValues.props';

export const NumericValues: FC<Props> = ({ numericValues }) => {
  return (
    <>
      <h2>Numeric values</h2>

      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            {['Название', 'Значение'].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {numericValues.map((item) => (
            <tr key={item.key}>
              <td>
                <b>{item.key}</b>
              </td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
