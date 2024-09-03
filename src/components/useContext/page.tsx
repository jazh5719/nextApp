'use client'
import React, { createContext, useState, useContext, useEffect } from "react"

interface IStore {
    test: number
}
const store: IStore = {
    test: 1
}
const rootContext = createContext(store)

const Page = () => {
    const [state, setState] = useState<IStore>(store)
    const handleClick = () => {
        setState({ test: state.test + 1 })
    }
    return <rootContext.Provider value={state}>
        <div>
            root <button onClick={handleClick}>点击</button>
        </div>
        <Child0 />
    </rootContext.Provider>
}

export default Page



const Child0 = () => {
    return <div>
        <div>child0</div>
        <Child1 />
    </div>
}


const Child1 = () => {
    return <div>
        <div>child1</div>
        <Child2 />
    </div>
}

const Child2 = () => {
    const rootState: IStore = useContext(rootContext)
    return <div>
        <div>child2{rootState.test}</div>
    </div>
}