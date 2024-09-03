import { IDataItem, IDataRes } from './contants'
export const fetchData = (isFix: boolean): Promise<IDataRes> => {
    return new Promise(resolve => {
        const dataList: IDataItem[] = []
        for (let i = 0; i < 20; i++) {
            const title = '我是标题'
            const desc = '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
            const img = 'https://qimgs.qunarzz.com/dmf_ad_peri.H5.prod/moshadong2407-2.png'
            if (isFix) {
                dataList.push({ title, desc, img, index: i })
            } else {
                if (i % 3 === 0) {
                    dataList.push({
                        title,
                        desc: `${desc}${desc}${desc}`,
                        img,
                        index: i
                    })
                } else {
                    dataList.push({ title, desc, img, index: i })
                }
            }

        }
        setTimeout(() => {
            resolve({
                data: dataList,
                code: 1
            })
        }, 500)
    })
}