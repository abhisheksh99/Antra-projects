import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlecolorComponent } from './titlecolor.component';

describe('TitlecolorComponent', () => {
  let component: TitlecolorComponent;
  let fixture: ComponentFixture<TitlecolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitlecolorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitlecolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
