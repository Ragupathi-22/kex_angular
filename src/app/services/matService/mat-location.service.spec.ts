import { TestBed } from '@angular/core/testing';
import { MatLocationService } from './mat-location.service';


describe('MatLocationService', () => {
  let service: MatLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
