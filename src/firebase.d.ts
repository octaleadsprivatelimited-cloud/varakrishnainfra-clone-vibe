// Fallback type declarations for Firebase when IDE doesn't resolve node_modules.
// The firebase package includes its own types; these are used only if resolution fails.
declare module 'firebase/app' {
  export function initializeApp(config: object): unknown;
}

declare module 'firebase/auth' {
  export interface User {
    uid: string;
    email: string | null;
    [key: string]: unknown;
  }
  export function getAuth(app: unknown): unknown;
  export function signInWithEmailAndPassword(
    auth: unknown,
    email: string,
    password: string
  ): Promise<{ user: User }>;
  export function signOut(auth: unknown): Promise<void>;
  export function onAuthStateChanged(
    auth: unknown,
    callback: (user: User | null) => void
  ): () => void;
}

declare module 'firebase/firestore' {
  export function getFirestore(app: unknown): unknown;
}
