import moment from 'moment'
import 'moment/locale/ru' 
const formatDate = (data) => {
  return ('00' + data).slice(-2);
}

const returnValidDate = (date) => {
  let month = formatDate(date.getMonth() + 1);
  let day = formatDate(date.getDate());
  let hour = formatDate(date.getHours());
  let minute = formatDate(date.getMinutes());
  let second = formatDate(date.getSeconds());

  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
}
export const calendarDateParse = (date) => {
  let res = new Date(Date.parse(date))
  date = returnValidDate(res);
  moment.locale('ru');
  return moment(date).format('lll')
}