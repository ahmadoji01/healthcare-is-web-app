import Link from "next/link";

interface RegisterFinishedProps {
    queueNumber: string,
}

const RegisterFinished = ({ queueNumber }:RegisterFinishedProps) => {
    return (
        <>
            <h5 className="gutter-bottom text-title-md font-bold text-black dark:text-white text-center mb-2">
                Thank you for your input.
            </h5>
            <p className="text-black dark:text-white text-center">
                Your queue number is
            </p>
            <h1 className="gutter-bottom text-title-lg font-bold text-black dark:text-white text-center">
                {queueNumber}
            </h1>
            <p className="text-black dark:text-white text-center">
                We look forward to serving you soon
            </p>
            <div className="flex justify-end mt-2 gap-x-2">
                <Link
                href="/operational/front-desk/patient-registration"
                className="flex flex-1 flex-col items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 gap-4">
                    Print Ticket
                </Link>
            </div>
        </>
    )
}

export default RegisterFinished;