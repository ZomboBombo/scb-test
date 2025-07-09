import fillCalendar from '../modules/fill-calendar'

export default function initCalendarFill() {
  const $calendar = document.querySelector('[data-js-calendar]')

  if (!$calendar) {
    return
  }

  fillCalendar($calendar)
}
