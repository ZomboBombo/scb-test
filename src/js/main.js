import initCalendarFill from './initializers/init-calendar-fill'
import initCalendarDatesLogic from './initializers/init-calendar-dates-logic'
import initThemeSwitchLogic from './initializers/init-theme-switch-logic'

window.addEventListener('DOMContentLoaded', () => {
  initCalendarFill()
  initCalendarDatesLogic()
  initThemeSwitchLogic()
})
