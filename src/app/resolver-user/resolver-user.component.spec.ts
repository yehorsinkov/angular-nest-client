import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolverUserComponent } from './resolver-user.component';

describe('ResolverUserComponent', () => {
  let component: ResolverUserComponent;
  let fixture: ComponentFixture<ResolverUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolverUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolverUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
