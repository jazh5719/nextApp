'use client'
import React, { useState, useCallback } from 'react'
const Page = () => {
    const [num, setNum] = useState<number>(0)

    // 所以提供 useCallback将函数注册到组件的render的外部
    console.log('每次都执行, 函数每次也都重新会销毁+注册')
    const addNum = () => {
        setNum(num + 1)
    }


    // 这个每次依赖都会变，所以每次返回的是依赖变更后的fn
    const addNum1 = useCallback(() => {
        setNum(num + 1)
    }, [num])

    // 这个理论上一直不会变，因此直接缓存
    const renderDiv = useCallback(() => {
        return <div>asdadas</div>
    }, [])
    return <div>
        {num}
        <button onClick={addNum}>点击</button>
        <button onClick={addNum1}>点击1</button>
        {renderDiv()}
    </div>
}


export default Page