import { faCircleCheck, faCircleXmark, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion"

type StatisticsResultType = {
    status: boolean,
    number: number,
    content: string,
    minus?: boolean
}

function StatisticsResult({ status, content, number, minus }: StatisticsResultType) {

    const getIcon = (status: boolean) => {
        if (minus) {
            return (<FontAwesomeIcon color='#71869d' fontSize={"23px"} icon={faMinusCircle} />)

        }
        if (status)
            return (<FontAwesomeIcon color='#3cb46e' fontSize={"23px"} icon={faCircleCheck} />)
        return (<FontAwesomeIcon color='#e43a45' fontSize={"23px"} icon={faCircleXmark} />)
    }

    return (
        <motion.div
            className="w-[272px] h-[165px] mt-[20px] flex flex-col mb-[16px] items-center justify-start py-[24px] px-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] border border-[#efefef] rounded-[10.5px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                {getIcon(status)}
            </motion.div>

            <motion.div
                className={`font-semibold ${status ? (minus ? "text-[#71869d]" : "text-[#3cb46e]") : "text-[#e43a45]"
                    }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                {content}
            </motion.div>

            <motion.div
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
            >
                {number}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
            >
                Câu hỏi
            </motion.div>
        </motion.div>
    )
}

export default StatisticsResult