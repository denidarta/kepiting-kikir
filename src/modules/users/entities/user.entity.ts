export class User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserConfidentials extends User {
  passwordHash: string;
}
