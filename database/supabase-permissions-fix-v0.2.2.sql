create or replace function public.find_available_tables(
  p_date date,
  p_time time,
  p_guests integer,
  p_preferred_zone text default null
)
returns table (
  id uuid,
  table_code text,
  seats integer,
  zone text,
  description text,
  request_score integer
)
language sql
stable
security definer
set search_path = public
as $$
  select
    t.id,
    t.table_code,
    t.seats,
    t.zone,
    t.description,
    t.request_score
  from public.restaurant_tables t
  where
    t.is_active = true
    and t.seats >= p_guests
    and not exists (
      select 1
      from public.reservations r
      where
        r.table_id = t.id
        and r.status in ('confirmed', 'requested')
        and tsrange(r.reservation_start, r.reservation_end, '[)') &&
          tsrange(
            p_date::timestamp + p_time,
            p_date::timestamp + p_time + interval '2 hours',
            '[)'
          )
    )
  order by
    case
      when p_preferred_zone is not null
        and lower(t.zone) like '%' || lower(p_preferred_zone) || '%'
      then 0
      else 1
    end,
    t.request_score desc,
    t.seats asc,
    t.table_code asc;
$$;

grant usage on schema public to anon, authenticated, service_role;
grant execute on function public.find_available_tables(date, time, integer, text) to anon, authenticated, service_role;
grant execute on function public.create_reservation_if_available(date, time, integer, text, text, text, text, text) to anon, authenticated, service_role;
