import { DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION } from './types'

const handleStorage = setting => {
  const settings = JSON.parse(localStorage.getItem('settings'))
  settings[setting] = !settings[setting]
  localStorage.setItem('settings', JSON.stringify(settings))
  return settings[setting]
}

export const setDisableBalanceOnAdd = () => {
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: handleStorage('disableBalanceOnAdd')
  }
}

export const setDisableBalanceOnEdit = () => {
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: handleStorage('disableBalanceOnEdit')
  }
}

export const setAllowRegistration = () => {
  return {
    type: ALLOW_REGISTRATION,
    payload: handleStorage('allowRegistration')
  }
}
