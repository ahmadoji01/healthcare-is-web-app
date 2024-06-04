import Link from "next/link";
import { useTranslation } from "react-i18next";

interface RegisterFinishedProps {
    queueNumber: string,
}

const RegisterFinished = ({ queueNumber }:RegisterFinishedProps) => {
    
    const {t} = useTranslation();

    return (
        <>
            <h5 className="gutter-bottom text-title-md font-bold text-black dark:text-white text-center mb-2">
                { t('front_desk.thank_you_input') }
            </h5>
            <p className="text-black dark:text-white text-center">
                { t('front_desk.your_queue_number') }
            </p>
            <h1 className="gutter-bottom text-title-lg font-bold text-black dark:text-white text-center">
                {queueNumber}
            </h1>
            <p className="text-black dark:text-white text-center">
                { t('front_desk.look_forward') }
            </p>
            <div className="flex justify-end mt-2 gap-x-2">
                <Link
                href="/operational/front-desk/patient-registration"
                className="flex flex-1 flex-col items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 gap-4">
                    { t('front_desk.print_ticket') }
                </Link>
            </div>
        </>
    )
}

export default RegisterFinished;