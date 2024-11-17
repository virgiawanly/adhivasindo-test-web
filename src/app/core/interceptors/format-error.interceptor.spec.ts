import { TestBed } from '@angular/core/testing';

import { FormatErrorInterceptor } from './format-error.interceptor';

describe('FormatErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormatErrorInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: FormatErrorInterceptor = TestBed.inject(FormatErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
