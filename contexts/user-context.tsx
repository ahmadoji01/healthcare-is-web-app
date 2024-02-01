import { User, defaultUser } from '@/modules/users/domain/user';
import { getUserMe } from '@/modules/users/domain/users.actions';
import { directusClient } from '@/utils/request-handler';
import { createContext, useContext, useEffect, useState } from 'react';
 
interface UserContextType {
    accessToken: string,
    user: User,
}

let EXPIRY_MS = 1000;

export const UserContext = createContext<UserContextType | null>({
    accessToken: "",
    user: defaultUser,
});
 
export const UserProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [accessToken, setAccessToken] = useState<string>("");
    const [expiry, setExpiry] = useState(1000);
    const [user, setUser] = useState(defaultUser);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.pathname == '/') {
            return;
        }

        let interval = setInterval(async () => {
            await directusClient.refresh().then( (res) => {
                if (res.access_token === null) {
                    window.location.href = '/';
                    return;
                }
                let token = res.access_token? res.access_token : '';
                let expiry = res.expires? res.expires : 0;
                setAccessToken(token);
                setExpiry(expiry);
                getUserMe(token).then(res => {
                    setUser({ id: res.id, first_name: res.first_name, last_name: res.last_name, avatar: res.avatar, username: res.username, role: res.role.name, organizationID: res.organization.id });
                });
                clearInterval(interval);
            }).catch( () => { 
                if (location.pathname !== '/') {
                    window.location.href = '/';
                }
                return; 
            });
        }, expiry);

        return () => clearInterval(interval);    
    }, [loading]);

    useEffect(() => {
        if (location.pathname == '/') {
            return;
        }

        let interval = setInterval(async () => {
            await directusClient.refresh().then( (res) => { 
                let token = res.access_token? res.access_token : '';
                let expiry = res.expires? res.expires : 0;
                setAccessToken(token);
                setExpiry(expiry);
            }).catch( () => { 
                if (location.pathname !== '/') {
                    window.location.href = '/';
                }
                return; 
            });
        }, 900000);

        return () => clearInterval(interval);    
    }, [expiry]);

    return (
        <UserContext.Provider value={{ accessToken, user }}>
            {children}
        </UserContext.Provider>
    );
};
 
export const useUserContext = () => {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the UserProvider');
    }
    
    return context;
};