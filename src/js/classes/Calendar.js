export default class Calendar {
  /*
    Статические (константные) значения
    селекторов для айтема Календаря
  */
  static DateItemSelector = {
    CONTAINER: '[data-js-date="container"]',
    PARENT: '[data-js-date="parent"]',
    TRIGGER: '[data-js-date="trigger"]',
    TRIGGER_CHECKED: '[data-js-date="trigger"]:checked',
    DATE_VAL: '[data-js-date-val]',
    DATE_VAL_ESCAPED: 'data-js-date-val',
    TEXT_VAL: '[data-js-date="text-val"]',
  }
  /*
    Статические (константные) значения
    CSS-класснеймов для `Calendar.DateItemSelector.CONTAINER`
  */
  static DateContainerStyleSelector = {
    FIRST_DATE: 'is-first',
    BETWEEN_DATE: 'is-between',
    LAST_DATE: 'is-last',
  }

  #calendar = null

  constructor(calendar) {
    this.#calendar = calendar
  }

  init() {
    this.#calendar.addEventListener('click', this.#onTriggerDate)
  }

  #getDateValByIndex({ index, dates }) {
    return Number(
      dates.at(index).getAttribute(Calendar.DateItemSelector.DATE_VAL_ESCAPED)
    )
  }

  #setExtremumDates(dates) {
    const [firstDateContainer, lastDateContainer] = [
      dates.at(0).closest(Calendar.DateItemSelector.CONTAINER),
      dates.at(-1).closest(Calendar.DateItemSelector.CONTAINER)
    ]

    if (firstDateContainer === lastDateContainer) {
      return
    }

    firstDateContainer.classList.add(Calendar.DateContainerStyleSelector.FIRST_DATE)
    lastDateContainer.classList.add(Calendar.DateContainerStyleSelector.LAST_DATE)
  }

  #resetSelectedDates({ currDateTrigger }) {
    /*
      Двойное присваивание `checked = true` (в начале скрипта
      и в конце) для `currDateTrigger` – это небольшой хак,
      связанный с особенностями работы `input[type="checkbox"]`.

      В момент первого нажатия на айтем Календаря (чекбокс под капотом)
      моментально срабатывает событие `checked`, и состояние `:checked` чекбокса меняется
      на противоположное – т.е., на `checked === false`.

      Но нам нужно, чтобы `currDateTrigger` тоже попал в выборку
      элементов для сброса состояния `:checked`.

      Потому мы принудительно присваиваем это состояние
      для `currDateTrigger` первый раз. И второй – уже после сброса,
      т.к. нам нужно, чтобы `currDateTrigger` включился в состояние `:checked`.
    */
    currDateTrigger.checked = true

    const selectedDatesToReset = this.#calendar.querySelectorAll(Calendar.DateItemSelector.TRIGGER_CHECKED)

    selectedDatesToReset.forEach((date) => {
      date.checked = false

      date.closest(Calendar.DateItemSelector.CONTAINER).classList.remove(
        Calendar.DateContainerStyleSelector.FIRST_DATE,
        Calendar.DateContainerStyleSelector.BETWEEN_DATE,
        Calendar.DateContainerStyleSelector.LAST_DATE
      )
    })

    currDateTrigger.checked = true
  }

  #onTriggerDate = (e) => {
    const currDateTrigger = e.target.closest(Calendar.DateItemSelector.TRIGGER)

    if (!currDateTrigger) {
      return
    }

    const wasCurrDateSelected = !currDateTrigger.checked
    const selectedDates = Array.from(
      this.#calendar.querySelectorAll(Calendar.DateItemSelector.TRIGGER_CHECKED)
    )

    if (!selectedDates.length) {
      return
    }

    const isSelectDateFromSelectedList = selectedDates.length >= 1 && wasCurrDateSelected
    const isMoreThanTwoSelectedDates = selectedDates.length > 2

    if (isSelectDateFromSelectedList || isMoreThanTwoSelectedDates) {
      this.#resetSelectedDates({ currDateTrigger })

      return
    }

    this.#setExtremumDates(selectedDates)

    const [firstSelectedDateVal, lastSelectedDateVal] = [
      this.#getDateValByIndex({ index: 0, dates: selectedDates }),
      this.#getDateValByIndex({ index: -1, dates: selectedDates })
    ]

    let dateCounter = firstSelectedDateVal + 1

    while (dateCounter < lastSelectedDateVal) {
      const dateBetweenSelector = `[${Calendar.DateItemSelector.DATE_VAL_ESCAPED}="${dateCounter}"]`
      const dateBetween = this.#calendar.querySelector(dateBetweenSelector)
      const dateBetweenContainer = dateBetween.closest(Calendar.DateItemSelector.CONTAINER)

      dateBetween.checked = true
      dateBetweenContainer && dateBetweenContainer.classList.add(Calendar.DateContainerStyleSelector.BETWEEN_DATE)

      dateCounter++
    }
  }
}
