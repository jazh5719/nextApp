// 防抖
export const debounce = (context: any = this, fn: Function, delay: number = 300) => {
    let timer: any = null;
    return function (...args: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn && fn.apply(context, args);
        }, delay);
    }
}