import { useEffect, useRef } from 'react'
import { debounce } from '@/utils'

const useWaterMark = (propsText: string) => {
    const styleStr = useRef('')
    const waterMarkId = useRef(`waterMark_${Date.now()}`)
    const observer: any = useRef()


    useEffect(() => {
        initWatermark(propsText)
        observerDom()
        return () => {
            observer?.current?.disconnect()
        }
    }, [])

    const observerDom = () => {
        setTimeout(() => {
            if (!observer.current) {
                observer.current = new MutationObserver(debounce(this, () => {
                    const wmInstance: Element | null = document.querySelector(`.${waterMarkId.current}`)
                    if (!wmInstance) {
                        createWatermark()
                        return
                    }
                    if (wmInstance && wmInstance.getAttribute('style') !== styleStr.current) {
                        createWatermark()
                    }
                }))
            }
            observer?.current?.observe(document.body, {
                childList: true, // 观察目标子节点的变化，是否有添加或者删除
                attributes: true, // 观察属性变动
                subtree: true // 观察后代节点，默认为 false
            })
        }, 300)
    }
    const initWatermark = async (markText?: string) => {
        // 创建一个canvas元素
        const canvas = document.createElement('canvas')

        // 将canvas元素添加到DOM中
        document.body.appendChild(canvas)

        // 设置canvas的宽高
        canvas.setAttribute('style', `width:200px; height:200px; position:absolute; opacity: 0`)

        // 获取canvas的2d绘图上下文
        const ctx = canvas.getContext('2d');
        if (!ctx) return

        // 设置文本内容、字体、阴影和颜色
        const text = markText || "水印logo";
        ctx.font = "60px emoji";
        ctx.shadowColor = "rgba(0, 0, 0, 1)";
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 5;

        // 将绘图原点移动到canvas中心
        ctx.translate(canvas.width / 2, canvas.height / 2);
        // 旋转canvas 45度
        ctx.rotate(Math.PI / 8);
        // 在旋转后的canvas上绘制文本
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);

        // 将canvas内容转换为DataURL
        const base64Img = canvas.toDataURL('image/png')
        styleStr.current = `position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.05; z-index:999; pointer-events:none; background-image:url(${base64Img}); background-size:300px auto;`
        // 删除canvas
        canvas.remove()
        createWatermark()
    };


    // 创建一个dom元素并且把他添加到body中
    const createWatermark = () => {
        // 先把原来的删掉
        document.querySelector(`.${waterMarkId.current}`)?.remove()
        if (!document.querySelector(`.${waterMarkId.current}`)) {
            const div = document.createElement('div')
            div.setAttribute('style', styleStr.current)
            div.setAttribute('class', waterMarkId.current)
            document.body.appendChild(div)
        }
    }

    // 更新水印
    const updateWateMark = (text: string) => {
        observer?.current?.disconnect()
        initWatermark(text)
        observerDom()
    }
    return [updateWateMark]
}


export default useWaterMark