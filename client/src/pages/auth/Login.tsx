import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Login() {
  return (
    <div className="h-[1000px]">
      <div className="relative mx-auto grid h-32 w-96 place-content-center">
        <h1 className="relative z-0 text-3xl font-black uppercase">
          Show me on scroll
        </h1>
        <motion.div
          initial={{
            opacity: 1,
          }}
          whileInView={{
            opacity: 0,
          }}
          viewport={{
            // once: true,
            // margin: "-200px",
            amount: "all",
          }}
          onViewportEnter={() => console.log("Enter!")}
          onViewportLeave={() => console.log("Exit!")}
          className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-indigo-500"
        />
      </div>
    </div>
  );
}

export default Login