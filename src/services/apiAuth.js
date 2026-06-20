import { supabase, supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: sesstion } = await supabase.auth.getSession();
  if (!sesstion.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user ?? null;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  //1. update the data
  let updatedData;
  if (fullName) updatedData = { data: { fullName } };
  // if password
  if (password) updatedData = { password };

  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. upload the photo avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3. update the avatar in user
  const { data: updateUser, error: updatedError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedError) throw new Error(updatedError.message);
  return updateUser;
}
