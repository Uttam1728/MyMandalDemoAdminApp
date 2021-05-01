import { Member } from './member.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new Member()).toBeTruthy();
  });
});
