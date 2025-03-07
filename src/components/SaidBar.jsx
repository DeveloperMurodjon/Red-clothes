import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../lib/slices/productsSlice';
import back from '/arrow-back.svg';
import Cancel from '/cancel.png';
import Empty from '/empty.png';
import "./StyleSaidbar.css";

function SaidBar({ open, setOpen }) {
    const { cart } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

    return (
        <>
            {open && <div className="overlay" onClick={() => setOpen(false)} />}

            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${open ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out w-[48%] flex flex-col`}
            >
                <div className="flex gap-2 items-center mt-10 mb-5 px-5">
                    <button onClick={() => setOpen(false)} className="w-12 flex items-center">
                        <img className="cursor-pointer" src={back} alt="Back" />
                    </button>
                    <h2 className="font-bold text-3xl text-[#750000]">Корзина</h2>
                </div>

                <div className="overflow-y-auto flex-grow px-5 scrollbar-custom">
                    <ul>
                        {cart.length > 0 ? (
                            cart.map((product, index) => (
                                <li
                                    key={`${product.id}-${index}`}
                                    className="flex justify-between items-center border-b px-5 py-5 border mb-[30px] rounded-2xl text-gray-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            className="w-25 cursor-pointer rounded-full"
                                            src={product.image}
                                            alt={product.title}
                                        />
                                        <div>
                                            <h4 className="text-[#750000] text-lg font-bold">{product.title}</h4>
                                            <p className="text-[#533333] text-lg font-medium">{product.category}</p>
                                            <p className="text-black text-2xl">{product.price} ₽</p>
                                        </div>
                                    </div>
                                    <button
                                        className="w-18"
                                        onClick={() => dispatch(removeFromCart(product.id))}
                                    >
                                        <img className="cursor-pointer" src={Cancel} alt="Cancel" />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <div className="flex items-center flex-col">
                                <p className="text-center font-bold text-2xl mt-5 text-primary">
                                    Ваша корзина пуста
                                </p>
                                <img src={Empty} className="w-[300px]" alt="Empty cart" />
                                <p className="text-2xl text-[#533333] w-[353px] text-center">
                                    Добавьте хотя бы один товар, чтобы сделать заказ
                                </p>
                            </div>
                        )}
                    </ul>
                </div>

                {cart.length > 0 && (
                    <div className="payment-bar p-5 flex justify-between items-center rounded-t-3xl">
                        <div className=" text-primary  text-3xl font-bold">
                            К оплате: <span className="text-3xl text-black  ">{totalPrice} ₽</span>
                        </div>
                        <button className="bg-white border-3 font-bold rounded-2xl py-3 px-6 text-primary border-primary cursor-pointer">
                            Заказать
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default SaidBar;
