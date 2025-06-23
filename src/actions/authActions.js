import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db, googleProvider } from "../app/firebase.config";
import {
	signInWithEmailAndPassword,
	signOut,
	setPersistence,
	browserLocalPersistence,
	signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// 🔐 Login with Email
export const loginUsingEmail = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			// Set session persistence (optional but recommended)
			await setPersistence(auth, browserLocalPersistence);

			// Try login
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			// You can return more info than just uid (like email, name, etc.)
			return {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
			};
		} catch (error) {
			return rejectWithValue(error.message || 'Login failed');
		}
	}
);

// 👤 Load User Profile
export const loadUser = createAsyncThunk(
	"auth/loadUser",
	async (uid, { rejectWithValue }) => {
		try {
			const userSnap = await getDoc(doc(db, "users", uid));
			if (userSnap.exists()) {
				return userSnap.data();
			} else {
				return rejectWithValue("User not found");
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// 🔒 Logout
export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
			return true;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// ✏️ Update Profile
export const updateProfile = createAsyncThunk(
	"auth/updateProfile",
	async ({ uid, name, email, phone, role }, { rejectWithValue }) => {
		try {
			await setDoc(doc(db, "users", uid), {
				name, email, phone, role, uid,
			});
			return true;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
