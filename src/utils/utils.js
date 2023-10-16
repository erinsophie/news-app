import { format, parseISO } from 'date-fns';

function formatDate(dateString) {
  const date = parseISO(dateString.split(' ')[0]);
  return format(date, 'MMM do yyyy');
}

export { formatDate };
