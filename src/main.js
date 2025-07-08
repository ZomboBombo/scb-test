/**
 * ЛОГИКА НАПОЛНЕНИЯ
*/
(() => {
  const MAX_CALENDAR_PAGE_DATES_COUNT = 36
  const MONTHS = ['jan', 'feb']

  const $calendar = document.getElementById('calendar')

  if (!$calendar) {
    return
  }

  const $calendarDateTemp = document.getElementById('calendar-date-temp')
  const $calendarDateNextMonthTemp = document.getElementById('calendar-date-other-month-temp')

  let dateCounter = 1

  while (dateCounter < MAX_CALENDAR_PAGE_DATES_COUNT) {
    const isLargerThanMaxDate = dateCounter > 30

    const dateItem = isLargerThanMaxDate
      ? $calendarDateNextMonthTemp.content.cloneNode(true)
      : $calendarDateTemp.content.cloneNode(true)

    const dateTrigger = dateItem.querySelector('[data-js-date="trigger"]')
    const dateTextVal = dateItem.querySelector('[data-js-date="text-val"]')

    const dateMonthName = isLargerThanMaxDate
      ? MONTHS.at(-1)
      : MONTHS.at(0)

    const dateMonthNum = isLargerThanMaxDate
      ? dateCounter - 30
      : dateCounter

    dateTrigger.setAttribute('name', `${dateMonthName}-${dateMonthNum}`)
    dateTrigger.setAttribute('data-js-date-val', dateCounter)
    dateTextVal.textContent = dateMonthNum

    $calendar.appendChild(dateItem)

    dateCounter++
  }
})();

/**
 * ЛОГИКА РАБОТЫ ДАТ
*/
(() => {
  const $calendar = document.getElementById('calendar')

  if (!$calendar) {
    return
  }

  const dateTriggers = $calendar.querySelectorAll('[data-js-date="trigger"]')
  dateTriggers.forEach((date, index) => date.setAttribute('data-js-date-val', index + 1))

  const onTriggerDate = (e) => {
    const currDateTrigger = e.target.closest('[data-js-date="trigger"]')

    if (!currDateTrigger) {
      return
    }

    const calendar = e.currentTarget
    const checkedDates = Array.from(calendar.querySelectorAll('[data-js-date="trigger"]:checked'))

    if (!checkedDates.length || checkedDates.length === 1) {
      return
    }

    if (checkedDates.length > 2) {
      calendar.querySelectorAll('[data-js-date="trigger"]:checked').forEach((date) => {
        date.checked = false
        date.closest('[data-js-date="container"]').classList.remove('is-first', 'is-between', 'is-last')
      })
      currDateTrigger.checked = true
      return
    }

    const firstDateContainer = checkedDates.at(0).closest('[data-js-date="container"]')
    const lastDateContainer = checkedDates.at(-1).closest('[data-js-date="container"]')

    firstDateContainer.classList.add('is-first')
    lastDateContainer.classList.add('is-last')

    const getCheckedDateByIndex = (index) => {
      return Number(
        checkedDates.at(index).getAttribute('data-js-date-val')
      )
    }

    const [minCheckedDate, maxCheckedDate] = [getCheckedDateByIndex(0), getCheckedDateByIndex(-1)]

    let dateCounter = minCheckedDate + 1

    while (dateCounter < maxCheckedDate) {
      const dateBetween = calendar.querySelector(`[data-js-date-val="${dateCounter}"]`)

      dateBetween.checked = true
      dateBetween.closest('[data-js-date="container"]').classList.add('is-between')
      dateCounter++
    }
  }

  $calendar.addEventListener('click', onTriggerDate)
})()
