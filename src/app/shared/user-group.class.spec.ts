import { UserGroup } from './user-group.class';

describe('UserGroup', () => {
  let group: UserGroup;

  beforeEach(() => {
    group = new UserGroup('A group');
  });

  it('should be created', () => {
    expect(group).toBeDefined();
    expect(group.name).toEqual('A group');
  });
});
