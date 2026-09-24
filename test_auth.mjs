import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kaxtvkughpldytdfkvat.supabase.co';
const supabaseAnonKey = 'sb_publishable_mXZaKu6tEDhaVhcwDypOsg_yBx4dEvB';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAuth() {
  console.log("Logging in...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'arindamdhali21@gmail.com',
    password: 'Arindam@vir18',
  });

  if (authError) {
    console.error("Auth Error:", authError.message);
    return;
  }
  
  const userId = authData.user.id;
  console.log("Logged in! User ID:", userId);
  
  console.log("Fetching profile...");
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) {
    console.error("Profile Error:", profileError);
  } else {
    console.log("Profile Data:", profile);
  }
}

checkAuth();
