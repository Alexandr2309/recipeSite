import React from 'react';

const TableRow = ({ addClass = false, product, count }) => {
  return (
    <tr className={addClass ? 'page__table-colorize' : ''}>
      <td>{product} - {count}</td>
    </tr>
  )
};

export default TableRow;