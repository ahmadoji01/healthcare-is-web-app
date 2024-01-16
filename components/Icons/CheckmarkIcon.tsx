import { motion } from 'framer-motion';

const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)"
    }
}

const CheckmarkIcon = () => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="225" height="200" viewBox="85 145 450 400"
            >
            <motion.path
                style={{ fillRule: 'evenodd', stroke: 'none', strokeWidth: '1px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeOpacity: 1 }}
                variants={icon}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
                d="M 508.74477,226.99015 C 459.42189,193.17234 436.08559,163.59563 436.08559,163.59563 C 344.99984,217.26626 248.26757,407.83719 248.26757,407.83719 C 202.93454,344.01939 157.35384,326.21932 157.35384,326.21932 C 136.86236,353.60112 101.54091,390.09316 101.54091,390.09316 C 183.924,412.28062 253.07323,493.70015 253.07323,493.70015 C 402.5571,259.01322 508.74477,226.99015 508.74477,226.99015 z "
                />
            <motion.path
                style={{opacity: 0.27777782, fillRule: 'evenodd', stroke: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeOpacity: 1}}
                variants={icon}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
                d="M 518.74479,227.27587 C 469.42191,193.45806 446.08561,163.88135 446.08561,163.88135 C 354.99986,217.55198 258.26759,408.12291 258.26759,408.12291 C 212.93456,344.30511 167.35386,326.50504 167.35386,326.50504 C 146.86238,353.88684 111.54093,390.37888 111.54093,390.37888 C 193.92402,412.56634 263.07325,493.98587 263.07325,493.98587 C 412.55712,259.29894 518.74479,227.27587 518.74479,227.27587 z "
                />
        </svg>
    )

}

export default CheckmarkIcon;