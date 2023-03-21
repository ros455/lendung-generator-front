import React,{useState} from 'react';
import style from '../../styles/admin/LoginForm.module.scss';
import { useRouter } from 'next/router';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        if(login == 'admin' && password == 'admin') {
            localStorage.setItem('isAdmin',true)
            router.push('edit/admin')
        } else {

            localStorage.setItem('isAdmin',false)
        }
    }
    return (
        <div className={style.login_wrap}>
            <div className={style.login_block}>
            <h2>Вхід для адміністратора</h2>
            <div className={style.input_wrap}>
                <input type='text' value={login} onChange={(e) => setLogin(e.target.value)}/>
            </div>
            <div className={style.input_wrap}>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={style.login_button_wrap}>
                <button className={style.login_button} onClick={handleSubmit}>Увійти</button>
            </div>
        </div>
        </div>
    );
};

export default Login;