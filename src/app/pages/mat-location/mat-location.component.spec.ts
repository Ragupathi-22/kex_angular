import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLocationComponent } from './mat-location.component';

describe('MatLocationComponent', () => {
  let component: MatLocationComponent;
  let fixture: ComponentFixture<MatLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
