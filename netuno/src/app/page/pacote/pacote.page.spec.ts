import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacotePage } from './pacote.page';

describe('PacotePage', () => {
  let component: PacotePage;
  let fixture: ComponentFixture<PacotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
