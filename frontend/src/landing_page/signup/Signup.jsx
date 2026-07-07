import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    User,
} from "lucide-react";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await axios.post(
                "http://localhost:3002/api/auth/signup",
                formData,
                {
                    withCredentials: true,
                },
            );

            navigate("/login");
        } catch (error) {
            setError(
                error.response?.data?.message || "Unable to create account",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:px-10">
                {/* Left Side */}

                <div className="hidden lg:block">
                    <div className="max-w-lg">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#387ed1]">
                            <BarChart3 size={17} />
                            Start investing with TradeX
                        </div>

                        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-800">
                            Invest in your
                            <span className="text-[#387ed1]"> future</span>.
                        </h1>

                        <p className="mt-6 max-w-md text-lg leading-8 text-slate-500">
                            A simple and modern platform to track markets,
                            manage your portfolio, and place trades.
                        </p>

                        <div className="mt-10 space-y-5">
                            <Feature text="₹1,00,000 virtual trading balance" />
                            <Feature text="Track holdings and portfolio performance" />
                            <Feature text="Buy and sell stocks from one dashboard" />
                            <Feature text="Simple and transparent trading experience" />
                        </div>

                        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-sm leading-6 text-slate-500">
                                Practice portfolio management and understand the
                                complete trading workflow through a realistic
                                dashboard experience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Signup Card */}

                <div className="mx-auto w-full max-w-md">
                    <div className="mb-8 lg:hidden">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Trade<span className="text-[#387ed1]">X</span>
                        </h1>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                        <div>
                            <h2 className="text-3xl font-semibold text-slate-800">
                                Create your account
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Start your trading journey with TradeX
                            </p>
                        </div>

                        {error && (
                            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Full name
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#387ed1] focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Email address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#387ed1] focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Password
                                </label>

                                <div className="relative">
                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Minimum 8 characters"
                                        minLength={8}
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-[#387ed1] focus:ring-2 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#387ed1] py-3.5 font-medium text-white transition hover:bg-[#2f6eb9] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create account"}

                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <p className="mt-7 text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-[#387ed1] hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>

                    <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                        By creating an account, you agree to the terms and
                        privacy policy of TradeX.
                    </p>
                </div>
            </section>
        </main>
    );
};

const Feature = ({ text }) => {
    return (
        <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="shrink-0 text-green-500" />

            <p className="text-slate-600">{text}</p>
        </div>
    );
};

export default Signup;
