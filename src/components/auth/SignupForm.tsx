import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { signupSchema, type SignupInput } from '../../schemas/auth.schema';
import { useSignup } from '../../hooks/auth/useSignup';
import GoogleLoginBtn from './GoogleLoginBtn';
import Button from '../ui/Button';

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
    });

    const { mutate: signup, isPending } = useSignup();

    const onSubmit = (data: SignupInput) => {
        signup(data);
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
                <p className="text-gray-500">Start your 30-day free trial.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                    <input
                        {...register('name')}
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Create a password"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters.</p>
                </div>

                <Button
                    type="submit"
                    isLoading={isPending}
                    className="w-full"
                    size="md"
                    disabled={isPending}
                >
                    Get started
                </Button>

                <GoogleLoginBtn />

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
}
