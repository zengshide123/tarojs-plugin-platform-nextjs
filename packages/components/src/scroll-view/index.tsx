import React, {useImperativeHandle, useRef, useEffect, forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps, TaroScrollEvent} from '../_util/types'

export interface ScrollViewProps extends BaseProps {
    /**
     * 允许横向滚动
     * @default false
     */
    scrollX?: boolean

    /**
     * 允许纵向滚动
     * @default false
     */
    scrollY?: boolean

    /**
     * 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
     * @default 50
     */
    upperThreshold?: number

    /**
     * 距底部/右边多远时（单位px），触发 scrolltolower 事件
     * @default 50
     */
    lowerThreshold?: number

    /**
     * 设置竖向滚动条位置
     */
    scrollTop?: number

    /**
     * 设置横向滚动条位置
     */
    scrollLeft?: number

    /**
     * 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
     */
    scrollIntoView?: string

    /**
     * 在设置滚动条位置时使用动画过渡
     * @default false
     */
    scrollWithAnimation?: boolean

    /**
     * iOS 点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
     * @default false
     */
    enableBackToTop?: boolean

    /**
     * 滚动到顶部/左边，会触发 scrolltoupper 事件
     */
    onScrollToUpper?: (event: TaroScrollEvent) => void

    /**
     * 滚动到底部/右边，会触发 scrolltolower 事件
     */
    onScrollToLower?: (event: TaroScrollEvent) => void

    /**
     * 滚动时触发
     * `event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}`
     */
    onScroll?: (event: TaroScrollEvent) => void

}

const ScrollView: React.ForwardRefRenderFunction<HTMLDivElement, ScrollViewProps> = ({
    className,
    style,
    scrollX,
    scrollY,
    // upperThreshold = 50,
    // lowerThreshold = 50,
    // scrollTop,
    // scrollLeft,
    // scrollIntoView,
    // scrollWithAnimation,
    // enableBackToTop,
    children,
    // onScrollToUpper,
    // onScrollToLower,
    onScroll
}, ref) => {
    const el = useRef<HTMLDivElement | null>(null)
    const lastTop = useRef(0)
    const lastLeft = useRef(0)

    useImperativeHandle(ref, () => el.current!)

    useEffect(() => {
        if (el.current) {
            lastTop.current = el.current.scrollTop
            lastLeft.current = el.current.scrollLeft
        }
    }, [])

    function getTaroScrollEvent(uiEvent: React.UIEvent) {
        const {
            timeStamp,
            target,
            currentTarget,
            preventDefault,
            stopPropagation
        } = uiEvent
        const {scrollLeft, scrollTop, scrollHeight, scrollWidth} = target as HTMLDivElement
        const taroEvent: TaroScrollEvent = {
            type: 'tap',
            timeStamp,
            target,
            currentTarget,
            detail: {
                scrollLeft,
                scrollTop,
                scrollHeight,
                scrollWidth,
                deltaX: lastLeft.current - scrollLeft,
                deltaY: lastTop.current - scrollTop
            },
            preventDefault,
            stopPropagation
        }
        lastTop.current = scrollTop
        lastLeft.current = scrollLeft
        return taroEvent
    }

    return (
        <div
            ref={el}
            className={classNames(
                'taro-scroll',
                {
                    [`taro-scroll-view__scroll-x`]: scrollX,
                    [`taro-scroll-view__scroll-y`]: scrollY
                },
                className
            )}
            style={style}
            onScroll={uiEvent => {
                if (onScroll) {
                    const taroEvent = getTaroScrollEvent(uiEvent)
                    onScroll(taroEvent)
                }
            }}
        >
            {children}
        </div>
    )
}

export default forwardRef(ScrollView)