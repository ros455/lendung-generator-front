import React,{useState, useEffect} from 'react';
import TemplateDetailReview from '../../../components/admin/TemplateDetailReview';

const NewReview = () => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    const defaultUrl = window.location.href; // замініть на фактичний URL
    const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)
    const url = `https://lending-generator-server.herokuapp.com/get-comment/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((res) => setReview(res))
  },[])
  return (
    <TemplateDetailReview 
    review={review}
    deleteUrl='https://lending-generator-server.herokuapp.com/remove-user-comment/'
    updateReviewUrl = 'https://lending-generator-server.herokuapp.com/update-user-comment/'
    updateImageUrl = 'https://lending-generator-server.herokuapp.com/update-user-image/'
    userReview = {true}
    />
  );
};

export default NewReview;