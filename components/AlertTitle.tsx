import { ALERT_STATUS } from '@/constants/alert';
import { motion } from 'framer-motion';

const SuccessIcon = () => {
    return (
        <motion.div
            className="items-center align-center justify-center"
            style={{ width: 200, height: 200, borderRadius: '50%', background: 'lightgreen' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
            duration: 0.0001,
            ease: [0, 0.71, 0.2, 1.01],
                scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001
                }
            }}
            />
    )
}

interface AlertTitleProps {
    alertStatus: string,
}

const AlertTitle = ({ alertStatus }:AlertTitleProps) => {
    
    return (
        <div>
            { alertStatus === ALERT_STATUS.success && 
                <div className="flex flex-col">
                    <div className="w-full">
                        <SuccessIcon />
                    </div>
                    <div className="w-full">
                        <h4 className="text-black dark:text-white text-3xl font-extrabold">Success!</h4>
                    </div>
                </div>
            }
        </div>
    );

}

export default AlertTitle;