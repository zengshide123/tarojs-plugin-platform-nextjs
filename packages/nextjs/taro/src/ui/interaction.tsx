import React from 'react'
import ReactDOM from 'react-dom'

interface ToastProps {
    /**
     * Toast 图标
     */
    icon?: string

    /**
     * Toast 图标大小
     */
    iconSize?: number

    /**
     * Display toast
     */
    visible?: boolean

    /**
     * Toast 内容
     */
    children?: React.ReactNode
}

type ToastType = React.ComponentType<ToastProps>

let Toast: ToastType | null = null

let toastContainer: HTMLDivElement | null = null

let toastTimer: ReturnType<typeof setTimeout> | null = null

function destroyToast() {
    if (toastTimer) {
        clearTimeout(toastTimer)
        toastTimer = null
    }
    if (toastContainer) {
        ReactDOM.unmountComponentAtNode(toastContainer)
        toastContainer = null
    }
}

function newToast(props: ToastProps): void {
    if (!Toast) {
        if (process.env.NODE_ENV === 'development') {
            console.error('`Toast` component is not registered.')
        }
        return
    }
    destroyToast()
    toastContainer = document.createElement('div')
    document.body.appendChild(toastContainer)
    ReactDOM.render(
        <Toast visible {...props} />,
        toastContainer
    )
}

namespace showToast {
    export type Param = {
        /**
         * 提示的内容
         */
        title: string
        /**
         * 图标，有效值 "success", "loading", "none"
         *
         * **icon有效值：**
         *
         *   有效值    |  说明                                 | 最低版本
         * ------------|---------------------------------------|----------
         *   success   |显示成功图标，此时 title 文本最多显示 7 个汉字长度。默认值|
         *   loading   |显示加载图标，此时 title 文本最多显示 7 个汉字长度。|
         *   none      |不显示图标，此时 title 文本最多可显示两行|  1.9.0
         */
        icon?: 'success' | 'loading' | 'none'
        /**
         * 自定义图标的本地路径，image 的优先级高于 icon
         */
        image?: string
        /**
         * 提示的延迟时间，单位毫秒，默认：1500
         */
        duration?: number
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

export function registerToastComponent(Target: ToastType): void {
    Toast = Target
}

export function showToast({title, icon, duration = 1500}: showToast.Param) {
    newToast({
        icon: icon === 'none' ? undefined : icon,
        children: title
    })
    setTimeout(destroyToast, duration)
}

export const hideToat = destroyToast

namespace showLoading {
    export type Param = {
        /**
         * 提示的内容
         */
        title: string
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

export function showLoading({title = '正在加载...'}: showLoading.Param) {
    newToast({
        icon: 'loading',
        children: title
    })
}

export const hideLoading = destroyToast
