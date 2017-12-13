import { ComputerGroup } from './computer-group.class';

describe('Reservation', () => {
  let group: ComputerGroup;

  beforeEach(() => {
    group = new ComputerGroup('computers');
  });

  it('should be created', () => {
    expect(group).toBeDefined();
  });
});
