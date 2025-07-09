import ThemeSwitch from '../classes/ThemeSwitch'

export default function initThemeSwitchLogic() {
  const $themeSwitch = document.querySelector('[data-theme-switch="container"]')

  if (!$themeSwitch) {
    return
  }

  const themeSwitch = new ThemeSwitch($themeSwitch)
  themeSwitch.init()
}
