import React,{useEffect,useState} from 'react';
import AdminPanel from '../../../components/admin/AdminPanel';

const index = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const admin = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(admin);
    },[])
    console.log('isAdmin',isAdmin);
    return (
        <div>
            {isAdmin 
            ?
            <AdminPanel/>
            :
            <h1>Увійдіт в систему</h1>}
        </div>
    );
};

export default index;