import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup, login } from '../lib/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
            setError('All fields are required');
            return;
        }

        setError('');
        dispatch(signup(formData));
        dispatch(login({ email: formData.email, password: formData.password }));
        alert("submit");
        navigate('/');
    };

    return (
        <div className='container flex flex-col items-center'>
            <h2 className='font-medium text-3xl my-4 mb-8 text-[#750100]'>Sign Up</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
                <input
                    className='ring-0 outline-none focus:ring-0 border w-[400px] px-6 py-2 pl-2 rounded-md text-lg'
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    onChange={handleChange}
                    value={formData.name}
                />
                <input
                    className='ring-0 outline-none focus:ring-0 border w-[400px] px-6 py-2 pl-2 rounded-md text-lg'
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    className='ring-0 outline-none focus:ring-0 border w-[400px] px-6 py-2 pl-2 rounded-md text-lg'
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    onChange={handleChange}
                    value={formData.password}
                />

                {error && <p className='text-red-500'>{error}</p>}

                <button
                    className='bg-[#750101] w-[400px] text-white px-4 py-2 rounded-md text-lg cursor-pointer'
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
