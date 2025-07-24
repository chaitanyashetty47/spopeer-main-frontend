
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Generate a new UUID for public.profiles
  new_user_id := gen_random_uuid();
  
  -- Insert into public.users with new ID and store auth ID
  INSERT INTO public.profiles (id, auth_user_id, name, email, role)
  VALUES (new_user_id, NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email, 'athlete');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for updates to auth.users
CREATE OR REPLACE FUNCTION public.handle_updated_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the corresponding public.users record
  UPDATE public.profiles
  SET name = NEW.raw_user_meta_data->>'full_name',
      email = NEW.email
  WHERE auth_user_id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for deletes from auth.users
CREATE OR REPLACE FUNCTION public.handle_deleted_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete the corresponding public.users record
  DELETE FROM public.profiles
  WHERE auth_user_id = OLD.id;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

  create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_updated_user();

  create trigger on_auth_user_deleted
  after delete on auth.users
  for each row execute procedure public.handle_deleted_user();