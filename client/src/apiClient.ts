/// <reference types="vite/client" />

import {Api} from './Api.ts';
const baseUrl = import.meta.env.VITE_APP_BASE_API_URL

export const apiClient = new Api({
    baseURL: baseUrl,
    headers: {
        "Prefer": "return=representation"
    }
});

interface ImportMetaEnv {
    readonly VITE_APP_BASE_API_URL: string
}
