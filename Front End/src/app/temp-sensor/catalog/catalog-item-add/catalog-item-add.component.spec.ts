import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemAddComponent } from './catalog-item-add.component';

describe('CatalogItemAddComponent', () => {
  let component: CatalogItemAddComponent;
  let fixture: ComponentFixture<CatalogItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogItemAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
