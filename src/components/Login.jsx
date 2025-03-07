import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../lib/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, loginError } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) return;
        dispatch(login(formData));
    };

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    return (
        <div className='container flex flex-col items-center'>
            <h2 className='font-medium text-3xl my-4 mb-8 text-[#750100]'>Login</h2>
            <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
                <input
                    className='border w-[400px] px-6 py-2 pl-2 rounded-md text-lg'
                    type="text"
                    name="email"
                    placeholder='Enter email'
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    className='border w-[400px] px-6 py-2 pl-2 rounded-md text-lg'
                    type="password"
                    name="password"
                    placeholder='Enter password'
                    onChange={handleChange}
                    value={formData.password}
                />
                <button
                    className='bg-[#750101] w-[400px] text-white px-4 py-2 rounded-md text-lg cursor-pointer'
                    type='submit'>
                    Login
                </button>
            </form>
            {loginError && <p className='text-red-700'>{loginError}</p>}
        </div>
    );
};

export default Login;
