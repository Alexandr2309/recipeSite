import React from 'react';
import TableRow from './TableRow'

const TableIngreds = ({ portions, ingredients }) => {
  let flag = false;
  return (
    <table>
      <thead>
        <tr><th>Продукты <span> (на {portions} порции)</span></th></tr>
      </thead>
      <tbody>
        {
          Object.entries(ingredients).map(([product, count], i) => {
            flag = !flag;
            return <TableRow
              key={i}
              addClass={flag}
              product={product}
              count={count}
            />
          })
        }
        {/* <tr className='page__table-colorize'>
          <td>Картофель — 600 г (6 шт.)</td>
        </tr>
        <tr>
          <td>Хек (филе) — 350 г (2 шт.)</td>
        </tr>
        <tr className='page__table-colorize'>
          <td>Лук репчатый — 80 г (1 шт.)</td>
        </tr>
        <tr>
          <td>Сметана жирностью 15 % — 100 г</td>
        </tr>
        <tr className='page__table-colorize'>
          <td>Сок лимона — 15 мл (1 ст. ложка)</td>
        </tr> */}
      </tbody>
    </table>
  )
};

export default TableIngreds;