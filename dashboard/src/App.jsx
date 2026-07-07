import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "sonner";

import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<Home />} />
                </Routes>

                <Toaster position="top-right" richColors closeButton />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
