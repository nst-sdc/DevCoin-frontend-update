import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/supabase';

const users = [
  {
    username: 'siddharth-pareek',
    name: 'Siddharth Pareek',
    role: 'Frontend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'siddharth-pareek',
    points: 100,
    email: 'siddharth.pareek@devcoin.app',
  },
  {
    username: 'nihalchollampat',
    name: 'NIHAL C',
    role: 'Frontend Developer',
    avatar_url: 'https://github.com/nst-sdc/Member/releases/download/m/nihal.jpg',
    github_username: 'NIhalChollampat',
    email: 'nihalchollampat@gmail.com',
    adypu_email: 'nihal.c@adypu.edu.in',
    linkedin_url: 'https://www.linkedin.com/in/nihal-c-99704132b/',
    points: 100,
  },
  {
    username: 'ayush-mandal',
    name: 'Ayush Kumar Mandal',
    role: 'Frontend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'ayush-mandal',
    points: 250,
    email: 'ayush.mandal@devcoin.app',
  },
  {
    username: 'neel3o115',
    name: 'Neel',
    role: 'Frontend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'neel3o115',
    email: 'neelarm.code@gmail.com',
    adypu_email: 'neel.verma@adypu.edu.in',
    linkedin_url: 'https://linkedin.com/in/neel-verma-141844318/',
    points: 250,
  },
  {
    username: 'nitya-jain',
    name: 'Nitya Jain',
    role: 'Frontend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'nitya-jain',
    points: 200,
    email: 'nitya.jain@devcoin.app',
  },
  {
    username: 'aditya-prakash',
    name: 'Aditya Prakash',
    role: 'Frontend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'aditya-prakash',
    points: 100,
    email: 'aditya.prakash@devcoin.app',
  },
  {
    username: 'burra-karthikeya',
    name: 'Burra Karthikeya',
    role: 'Backend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'burra-karthikeya',
    points: 100,
    email: 'burra.karthikeya@devcoin.app',
  },
  {
    username: 'gunavanth-reddy',
    name: 'Gunavanth Reddy',
    role: 'Backend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'gunavanth-reddy',
    points: 100,
    email: 'gunavanth.reddy@devcoin.app',
  },
  {
    username: 'abhay-pratap',
    name: 'Abhay Pratap Yadav',
    role: 'Backend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'abhay-pratap',
    points: 100,
    email: 'abhay.pratap@devcoin.app',
  },
  {
    username: 'rahulgupta7777',
    name: 'Rahul Gupta',
    role: 'Backend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'Rahulgupta7777',
    email: 'rahulgupta193246@gmail.com',
    adypu_email: 'rahul.k@adypu.edu.in',
    linkedin_url: 'https://linkedin.com/in/rahul-gupta-992259326',
    points: 100,
  },
  {
    username: 'arohi-jadhav',
    name: 'Arohi Jadhav',
    role: 'Backend Developer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'arohi-jadhav',
    points: 200,
    email: 'arohi.jadhav@devcoin.app',
  },
  {
    username: 'aryanvbw',
    name: 'Vivek Wagdare',
    role: 'DevOps Engineer',
    avatar_url: 'https://avatars.githubusercontent.com/u/92390419?v=4',
    github_username: 'AryanVBW',
    email: 'vivek.aryanvbw@gmail.com',
    adypu_email: 'vivek.wagadare@adypu.edu.in',
    linkedin_url: 'https://www.linkedin.com/in/vivek-wagadare',
    points: 800,
  },
  {
    username: 'ayush-shukla',
    name: 'Ayush Shukla',
    role: 'DevOps Engineer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'ayush-shukla',
    points: 100,
    email: 'ayush.shukla@devcoin.app',
  },
  {
    username: 'sai-thrishul',
    name: 'B Sai Thrishul',
    role: 'DevOps Engineer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'sai-thrishul',
    points: 100,
    email: 'sai.thrishul@devcoin.app',
  },
  {
    username: 'riddhi',
    name: 'Riddhi',
    role: 'Designer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'riddhi',
    points: 150,
    email: 'riddhi@devcoin.app',
  },
  {
    username: 'sakina1303',
    name: 'Sakina',
    role: 'Designer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'sakina1303',
    email: 'sakena1303@gmail.com',
    adypu_email: 'sakina.ahemad@adypu.edu.in',
    linkedin_url: 'https://linkedin.com/in/sakina-ahemad-8b1b3a1b0',
    points: 200,
  },
  {
    username: 'anya_xcode',
    name: 'Ananya Gupta',
    role: 'Designer',
    avatar_url: 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg',
    github_username: 'anya_xcode',
    email: 'ananynagupta@gmail.com',
    adypu_email: 'ananya.gupta@adypu.edu.in',
    linkedin_url: 'https://linkedin.com/in/ananya-gupta-7235a5319',
    points: 100,
  },
];

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

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
const migrateUser = async (userData: typeof users[0]) => {
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
      .insert([{
        id: authData.user.id,
        ...userData,
      }]);

    if (profileError) throw profileError;

    // Make Vivek an admin
    if (userData.github_username.toLowerCase() === 'aryanvbw') {
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([{
          user_id: authData.user.id,
        }]);

      if (adminError) throw adminError;
    }

    console.log(`Migrated user ${userData.name}:`);
    console.log(`Email: ${userData.email}`);
    console.log(`Password: ${password}`);
    console.log('---');

    return { email: userData.email, password };
  } catch (error) {
    console.error(`Failed to migrate user ${userData.name}:`, error);
    return null;
  }
};

// Main migration function
const migrateAllUsers = async () => {
  console.log('Starting user migration...');
  const credentials: { email: string; password: string }[] = [];

  for (const user of users) {
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
