import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (authUser) => {
    try {
      // Try to fetch existing profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profile) {
        let finalRole = profile.role;
        // Override for primary admin
        if (authUser.email.toLowerCase().includes('arindam') || authUser.email.toLowerCase().includes('admin')) {
          finalRole = 'superuser';
        }
        return { ...authUser, role: finalRole, name: profile.name };
      }

      // If no profile, insert a default one
      let defaultRole = 'tech';
      if (authUser.email.toLowerCase().includes('arindam') || authUser.email.toLowerCase().includes('admin')) {
        defaultRole = 'superuser';
      }

      const newProfile = {
        id: authUser.id,
        email: authUser.email,
        name: defaultName,
        role: defaultRole
      };

      const { data: insertedProfile, error: insertError } = await supabase
        .from('profiles')
        .insert([newProfile])
        .select()
        .single();
        
      if (insertedProfile) {
        return { ...authUser, role: insertedProfile.role, name: insertedProfile.name };
      }
      
      // Fallback if insert fails
      return { ...authUser, role: 'tech', name: defaultName };
      
    } catch (err) {
      console.error("Error fetching profile:", err);
      return { ...authUser, role: 'tech', name: authUser.email.split('@')[0] };
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const enrichedUser = await fetchProfile(session.user);
        setUser(enrichedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const enrichedUser = await fetchProfile(session.user);
        setUser(enrichedUser);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
