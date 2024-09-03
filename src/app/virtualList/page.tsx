'use client'
import React, { useState, useEffect } from 'react'
import { fetchData } from './utils'
import { IDataItem, RES_CODE } from './contants'
import FixHeightComp from './fixHeightComp'
import AutoHeightComp from './autoHeightComp'
import { Switch, Spin } from 'antd'
const VirtualList = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [isFix, setAuto] = useState<boolean>(true)
    const [list, setList] = useState<IDataItem[]>([])
    useEffect(() => {
        getDate()
    }, [])
    const getDate = async () => {
        try {
            setLoading(true)
            const res = await fetchData(isFix)
            const { code, data = [] } = res || {}

            if (code === RES_CODE.SUCCESS) {
                setList(data)
            }
        } catch (err) {
            console.log("🚀 ~ getDate ~ err:", err)
        } finally {
            setLoading(false)
        }

    }

    const swiChange = async () => {
        await getDate()
        setAuto(!isFix)
    }

    return <div style={{ height: '100%' }}>
        <Spin spinning={loading}>
            <Switch checked={isFix} onChange={() => swiChange()} checkedChildren="fix" unCheckedChildren="auto" />
        </Spin>

        {
            isFix ? <FixHeightComp list={list} /> : <AutoHeightComp list={list} />
        }
    </div>
}

export default VirtualList