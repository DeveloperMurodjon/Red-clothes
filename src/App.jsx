import React, { useEffect } from 'react';
import { Filter, Home, Navbar, Wishlist } from './components';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
	setError,
	setIsLoading,
	setWishlist,
	setProducts,
	setCart,
} from './lib/slices/productsSlice';
import productsService from './service/products';
import { useDispatch, useSelector } from 'react-redux';
import { getFromLocal, setToLocal } from './lib/ls';

const App = () => {
	const { wishlist, cart } = useSelector(state => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		const getProducts = async () => {
			dispatch(setIsLoading(true));
			try {
				const { data } = await productsService.getAll();
				dispatch(setProducts(data));
				dispatch(setError(null));
			} catch (error) {
				dispatch(setError(error));
			} finally {
				dispatch(setIsLoading(false));
			}
		};
		getProducts();

		const storedWishlist = getFromLocal('wishlist');
		if (storedWishlist) {
			dispatch(setWishlist(storedWishlist));
		}
		const storedCart = getFromLocal('cart');
		if (storedCart) {
			dispatch(setCart(storedCart));
		}
	}, [dispatch]);

	useEffect(() => {
		setToLocal('wishlist', wishlist);
	}, [wishlist]);

	useEffect(() => {
		setToLocal('cart', cart);
	}, [cart]);

	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/filter/:q' element={<Filter />} />
				<Route path='/wishlist' element={<Wishlist />} />
			</Routes>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={true}
				draggable
				pauseOnHover={false}
				theme="light"
			/>
		</div>
	);
};

export default App;
