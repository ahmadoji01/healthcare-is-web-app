import defaultAvatar from "@/public/images/avatar-256.jpg";

export const AvatarURL = (url:string) => {
    if (url === "") {
        return defaultAvatar.src;
    }
    return url;
}

export const LogoURL = (url:string) => {
    if (url === "") {
        return defaultAvatar.src;
    }
    return url;
}