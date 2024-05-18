import axios from '../api/axios';
import { useAuthContext } from './useAuthContext.jsx';

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const login = async (email) => {
        try {
            const response = await axios.post('/login', { email })

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const json = await response.data;

            if (!json) {
                throw new Error('Invalid response from server');
            }

            // Save the JWT to local storage
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return { login };
};
