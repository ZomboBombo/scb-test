export default class ThemeSwitch {
  static DataThemeKey = {
    DEFAULT: 'data-theme',
    DOC_ELEM_SELECTOR: '[data-theme]',
  }

  static IndicatorCssCustomPropKey = {
    SIZE: '--js-theme-switch-indicator-size',
    POSITION: '--js-theme-switch-indicator-pos',
  }

  static ItemSelector = {
    PARENT: '[data-theme-switch="parent"]',
    TRIGGER: '[data-theme-switch="trigger"]',
    TRIGGER_ACTIVE: '[data-theme-switch="trigger"].is-active',
    TRIGGER_AUTO_THEME: '[data-theme-switch="trigger"][data-theme-apply="auto"]',
    THEME_APPLY: '[data-theme-apply]',
    THEME_APPLY_ESCAPED: 'data-theme-apply',
  }

  static TriggerClass = {
    ACTIVE: 'is-active'
  }

  #switch = null
  #triggers = null

  constructor(themeSwitch) {
    this.#switch = themeSwitch
    this.#triggers = this.#switch.querySelectorAll(ThemeSwitch.ItemSelector.TRIGGER)
  }

  init() {
    this.#initStoredTheme()
    this.#initActiveTrigger()

    this.#triggers.forEach((trigger) => {
      trigger.addEventListener('click', this.#onSwitchTheme)
    })
  }

  #initActiveTrigger() {
    const activeTrigger = this.#switch.querySelector(ThemeSwitch.ItemSelector.TRIGGER_ACTIVE)
      || this.#switch.querySelector(ThemeSwitch.ItemSelector.TRIGGER_AUTO_THEME)
      || this.#switch.querySelector(ThemeSwitch.ItemSelector.TRIGGER)

    this.#setActiveTrigger(activeTrigger)
  }

  #initStoredTheme() {
    const storedTheme = localStorage.getItem(ThemeSwitch.DataThemeKey.DEFAULT)

    if (!storedTheme) {
      return
    }

    const themeTriggerSelector = `${ThemeSwitch.ItemSelector.TRIGGER}[${ThemeSwitch.ItemSelector.THEME_APPLY_ESCAPED}="${storedTheme}"]`
    const themeTrigger = this.#switch.querySelector(themeTriggerSelector)

    this.#setActiveTrigger(themeTrigger)
  }

  #saveThemeToStorage(theme) {
    localStorage.setItem(ThemeSwitch.DataThemeKey.DEFAULT, theme)
  }

  #resetActiveTrigger() {
    const currActiveTrigger = this.#switch.querySelector(ThemeSwitch.ItemSelector.TRIGGER_ACTIVE)
    currActiveTrigger.classList.remove('is-active')
  }

  #setActiveTrigger(trigger) {
    trigger.classList.add(ThemeSwitch.TriggerClass.ACTIVE)

    this.#updateIndicatorPos(trigger)
    this.#applyTheme(trigger)
  }

  #getTriggerProps(trigger) {
    return {
      width: trigger.clientWidth,
      height: trigger.clientHeight,
      xShift: trigger.offsetLeft,
    }
  }

  #updateIndicatorPos(activeTrigger) {
    const { width, height, xShift } = this.#getTriggerProps(activeTrigger)
    const activeTriggerSizes = [width, height]

    activeTriggerSizes.forEach((size) => {
      this.#switch.style.setProperty(ThemeSwitch.IndicatorCssCustomPropKey.SIZE, `${size}px`)
    })

    this.#switch.style.setProperty(ThemeSwitch.IndicatorCssCustomPropKey.POSITION, `${xShift}px`)
  }

  #applyTheme(trigger) {
    const theme = trigger.getAttribute(ThemeSwitch.ItemSelector.THEME_APPLY_ESCAPED)

    document.documentElement.setAttribute(ThemeSwitch.DataThemeKey.DEFAULT, theme)
    this.#saveThemeToStorage(theme)
  }

  #onSwitchTheme = (e) => {
    e.preventDefault()

    const currTrigger = e.currentTarget

    this.#resetActiveTrigger()
    this.#setActiveTrigger(currTrigger)
  }
}
