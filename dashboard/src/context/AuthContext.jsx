import { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";

const AuthContext = createContext(null);

const LANDING_LOGIN_URL = import.meta.env.VITE_LANDING_LOGIN_URL;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [dataVersion, setDataVersion] = useState(0);

    const refreshDashboardData = () => {
        setDataVersion((previous) => previous + 1);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/auth/me");

                setUser(response.data.user);
            } catch (error) {
                console.error("Authentication check failed:", error);

                window.location.href = LANDING_LOGIN_URL;
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await api.post("/auth/logout");

            setUser(null);

            window.location.href = LANDING_LOGIN_URL;
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const refreshUser = async () => {
        try {
            const response = await api.get("/auth/me");

            setUser(response.data.user);
        } catch (error) {
            console.error("Failed to refresh user:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#387ed1]" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading your account...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                logout,
                refreshUser,
                dataVersion,
                refreshDashboardData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
