export interface ITodo {
    id: number;
    content: string;
    isDone: boolean;
}

export enum TAB_KEY {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed'
}
export enum TAB_LABEL {
    ALL = '全部',
    ACTIVE = '未完成',
    COMPLETED = '已完成'
}

interface ITAB_LIST {
    key: TAB_KEY;
    label: string;
}
export const TAB_LIST: ITAB_LIST[] = [
    {
        key: TAB_KEY.ALL,
        label: TAB_LABEL.ALL
    },
    {
        key: TAB_KEY.ACTIVE,
        label: TAB_LABEL.ACTIVE
    },
    {
        key: TAB_KEY.COMPLETED,
        label: TAB_LABEL.COMPLETED
    }
]