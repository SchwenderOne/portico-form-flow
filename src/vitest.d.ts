
// Type definitions for Vitest
declare module 'vitest' {
  export const describe: (name: string, fn: () => void) => void;
  export const it: (name: string, fn: () => void | Promise<void>) => void;
  export const test: (name: string, fn: () => void | Promise<void>) => void;
  export const expect: any;
  export const beforeEach: (fn: () => void | Promise<void>) => void;
  export const afterEach: (fn: () => void | Promise<void>) => void;
  export const beforeAll: (fn: () => void | Promise<void>) => void;
  export const afterAll: (fn: () => void | Promise<void>) => void;
  export const vi: {
    fn: <T extends (...args: any[]) => any>(implementation?: T) => jest.Mock<ReturnType<T>, Parameters<T>>;
    spyOn: (object: any, method: string) => jest.SpyInstance;
    mock: (path: string, factory?: any) => void;
    setSystemTime: (date: Date | number) => void;
    clearAllMocks: () => void;
    resetAllMocks: () => void;
    restoreAllMocks: () => void;
  };
}

declare module '@testing-library/react' {
  export const render: any;
  export const screen: any;
  export const fireEvent: any;
  export const renderHook: any;
  export const act: any;
  export function cleanup(): void;
}

declare namespace jest {
  interface Mock<T = any, Y extends any[] = any[]> {
    (...args: Y): T;
    mock: {
      calls: Y[];
      instances: T[];
      lastCall: Y;
    };
    mockClear(): this;
    mockReset(): this;
    mockImplementation(fn: (...args: Y) => T): this;
    mockImplementationOnce(fn: (...args: Y) => T): this;
    mockReturnValue(value: T): this;
    mockReturnValueOnce(value: T): this;
  }
  
  interface SpyInstance extends Mock {}
}

declare module '@testing-library/jest-dom/matchers' {
  const matchers: Record<string, any>;
  export default matchers;
}

declare module '@testing-library/jest-dom' {
  export const matchers: Record<string, any>;
}
