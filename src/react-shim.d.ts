// Fallback when IDE doesn't resolve node_modules. Run "npm install" for full types.
declare module 'react' {
  export function createContext<T>(defaultValue: T | null): {
    Provider: (props: { value: T; children?: unknown }) => unknown;
    Consumer: unknown;
  };
  export function useContext<T>(context: unknown): T;
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void];
  export type ReactNode = unknown;
}

declare module 'react/jsx-runtime' {
  export const jsx: (type: unknown, props: unknown, key?: string) => unknown;
  export const jsxs: (type: unknown, props: unknown, key?: string) => unknown;
  export const Fragment: unknown;
}
