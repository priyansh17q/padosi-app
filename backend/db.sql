-- ============================================================
-- Padosi Pro Database Schema (Supabase SQL Editor me paste karke Run karo)
-- ============================================================

-- Users table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null default 'Padosi',
  avatar text default '',
  created_at timestamptz default now()
);

-- OTP table (login codes)
create table if not exists otps (
  email text primary key,
  code text not null,
  attempts int default 0,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Sessions table (auth tokens)
create table if not exists sessions (
  token text primary key,
  user_id uuid references users(id) on delete cascade not null,
  created_at timestamptz default now()
);

-- Tasks table (community tasks)
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade not null,
  category text not null default 'delivery',
  title text not null,
  price int not null check (price >= 10),
  tip int default 0,
  pickup text default '',
  dropoff text default '',
  note text default '',
  status text default 'open' check (status in ('open', 'accepted', 'in_progress', 'completed', 'cancelled')),
  accepted_by uuid references users(id),
  created_at timestamptz default now()
);

-- Counter offers table
create table if not exists counter_offers (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade not null,
  user_id uuid references users(id) on delete cascade not null,
  amount int not null check (amount >= 1),
  status text default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz default now()
);

-- Notifications table
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade not null,
  title text not null,
  body text default '',
  icon text default 'notifications',
  read boolean default false,
  created_at timestamptz default now()
);

-- Push notification subscriptions (Web Push — for "sabke phone pe notification")
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade not null,
  endpoint text unique not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now()
);

-- Payments (Razorpay — UPI + Card escrow deposits)
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade,
  user_id uuid references users(id) on delete cascade not null,
  razorpay_order_id text not null,
  razorpay_payment_id text,
  amount int not null,
  status text default 'created' check (status in ('created', 'paid', 'failed')),
  created_at timestamptz default now()
);

-- Indexes for fast queries
create index if not exists idx_tasks_user on tasks(user_id);
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_sessions_token on sessions(token);
create index if not exists idx_notifications_user on notifications(user_id);
create index if not exists idx_counter_task on counter_offers(task_id);
create index if not exists idx_push_user on push_subscriptions(user_id);
create index if not exists idx_payments_order on payments(razorpay_order_id);

-- Row Level Security (RLS): SAARI tables pe ON, aur koi policy nahi.
-- Matlab Supabase ki public (anon) key se koi bhi table padh/likh nahi sakta
-- (otps, sessions, users ke emails sab band). Hamara backend service_role key
-- use karta hai, jo RLS ko bypass karti hai, isliye app pe koi asar nahi padta.
alter table users enable row level security;
alter table otps enable row level security;
alter table sessions enable row level security;
alter table tasks enable row level security;
alter table counter_offers enable row level security;
alter table notifications enable row level security;
alter table push_subscriptions enable row level security;
alter table payments enable row level security;
