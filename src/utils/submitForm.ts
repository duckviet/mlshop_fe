// app/actions/submitForm.ts
"use server";

export interface FormData {
  username: string;
  email: string;
}

export interface FormError {
  field: string;
  message: string;
}

export async function submitForm(
  data: FormData
): Promise<{ success: boolean; errors?: FormError[] }> {
  const errors: FormError[] = [];

  if (!data.username) {
    errors.push({ field: "username", message: "Username is required." });
  }

  if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.push({ field: "email", message: "A valid email is required." });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true };
}
