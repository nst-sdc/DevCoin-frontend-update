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

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  github_username text unique,
  avatar_url text,
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

-- Create contributions table
create table public.contributions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  project_id uuid references public.projects not null,
  pull_request_url text not null,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  points_awarded integer default 0,
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
