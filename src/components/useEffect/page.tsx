'use client'
import React, { useState, useEffect, memo } from 'react'
const UseEffectComp = () => {
    const [num, setNum] = useState<number>(0)
    const [num1, setNum1] = useState<number>(0)
    // 只执行一次
    useEffect(() => {
        console.log('useEffect')
    }, [])

    return <div>
        <Child num={num} />
        <button onClick={() => { setNum(num + 1) }}>点击</button>

        <div>
            {num1}
            <button onClick={() => { setNum1(num1 + 1) }}>点击</button>
        </div>
    </div>
}


export default UseEffectComp

interface IChild {
    num: number
}
const Child = memo(function ChildInter(props: IChild) {
    console.log('子组件渲染')
    useEffect(() => {
        console.log('useEffect变更了')
    }, [props.num])
    return <div>{props.num}</div>
})
