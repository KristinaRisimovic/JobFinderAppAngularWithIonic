import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminArchiveJobsPage } from './admin-archieve-job.page';

describe('AdminArchieveJobPage', () => {
  let component: AdminArchiveJobsPage;
  let fixture: ComponentFixture<AdminArchiveJobsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArchiveJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
