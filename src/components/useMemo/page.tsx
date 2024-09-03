'use client'
import React, { useState, useMemo } from 'react'
const Page = () => {
    const [num, setNum] = useState<number>(0)
    const [num1, setNum1] = useState<number>(0)

    const addNum = () => {
        setNum(num + 1)
    }

    // 只有依赖变更时才会重新计算，否则就用缓存
    const data = useMemo(() => {
        console.log('依赖变更，重新计算 或者首次是首次计算')
        return num + 11111111111
    }, [num])

    return <div>
        <div>{num}</div>
        <button onClick={addNum}>点击</button>
        <div>{num1}</div>
        <button onClick={() => { setNum1(num1 + 1) }}>点击1</button>

        {data}
    </div>
}


export default Page