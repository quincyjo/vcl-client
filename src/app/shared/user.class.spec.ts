import { User } from './user.class';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User('an@email.com');
  });

  it('should be created', () => {
    expect(user).toBeDefined();
    expect(user.email).toEqual('an@email.com');
  });
});
