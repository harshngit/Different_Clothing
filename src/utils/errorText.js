export const formatFirebaseAuthError = (error) => {
    const raw = typeof error === 'string' ? error : (error?.message || '');
    // Extract code inside parentheses e.g., (auth/invalid-email)
    const match = raw.match(/\(([^)]+)\)/);
    const code = (match?.[1] || '').toLowerCase();

    const messages = {
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/network-request-failed': 'Network error. Check your connection and try again.',
        'auth/invalid-credential': 'Invalid email or password.',
    };

    if (messages[code]) return messages[code];

    // Fallback generic message without exposing raw Firebase text
    return 'Something went wrong. Please try again.';
};


