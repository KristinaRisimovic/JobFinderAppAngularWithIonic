import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeAdminPage } from './home-admin.page';

describe('HomeAdminPage', () => {
  let component: HomeAdminPage;
  let fixture: ComponentFixture<HomeAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAdminPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
