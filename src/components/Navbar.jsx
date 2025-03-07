import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SaidBar from './SaidBar';
import { logout } from '../lib/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(state => state.user)
	const [open, setOpen] = useState(false);

	const hanleLogout = () => {
		dispatch(logout())
	}

	return (
		<div className='relative container border-b-2 border-primary flex justify-between items-center py-3'>
			<Link to='/' className='flex items-center gap-5 text-primary'>
				<img src='/logo.svg' alt='logo' />
				<div>
					<span className='block text-3xl font-semibold'>Red Clothes</span>
					<span className='text-sm'>Магазин одежды для практики</span>
				</div>
			</Link>

			<div className='flex gap-5 items-center text-primary text-2xl'>
				<button
					onClick={() => setOpen(true)}
					className='flex cursor-pointer items-center gap-2'
				>
					<i className='fa-solid fa-shopping-cart'></i>
					<span>30 595 ₽</span>
				</button>

				<Link to='/wishlist'>
					<i className='fa-regular fa-heart'></i>
				</Link>

				{currentUser ? (
					<div className='flex items-center gap-3 text-base'>
						<span className='font-semibold'>
							Welcome, {currentUser.name}
						</span>
						<button onClick={hanleLogout} className='cursor-pointer border px-3 py-1 rounded'>
							Logout
						</button>
					</div>
				) : (
					<div className='flex items-center gap-3 text-base'>
						<Link to='/login' className='border px-3 py-1 rounded'>
							Login
						</Link>
						<Link to='/signup' className='border px-3 py-1 rounded'>
							Sign Up
						</Link>
					</div>
				)}
			</div>

			<SaidBar open={open} setOpen={setOpen} />
		</div>
	);
};

export default Navbar;
