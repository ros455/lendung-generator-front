import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import style from '../../styles/admin/Reviews.module.scss';
import {BsArrowDownCircle} from 'react-icons/bs';

const PAGE_SIZE = 5;

const TemalateReviews = ({ reviews, url }) => {
  const [sortReviews, setSortReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(PAGE_SIZE);

  useEffect(() => {
    const newArr = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setSortReviews(newArr);
  }, [reviews]);

  const handlePageChange = () => {
    setStartIndex((prevStartIndex) => prevStartIndex + PAGE_SIZE);
    setEndIndex((prevEndIndex) => prevEndIndex + PAGE_SIZE);
  };

  return (
    <div>
      <div className={style.display_reviews}>
        <p className={style.review_title}>Імя</p>
        <p className={style.review_title}>Дата</p>
        <p className={style.review_title}>Оцінка</p>
      </div>
      {sortReviews &&
        sortReviews.slice(0, endIndex).map((el, idx) => (
          <div key={idx}>
            <Link href={`${url}${el._id}`} className={style.display_reviews}>
              <p> {el.name}</p>
              <p> {new Date(el.createdAt).toISOString().slice(0, 10)}</p>
              <p> {el.rating}</p>
            </Link>
          </div>
        ))}
      {endIndex < sortReviews.length && (
        <div className={style.arrow_down_wrap} onClick={handlePageChange}>
          <BsArrowDownCircle className={style.arrow_down}/>
        </div>
      )}
    </div>
  );
};

export default TemalateReviews;