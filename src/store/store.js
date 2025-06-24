// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer'; // ✅ FIXED path
import { cartReducer } from '@/reducers/cartReducer';

export const store = configureStore({
	reducer: {
		user: authReducer,
		cart: cartReducer,
	},
});
