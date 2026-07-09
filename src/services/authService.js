import { supabase } from './supabaseClient';

export const authService = {
    async signUp(email, password, fullName) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: fullName
                }
            }
        });
        if (error) throw error;
        return data;
    },


    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    },


    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },


    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    }
};
