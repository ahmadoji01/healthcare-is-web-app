import appConfig from "@/config";
import { authentication, createDirectus, realtime, rest, staticToken } from "@directus/sdk";
import { createClient } from 'graphql-ws';

export const directusClient = createDirectus(appConfig.API_HOST? appConfig.API_HOST : '')
            .with(authentication('cookie', { credentials: 'include' }))
            .with(rest({ credentials: 'include' }));

export const websocketClient = (accessToken:string) => { 
    return createDirectus(appConfig.WEBSOCKET_HOST? appConfig.WEBSOCKET_HOST : '')
            .with(staticToken(accessToken))
            .with(realtime());
}

export function imageHandler(id:string, fileName:string) {
    return appConfig.API_HOST + "/assets/" + id + "/" + fileName;
}