import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import type { Package } from '../../types'
import axios from 'axios'
import Loading from '../loading/Loading';
import PackageCard from '../card/PackageCard';

type PackageBought = {
    package_id: string,
    duration: string
}

type Props = {
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
}

const ModalPackage = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);

    const [packageSelected, setPackageSelected] = useState<PackageBought>({ package_id: "", duration: "" });
    const [packages, setPackages] = useState<Package[]>([])

    useEffect(() => {
        const fetchPackages = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            axios.get(`${apiUrl}/packages`)
                .then(res => res.data)
                .then(data => {
                    setPackages(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching packages: ", err)
                });
        }
        fetchPackages();
    }, [])
     useEffect(() => {
        const fetchUserPackage = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            axios.get(`${apiUrl}/packages/user-buy`, { withCredentials: true })
                .then(res => res.data)
                .then(data => {
                    setPackageSelected(data);
                })
                .catch(err => {
                    console.error("Error fetching packages: ", err)
                });
        }
        fetchUserPackage();
    }, [])
    if (loading)
        return (
            <motion.div
                className="flex items-center justify-center my-11 h-[250px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <Loading />
            </motion.div>
        );

    return (
        <Modal
            width={1100}
            title={(<p className='text-3xl font-bold text-center'>Các gói gia hạn</p>)}
            open={props.isModalOpen}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            footer={null}
        >
            <div className="flex  items-stretch gap-4">
                {
                    packages.map(pkg => (
                        <PackageCard key={pkg._id} package={pkg} user_bought={packageSelected.package_id} duration={packageSelected.duration} />
                    ))
                }
            </div>

        </Modal>
    )
}

export default ModalPackage