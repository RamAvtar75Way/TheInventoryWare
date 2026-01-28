import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authService } from '../../services/auth.service';
import { setCredentials } from '../../store/slices/authSlice';
import type { SignupInput } from '../../schemas/auth.schema';
import toast from 'react-hot-toast';

export const useSignup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (data: SignupInput) => authService.signup(data),
        onSuccess: (data) => {
            dispatch(setCredentials(data));
            toast.success('Account created successfully');
            navigate('/dashboard');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Signup failed');
        },
    });
};
