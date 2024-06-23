import { Organization, defaultOrganization, organizationMapper } from '@/modules/organizations/domain/organization';
import { getOrganization } from '@/modules/organizations/domain/organizations.actions';
import { User, defaultUser, userMapper } from '@/modules/users/domain/user';
import { getUserMe } from '@/modules/users/domain/users.actions';
import { directusClient } from '@/utils/request-handler';
import { useRouter, usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
 
interface UserContextType {
    accessToken: string,
    user: User,
    loading: boolean,
    organization: Organization,
    fontSize: string,
    setUser: Dispatch<SetStateAction<User>>,
    setOrganization: Dispatch<SetStateAction<Organization>>,
    setFontSize: Dispatch<SetStateAction<string>>,
    fetchOrganization: () => void,
}

let EXPIRY_MS = 1000;

export const UserContext = createContext<UserContextType | null>({
    accessToken: "",
    user: defaultUser,
    loading: false,
    organization: defaultOrganization,
    fontSize: "100%",
    setUser: () => {},
    setOrganization: () => {},
    setFontSize: () => {},
    fetchOrganization: () => {},
});
 
export const UserProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const [accessToken, setAccessToken] = useState<string>("");
    const [expiry, setExpiry] = useState(50);
    const [user, setUser] = useState(defaultUser);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState("100%");
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
                let usr = defaultUser;
                usr = userMapper(res);
                setUser(usr);
            }).catch( () => {
                if (location.pathname !== '/') {
                    router.push('/');
                }
                return;
            });
            fetchOrganization();

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

    const fetchOrganization = () => {
        getOrganization(accessToken, 1).then( res => {
            if (res.length < 1) {
                return;
            }
            setOrganization(organizationMapper(res[0]));
        })
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
        let localFontSize = localStorage.getItem("font-size");
        if (localFontSize !== null) {
            setFontSize(localFontSize);
        }
    }, []);
    
    useEffect(() => {
        fetchOrganization();
    }, [pathname])

    return (
        <UserContext.Provider value={{ accessToken, user, setUser, organization, setOrganization, loading, fontSize, setFontSize, fetchOrganization }}>
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