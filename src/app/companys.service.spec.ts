import { TestBed, inject } from '@angular/core/testing';

import { CompanysService } from './companys.service';

describe('CompanysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanysService]
    });
  });

  it('should be created', inject([CompanysService], (service: CompanysService) => {
    expect(service).toBeTruthy();
  }));
});
