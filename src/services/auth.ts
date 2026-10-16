import { AuthUser, UserRole } from '@/types';

const AUTH_STORAGE_KEY = 'inspire_mock_auth_user';

let currentAuthUser: AuthUser | null = (() => {
  try {
    const saved = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
})();

const listeners: Array<(user: AuthUser | null) => void> = [];

export function subscribeAuth(listener: (user: AuthUser | null) => void) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

function notify() {
  listeners.forEach((l) => l(currentAuthUser));
}

export async function mockLogin(
  email: string,
  password?: string,
  role: UserRole = 'super_admin'
): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 150));

  // Simple validation for demo
  if (email && email.includes('@')) {
    const nameMap: Record<UserRole, string> = {
      super_admin: 'Mrs. Ayesha Khan (Admin)',
      office_staff: 'Mr. Tariq Mahmood (Office)',
      content_editor: 'Ms. Sana Malik (Editor)',
      teacher: 'Mr. Usman Raza (Teacher)',
    };

    const user: AuthUser = {
      id: `usr-${role}`,
      email,
      full_name: nameMap[role] || 'School Staff',
      role,
      is_active: true,
    };

    currentAuthUser = user;
    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
    notify();
    return user;
  }

  throw new Error('Invalid credentials');
}

export async function mockLogout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  currentAuthUser = null;
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
  notify();
}

export function getCurrentUser(): AuthUser | null {
  return currentAuthUser;
}
