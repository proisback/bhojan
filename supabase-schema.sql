-- ═══════════════════════════════════════════════════════════
-- BHOJAN — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════

-- 1. HOUSEHOLDS
create table households (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  name text not null default '',
  servings int not null default 6,
  has_baby boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table households enable row level security;

create policy "Users can read own household"
  on households for select using (owner_id = auth.uid());
create policy "Users can insert own household"
  on households for insert with check (owner_id = auth.uid());
create policy "Users can update own household"
  on households for update using (owner_id = auth.uid());

-- 2. FAMILY MEMBERS
create table family_members (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade not null,
  name text not null default '',
  role text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table family_members enable row level security;

create policy "Members visible to household owner"
  on family_members for select using (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can insert members"
  on family_members for insert with check (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can update members"
  on family_members for update using (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can delete members"
  on family_members for delete using (
    household_id in (select id from households where owner_id = auth.uid())
  );

-- 3. PREFERENCES
create table preferences (
  household_id uuid primary key references households(id) on delete cascade,
  regions text[] not null default '{}',
  spice text not null default 'medium',
  max_effort int not null default 45,
  liked_meals text[] not null default '{}',
  disliked_meals text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table preferences enable row level security;

create policy "Prefs visible to household owner"
  on preferences for select using (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can insert prefs"
  on preferences for insert with check (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can update prefs"
  on preferences for update using (
    household_id in (select id from households where owner_id = auth.uid())
  );

-- 4. WEEKLY PLANS
create table weekly_plans (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade not null,
  week_start date not null,
  plan_data jsonb not null default '{}',
  locked_data jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(household_id, week_start)
);

alter table weekly_plans enable row level security;

create policy "Plans visible to household owner"
  on weekly_plans for select using (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can insert plans"
  on weekly_plans for insert with check (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can update plans"
  on weekly_plans for update using (
    household_id in (select id from households where owner_id = auth.uid())
  );

-- 5. MEAL RATINGS (weekly review: cooked/skipped/repeat)
create table meal_ratings (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade not null,
  week_start date not null,
  meal_key text not null,
  meal_id text not null,
  rating text not null,
  created_at timestamptz not null default now(),
  unique(household_id, week_start, meal_key)
);

alter table meal_ratings enable row level security;

create policy "Ratings visible to household owner"
  on meal_ratings for select using (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can insert ratings"
  on meal_ratings for insert with check (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can update ratings"
  on meal_ratings for update using (
    household_id in (select id from households where owner_id = auth.uid())
  );

-- 6. GROCERY CHECKS
create table grocery_checks (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade not null,
  week_start date not null,
  item_name text not null,
  checked boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(household_id, week_start, item_name)
);

alter table grocery_checks enable row level security;

create policy "Grocery visible to household owner"
  on grocery_checks for select using (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can insert grocery"
  on grocery_checks for insert with check (
    household_id in (select id from households where owner_id = auth.uid())
  );
create policy "Owner can update grocery"
  on grocery_checks for update using (
    household_id in (select id from households where owner_id = auth.uid())
  );

-- ═══ INDEXES ═══
create index idx_family_members_household on family_members(household_id);
create index idx_weekly_plans_household_week on weekly_plans(household_id, week_start);
create index idx_meal_ratings_household_week on meal_ratings(household_id, week_start);
create index idx_grocery_checks_household_week on grocery_checks(household_id, week_start);

-- ═══ UPDATED_AT TRIGGER ═══
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger households_updated_at before update on households
  for each row execute function update_updated_at();
create trigger preferences_updated_at before update on preferences
  for each row execute function update_updated_at();
create trigger weekly_plans_updated_at before update on weekly_plans
  for each row execute function update_updated_at();
create trigger grocery_checks_updated_at before update on grocery_checks
  for each row execute function update_updated_at();
