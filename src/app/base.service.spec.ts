import { TestBed, inject } from '@angular/core/testing';

import { BaseService } from './base.service';

describe('BaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseService]
    });
  });

  it('should be created', inject([BaseService], (service: BaseService<any>) => {
    expect(service).toBeTruthy();
  }));
});
