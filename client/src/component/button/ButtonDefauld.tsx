
import { motion } from "framer-motion"
type NavItemProps = {
    text: string;
    width: string,
    height: string,
    text_size: number,
    text_color?: string,
    border_color?: string,
    border_radius?: number,
    haveMotion?: boolean
    onClick?: () => void
};

function ButtonDefauld({ text, width, height, text_size, text_color, border_color, border_radius, haveMotion = false, onClick }: NavItemProps) {
    return (
        <motion.button
            whileHover={haveMotion ? { scale: 1.1, rotate: 1 } : {}}
            transition={haveMotion ? { type: "spring", stiffness: 300 } : {}}
            onClick={onClick}
            style={{
                fontSize: text_size,
                width: width ?? "full",
                height: height,
                color: text_color,
                borderColor: border_color ?? "black",
                borderRadius: border_radius ?? 20
            }}
            className={` font-semibold border-[1px] text-center   bg-primary-blue-ribbon hover:cursor-pointer`}
        >
            {text}
        </motion.button>
    )
}

export default ButtonDefauld