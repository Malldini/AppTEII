import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutomovelPage } from './automovel.page';

describe('AutomovelPage', () => {
  let component: AutomovelPage;
  let fixture: ComponentFixture<AutomovelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomovelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutomovelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
