'use client';

import { useEffect, useState } from "react";
import { createTheme } from "@mui/material";

const useMUIColorTheme = () => {
    const [theme, setTheme] = useState(createTheme({ palette: { mode: "light" } }));

    useEffect(() => {
        const item = localStorage.getItem("color-theme");
        const colorTheme = item ? JSON.parse(item) : "light";
        setTheme(colorTheme);

        const onStorageChange = () => {
            const item = localStorage.getItem("color-theme");
            const colorTheme = item ? JSON.parse(item) : "light";
            setTheme(createTheme({ palette: { mode: colorTheme } }));
        }
        window.addEventListener('storage', onStorageChange);
    }, []);

    return theme;
};

export default useMUIColorTheme;