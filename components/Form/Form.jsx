import React from 'react';
import stl from './Form.module.scss';
import { useForm } from 'react-hook-form';

const Form = ({ fetchedGens, errorFetchedGens, isLoadingFetchedGens }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
    });
    const onSubmit = handleSubmit((data) => {
        const sendData = async () => {
            try {
                const response = await fetch("https://lending-generator-server.herokuapp.com/create-order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({data})
                });

                if (!response.ok) {
                    throw new Error("Failed to create order.");
                }

                reset();
            } catch (error) {
                console.error(error);
            }
        };
        sendData();
        alert('Відправлено')
    });
    return (
        <div className={stl.formContainer}>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Ім'я"
                    {...register("name", {
                        required: "поле обов'язкове для заповнення",
                        minLength: {
                            value: 2,
                            message: "мінімум два символа",
                        },
                        maxLength: {
                            value: 20,
                            message: "не більше 20-ти символів",
                        },
                    })}
                />
                <div style={{ height: 20 }}>
                    {errors?.firstName && (
                        <p>
                            {errors?.firstName?.message || "Помилка!"}
                        </p>
                    )}
                </div>
                <input
                    placeholder="Номер телефону"
                    type="number"
                    {...register("phone", {
                        required: "поле обов'язкове для заповнення",
                        minLength: {
                            value: 10,
                            message: "Ввеедіть коректний номер телефону",
                        },
                        maxLength: {
                            value: 13,
                            message: "Ввеедіть коректний номер телефону",
                        },
                    })}
                />
                <div style={{ height: 20 }}>
                    {errors?.phone && (
                        <p>{errors?.phone?.message || "Ввеедіть коректний номер телефону!"}</p>
                    )}
                </div>
                <input
                    placeholder="Адреса доставки"
                    type="text"
                    {...register("adress", {
                        required: "поле обов'язкове для заповнення",
                    })}
                />
                <div style={{ height: 20 }}>
                    {errors?.adress && (
                        <p>
                            {errors?.firstName?.message || "Помилка!"}
                        </p>
                    )}
                </div>
                {isLoadingFetchedGens && (
                    <select>
                        <option value={"завантаження..."}>завантаження...</option>
                    </select>
                )}

                {!errorFetchedGens && !isLoadingFetchedGens && fetchedGens && fetchedGens.length > 0 && (
                    <select {...register("selectedorder", {
                        required: "необхідно вибрати генератор"
                    })}>
                        {fetchedGens.map((generator) => {
                            return (
                                <option key={generator._id} value={`${generator.title} - ${generator.price} грн. - ${generator.color} - ${generator.availability}`}>
                                    {`${generator.title} - ${generator.price} грн. - ${generator.color} - ${generator.availability}`}
                                </option>
                            )
                        })}
                    </select>

                )
                }


                <div style={{ height: 20 }}>
                    {errors?.select && (
                        <p>
                            {errors?.firstName?.message || "Помилка!"}
                        </p>
                    )}
                </div>
                <textarea
                    placeholder="Коментар"
                    type="text"
                    {...register("comment")}
                />
                <div className={stl.submitBorder}>
                    <input
                        type="submit"
                        value="Оформити замовлення"
                        disabled={!isValid}
                    />
                </div>
            </form>
        </div>)
}

export default Form