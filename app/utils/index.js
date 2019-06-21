export { NavigationActions, StackActions } from 'react-navigation'

export { default as Storage } from './storage'
export { default as request } from './request';
export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

