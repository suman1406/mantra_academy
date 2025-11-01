export function formatDateISO(value?: string | Date, locale = 'en-GB', options?: Intl.DateTimeFormatOptions) {
  if (!value) return '';
  try {
    const d = typeof value === 'string' ? new Date(value) : value;
    if (Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(locale, options || { dateStyle: 'medium' }).format(d as Date);
  } catch (e) {
    return '';
  }
}
