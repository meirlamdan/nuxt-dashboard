export function dateFormat(date: Date | string) {
  if (!date) return
  return new Date(date).toLocaleDateString('en-GB');
}

export function dateAndTimeFormat(date: Date | string) {
  if (!date) return
  return `${new Date(date).toLocaleTimeString('en-GB')} ${dateFormat(date)}`;
}

