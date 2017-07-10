import { words } from 'capitalize';

export const dashify = expression => `${expression || ''}`.toLowerCase().trim().replace(/[^a-z\- \d]/g, '').replace(/[\s|-]+/g, '-');
export const dashRevert = url => words(url.replace(/-/g, ' '));