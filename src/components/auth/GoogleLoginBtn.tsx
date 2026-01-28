import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import GoogleIcon from '../svgs/GoogleIcon';

const GoogleLoginBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            // In a real app, you'd send this token to your backend
            console.log("Google Token:", tokenResponse.access_token);

            // Simulating backend verification
            dispatch(setCredentials({
                user: {
                    id: 'google-user-1',
                    email: 'google@example.com',
                    name: 'Google User',
                    role: 'user'
                },
                token: tokenResponse.access_token
            }));

            toast.success('Signed in with Google');
            navigate('/dashboard');
        },
        onError: () => {
            toast.error('Google Sign In Failed');
        }
    });

    return (
        <button
            type="button"
            onClick={() => handleGoogleLogin()}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <GoogleIcon className="w-5 h-5" />
            Sign in with Google
        </button>
    );
};

export default GoogleLoginBtn;
