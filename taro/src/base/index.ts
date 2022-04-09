import { fromByteArray, toByteArray } from 'base64-js'

import {temporarilyNotSupport} from '../utils'

export const canIUse = temporarilyNotSupport('canIUse')

export function arrayBufferToBase64(arrayBuffer) {
    return fromByteArray(arrayBuffer)
}

export function base64ToArrayBuffer(base64) {
    return toByteArray(base64)
}

export * from './system'
export * from './update'
export * from './debug'
export * from './performance'
export * from './crypto'
