import fillCalendar from '../modules/fill-calendar'

export default function initCalendarFill() {
  const $calendarBlocks = document.querySelectorAll('[data-js-calendar]')

  $calendarBlocks.forEach((calendarBlock) => fillCalendar(calendarBlock))
}
