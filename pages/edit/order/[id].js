import React from 'react';
import style from '../../../styles/admin/Order.module.scss';
import { useRouter } from 'next/router';
export const getStaticPaths = async () => {
    const res = await fetch(`https://lending-generator-server.herokuapp.com/get-all-order`);
    const data = await res.json();
  
    const paths = data.map((order) => {
      return {
        params: { id: `${order._id}` }
      }
    });
  
    return {
      paths,
      fallback: true
    }
  }
  
  export const getStaticProps = async (context) => {
  
    const { id } = context.params;
  
    const res = await fetch(`https://lending-generator-server.herokuapp.com/get-one-order/${id}`);
    const data = await res.json();
  
    return {
      props: { order: data }
    }
  }

const Order = ({order}) => {
    const router = useRouter();
    const handleDelete = () => {
        const defaultUrl = window.location.href; // замініть на фактичний URL
        const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)
    
        const url = `https://lending-generator-server.herokuapp.com/remove-order/${id}`;
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        };
        fetch(url, options)
        setTimeout(() => {
          router.push('/edit/admin');
        },500) 
      }
      
    return (
        <div className={style.ordr_item_wrap}>
            <h3 className={style.title_order}>Замовлення:</h3>
            <div>
                {order &&
                <div className={style.ordr_item_block}>
                    <p>Імя замовника: {order.name}</p>
                    <p>Адрес замовника: {order.adress}</p>
                    <p>Телефон замовника: {order.phone}</p>
                    <p>Комментар замовника: {order.comment}</p>
                    <div>
                        <h3>Замовлений товар:</h3>
                        <p>Про товар: {order.selectedorder}</p>
                    </div>
                </div>}
            </div>
            <button onClick={handleDelete} className={style.handle_delete_button}>Видалити</button>
        </div>
    );
};

export default Order;