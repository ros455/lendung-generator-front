import React, { useState } from "react";
import Link from "next/link";
import MyButton2 from "@/components/MyButton2";
import { useRouter } from 'next/router';
import {BsFillArrowLeftSquareFill} from "react-icons/bs";



const response = () => {
    const [clientName, setClientName] = useState("");
    const [clientText, setClientText] = useState("");
    const [clientNumber, setClientNumber] = useState("5");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        try {
            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;

            const formData = new FormData();
            formData.append('imageUrl', selectedFile);
            formData.append('name', clientName);
            formData.append('rating', clientNumber);
            formData.append('description', clientText);
            formData.append('date', currentDate);
            const response = await fetch('https://lending-generator-server.herokuapp.com/create-user-comment', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    };
    const router = useRouter();

    const sendResponse = () => {
        handleSubmit();
        router.push('/');
        alert("Відгук відправлено")
    }

    return (
        <div className="response">
            <div className="response__container">
                <div className="backHome">
                    <Link href={"/#section-reviews"} className="backHomeLink"><BsFillArrowLeftSquareFill/> НАЗАД</Link>
                </div>
                <h2>
                    Залиште відгук:
                </h2>
                <div>
                    Добавте своє фото:
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Ім'я та прізвище" />
                </div>
                <div>
                    <textarea value={clientText} onChange={(e) => setClientText(e.target.value)} placeholder="Напишіть відгук" />
                </div>
                <div>
                    Поставте оцінку від 1 до 5:
                    <select value={clientNumber} onChange={(e) => setClientNumber(e.target.value)} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div style={{ cursor: "pointer" }} onClick={sendResponse}>
                    <MyButton2
                        btnHeight={"90px"}
                        fontSize={15}
                    >
                        ЗАЛИШИТИ СВІЙ ВІДГУК
                    </MyButton2>
                </div>

            </div>
        </div>
    )
}

export default response