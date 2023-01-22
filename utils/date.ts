export function dateFormat(dateISO: string) {
  const [y, m, d] = dateISO.split('-');
  const tmp = new Date(+y, +m - 1, +d);
  const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(tmp);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(tmp);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(tmp);
  return `${month} ${day}, ${year}`;
}
