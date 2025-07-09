const MAX_CALENDAR_PAGE_DATES_COUNT = 36
const MAX_MONTH_DATE = 30
const MONTHS = ['jan', 'feb']

export default function fillCalendar(calendar) {
  const $calendarDateTemp = document.getElementById('calendar-date-temp')
  const $calendarDateNextMonthTemp = document.getElementById('calendar-date-other-month-temp')

  let dateCounter = 1

  while (dateCounter < MAX_CALENDAR_PAGE_DATES_COUNT) {
    const isLargerThanMaxDate = dateCounter > MAX_MONTH_DATE

    const dateItem = isLargerThanMaxDate
      ? $calendarDateNextMonthTemp.content.cloneNode(true)
      : $calendarDateTemp.content.cloneNode(true)

    const dateTrigger = dateItem.querySelector('[data-js-date="trigger"]')
    const dateTextVal = dateItem.querySelector('[data-js-date="text-val"]')

    const dateMonthName = isLargerThanMaxDate
      ? MONTHS.at(-1)
      : MONTHS.at(0)

    const dateMonthNum = isLargerThanMaxDate
      ? dateCounter - MAX_MONTH_DATE
      : dateCounter

    dateTrigger.setAttribute('name', `${dateMonthName}-${dateMonthNum}`)
    dateTrigger.setAttribute('data-js-date-val', dateCounter)
    dateTextVal.textContent = dateMonthNum

    calendar.appendChild(dateItem)

    dateCounter++
  }
}
