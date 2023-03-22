import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import style from '../../../styles/admin/admin_reviews.module.scss';
import Image from 'next/legacy/image';

const AddReview = () => {
    const router = useRouter();
    const inputFileRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(null);
    const [date, setDate] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('imageUrl', selectedFile);
            formData.append('name', name);
            formData.append('rating', rating);
            formData.append('description', description);
            formData.append('date', date);
            const response = await fetch('https://lending-generator-server.herokuapp.com/create-comment', {
                method: 'POST',
                body: formData
            });

            setTimeout(() => {
                router.push('/edit/admin');
              },500) 
        } catch (error) {
            console.error(error);
        }
    };
    
    const changeFunc = (e) => {
        setSelectedFile(e.target.files[0]);
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileUrl = event.target.result;
            setImageUrl(fileUrl);
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const deletePhotoFunc = () => {
        setImageUrl(null);
        setSelectedFile('');
    }

    return (
        <div className={style.add_reviews_wrapper}>
            <div className={style.add_reviews_block}>
                <div>
                    <p>Виберіть фото</p>
                        {imageUrl &&
                            <>
                                <div>
                                    <button onClick={deletePhotoFunc} className={style.handle_delete_button}>Видалити фото</button>
                                </div>
                                <div className={style.image_wrap}>
                                <Image
                                    src={`${imageUrl}`}
                                    alt={`${''}`}
                                    width='100'
                                    height='100'
                                    layout="responsive"
                                    objectFit="cover"
                                    className={style.image_item}
                                />
                                </div>
                            </>}
                    <input type='file'
                        hidden
                        ref={inputFileRef}
                        onChange={changeFunc}
                    />
                    <div className={style.add_reviews_photo_button}>
                    <button className={style.upload_photo}
                        onClick={() => inputFileRef.current.click()}>Завантажити фото</button>
                    </div>
                </div>
                <div className={style.add_text_input_wrap}>
                    <p>Вкажіть імя</p>
                    <input className={style.add_reviews_input} type='text' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={style.add_text_input_wrap}>
                    <p>Ваш коментар</p>
                    <textarea className={style.add_reviews_textarea} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={style.add_text_input_wrap}>
                    <p>Поставте оцінку (не быліше 5)</p>
                    <input className={style.add_reviews_input} type='number'
                        onChange={(e) => setRating(e.target.value > 5 || e.target.value < 1 ? 5 : e.target.value)} />
                </div>
                <div className={style.add_text_input_wrap}>
                    <p>Вкажіть дату:</p>
                    <input type='date' onChange={(e) => setDate(e.target.value)} />
                </div>
            </div>
            <div className={style.add_reviews_submit_button_wrap}>
                <button className={style.add_reviews_submit_button} onClick={handleSubmit}>Створити відгук</button>
            </div>
        </div>
    );
};

export default AddReview;