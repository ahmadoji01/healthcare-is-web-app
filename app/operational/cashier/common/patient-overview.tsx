import PatientAvatar from "./patient-avatar";


const PatientOverview = () => {
    return (
        <div className="rounded-sm border border-stroke p-6 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="grid grid-cols-2">
                <div>
                    <div className="w-full flex align-center justify-center mb-4">
                        <PatientAvatar name="Jedi Force" />
                    </div>
                    <h2 className="text-3xl text-center font-extrabold text-black dark:text-white mb-2">Jedi Force</h2>
                </div>
                <div className="grid gap-1 px-1 md:px-2 lg:px-3">
                    <div className="grid grid-cols-2 gap-1 text-black dark:text-white">
                        <div>Age</div>
                        <div className="text-left font-extrabold">22 y/o</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-black dark:text-white">
                        <div>Rep.</div>
                        <div className="text-left font-extrabold">Mr. Shane Fillan</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-black dark:text-white">
                        <div>Treated by</div>
                        <div className="text-left font-extrabold">dr. Tika Panggabean</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-black dark:text-white">
                        <div>Visit</div>
                        <div className="text-left font-extrabold">#12</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientOverview;