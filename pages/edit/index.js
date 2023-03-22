import React,{useState, useEffect} from 'react';
import style from '../../styles/admin/LoginForm.module.scss';
import { useRouter } from 'next/router';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const admin = localStorage.getItem('isAdmin') === 'true';
        if(admin) {
            router.push('edit/admin')
        }
    },[])

    const handleSubmit = () => {
        if(login == 'admin' && password == 'admin') {
            localStorage.setItem('isAdmin',true)
            router.push('edit/admin')
        } else {
            localStorage.setItem('isAdmin',false)
        }
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit();
        }
    }

    return (
        <div className={style.login_wrap}>
            <div className={style.login_block}>
            <h2 className={style.login_title}>Вхід для адміністрації</h2>
            <div className={style.input_wrap}>
                <input type='text' 
                value={login} onChange={(e) => setLogin(e.target.value)}
                placeholder='Логін'/>
            </div>
            <div className={style.input_wrap}>
                <input type='password' 
                value={password} onChange={(e) => setPassword(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder='Пароль'/>
            </div>
            <div className={style.login_button_wrap}>
                <button className={style.login_button} onClick={handleSubmit}>Увійти</button>
            </div>
        </div>
        </div>
    );
};

export default Login;