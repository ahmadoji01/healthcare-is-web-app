import appConfig from "@/config";
import { authentication, createDirectus, realtime, rest, staticToken } from "@directus/sdk";
import { createClient } from 'graphql-ws';

export const directusClient = createDirectus('http://localhost:8055')
            .with(authentication('cookie', { credentials: 'include' }))
            .with(rest({ credentials: 'include' }));

export const websocketClient = (accessToken:string) => { 
    return createDirectus('ws://localhost:8055/websocket')
            .with(staticToken(accessToken))
            .with(realtime());
}

export const graphQLClient = (accessToken:string) => {
    return createClient({
        url: 'ws://localhost:8055/graphql',
        keepAlive: 30000,
        connectionParams: async () => {
            return { access_token: accessToken };
        },
    });
}

export function imageHandler(id:string, fileName:string) {
    return appConfig.API_HOST + "/assets/" + id + "/" + fileName;
}