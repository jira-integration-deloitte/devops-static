import { TestBed, inject } from '@angular/core/testing';

import { DevopsHttpService } from './devops-http.service';

describe('DevopsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevopsHttpService]
    });
  });

  it('should be created', inject([DevopsHttpService], (service: DevopsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
