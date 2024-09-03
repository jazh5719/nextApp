'use client'
import React, { useRef } from 'react'
const Page = () => {
    const videoRef = useRef<any>()
    const time = useRef<number>(0)

    const videoPlay = () => {
        const el: HTMLVideoElement = videoRef.current
        el.play()
        time.current = Date.now()
    }
    const videoPause = () => {
        const el: HTMLVideoElement = videoRef.current
        el.pause()
        time.current = Date.now() - time.current
        console.log(time.current)
    }

    console.log('ref的变更不会导致重新渲染')

    return <div>
        <video
            controls
            ref={videoRef}
            style={{ height: '200px' }}
        >
            <source src='https://qimgs.qunarzz.com/dmf_ad_peri.H5.prod/moshadong2407-video.mp4' />
        </video>
        <div>
            <button onClick={videoPlay}>播放</button>
            <button onClick={videoPause}>暂停</button>
        </div>
    </div>
}


export default Page