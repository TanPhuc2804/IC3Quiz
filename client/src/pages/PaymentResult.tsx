import { Button, Result } from 'antd'
import axios from 'axios';
import  { useEffect, useState } from 'react'
import  { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { showMessage } from '../component/notification/Message';
import Loading from '../component/loading/Loading';

const PaymentResult = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [params] = useSearchParams()
    useEffect(() => {
        const verifyPayment = async () => {
            const query = Object.fromEntries(params.entries());
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const res = await axios.get(`${apiUrl}/payment/vnpay_return`, { params: query, withCredentials: true });
                if (res.data.success) {
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    showMessage(err.response?.data.status, err.response?.data.error || "Error verifying payment");
                }
            }
        }
        verifyPayment();
    }, [])

    const fadeUp = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
    };

    const buttonHover = { scale: 1.05 };
    const buttonTap = { scale: 0.96 };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeUp}
                    >
                        <motion.h2
                            className="text-xl font-semibold mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            Đang xác thực thanh toán...
                        </motion.h2>
                        <Loading />
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeUp}
                        className="w-full flex justify-center"
                    >
                        <Result
                            status="success"
                            title="Cảm ơn bạn đã mua gói gia hạn! Chúc bạn học tập vui vẻ."
                            subTitle="Mã đơn hàng: 2017182818828182881. Cấu hình máy chủ đám mây mất 1-5 phút, vui lòng chờ."
                            extra={[
                                <motion.div
                                    key="home"
                                    whileHover={buttonHover}
                                    whileTap={buttonTap}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() => (window.location.href = "/")}
                                    >
                                        Trở về trang chủ và tiếp tục học nào !!
                                    </Button>
                                </motion.div>,
                                <motion.div
                                    key="buy"
                                    whileHover={buttonHover}
                                    whileTap={buttonTap}
                                >
                                    <Button onClick={() => window.location.reload()}>Mua lại</Button>
                                </motion.div>,
                            ]}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default PaymentResult