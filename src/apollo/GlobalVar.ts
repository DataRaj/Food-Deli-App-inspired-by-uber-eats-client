import {makeVar} from '@apollo/client';
const token = localStorage.getItem('token');
export const isLoginVar = makeVar(Boolean(token));

export const basketItem: any = JSON.parse(sessionStorage.getItem('basket') || 'null');

export const basketItemVar = makeVar(basketItem);
export const isBasketItemVar = makeVar(Boolean(basketItem));

export const authToken = makeVar(token);
export const isDarkVar = makeVar(Boolean(localStorage.getItem('dark')));
