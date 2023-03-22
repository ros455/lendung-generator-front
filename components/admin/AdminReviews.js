import React, { useEffect, useState } from 'react';
import style from '../../styles/admin/Reviews.module.scss';
import { useRouter } from 'next/router';
import TemalateReviews from './TemalateReviews';
import Loader from './Loader.js';
const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetch('https://lending-generator-server.herokuapp.com/get-all-admin-comments')
            .then((res) => res.json())
            .then((res) => setReviews(res))
    }, [])

    const redirectFunc = () => {
        router.push('admin-reviews');
    }

    return (
        <div className={style.admin_review_wrap}>
            <div>
                <h2 className={style.title_admin_review}>Відгуки на сайті</h2>
            </div>
            <div className={style.add_review_button_wrapper}>
                        <button className={style.add_review_button} onClick={redirectFunc}>Додати відгук</button>
                    </div>
            {reviews.length != 0 ?
                <>
                    <TemalateReviews reviews={reviews} url='admin-reviews/' />
                </>
            :
            <Loader/>
            }
        </div>
    );
};

export default AdminReviews;