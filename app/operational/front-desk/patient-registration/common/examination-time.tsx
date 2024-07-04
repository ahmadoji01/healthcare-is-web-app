import { VISIT_STATUS } from "@/modules/visits/domain/visit.constants";
import { useTranslations } from "next-intl";
import Link from "next/link"
import { Dispatch, SetStateAction } from "react";

interface ExaminationTimeProps {
    handleNext: () => void,
    setVisitStatus: Dispatch<SetStateAction<string>>,
}

const ExaminationTime = ({ handleNext, setVisitStatus }: ExaminationTimeProps) => {

    const t = useTranslations();

    return (
        <>
            <div className="flex justify-end mt-2">
                <Link
                    href="#"
                    onClick={ () => {handleNext(); setVisitStatus(VISIT_STATUS.waiting); }}
                    className="flex-1 grow items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    { t('front_desk.wait') }
                </Link>
            </div>
            <div className="flex justify-end mt-2">
                <Link
                    href="#"
                    onClick={ () => {handleNext(); setVisitStatus(VISIT_STATUS.temporary_leave); }}
                    className="flex-1 grow items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    { t('front_desk.leave') }
                </Link>
            </div>
        </>
    )
}

export default ExaminationTime;