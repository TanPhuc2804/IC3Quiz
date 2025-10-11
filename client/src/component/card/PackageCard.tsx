import React from 'react'
import type { Package } from '../../types'
import { formatCurrencyVND } from '../../utils/currency.utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { showMessage } from '../notification/Message'
import { Button } from 'antd'

type Props = {
    package: Package,
    user_bought: string
    duration?: string
}

const PackageCard = (props: Props) => {

    const handleBuy = () => {
        if (props.user_bought === props.package._id) {
            showMessage(false, "Bạn đã có gói sử dụng, không thể mua thêm gói mới");
            return;
        }
        const apiUrl = import.meta.env.VITE_API_URL;
        const buyUrl = `${apiUrl}/payment/create-payment-url`;
        const body = {
            amount: props.package.price / 1000,
            package_id: props.package._id
        }
        axios.post(buyUrl, body, { withCredentials: true })
            .then(res => res.data)
            .then(data => {
                window.location.href = data.payment_url;
            })
            .catch(err => {
                showMessage(err.response.data.status, err.response.data.error || "Error creating payment url");
                console.error("Error creating payment url: ", err);
            });
    }


    const disableButton = (package_id: string) => {
        if (package_id === "") {
            return false;
        }
        return props.user_bought !== props.package._id
    }

    return (
        <div className='px-4 py-2 border-1 m-2 rounded-2xl border-neutral-300'>
            <h3 className='text-lg font-semibold py-2'>{props.package.name}</h3>
            <p className='py-2'> <b className='text-lg'>{formatCurrencyVND(props.package.price)}</b>  / {props.package.duration / 30 ? `${props.package.duration / 30} tháng` : "Trọn đời"}</p>
            <p className='text-[16px] text-gray-500 py-2'>{props.package.description}</p>
            <hr />
            <div>
                {
                    props.package?.benefits?.map((benefit, index) => (
                        <span key={index} className='flex items-center gap-4 py-2'>
                            <FontAwesomeIcon color='green' icon={faCheck} />
                            <li className='text-sm'>{benefit}</li>
                        </span>
                    ))
                }
            </div>
            <Button className='mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors' onClick={handleBuy} disabled={disableButton(props.user_bought)}>{props.duration === "" ? "Chọn gói" : props.duration}</Button>
        </div>
    )
}

export default PackageCard