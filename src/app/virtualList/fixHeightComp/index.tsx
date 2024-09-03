'use client'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import './index.css'
import { IDataItem } from '../contants'



const FixHeightComp = (props: IComp) => {
    const { list = [] } = props || {}
    const [showIndex, setShowIndex] = useState<number>(0)
    const scrollBoxRef = useRef(null)
    const itemHeight = 120  // 每一项的高度
    const [showLen, setShowLen] = useState<number>(0)  // 默认展示几项，应该根据最外层container的高度计算出来
    const [containerHeight, setHeight] = useState<number | string>(0) // 总高度

    const handleScroll = (len: number, slen: number) => {
        const dom: HTMLDivElement = (scrollBoxRef as any).current
        const startIndex = Math.floor(dom.scrollTop / itemHeight);
        if (startIndex > len - slen) return
        if (startIndex <= len) {
            setShowIndex(startIndex)
        }
    }

    useEffect(() => {
        const dom: HTMLDivElement = (scrollBoxRef as any).current
        return () => {
            dom.removeEventListener('scroll', handleScroll.bind(this, list.length, showLen));
        };
    }, [])



    // 获取数据之后
    useEffect(() => {
        if (list.length <= 0) return
        const dom: HTMLDivElement = (scrollBoxRef as any).current
        const domHeight = dom.offsetHeight || 0
        setShowLen(() => {
            const showLen = Math.floor(domHeight / itemHeight)
            handleScroll(list.length, showLen) // 初始渲染
            dom.addEventListener('scroll', handleScroll.bind(this, list.length, showLen));
            return showLen
        })

        setHeight(list.length * itemHeight)
    }, [list])


    // 要展示的列表数据
    const showList = useMemo(() => {
        return list.slice(showIndex, showIndex + showLen + 1)
    }, [showIndex, showLen])

    return <div
        className='container'
        ref={scrollBoxRef}
    >
        <div
            className='scrollBox'
            style={{
                height: containerHeight,
            }}>
            {
                showList.map(item => {
                    const { index, title, desc } = item
                    return <div
                        key={index}
                        className='itemBox'
                        style={{
                            top: index * itemHeight
                        }}
                    >
                        <div className='title'>
                            {index} - {title}
                        </div>

                        <div className='desc'>
                            {desc}
                        </div>

                    </div>
                })
            }
        </div>
    </div>
}
interface IComp {
    list: IDataItem[]
}
export default FixHeightComp