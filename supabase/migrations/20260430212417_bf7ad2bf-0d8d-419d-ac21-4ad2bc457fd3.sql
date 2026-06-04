-- Add SET search_path to functions missing it
ALTER FUNCTION public.set_updated_at() SET search_path = public;
ALTER FUNCTION public.set_order_number() SET search_path = public, extensions;
ALTER FUNCTION public.enforce_single_default_address() SET search_path = public;
ALTER FUNCTION public.generate_customer_id(uuid, text, text) SET search_path = public, extensions;

-- Revoke EXECUTE on internal SECURITY DEFINER / trigger helpers
REVOKE EXECUTE ON FUNCTION public.generate_customer_id(uuid, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_order_number() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enforce_single_default_address() FROM PUBLIC, anon, authenticated;

-- has_role MUST stay callable by signed-in users (used by RLS policies)
-- but should not be callable by anon
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
