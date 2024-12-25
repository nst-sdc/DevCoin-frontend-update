-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create updated_at function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create users table
create table public.users (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    username text unique not null,
    password_hash text not null,
    name text not null,
    role text not null,
    avatar_url text,
    github_username text unique,
    github_id text unique,
    devcoins integer default 0,
    email_verified boolean default false,
    adypu_email text unique,
    linkedin_url text,
    bio text,
    is_active boolean default true,
    last_login timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint valid_email check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    constraint valid_username check (username ~* '^[A-Za-z0-9_-]{3,30}$')
);

-- Create trigger for updated_at
create trigger handle_updated_at
    before update on public.users
    for each row
    execute function public.handle_updated_at();

-- Create function to handle user registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users (
        id,
        email,
        username,
        password_hash,
        name,
        role,
        avatar_url,
        github_username,
        adypu_email,
        linkedin_url
    ) values (
        new.id,
        new.email,
        new.raw_user_meta_data->>'username',
        new.encrypted_password,
        coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'username'),
        coalesce(new.raw_user_meta_data->>'role', 'member'),
        new.raw_user_meta_data->>'avatar_url',
        new.raw_user_meta_data->>'github_username',
        new.raw_user_meta_data->>'adypu_email',
        new.raw_user_meta_data->>'linkedin_url'
    );
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user registration
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- Create function to update user login timestamp
create or replace function public.handle_user_login()
returns trigger as $$
begin
    update public.users
    set last_login = now()
    where id = new.id;
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for user login
create trigger on_auth_user_login
    after update of last_sign_in_at on auth.users
    for each row execute function public.handle_user_login();

-- Enable Row Level Security
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own data"
    on public.users for select
    using (auth.uid() = id);

create policy "Users can update their own data"
    on public.users for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

create policy "Admins can view all users"
    on public.users for select
    using (
        exists (
            select 1
            from public.admin_users
            where user_id = auth.uid()
        )
    );

create policy "Admins can update all users"
    on public.users for update
    using (
        exists (
            select 1
            from public.admin_users
            where user_id = auth.uid()
        )
    );

-- Create index for faster queries
create index users_username_idx on public.users (username);
create index users_email_idx on public.users (email);
create index users_github_username_idx on public.users (github_username);

-- Create profiles table with additional fields from types.ts
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  name text not null,
  role text not null,
  avatar_url text,
  github_username text unique,
  email text,
  adypu_email text,
  linkedin_url text,
  points integer default 0,
  contributions integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  repository_url text not null,
  is_active boolean default false,
  tech_stack text[] default '{}',
  difficulty_level text check (difficulty_level in ('beginner', 'intermediate', 'advanced')),
  maintainer_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create contributions table with additional fields from types.ts
create table public.contributions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  project_id uuid references public.projects,
  type text check (type in ('PR', 'COLLAB', 'EVENT', 'OTHER')) not null,
  description text not null,
  coins integer not null,
  contribution_date timestamp with time zone not null,
  verified boolean default false,
  pull_request_url text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  reviewer_id uuid references auth.users,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create admin_users table
create table public.admin_users (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create settings table
create table public.settings (
  id uuid default uuid_generate_v4() primary key,
  points_per_contribution integer default 10,
  min_points_for_reward integer default 100,
  max_points_per_day integer default 50,
  github_token_enabled boolean default true,
  auto_approve_contributions boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create rewards table
create table public.rewards (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  points_required integer not null,
  quantity_available integer default -1,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reward_claims table
create table public.reward_claims (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  reward_id uuid references public.rewards not null,
  status text check (status in ('pending', 'approved', 'rejected', 'fulfilled')) default 'pending',
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create notifications table
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  message text not null,
  type text check (type in ('contribution', 'reward', 'admin', 'system')) not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add triggers for updated_at
create trigger handle_profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger handle_projects_updated_at before update on public.projects
  for each row execute function public.handle_updated_at();

create trigger handle_contributions_updated_at before update on public.contributions
  for each row execute function public.handle_updated_at();

create trigger handle_settings_updated_at before update on public.settings
  for each row execute function public.handle_updated_at();

create trigger handle_rewards_updated_at before update on public.rewards
  for each row execute function public.handle_updated_at();

create trigger handle_reward_claims_updated_at before update on public.reward_claims
  for each row execute function public.handle_updated_at();

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.contributions enable row level security;
alter table public.admin_users enable row level security;
alter table public.settings enable row level security;
alter table public.rewards enable row level security;
alter table public.reward_claims enable row level security;
alter table public.notifications enable row level security;

-- Create policies
-- Profiles policies
create policy "Profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Projects policies
create policy "Projects are viewable by everyone"
  on projects for select
  using (true);

create policy "Only admins can insert projects"
  on projects for insert
  using (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Only admins can update projects"
  on projects for update
  using (exists (select 1 from admin_users where user_id = auth.uid()));

-- Contributions policies
create policy "Contributions are viewable by everyone"
  on contributions for select
  using (true);

create policy "Users can insert own contributions"
  on contributions for insert
  using (auth.uid() = user_id);

create policy "Only admins can update contributions"
  on contributions for update
  using (exists (select 1 from admin_users where user_id = auth.uid()));

-- Admin users policies
create policy "Admin users are viewable by everyone"
  on admin_users for select
  using (true);

create policy "Only super admins can manage admin users"
  on admin_users for all
  using (exists (select 1 from admin_users where user_id = auth.uid()));

-- Settings policies
create policy "Settings are viewable by everyone"
  on settings for select
  using (true);

create policy "Only admins can manage settings"
  on settings for all
  using (exists (select 1 from admin_users where user_id = auth.uid()));

-- Rewards policies
create policy "Rewards are viewable by everyone"
  on rewards for select
  using (true);

create policy "Only admins can manage rewards"
  on rewards for all
  using (exists (select 1 from admin_users where user_id = auth.uid()));

-- Reward claims policies
create policy "Users can view own reward claims"
  on reward_claims for select
  using (auth.uid() = user_id);

create policy "Users can insert own reward claims"
  on reward_claims for insert
  using (auth.uid() = user_id);

create policy "Only admins can update reward claims"
  on reward_claims for update
  using (exists (select 1 from admin_users where user_id = auth.uid()));

-- Notifications policies
create policy "Users can view own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "Only system can insert notifications"
  on notifications for insert
  using (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Users can update own notifications"
  on notifications for update
  using (auth.uid() = user_id);

-- Insert default settings
insert into public.settings (
  points_per_contribution,
  min_points_for_reward,
  max_points_per_day,
  github_token_enabled,
  auto_approve_contributions
) values (
  10,  -- points per contribution
  100, -- min points for reward
  50,  -- max points per day
  true, -- github token enabled
  false -- auto approve contributions
);

-- Insert initial members from types.ts
insert into public.profiles (
  id,
  username,
  name,
  role,
  avatar_url,
  github_username,
  email,
  adypu_email,
  linkedin_url,
  points
) values
  (uuid_generate_v4(), 'siddharth-pareek', 'Siddharth Pareek', 'Frontend Developer', 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg', 'siddharth-pareek', null, null, null, 100),
  (uuid_generate_v4(), 'nihalchollampat', 'NIHAL C', 'Frontend Developer', 'https://github.com/nst-sdc/Member/releases/download/m/nihal.jpg', 'NIhalChollampat', 'nihalchollampat@gmail.com', 'nihal.c@adypu.edu.in', 'https://www.linkedin.com/in/nihal-c-99704132b/', 100),
  (uuid_generate_v4(), 'ayush-mandal', 'Ayush Kumar Mandal', 'Frontend Developer', 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg', 'ayush-mandal', null, null, null, 250),
  (uuid_generate_v4(), 'neel3o115', 'Neel', 'Frontend Developer', 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg', 'neel3o115', 'neelarm.code@gmail.com', 'neel.verma@adypu.edu.in', 'https://linkedin.com/in/neel-verma-141844318/', 250),
  (uuid_generate_v4(), 'nitya-jain', 'Nitya Jain', 'Frontend Developer', 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg', 'nitya-jain', null, null, null, 200),
  (uuid_generate_v4(), 'aditya-prakash', 'Aditya Prakash', 'Frontend Developer', 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg', 'aditya-prakash', null, null, null, 100),
  (uuid_generate_v4(), 'burra-karthikeya', 'Burra Karthikeya', 'Backend Developer', 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg', 'burra-karthikeya', null, null, null, 100),
  (uuid_generate_v4(), 'gunavanth-reddy', 'Gunavanth Reddy', 'Backend Developer', 'https://github.com/nst-sdc/NIRMAN-submission/releases/download/v1/dorae.jpg', 'gunavanth-reddy', null, null, null, 100);
