import { SemesterPipe } from './semester.pipe';

describe('SemesterPipe', () => {
  it('create an instance', () => {
    const pipe = new SemesterPipe();
    expect(pipe).toBeTruthy();
  });
});
