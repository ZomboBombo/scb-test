import Calendar from '../classes/Calendar'

export default function initCalendarDatesLogic() {
  const $calendarBlocks = document.querySelectorAll('[data-js-calendar]')

  $calendarBlocks.forEach((calendarBlock) => {
    const calendar = new Calendar(calendarBlock)
    calendar.init()
  })
}
