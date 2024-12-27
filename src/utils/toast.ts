import {  toast } from 'react-toastify';
import { toastEnum } from './enums';
export const toastHelper = (message:string, type:toastEnum) => {
    if(type == toastEnum.SUCCESS) {
        toast.success(message);
    } else if(type == toastEnum.ERROR) {
        toast.error(message);
    }
}
