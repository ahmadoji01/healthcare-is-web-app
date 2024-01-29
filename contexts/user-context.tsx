import AlertModal from '@/components/Modal/AlertModal';
import { ALERT_STATUS } from '@/constants/alert';
import { Order } from '@/modules/orders/domain/order';
import { ordersFakeData } from '@/modules/orders/infrastructure/order.fakes';
import { PaymentMethod } from '@/modules/payment-methods/domain/payment-method';
import { User, defaultUser } from '@/modules/users/domain/user';
import { getUserMe } from '@/modules/users/domain/users.actions';
import { authentication, createDirectus } from '@directus/sdk';
import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface UserContextType {
    accessToken: string,
    user: User;
    setAccessToken: Dispatch<SetStateAction<string>>,
}

let EXPIRY_MS = 1000;

export const UserContext = createContext<UserContextType | null>({
    accessToken: "",
    user: defaultUser,
    setAccessToken: () => {},
});

const client = createDirectus('http://localhost:8055').with(authentication('cookie', { credentials: 'include' }));
 
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
        let interval = setInterval(async () => {
            await client.refresh().then( (res) => { 
                let token = res.access_token? res.access_token : '';
                let expiry = res.expires? res.expires : 0;
                setAccessToken(token);
                setExpiry(expiry);
                getUserMe(token).then(res => setUser({ id: res.id, first_name: res.first_name, last_name: res.last_name, avatar: res.avatar, username: res.username, role: res.role.name }));
                clearInterval(interval);
            });
        }, expiry);

        return () => clearInterval(interval);    
    }, [loading]);

    useEffect(() => {
        let interval = setInterval(async () => {
            await client.refresh().then( (res) => { 
                let token = res.access_token? res.access_token : '';
                let expiry = res.expires? res.expires : 0;
                setAccessToken(token);
                setExpiry(expiry);
            });
        }, 900000);

        return () => clearInterval(interval);    
    }, [expiry]);

    return (
        <UserContext.Provider value={{ accessToken, setAccessToken, user }}>
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