import { User, defaultUser } from '@/modules/users/domain/user';
import { getUserMe } from '@/modules/users/domain/users.actions';
import { directusClient } from '@/utils/request-handler';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface UserContextType {
    accessToken: string,
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    refreshToken: () => void,
}

let EXPIRY_MS = 1000;

export const UserContext = createContext<UserContextType | null>({
    accessToken: "",
    user: defaultUser,
    setUser: () => {},
    refreshToken: () => {},
});
 
export const UserProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [accessToken, setAccessToken] = useState<string>("");
    const [expiry, setExpiry] = useState(50);
    const [user, setUser] = useState(defaultUser);
    const [loading, setLoading] = useState(false);

    const refreshToken = async () => {
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
            if (location.pathname === '/') {
                window.location.href = '/dashboard';
            }
            setLoading(false);
        }).catch( err => { 
            if (location.pathname !== '/' && (err.response.status !== 401 || err.response.status === 403)) {
                window.location.href = '/';
            }
            setLoading(false);
            return; 
        });
    }

    useEffect(() => {
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
                if (location.pathname === '/') {
                    window.location.href = '/dashboard';
                }
                setLoading(false);
                clearInterval(interval);
            }).catch( err => { 
                if (location.pathname !== '/' && (err.response.status !== 401 || err.response.status === 403)) {
                    window.location.href = '/';
                }
                setLoading(false);
                clearInterval(interval);
                return; 
            });
        }, expiry);

        return () => clearInterval(interval);    
    }, [loading]);

    useEffect(() => {
        let interval = setInterval(async () => {
            await directusClient.refresh().then( (res) => { 
                let token = res.access_token? res.access_token : '';
                let expiry = res.expires? res.expires : 0;
                setAccessToken(token);
                setExpiry(expiry);
                getUserMe(token).then(res => {
                    setUser({ id: res.id, first_name: res.first_name, last_name: res.last_name, avatar: res.avatar, username: res.username, role: res.role.name, organizationID: res.organization.id });
                });
                if (location.pathname === '/') {
                    window.location.href = '/dashboard';
                }
            }).catch( err => { 
                if (location.pathname !== '/' && (err.response.status === 401 || err.response.status === 403)) {
                    window.location.href = '/';
                }
                return; 
            });
        }, 900000);

        return () => clearInterval(interval);    
    }, [expiry]);

    return (
        <UserContext.Provider value={{ accessToken, user, setUser, refreshToken }}>
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