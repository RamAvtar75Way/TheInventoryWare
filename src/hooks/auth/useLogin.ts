import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authService } from '../../services/auth.service';
import { setCredentials } from '../../store/slices/authSlice';
import type { LoginInput } from '../../schemas/auth.schema';
import toast from 'react-hot-toast';

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const from = location.state?.from?.pathname || '/dashboard';

    return useMutation({
        mutationFn: (data: LoginInput) => authService.login(data),
        onSuccess: (data) => {
            dispatch(setCredentials(data));
            toast.success('Successfully logged in');
            navigate(from, { replace: true });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Login failed');
        },
    });
};
