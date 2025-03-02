import { motion } from "framer-motion";

interface TextSizeIconProps {
    color?: string,
    size?: string,
    onClick?: () => void,
}

const TextSizeIcon = ({ size = "25px", onClick }:TextSizeIconProps) => (

  <motion.div whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >
    <svg
      version="1.1"
      className="fill-black dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      onClick={onClick}
      viewBox="0 0 325.495 325.496"
      xmlSpace="preserve"
      style={{ cursor: 'pointer' }}
    >
      <g>
        <g>
          <path d="M317.884,12.818c-0.062-5.479-4.521-9.889-10-9.889H10c-5.523,0-10,4.479-10,10v55c0,5.523,4.477,10,10,10h22.596
            c3.039,0,5.912-1.381,7.809-3.752l16.998-21.248h71.592v259.635c0,5.523,4.477,10,10,10h40c5.521,0,10-4.477,10-10V52.93h71.512
            l17.082,21.264c1.898,2.363,4.767,3.736,7.797,3.736h22.588c2.66,0,5.212-1.061,7.089-2.945c1.877-1.887,2.926-4.441,2.911-7.102
            L317.884,12.818z"/>
          <path d="M245.502,274.937c2.627,3.408,7.144,4.754,11.207,3.342l12.756-4.438l-0.002,38.723c0,2.652,1.053,5.197,2.928,7.072
            s4.421,2.93,7.072,2.93h9.992c5.521,0,10-4.479,10-10v-38.725l12.756,4.438c4.064,1.416,8.578,0.066,11.205-3.342
            c2.627-3.41,2.779-8.117,0.375-11.688l-31.035-46.113c-1.858-2.762-4.969-4.418-8.297-4.418s-6.438,1.656-8.295,4.418
            l-31.037,46.113C242.725,266.82,242.875,271.527,245.502,274.937z"/>
        </g>
      </g>
    </svg>
  </motion.div>
);

export default TextSizeIcon;
  