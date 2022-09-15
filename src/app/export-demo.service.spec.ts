import { TestBed } from '@angular/core/testing';

import { ExportDemoService } from './export-demo.service';

describe('ExportDemoService', () => {
  let service: ExportDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
