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
        onSuccess: async (tokenResponse) => {
            try {
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });

                if (!userInfoResponse.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const userInfo = await userInfoResponse.json();

                dispatch(setCredentials({
                    user: {
                        id: userInfo.sub,
                        email: userInfo.email,
                        name: userInfo.name,
                        role: 'user'
                    },
                    token: tokenResponse.access_token
                }));

                toast.success(`Welcome, ${userInfo.given_name || 'User'}!`);
                navigate('/dashboard');
            } catch (error) {
                console.error('Google User Info Error:', error);
                toast.error('Failed to get user details');
            }
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
