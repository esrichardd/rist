import { useEffect, useMemo, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { AuthContext } from "./auth.context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuth(!!currentUser);
            setLoading(false);
        });
        return () => unsubuscribe();
    }, []);

    const authContextValue = useMemo(() => ({
        user,
        loading,
        isAuth,
    }), [user, loading, isAuth]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}