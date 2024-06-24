const MiniSpinner = ({ size = 12 }) => {
    return (
        <span className="flex items-center justify-center"> 
            <div className={`h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-meta-3 border-t-transparent`}></div>
        </span>
    )
}

export default MiniSpinner;