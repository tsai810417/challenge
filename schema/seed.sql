create temporary table positions (position_at timestamptz, latitude float, longitude float, address text);

\copy positions from 'schema/positions.csv' header csv;

with new_user as (
  insert into logistimatics.user (name, email)
  select 'Demo', 'demo@logistimatics.com'
  returning id
),
new_user_password as (
  insert into logistimatics_private.user_account (id, password_hash)
  select new_user.id, crypt('demo', gen_salt('bf'))
  from new_user
  returning id
),
new_device as (
  insert into logistimatics.device (user_id, name, battery_percentage)
  select new_user.id, 'Tracker A', 100
  from new_user
  returning id
)
insert into logistimatics.position (device_id, position_at, latitude, longitude, address)
select new_device.id, position_at, latitude, longitude, address
from positions
join new_device on true;
