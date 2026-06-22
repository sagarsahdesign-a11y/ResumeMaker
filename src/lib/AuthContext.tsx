import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface UserData {
  email: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  loginLocalDev: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserData = async (uid?: string) => {
    const userId = uid || user?.uid;
    if (!userId) return;

    if (userId === 'dev-user') {
      const savedCredits = Number(localStorage.getItem('dev_credits') || '999');
      setUserData({
        email: 'developer@local.test',
        credits: savedCredits
      });
      return;
    }

    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data() as UserData);
      } else {
        const newUser: UserData = {
          email: auth.currentUser?.email || '',
          credits: 1 // 1 free generation as per PRD
        };
        await setDoc(docRef, {
          ...newUser,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setUserData(newUser);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const devActive = localStorage.getItem('dev_user_active') === 'true';
    if (devActive) {
      const devUser = {
        uid: 'dev-user',
        email: 'developer@local.test',
        emailVerified: true,
      } as any;
      setUser(devUser);
      const savedCredits = Number(localStorage.getItem('dev_credits') || '999');
      setUserData({
        email: 'developer@local.test',
        credits: savedCredits
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await refreshUserData(u.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      console.error("Login failed:", e);
      alert(`Sign-in failed: ${e.message || e}`);
    }
  };

  const logout = async () => {
    localStorage.removeItem('dev_user_active');
    await signOut(auth);
  };

  const loginLocalDev = () => {
    const devUser = {
      uid: 'dev-user',
      email: 'developer@local.test',
      emailVerified: true,
    } as any;
    setUser(devUser);
    localStorage.setItem('dev_user_active', 'true');
    const savedCredits = Number(localStorage.getItem('dev_credits') || '999');
    setUserData({
      email: 'developer@local.test',
      credits: savedCredits
    });
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, login, logout, refreshUserData, loginLocalDev }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
