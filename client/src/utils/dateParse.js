export const dateParse = (date) => {
  return date
    .replace(/^([^T]+)T(.+)$/, '$1')
    .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1');
}