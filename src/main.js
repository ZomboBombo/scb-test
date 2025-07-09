import initCalendarFill from './js/initializers/init-calendar-fill'
import initCalendarDatesLogic from './js/initializers/init-calendar-dates-logic'
import initThemeSwitchLogic from './js/initializers/init-theme-switch-logic'

window.addEventListener('DOMContentLoaded', () => {
  initCalendarFill()
  initCalendarDatesLogic()
  initThemeSwitchLogic()
})
