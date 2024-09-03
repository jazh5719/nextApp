'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Breadcrumb, Row, Col } from 'antd';
import { MouseEventHandler, useEffect, useState } from 'react'
import './index.css'
import useWaterMark from '@/hooks/useWaterMark'


interface IPage {
    title: string,
    path?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>
}

const Header = () => {
    const router = useRouter()
    const [updateWateMark] = useWaterMark('jazh')

    const initPage: IPage = {
        title: '首页',
        path: '/',
        onClick: () => {
            router.back()
        }
    }
    const [routeList, setList] = useState<IPage[]>([initPage])
    const path: string = usePathname()
    useEffect(() => {
    }, [])

    useEffect(() => {
        if (path !== initPage.path) {
            setList([
                initPage,
                {
                    title: path.split('/')[1],
                }
            ])
        } else {
            setList([initPage])
        }
    }, [path])
    return <Row className="headerBox" align='middle'>
        <Col span={24}>
            <Breadcrumb rootClassName='header' items={routeList} />
        </Col>
    </Row>
}

export default Header