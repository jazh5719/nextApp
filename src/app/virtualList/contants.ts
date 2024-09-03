
export interface IDataItem {
    title: string,
    desc: string,
    img: string,
    index: number
}

export interface IDataRes {
    code: number,
    data: IDataItem[]
}

export enum RES_CODE {
    SUCCESS = 1,
    ERROR = 0
}