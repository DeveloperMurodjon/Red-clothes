import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SaidBar from './SaidBar';

const Navbar = () => {
	const [open, setOpen] = useState(false);

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

				<Link to='/profile'>
					<i className='fa-regular fa-user'></i>
				</Link>
			</div>

			<SaidBar open={open} setOpen={setOpen} />
		</div>
	);
};

export default Navbar;
