import { ALERT_STATUS } from '@/constants/alert';
import { motion } from 'framer-motion';
import CheckmarkIcon from './Icons/CheckmarkIcon';
import CrossmarkIcon from './Icons/CrossmarkIcon';
import { useEffect, useState } from 'react';

const SuccessIcon = () => {
    return (
        <motion.div
            className="items-center align-center justify-center"
            style={{ width: 200, height: 200, borderRadius: '50%', background: 'lightgreen', margin: 'auto' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
            duration: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
                scale: {
                    type: "spring",
                    damping: 4,
                    stiffness: 100,
                    restDelta: 0.0001
                }
            }}
        >
            <CheckmarkIcon />
        </motion.div>
    )
}

const FailedIcon = () => {
    return (
        <motion.div
            className="items-center align-center justify-center"
            style={{ width: 200, height: 200, borderRadius: '50%', background: 'red', margin: 'auto' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
            duration: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
                scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001
                }
            }}
        >
            <CrossmarkIcon />
        </motion.div>
    )
}

function renderIcon(status:string) {
    switch (status) {
        case ALERT_STATUS.success:
            return <SuccessIcon />
        case ALERT_STATUS.failed:
            return <FailedIcon />
        default:
            return <SuccessIcon />
    }
}

interface AlertTitleProps {
    alertStatus: string,
}

const AlertTitle = ({ alertStatus }:AlertTitleProps) => {
    
    const [title, setTitle] = useState<string>("");

    useEffect( () => {
        if (alertStatus === ALERT_STATUS.success) {
            setTitle("Success!");
            return;
        }
        if (alertStatus === ALERT_STATUS.failed) {
            setTitle("Oops, something went wrong!");
            return;
        }
    })

    return (
        <div>
            <div className="flex flex-col">
                <div className="w-full">
                    { renderIcon(alertStatus) }
                </div>
                <div className="w-full">
                    <h4 className="text-black dark:text-white text-3xl font-extrabold text-center">{ title }</h4>
                </div>
            </div>
        </div>
    );

}

export default AlertTitle;