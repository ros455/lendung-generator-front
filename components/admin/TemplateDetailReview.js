import React, { useState, useRef } from 'react';
import Image from 'next/legacy/image';
import style from '../../styles/admin/Reviews.module.scss';
import { useRouter } from 'next/router';

const TemplateDetailReview = ({review,deleteUrl,updateReviewUrl,updateImageUrl,userReview}) => {
    const router = useRouter();
    const inputFileRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
  
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
  
    const handleDelete = () => {
      const defaultUrl = window.location.href; // замініть на фактичний URL
      const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)
  
      const url = `${deleteUrl}${id}`;
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
    const handleEdit = () => {
      setIsOpen(true);
      setImageUrl(review?.imageUrl);
      setName(review?.name);
      setRating(review?.rating);
      setDescription(review?.description);
      setDate(review?.date);
    }
    const onClickRemoveImage = async (event) => {
      setImageFile('');
      setImageUrl('');
    };
  
    const editFetchFunc = () => {
      const defaultUrl = window.location.href; // замініть на фактичний URL
      const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)
  
      const url = `${updateReviewUrl}${id}`;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": name,
          "description": description,
          "rating": rating,
          "date": date
        })
      };
      fetch(url, options)
      setIsOpen(false);
      setTimeout(() => {
        window.location.reload();
      },1000)
    }
  
    const saveUpdateImage = async () => {
      try {
        const defaultUrl = window.location.href; // замініть на фактичний URL
        const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)
        if (imageFile == '') {
  
          const formData = new FormData();
          formData.append('imageUrl', '');
          const response = await fetch(`${updateImageUrl}${id}`, {
            method: 'PATCH',
            body: formData
          });
          const data = await response.json();
  
        } else {
          const formData = new FormData();
          formData.append('imageUrl', imageFile);
          const response = await fetch(`${updateImageUrl}${id}`, {
            method: 'PATCH',
            body: formData
          });
          const data = await response.json();
  
        }
        setTimeout(() => {
          window.location.reload();
        },1000)
      } catch (error) {
        console.error(error);
      }
    }

    console.log('review',review);
  
    const publish = async (event) => {
      event.preventDefault();
      try {
          const formData = new FormData();
          formData.append('imageUrl', review?.imageUrl );
          formData.append('name', review?.name);
          formData.append('rating', review?.rating);
          formData.append('description', review?.description);
          formData.append('date', date);
          const response = await fetch('https://lending-generator-server.herokuapp.com/create-comment', {
              method: 'POST',
              body: formData
          });

          handleDelete()
  
          setTimeout(() => {
            router.push('/edit/admin');
          },1000) 
      } catch (error) {
          console.error(error);
      }
  };
  
  const handleFileChange = async (event) => {
    setImageFile(event.target.files[0]);
  };

  console.log('review?.imageUrl',typeof(review?.imageUrl));

    return (
        <div className={style.main_review_block}>
        <div className={style.review_block}>
          <div className={style.image_wrap}>
            <Image
              src={`${review?.imageUrl != undefined && review?.imageUrl != 'null' && review?.imageUrl != '' ? review?.imageUrl : '/image/not-img.jpg'}`}
              alt={`${review?.imageUrl != undefined && review?.imageUrl != 'null' ? review?.imageUrl : '/image/not-img.jpg'}`}
              width='100'
              height='100'
              layout="responsive"
              objectFit="cover"
              className={style.image_item}
            /> 
          </div>
          <div className={style.review_text_block}>
            <h3>{review?.name}</h3>
            <p>{review?.date}</p>
            <h3>Рейтинг: {review?.rating}</h3>
            <h3 className={style.review_desc}>Опис: {review?.description}</h3>
          </div>
        </div>
        <div>
          {isOpen && (
            <div className={style.image_wrap}>
              {review?.imageUrl 
              ?
              <Image
              src={`${review?.imageUrl != undefined && review?.imageUrl != 'null' && review?.imageUrl != '' ? review?.imageUrl : '/image/not-img.jpg'}`}
              alt={`${review?.imageUrl}`}
              width='100'
              height='100'
              layout="responsive"
              objectFit="cover"
              className={style.image_item}
            /> 
            :
            <></>}
              <div>
                {imageUrl ?
                  <div className={style.remove_imege_button_wrap}>
                    <button onClick={onClickRemoveImage} className={style.handle_delete_button}> Видалити фото</button>
                  </div>
                  :
                  <>
                    <input type='file' 
                    onChange={handleFileChange} 
                    ref={inputFileRef}
                    hidden/>
                    <div className={style.edit_button_wrap}>
                    <button className={style.handle_edit_button}
                        onClick={() => inputFileRef.current.click()}>Завантажити фото</button>
                    <button onClick={saveUpdateImage} className={style.handle_publish_button}>Зберегти</button>
                    </div>
                    <div>
                    </div>
                  </>
                }
              </div>
              <div className={style.edit_input_wrap}>
              <p>Вкажіть імя</p>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
              <p>Ваш коментар</p>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              <p>Поставте оцінку</p>
              <input type='number' value={rating} onChange={(e) => setRating(e.target.value)} />
              <p>Вкажіть дату:</p>
              <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className={style.edit_button_wrap}>
                <button onClick={() => setIsOpen(false)} className={style.handle_delete_button}>Закрити</button>
                <button onClick={editFetchFunc} className={style.handle_edit_button}>Підтвердити</button>
              </div>
            </div>
          )}
        </div>
        <div className={style.button_block}>
          {isOpen ? 
          <></> : 
            <>             
            <button onClick={handleEdit} className={style.handle_edit_button}>Редагувати</button>
            {userReview && <button onClick={publish} className={style.handle_publish_button}>Опублікувати</button>}
            <button onClick={handleDelete} className={style.handle_delete_button}>Видалити</button>
            </>}
        </div>
      </div>
      );
};

export default TemplateDetailReview;