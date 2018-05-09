import { StateModule } from './state.module';

describe('StateModule', () => {
  let stateModule: StateModule;

  beforeEach(() => {
    stateModule = new StateModule();
  });

  it('should create an instance', () => {
    expect(stateModule).toBeTruthy();
  });
});
