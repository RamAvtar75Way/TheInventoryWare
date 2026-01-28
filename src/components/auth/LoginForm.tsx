import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { loginSchema, type LoginInput } from '../../schemas/auth.schema';
import { useLogin } from '../../hooks/auth/useLogin';
import GoogleLoginBtn from './GoogleLoginBtn';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate: login, isPending } = useLogin();

    const onSubmit = (data: LoginInput) => {
        login(data);
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                <p className="text-gray-500">Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6455c2] focus:border-transparent outline-none transition-all"
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
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6455c2] focus:border-transparent outline-none transition-all"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#6455c2] focus:ring-[#6455c2]" />
                        <span className="text-sm text-gray-600">Remember for 30 days</span>
                    </label>
                    <a href="#" className="text-sm font-medium text-[#6455c2] hover:text-[#5243b0]">
                        Forgot password
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#6455c2] text-white font-medium py-2.5 rounded-lg hover:bg-[#5243b0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Signing in...' : 'Sign in'}
                </button>

                <GoogleLoginBtn />

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-[#6455c2] hover:text-[#5243b0]">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
