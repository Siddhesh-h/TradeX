import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    ArrowRight,
    BarChart3,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    TrendingUp,
    Wallet,
} from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({
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

            const response = await axios.post(
                "http://localhost:3002/api/auth/login",
                formData,
                {
                    withCredentials: true,
                },
            );

            console.log(response.data);

            /*
              Dashboard is a separate Vite application,
              so use its actual development URL here.
            */

            window.location.href = "http://localhost:5173";
        } catch (error) {
            setError(
                error.response?.data?.message || "Invalid email or password",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:px-10">
                {/* Login Form */}

                <div className="mx-auto w-full max-w-md lg:order-1">
                    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                        <div>
                            <p className="text-sm font-medium text-[#387ed1]">
                                Welcome back
                            </p>

                            <h1 className="mt-2 text-3xl font-semibold text-slate-800">
                                Log in to TradeX
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Access your portfolio and trading dashboard
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
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-700">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="cursor-pointer text-xs font-medium text-[#387ed1] hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

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
                                        placeholder="Enter your password"
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
                                {loading ? "Logging in..." : "Log in"}

                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <p className="mt-7 text-center text-sm text-slate-500">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-[#387ed1] hover:underline"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Content */}

                <div className="hidden lg:block lg:order-2">
                    <div className="max-w-lg">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#387ed1]">
                            <BarChart3 size={17} />
                            Your portfolio. One dashboard.
                        </div>

                        <h2 className="text-5xl font-semibold leading-tight tracking-tight text-slate-800">
                            Everything you need to
                            <span className="text-[#387ed1]">
                                {" "}
                                trade smarter
                            </span>
                            .
                        </h2>

                        <p className="mt-6 max-w-md text-lg leading-8 text-slate-500">
                            Monitor your portfolio, review orders, manage funds,
                            and follow market opportunities.
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <InfoCard
                                icon={<Wallet size={22} />}
                                title="Funds"
                                text="Track available balance"
                            />

                            <InfoCard
                                icon={<TrendingUp size={22} />}
                                title="Holdings"
                                text="Monitor your portfolio"
                            />

                            <InfoCard
                                icon={<BarChart3 size={22} />}
                                title="Orders"
                                text="Review trading activity"
                            />

                            <InfoCard
                                icon={<ShieldCheck size={22} />}
                                title="Secure"
                                text="Protected account access"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const InfoCard = ({ icon, title, text }) => {
    return (
        <div className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#387ed1]">
                {icon}
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">{title}</h3>

            <p className="mt-1 text-sm text-slate-500">{text}</p>
        </div>
    );
};

export default Login;
