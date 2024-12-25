import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/supabase';

// Sample user data - replace with your actual user data
const existingUsers = [
  {
    username: 'vivek',
    github_username: 'vivekascoder',
    points: 1000,
    contributions: 50,
    email: 'vivek@devcoin.app',
  },
  {
    username: 'aditya',
    github_username: 'adityaoberai',
    points: 800,
    contributions: 40,
    email: 'aditya@devcoin.app',
  },
  {
    username: 'abhishek',
    github_username: 'abhishek-bits',
    points: 750,
    contributions: 35,
    email: 'abhishek@devcoin.app',
  },
  {
    username: 'aniket',
    github_username: 'aniketsingh13',
    points: 700,
    contributions: 30,
    email: 'aniket@devcoin.app',
  },
  {
    username: 'shivam',
    github_username: 'shivam-bits',
    points: 650,
    contributions: 25,
    email: 'shivam@devcoin.app',
  },
  // Add more users as needed
];

// Supabase client setup
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // This should be the service key, not the anon key

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Function to generate a secure random password
const generatePassword = () => {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

// Function to migrate a single user
const migrateUser = async (userData: typeof existingUsers[0]) => {
  try {
    const password = generatePassword();
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: password,
      email_confirm: true,
    });

    if (authError) throw authError;
    
    if (!authData.user) throw new Error('User creation failed');

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          username: userData.username,
          github_username: userData.github_username,
          points: userData.points,
          contributions: userData.contributions,
        },
      ]);

    if (profileError) throw profileError;

    // Make the first user (vivek) an admin
    if (userData.username === 'vivek') {
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([
          {
            user_id: authData.user.id,
          },
        ]);

      if (adminError) throw adminError;
    }

    console.log(`Migrated user ${userData.username}:`);
    console.log(`Email: ${userData.email}`);
    console.log(`Password: ${password}`);
    console.log('---');

    return { email: userData.email, password };
  } catch (error) {
    console.error(`Failed to migrate user ${userData.username}:`, error);
    return null;
  }
};

// Main migration function
const migrateAllUsers = async () => {
  console.log('Starting user migration...');
  const credentials: { email: string; password: string }[] = [];

  for (const user of existingUsers) {
    const result = await migrateUser(user);
    if (result) {
      credentials.push(result);
    }
  }

  // Save credentials to a file
  const fs = require('fs');
  const credentialsJson = JSON.stringify(credentials, null, 2);
  fs.writeFileSync('user_credentials.json', credentialsJson);

  console.log('\nMigration complete!');
  console.log('User credentials have been saved to user_credentials.json');
};

// Run the migration
migrateAllUsers().catch(console.error);
