import React from 'react';
import style from '../../styles/admin/Loader.module.scss';
const Loader = () => {
    return (
        <div>
        <div className={style.loader_wrap}>
                <span className={style.loader}></span>
            </div>
        </div>
    );
};

export default Loader;