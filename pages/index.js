import React, { useState } from "react";
import Head from "next/head";
import { Roboto } from "next/font/google";
import Timer from "@/components/Timer";
import Discount from "@/components/Discount";
import MyButton2 from "@/components/MyButton2";
import MyButtonTop from "@/components/MyButtonTop";
import gen1 from "../public/img/gens/1.png";
import Image from "next/legacy/image";
import Slider from "@/components/Slider/Slider";
import SliderTitles from "@/components/Slider/SliderTitles";
import specialOfferDecorImage from "../public/img/specialOffer/1.svg";
import ReactVideo from "@/components/ReactVideo";
import mainWhyIcon1 from "../public/icons/mainWhy/1.svg";
import mainWhyIcon2 from "../public/icons/mainWhy/2.svg";
import mainWhyIcon3 from "../public/icons/mainWhy/3.svg";
import mainWhyIcon4 from "../public/icons/mainWhy/4.svg";
import genImg1 from "../public/img/gens/gensList/1.jpg";
import genImg2 from "../public/img/gens/gensList/2.jpg";
import genImg3 from "../public/img/gens/gensList/3.jpg";
import referenceIcon from "../public/icons/gensList.svg";
import referenceIconUp from "../public/icons/gensListUp.svg";
import reviewsBack from "../public/icons/reviews/back.svg";
import reviewsNext from "../public/icons/reviews/next.svg";
import rewiewsStar from "../public/icons/reviews/star.svg";
import offersIcon1 from "../public/icons/offer/1.svg";
import offersIcon2 from "../public/icons/offer/2.svg";
import offersIcon3 from "../public/icons/offer/3.svg";
import offersIcon4 from "../public/icons/offer/4.svg";
import offersArrow from "../public/icons/offer/arrow.svg";
import Form from "@/components/Form/Form";
import Link from "next/link";
import useSWR from "swr";
import StarRatings from "react-star-ratings";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "500", "700"],
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
    //-------------------Відкриття та закриття характеристик------------------------
    const [openLT3800, setOpenLT3800] = useState(false);
    const [openLT4500, setOpenLT4500] = useState(false);
    const [openLT6500, setOpenLT6500] = useState(false);
    //------------------------------------------------------------------------------

    //-------------------Отримую ширину екрана------------------------
    const [width, setWidth] = React.useState();
    React.useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }

        // Встановлюємо розмір екрану під час першого рендеру
        handleResize();

        // Додаємо слухача події на зміну розміру вікна
        window.addEventListener("resize", handleResize);

        // Прибираємо слухача події при розмонтовуванні компонента
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    //----------------------------------------------------------------

    //--------------Відгуки-------------------
    //------SWR------

    const {
        data: responseArr,
        error: errorResponseArr,
        isLoading: isLoadingResponseArr,
    } = useSWR(
        "https://lending-generator-server.herokuapp.com/get-all-admin-comments",
        fetcher
    );

    //---------------
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [responseArr, setResponseArr] = useState([]);

    // React.useEffect(() => {
    //     fetch(
    //         "https://lending-generator-server.herokuapp.com/get-all-admin-comments"
    //     )
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setResponseArr(res);
    //         });
    // }, []);

    const previousResponse = () => {
        if (currentIndex === 0) {
            setCurrentIndex(responseArr.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const nextResponse = () => {
        if (currentIndex === responseArr.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const currentResponse =
        !responseArr || errorResponseArr ? [] : responseArr[currentIndex];
    //------------------------------------------

    //Вмикання плеєра по натисканню на зображення в першому блоці
    const [playVideo, setPlayVideo] = useState(false);

    // Отримую перелік генераторів із сервера для select у формі для замовлення
    //------SWR------
    const {
        data: fetchedGens,
        error: errorFetchedGens,
        isLoadingFetchedGens,
    } = useSWR(
        "https://lending-generator-server.herokuapp.com/get-all-products",
        fetcher
    );
    let luotian3800 =
        !errorFetchedGens && fetchedGens
            ? Number(
                  fetchedGens.find(
                      (generator) =>
                          generator._id === "6411f6e49200c421b64bbe7b"
                  ).price
              )
            : 7499;
    let luotian4500 =
        !errorFetchedGens && fetchedGens
            ? Number(
                  fetchedGens.find(
                      (generator) =>
                          generator._id === "6411f7689200c421b64bbe7d"
                  ).price
              )
            : 8499;
    let luotian6500 =
        !errorFetchedGens && fetchedGens
            ? Number(
                  fetchedGens.find(
                      (generator) =>
                          generator._id === "6411f7729200c421b64bbe7f"
                  ).price
              )
            : 22000;
    let luotian3800Title =
        !errorFetchedGens && fetchedGens
            ? fetchedGens.find(
                  (generator) => generator._id === "6411f6e49200c421b64bbe7b"
              ).title
            : "ГАЗОВО-БЕНЗИНОВИЙ ГЕНЕРАТОР LUOTIAN 3800 3.8 КВТ";
    let luotian4500Title =
        !errorFetchedGens && fetchedGens
            ? fetchedGens.find(
                  (generator) => generator._id === "6411f7689200c421b64bbe7d"
              ).title
            : "ГАЗОВО-БЕНЗИНОВИЙ ГЕНЕРАТОР LUOTIAN 4500 4.5 КВТ";
    let luotian6500Title =
        !errorFetchedGens && fetchedGens
            ? fetchedGens.find(
                  (generator) => generator._id === "6411f7729200c421b64bbe7f"
              ).title
            : "ГАЗОВО-БЕНЗИНОВИЙ ГЕНЕРАТОР LUOTIAN 6500 4.5 КВТ";

    //-----------------------------------------
    // const [fetchedGens, setFetchedGens] = useState([]);
    // React.useEffect(() => {
    //     const fetchGens = async () => {
    //         try {
    //             const res = await fetch(
    //                 "https://lending-generator-server.herokuapp.com/get-all-products"
    //             );
    //             const data = await res.json();
    //             setFetchedGens(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchGens();
    // }, []);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`wrapper ${roboto.className}`}>
                <section
                    className="main"
                    style={{
                        backgroundImage: "url(/img/bg/1.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="main__container">
                        <div className="main__title">
                            <MyButtonTop
                                fontSize={
                                    width < 280
                                        ? 13
                                        : width < 337
                                        ? 15
                                        : width < 430
                                        ? 17
                                        : width < 550
                                        ? 20
                                        : width < 700
                                        ? 28
                                        : width < 900
                                        ? 38
                                        : width < 1020
                                        ? 48
                                        : 55
                                }
                                fontWeight={600}
                                btnHeight="160px"
                            >
                                Бензиново-газові генератори
                            </MyButtonTop>
                        </div>
                        <div className="main__generatorImageContainer">
                            <a
                                href="#section-mainVideo"
                                onClick={() => setPlayVideo(!playVideo)}
                            >
                                <Image
                                    src={gen1}
                                    className={"main__generatorImage"}
                                    alt="myImg"
                                />
                            </a>
                        </div>
                    </div>
                </section>
                <div className="main__discount">
                    <Discount
                        percent={20}
                        lowPrice={Math.round(luotian3800 * 0.25 + luotian3800)}
                        price={Math.round(luotian3800)}
                    />
                </div>
                <section
                    className="firstTimer"
                    style={{
                        backgroundImage: "url(/img/bg/black.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="firstTimer__row">
                        <div className="firstTimer__timer">
                            <Timer />
                        </div>
                        <div className="firstTimer__choseGen">
                            <a href="#section-gensList">
                                <MyButton2
                                    fontSize={
                                        width < 400 ? 15 : width > 685 ? 42 : 25
                                    }
                                    fontWeight={400}
                                    btnHeight="150px"
                                    lineHeight={
                                        width < 400 ? 20 : width > 685 ? 50 : 25
                                    }
                                >
                                    Обрати потрібний <br />
                                    генератор
                                </MyButton2>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="mainSlider">
                    <div className="mainSlider__container">
                        <div className="mainSlider__title">
                            <SliderTitles />
                        </div>
                        <div className="mainSlider__row">
                            <Slider />
                        </div>
                    </div>
                </section>
                <section className="specialOffer">
                    <div className="specialOffer__title">
                        <div className="specialOffer__title-text __container">
                            СПЕЦІАЛЬНА ПРОПОЗИЦІЯ
                        </div>
                    </div>
                    <div
                        className="specialOffer__generator"
                        style={{
                            backgroundImage: "url(/img/bg/1.jpg)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="specialOffer__generator-img">
                            <a href="#section-getPrice">
                                <Image src={gen1} alt="myImg" />
                            </a>
                        </div>
                        <div className="specialOffer__generator-decor">
                            <Image src={specialOfferDecorImage} alt="decor" />
                        </div>
                    </div>
                    <div className="specialOffer__econom">
                        <div className="specialOffer__econom-title __container">
                            ЕКОНОМІЯ 85% на пальному
                        </div>
                    </div>
                    <div className="specialOffer__text">
                        <div className="specialOffer__text-value __container">
                            Генератор <strong> Loutian LT</strong> стане
                            надійним джерелом електроенергії та забезпечить вашу
                            оселю чи офіс необхідною вам потужністю. замов
                            генератор зараз, і отримуй у подарунок газовий
                            редуктор, з яким ви зможете економити до 85% коштів
                            на паливі
                        </div>
                    </div>
                </section>
                <section
                    className="secondTimer"
                    style={{
                        backgroundImage: "url(/img/bg/black.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    id="section-getPrice"
                >
                    <div className="secondTimer__row">
                        <div className="secondTimer__timer">
                            <Timer />
                        </div>
                        <div className="secondTimer__get">
                            <a href="#section-gensList">
                                <MyButton2
                                    fontSize={
                                        width < 400 ? 15 : width > 685 ? 42 : 25
                                    }
                                    fontWeight={400}
                                    btnHeight="150px"
                                    lineHeight={
                                        width < 400 ? 20 : width > 685 ? 50 : 25
                                    }
                                >
                                    ОТРИМАТИ ПОДАРУНОК
                                </MyButton2>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="mainVideo" id="section-mainVideo">
                    <ReactVideo
                        videoUrl={"/video/1.mp4"}
                        videoWidth={"100%"}
                        videoHeight={width < 375 ? 300 : 600}
                        playing={playVideo}
                    />
                    <div className="mainVideo__description __container">
                        <div className="mainVideo__description-text">
                            Це бензеновий генератор, який допоможе отримати Вам
                            додаткове джерело електроенергії для використання у
                            разі проблем із електромережею з різною номінальною
                            потужністю в залежності від ваших потреб. Агрегат
                            впорається з живленням електроприладів для дому,
                            офісу
                        </div>
                    </div>
                </section>
                <section
                    className="mainWhy"
                    style={{
                        backgroundImage: "url(/img/bg/black.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="mainWhy__container">
                        <div className="mainWhy__row">
                            <div className="mainWhy__title1">
                                Чому вже понад 200 людей
                            </div>
                            <div className="mainWhy__title2">
                                обрали цей генератор?
                            </div>
                            <div className="mainWhy__items">
                                <div className="mainWhy__items-icon">
                                    <Image src={mainWhyIcon1} alt="icon" />
                                </div>
                                <div className="mainWhy__items-title">
                                    місткість
                                </div>
                                <div className="mainWhy__items-text">
                                    Паливного баку вистачає на 10 -15 годин без
                                    дозаправлення
                                </div>
                            </div>
                            <div className="mainWhy__dashed"></div>
                            <div className="mainWhy__items">
                                <div className="mainWhy__items-icon">
                                    <Image src={mainWhyIcon2} alt="icon" />
                                </div>
                                <div className="mainWhy__items-title">
                                    ТЕхнологічність
                                </div>
                                <div className="mainWhy__items-text">
                                    Є захист від короткого замикання та олійного
                                    голодування
                                </div>
                            </div>
                            <div className="mainWhy__dashed"></div>
                            <div className="mainWhy__items">
                                <div className="mainWhy__items-icon">
                                    <Image src={mainWhyIcon3} alt="icon" />
                                </div>
                                <div className="mainWhy__items-title">
                                    НАДІЙНИЙ
                                </div>
                                <div className="mainWhy__items-text">
                                    Регулятор напруги AVR захищає підключені
                                    пристрої
                                </div>
                            </div>
                            <div className="mainWhy__dashed"></div>
                            <div className="mainWhy__items">
                                <div className="mainWhy__items-icon">
                                    <Image src={mainWhyIcon4} alt="icon" />
                                </div>
                                <div className="mainWhy__items-title">
                                    ЕКОНОМНИЙ
                                </div>
                                <div className="mainWhy__items-text">
                                    Максимально ефективне споживання палива та
                                    масла
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="gensList" id="section-gensList">
                    <div
                        className="reviews__title"
                        style={{ marginBottom: "0px" }}
                    >
                        <div className="reviews__title-value">
                            ПІДІБРАТИ ГЕНЕРАТОР
                        </div>
                    </div>
                    <div className="gensList__item">
                        <div className="gens__title">
                            <div className="gens__title-value __container">
                            ГАЗОВО-БЕНЗИНОВИЙ ГЕНЕРАТОР LUOTIAN 3800 3 КВТ
                            </div>
                        </div>
                        <div className="gens__picture __container">
                            <Image src={genImg2} alt="generator" />
                        </div>
                        <div className="gens__discount">
                            <Discount
                                lowPrice={Math.round(
                                    luotian3800 * 0.25 + luotian3800
                                )}
                                price={Math.round(luotian3800)}
                                percent={20}
                            />
                        </div>
                        <div className="gens__timer">
                            <Timer />
                        </div>
                        <div className="gens__text">
                            <div className="gens__text-value __container">
                                Це бензеновий генератор, який допоможе отримати
                                Вам додаткове джерело електроенергії для
                                використання у разі проблем із електромережею з
                                різною номінальною потужністю в залежності від
                                ваших потреб. Агрегат впорається з живленням
                                електроприладів для дому, офісу
                            </div>
                        </div>
                        <div className="gens__reference">
                            <div
                                className="gens__reference-title"
                                onClick={() => setOpenLT3800(!openLT3800)}
                            >
                                <div className="gens__reference-title-value">
                                    ХАРАКТЕРИСТИКИ
                                </div>
                                <div className="gens__reference-title-icon">
                                    <Image
                                        src={
                                            !openLT3800
                                                ? referenceIcon
                                                : referenceIconUp
                                        }
                                        alt="icon"
                                    />
                                </div>
                            </div>
                            <div className="gens__reference-row ">
                                <div
                                    className="gens__reference-row-border-first __container"
                                    style={
                                        !openLT3800
                                            ? { height: "210px" }
                                            : { height: "" }
                                    }
                                >
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Система пуску:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            ручний
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Номінальна потужність:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            2,8 кВт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Максимальна потужність:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            3 кВт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Напруга:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            220/12 В
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Тип палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            бензин / газ
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Об'єм паливного бака:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            10 л.
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Витрата палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            0,7-1 л/год{" "}
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Безперебійна праця без
                                            дозаправлення:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            10-12 годин
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Тип двигуна:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            {" "}
                                            4-тактний Одноциліндровий с
                                            повітряним охолодженням
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Розмір циліндра:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            88 х 64 мм
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Кількість фаз:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            однофазний
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Система AVR:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Кількість розеток:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            220 В: 2 шт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Датчик палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Датчик рівня масла:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Вольтметр:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Форм-фактор:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            пересувний
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Захист від перевантаження DC/AC:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Клас ізоляції:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            В
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Вага:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            38кг
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gens__buy">
                            <a href="#section-inputsGens">
                                <MyButton2
                                    btnHeight="140px"
                                    fontSize={
                                        width < 312 ? 14 : width > 505 ? 30 : 18
                                    }
                                    lineHeight={width > 505 ? 40 : 20}
                                >
                                    Замовити зі знижкою
                                    <br />
                                    LUOTIAN 3800 3 кВт
                                </MyButton2>
                            </a>
                        </div>
                    </div>
                    <div className="gensList__item">
                        <div className="gens__title">
                            <div className="gens__title-value __container">
                            БЕНЗИНОВИЙ ГЕНЕРАТОР LUOTIAN 4500 4,5 КВТ
                            </div>
                        </div>
                        <div className="gens__picture __container">
                            <Image src={genImg1} alt="generator" />
                        </div>
                        <div className="gens__discount">
                            <Discount
                                lowPrice={Math.round(
                                    luotian4500 * 0.25 + luotian4500
                                )}
                                price={Math.round(luotian4500)}
                                percent={20}
                            />
                        </div>
                        <div className="gens__timer">
                            <Timer />
                        </div>
                        <div className="gens__text">
                            <div className="gens__text-value __container">
                                Це бензеновий генератор, який допоможе отримати
                                Вам додаткове джерело електроенергії для
                                використання у разі проблем із електромережею з
                                різною номінальною потужністю в залежності від
                                ваших потреб. Агрегат впорається з живленням
                                електроприладів для дому, офісу
                            </div>
                        </div>
                        <div className="gens__reference">
                            <div
                                className="gens__reference-title"
                                onClick={() => setOpenLT4500(!openLT4500)}
                            >
                                <div className="gens__reference-title-value">
                                    ХАРАКТЕРИСТИКИ
                                </div>
                                <div className="gens__reference-title-icon">
                                    <Image
                                        src={
                                            !openLT4500
                                                ? referenceIcon
                                                : referenceIconUp
                                        }
                                        alt="icon"
                                    />
                                </div>
                            </div>
                            <div className="gens__reference-row ">
                                <div
                                    className="gens__reference-row-border-second __container"
                                    style={
                                        !openLT4500
                                            ? { height: "210px" }
                                            : { height: "" }
                                    }
                                >
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Система пуску:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            ручний
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Номінальна потужність:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            4 кВт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Максимальна потужність:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            4,5 кВт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Напруга:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            220/12 В
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Тип палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            бензин / газ
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Об'єм паливного бака:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            15 л.
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Витрата палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            0,7-1 л/год{" "}
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Безперебійна праця без
                                            дозаправлення:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            15-20 годин
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Тип двигуна:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            {" "}
                                            4-тактний Одноциліндровий с
                                            повітряним охолодженням
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Розмір циліндра:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            88 х 64 мм
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Кількість фаз:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            однофазний
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Система AVR:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Кількість розеток:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            220 В: 2 шт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Датчик палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Датчик рівня масла:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Вольтметр:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Форм-фактор:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            пересувний
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Захист від перевантаження DC/AC:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Клас ізоляції:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            В
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Вага:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            42кг
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gens__buy">
                            <a href="#section-inputsGens">
                                <MyButton2
                                    btnHeight="140px"
                                    fontSize={
                                        width < 312 ? 14 : width > 505 ? 30 : 18
                                    }
                                    lineHeight={width > 505 ? 40 : 20}
                                >
                                    Замовити зі знижкою
                                    <br />
                                    LUOTIAN 4500 4,5 КВТ
                                </MyButton2>
                            </a>
                        </div>
                    </div>
                    <div className="gensList__item">
                        <div className="gens__title">
                            <div className="gens__title-value __container">
                            ГАЗОВО-БЕНЗИНОВИЙ ГЕНЕРАТОР LUOTIAN 6500 6.5 КВТ
                            </div>
                        </div>
                        <div className="gens__picture __container">
                            <Image src={genImg3} alt="generator" />
                        </div>
                        <div className="gens__discount">
                            <Discount
                                lowPrice={Math.round(
                                    luotian6500 * 0.25 + luotian6500
                                )}
                                price={Math.round(luotian6500)}
                                percent={20}
                            />
                        </div>
                        <div className="gens__timer">
                            <Timer />
                        </div>
                        <div className="gens__text">
                            <div className="gens__text-value __container">
                                Це бензеновий генератор, який допоможе отримати
                                Вам додаткове джерело електроенергії для
                                використання у разі проблем із електромережею з
                                різною номінальною потужністю в залежності від
                                ваших потреб. Агрегат впорається з живленням
                                електроприладів для дому, офісу
                            </div>
                        </div>
                        <div className="gens__reference">
                            <div
                                className="gens__reference-title"
                                onClick={() => setOpenLT6500(!openLT6500)}
                            >
                                <div className="gens__reference-title-value">
                                    ХАРАКТЕРИСТИКИ
                                </div>
                                <div className="gens__reference-title-icon">
                                    <Image
                                        src={
                                            !openLT6500
                                                ? referenceIcon
                                                : referenceIconUp
                                        }
                                        alt="icon"
                                    />
                                </div>
                            </div>
                            <div className="gens__reference-row ">
                                <div
                                    className="gens__reference-row-border-third __container"
                                    style={
                                        !openLT6500
                                            ? { height: "210px" }
                                            : { height: "" }
                                    }
                                >
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Система пуску:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            кнопка
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Номінальна потужність:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            6 кВт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Максимальна потужність:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            6,5 кВт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Напруга:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            220/12 В
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Тип палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            бензин / газ
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Об'єм паливного бака:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            15 л.
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Витрата палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            0,7-1 л/год{" "}
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Безперебійна праця без
                                            дозаправлення:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            15-20 годин
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Тип двигуна:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            {" "}
                                            4-тактний Одноциліндровий с
                                            повітряним охолодженням
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Розмір циліндра:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            88 х 64 мм
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Кількість фаз:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            однофазний
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Система AVR:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Кількість розеток:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            220 В: 2 шт
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Датчик палива:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Датчик рівня масла:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Вольтметр:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Форм-фактор:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            пересувний
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Захист від перевантаження DC/AC:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            так
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Клас ізоляції:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            В
                                        </div>
                                    </div>
                                    <div className="gens__reference-dashed"></div>
                                    <div className="gens__reference-keyValue">
                                        <div className="gens__reference-keyValue-key">
                                            Вага:
                                        </div>
                                        <div className="gens__reference-keyValue-value">
                                            84кг
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gens__buy">
                            <a href="#section-inputsGens">
                                <MyButton2
                                    btnHeight="140px"
                                    fontSize={
                                        width < 312 ? 14 : width > 505 ? 30 : 18
                                    }
                                    lineHeight={width > 505 ? 40 : 20}
                                >
                                    Замовити зі знижкою
                                    <br />
                                    LUOTIAN 6500 6.5 КВТ
                                </MyButton2>
                            </a>
                        </div>
                    </div>
                </section>
                {isLoadingResponseArr ? (
                    <h2>завантаження відгуків...</h2>
                ) : (
                    <section className="reviews" id="section-reviews">
                        <div className="reviews__title">
                            <div className="reviews__title-value">
                                ВІДГУКИ КЛІЄНТІВ
                            </div>
                        </div>
                        <div className="reviews__row __container">
                            <div
                                className="reviews__row-prev"
                                onClick={previousResponse}
                            >
                                <Image src={reviewsBack} alt="back" />
                            </div>
                            <div className="reviews__row-body">
                                <div className="reviews__row-body-left">
                                    <div className="reviews__row-body-left-avatar">
                                        <Image
                                            src={`${
                                                currentResponse?.imageUrl !=
                                                    undefined &&
                                                currentResponse?.imageUrl !=
                                                    "null" &&
                                                currentResponse?.imageUrl != ""
                                                    ? currentResponse?.imageUrl
                                                    : "/img/avatars/1.jpg"
                                            }`}
                                            alt={`${
                                                currentResponse?.imageUrl !=
                                                    undefined &&
                                                currentResponse?.imageUrl !=
                                                    "null"
                                                    ? currentResponse?.imageUrl
                                                    : "/img/avatars/1.jpg"
                                            }`}
                                            width={100}
                                            height={100}
                                            layout="responsive"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="reviews__row-body-left-rating">
                                        <StarRatings
                                            rating={
                                                currentResponse?.rating &&
                                                Math.ceil(
                                                    Number(
                                                        currentResponse?.rating
                                                    )
                                                )
                                            }
                                            starRatedColor="#F38A21"
                                            numberOfStars={5}
                                            name="rating"
                                            starDimension={
                                                width < 382 ? "20px" : "30px"
                                            }
                                            starSpacing="5px"
                                        />
                                        {/* {Array.from({
                                            length:
                                                Math.ceil(
                                                    Number(
                                                        currentResponse?.rating
                                                    )
                                                ) > 5
                                                    ? 5
                                                    : Math.ceil(
                                                          Number(
                                                              currentResponse?.rating
                                                          )
                                                      ),
                                        }).map((_, index) => {
                                            return (
                                                <Image
                                                    key={index.toString()}
                                                    src={rewiewsStar}
                                                    alt="star"
                                                />
                                            );
                                        })} */}
                                    </div>
                                    <div className="reviews__row-body-left-data">
                                        {currentResponse?.date}
                                    </div>
                                </div>
                                <div className="reviews__row-body-right">
                                    <div className="reviews__row-body-right-title">
                                        {currentResponse?.name}
                                    </div>
                                    <div className="reviews__row-body-right-text">
                                        {currentResponse?.description}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="reviews__row-next"
                                onClick={nextResponse}
                            >
                                <Image src={reviewsNext} alt="next" />
                            </div>
                        </div>
                        <Link href={"/response"} className="reviews__btn">
                            <MyButton2
                                btnHeight={"90px"}
                                fontSize={width < 308 ? 15 : 20}
                            >
                                ЗАЛИШИТИ СВІЙ ВІДГУК
                            </MyButton2>
                        </Link>
                        <div className="reviews__count">
                            Відгуки від клієнтів (
                            {responseArr ? responseArr.length : "38"} шт)
                        </div>
                    </section>
                )}
                <section className="offers">
                    <div className="offers__title">
                        <div className="offers__title-value">
                            Замовлення і доставка
                        </div>
                    </div>
                    <div className="offers__line"></div>
                    <div className="offers__steps __container">
                        <div className="offers__steps-row">
                            <div className="offers__steps-row-icon">
                                <div className="offers__steps-row-icon-block">
                                    <Image src={offersIcon1} alt="icon" />
                                </div>
                            </div>
                            <div className="offers__steps-row-number">1</div>
                            <div className="offers__steps-row-text">
                                Ви залишаєте заявку нашому на сайті
                            </div>
                        </div>
                        <div className="offers__steps-arrow">
                            <Image src={offersArrow} alt="arrow" />
                        </div>
                        <div className="offers__steps-row">
                            <div className="offers__steps-row-icon">
                                <div className="offers__steps-row-icon-block">
                                    <Image src={offersIcon2} alt="icon" />
                                </div>
                            </div>
                            <div className="offers__steps-row-number">2</div>
                            <div className="offers__steps-row-text">
                                Менеджер зв’язується з Вами для уточнення
                            </div>
                        </div>
                        <div className="offers__steps-arrow">
                            <Image src={offersArrow} alt="arrow" />
                        </div>
                        <div className="offers__steps-row">
                            <div className="offers__steps-row-icon">
                                <div className="offers__steps-row-icon-block">
                                    <Image src={offersIcon3} alt="icon" />
                                </div>
                            </div>
                            <div className="offers__steps-row-number">3</div>
                            <div className="offers__steps-row-text">
                                Відправляємо Ваше замовлення Новою поштою за 1-3
                                дні{" "}
                            </div>
                        </div>
                        <div className="offers__steps-arrow">
                            <Image src={offersArrow} alt="arrow" />
                        </div>
                        <div className="offers__steps-row">
                            <div className="offers__steps-row-icon">
                                <div className="offers__steps-row-icon-block">
                                    <Image src={offersIcon4} alt="icon" />
                                </div>
                            </div>
                            <div className="offers__steps-row-number">4</div>
                            <div className="offers__steps-row-text">
                                Ви оплачуєте замовлення по факту отримання
                                наложеним платежом
                            </div>
                        </div>
                    </div>
                </section>
                <section className="getGenerator">
                    <div className="getGenerator__text __container">
                        Отримати Генератор зі знижкою та газовим конвектором до
                        набору
                    </div>
                </section>
                <section className="thirdTimer">
                    <Timer />
                </section>
                <section className="inputsGens" id="section-inputsGens">
                    <div className="form__container">
                        <Form
                            fetchedGens={fetchedGens}
                            errorFetchedGens={errorFetchedGens}
                            isLoadingFetchedGens={isLoadingFetchedGens}
                        />
                    </div>
                </section>
                <section className="receiveGen">
                    <div className="receiveGen__container">
                        <div className="receiveGen__value">
                            Отримати Генератор зі знижкою та газовим конвектором
                            до набору
                        </div>
                    </div>
                </section>
                <section className="docs">
                    <div className="docs__container">
                        <Link href={"/docs/politics.pdf"} className="docs__row">
                            <div className="docs__row-dot"></div>
                            <div className="docs__row-value">
                                Політика конфеденціальності
                            </div>
                        </Link>
                        <Link
                            href={"/docs/reglament.pdf"}
                            className="docs__row"
                        >
                            <div className="docs__row-dot"></div>
                            <div className="docs__row-value">
                                Регламент магазину{" "}
                            </div>
                        </Link>
                        <Link href={"/docs/return.pdf"} className="docs__row">
                            <div className="docs__row-dot"></div>
                            <div className="docs__row-value">
                                Скарги і повернення{" "}
                            </div>
                        </Link>
                        <Link href={"/docs/return.pdf"} className="docs__row">
                            <div className="docs__row-dot"></div>
                            <div className="docs__row-value">
                                Акт повернення товару
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
