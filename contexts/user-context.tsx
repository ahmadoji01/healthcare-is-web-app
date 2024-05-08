import { Organization, defaultOrganization, organizationMapper } from '@/modules/organizations/domain/organization';
import { getOrganization } from '@/modules/organizations/domain/organizations.actions';
import { User, defaultUser } from '@/modules/users/domain/user';
import { getUserMe } from '@/modules/users/domain/users.actions';
import { directusClient } from '@/utils/request-handler';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface UserContextType {
    accessToken: string,
    user: User,
    loading: boolean,
    organization: Organization,
    setUser: Dispatch<SetStateAction<User>>,
    setOrganization: Dispatch<SetStateAction<Organization>>,
}

let EXPIRY_MS = 1000;

export const UserContext = createContext<UserContextType | null>({
    accessToken: "",
    user: defaultUser,
    loading: false,
    organization: defaultOrganization,
    setUser: () => {},
    setOrganization: () => {},
});
 
export const UserProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string>("");
    const [expiry, setExpiry] = useState(50);
    const [user, setUser] = useState(defaultUser);
    const [loading, setLoading] = useState(true);
    const [organization, setOrganization] = useState(defaultOrganization);

    const refreshToken = async (interval:NodeJS.Timeout, isLooping:boolean) => {
        await directusClient.refresh().then( (res) => {
            if (res.access_token === null) {
                router.push('/');
                return;
            }
            let token = res.access_token? res.access_token : '';
            let expiry = res.expires? res.expires : 0;
            setAccessToken(token);
            setExpiry(expiry);
            getUserMe(token).then(res => {
                setUser({ id: res.id, first_name: res.first_name, last_name: res.last_name, avatar: res.avatar, username: res.username, role: res.role.name, organizationID: res.organization.id });
                setOrganization(organizationMapper(res.organization));
            }).catch( () => {
                if (location.pathname !== '/') {
                    router.push('/');
                }
                return;
            });

            if (location.pathname === "/" && window.history.length == 2) {
                router.push("/dashboard");
            }
            if (location.pathname === "/" && window.history.length > 2) {
                router.back();
            }
            
            setLoading(false);
            if (!isLooping)
                clearInterval(interval);
            return;
        }).catch( err => {
            if (location.pathname !== '/' && (err.response.status === 400 || err.response.status === 401 || err.response.status === 403)) {
                router.push("/");
            }
            setLoading(false);
            clearInterval(interval);
            return; 
        });
    }

    useEffect(() => {
        let interval = setInterval(async () => {
            refreshToken(interval, false);
        }, 100);

        return () => clearInterval(interval);    
    }, [loading]);

    useEffect(() => {
        let interval = setInterval(async () => {
            refreshToken(interval, true);
        }, 900000);

        return () => clearInterval(interval);    
    }, []);

    useEffect(() => {
        getOrganization(accessToken, 1).then( res => {
            if (res.length < 1) {
                return;
            }
            setOrganization(organizationMapper(res[0]));
        })
    }, [organization])

    return (
        <UserContext.Provider value={{ accessToken, user, setUser, organization, setOrganization, loading }}>
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