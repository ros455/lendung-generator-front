import React, { useEffect, useState } from 'react';
import style from '../../styles/admin/Order.module.scss';
import Link from 'next/link';
import Loader from './Loader.js';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [sortOrders, setSortOrders] = useState([]);

    useEffect(() => {
        fetch('https://lending-generator-server.herokuapp.com/get-all-order')
            .then((res) => res.json())
            .then((res) => setOrders(res))
    }, [])

    useEffect(() => {
        const newArr = [...orders].sort((a, b) => new (b.createdAt) - new Date(a.createdAt));
        setSortOrders([...newArr]);
    },[orders])

    return (
        <div>
            <h2 className={style.title_order}>Замовлення</h2>
            <div className={style.order_wrap}>
                {sortOrders.length != 0
                    ?
                    <>
                        {sortOrders.map((el) => (
                            <Link href={`order/${el._id}`} key={el._id} className={style.order_block}>
                                <p>Дата: {new Date(el.createdAt).toISOString().slice(0, 10)} Замовлення: {el.selectedorder}</p>
                            </Link>
                        ))}
                    </>
                    :
                    <Loader/>
                }
            </div>
        </div>
    );
};

export default Orders;