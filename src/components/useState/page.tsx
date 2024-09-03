'use client'
import React, { useState } from 'react'


const UseStatePage = () => {
    const [num, setNum] = useState<number>(0)
    const handleClick = () => {
        setNum(num + 1)
    }
    return <div>
        {num}
        <button onClick={handleClick}>点击</button>
    </div>
}

export default UseStatePage