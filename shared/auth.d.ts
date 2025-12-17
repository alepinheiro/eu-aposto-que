// auth.d.ts
import type { User as MongoUser } from '~~/shared/UserSchema';

declare module '#auth-utils' {
  interface User extends MongoUser {
    id: string;
  }

  interface UserSession {
    user: User;
  }

  interface SecureSessionData {
    secureSession: string;
  }
}

export { };
