import { authentication, createDirectus, rest } from "@directus/sdk";

export const directusClient = createDirectus('http://localhost:8055')
            .with(authentication('cookie', { credentials: 'include' }))
            .with(rest({ credentials: 'include' }));
