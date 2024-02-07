"use client";
import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/Dashboard/Loader";

import Sidebar from "./common/sidebar";
import Header from "@/components/Dashboard/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import { Doctor, doctorMapper } from "@/modules/doctors/domain/doctor";
import { getAllDoctors } from "@/modules/doctors/domain/doctors.actions";
import { useUserContext } from "@/contexts/user-context";
import { DoctorProvider } from "@/contexts/doctor-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState(createTheme({ palette: { mode: "light" } }));
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const {accessToken} = useUserContext();

  useEffect(() => {
    const onStorageChange = () => {
      const item = localStorage.getItem("color-theme");
      const colorTheme = item ? JSON.parse(item) : "light";
      setTheme(createTheme({ palette: { mode: colorTheme } }));
    }
    window.addEventListener('storage', onStorageChange);

    getAllDoctors(accessToken, 1).then( res => { 
      let docs:Doctor[] = [];
      res?.map( (doctor) => { docs.push(doctorMapper(doctor)); });
      setDoctors(docs);
      setDataLoaded(true);
    })
  }, []);

  return (
    <html lang="en">
      <DoctorProvider>
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex h-screen overflow-hidden">
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  <ThemeProvider theme={theme} >
                    <main>
                      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" style={ { touchAction: 'none' } }>
                        {children}
                      </div>
                    </main>
                  </ThemeProvider>
                </div>
              </div>
            )}
          </div>
        </body>
      </DoctorProvider>
    </html>
  );
}