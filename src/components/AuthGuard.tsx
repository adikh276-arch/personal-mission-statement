import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { query } from "@/lib/db";

const initUser = async (userId: string) => {
    // Ensure table exists (Automatic schema generation check part)
    await query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
    await query(`
    CREATE TABLE IF NOT EXISTS missions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        statement TEXT NOT NULL,
        values TEXT[] NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );
  `);

    // Phase 11 & 12: User initialization
    const existingUser = await query("SELECT * FROM users WHERE id = $1", [userId]);
    if (existingUser.length === 0) {
        await query("INSERT INTO users (id) VALUES ($1)", [userId]);
    }
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isAuthResolved, setIsAuthResolved] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const resolveAuth = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const token = params.get("token");

                if (token) {
                    // Handshake
                    const response = await fetch("https://api.mantracare.com/user/user-info", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (!response.ok) {
                        throw new Error("Handshake failed");
                    }

                    const data = await response.json();
                    if (data.user_id) {
                        sessionStorage.setItem("user_id", data.user_id.toString());
                        // Remove token from URL
                        window.history.replaceState({}, "", window.location.pathname);
                    } else {
                        throw new Error("No user_id in response");
                    }
                }

                const storedUserId = sessionStorage.getItem("user_id");

                if (!storedUserId) {
                    // Failure handling
                    window.location.href = "/token";
                    return;
                }

                // Initialize user in DB
                await initUser(storedUserId);
                setIsAuthResolved(true);
            } catch (error) {
                console.error("Auth error:", error);
                window.location.href = "/token";
            }
        };

        resolveAuth();
    }, []);

    if (!isAuthResolved) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
