import Link from "next/link"

interface ExaminationTimeProps {
    handleNext: () => void,
}

const ExaminationTime = ({ handleNext }: ExaminationTimeProps) => {
    return (
        <>
            <div className="flex justify-end mt-2">
                <Link
                    href="#"
                    onClick={handleNext}
                    className="flex-1 grow items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Wait Until Called
                </Link>
            </div>
            <div className="flex justify-end mt-2">
                <Link
                    href="#"
                    onClick={handleNext}
                    className="flex-1 grow items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Examine Later
                </Link>
            </div>
        </>
    )
}

export default ExaminationTime;