import Calendar from '../classes/Calendar'

export default function initCalendarDatesLogic() {
  const $calendar = document.querySelector('[data-js-calendar]')

  if (!$calendar) {
    return
  }

  const calendar = new Calendar($calendar)
  calendar.init()
}
