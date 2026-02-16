/**
 * Map Firebase Auth error codes to user-friendly messages.
 * 400 Bad Request from signInWithPassword is often one of these.
 */
export function getAuthErrorMessage(error: unknown): string {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? (error as { code?: string }).code
      : '';
  const message =
    error && typeof error === 'object' && 'message' in error
      ? String((error as { message?: string }).message)
      : '';

  // Firebase JS SDK codes
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password. Check credentials or create a user in Firebase Console → Authentication → Users.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is not enabled. In Firebase Console → Authentication → Sign-in method, enable "Email/Password".';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Try again later or reset your password.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      break;
  }

  // 400 response body sometimes appears in message (REST API phrases)
  const m = message.toLowerCase();
  if (m.includes('operation_not_allowed') || m.includes('operation not allowed'))
    return 'Email/Password sign-in is not enabled. In Firebase Console → Authentication → Sign-in method, enable "Email/Password".';
  if (m.includes('invalid_login_credentials') || m.includes('invalid_credential') || m.includes('email_not_found'))
    return 'Invalid email or password. Create a user in Firebase Console → Authentication → Users, then try again.';
  if (m.includes('invalid_email'))
    return 'Please enter a valid email address.';

  return message || 'Login failed. Enable Email/Password in Firebase and create a user (see steps below).';
}
