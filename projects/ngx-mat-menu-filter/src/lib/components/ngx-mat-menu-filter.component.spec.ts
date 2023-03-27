import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NgxMatMenuFilterComponent } from './ngx-mat-menu-filter.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { ArraySomePipe } from '../pipes/array-some/array-some.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NgxMatMenuFilterComponent', () => {
  let component: NgxMatMenuFilterComponent;
  let fixture: ComponentFixture<NgxMatMenuFilterComponent>;
  let filterSelectionChangedSpy: jasmine.Spy<(filterName: string, selected: boolean) => void>;
  let applyFiltersSpy: jasmine.Spy<() => void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxMatMenuFilterComponent, ArraySomePipe],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatTooltipModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgxMatMenuFilterComponent);
    component = fixture.componentInstance;

    filterSelectionChangedSpy = spyOn(component, 'filterSelectionChanged').and.callThrough();
    applyFiltersSpy = spyOn(component, 'applyFilters').and.callThrough();


    component.filters = [
      { name: 'Country', data$: of([]), type: 'select', key: 'isoName', label: 'name', allOption: "All Countries" },
      { name: 'Operator Name', type: 'field', key: '' },
      { name: 'Operator Id', type: 'field', key: '' }
    ]
    component.allFilters = [
      { name: 'Country', data$: of([]), type: 'select', key: 'isoName', label: 'name', allOption: "All Countries" },
      { name: 'Operator Name', type: 'field', key: '' },
      { name: 'Operator Id', type: 'field', key: '' },
      { name: 'Status', data$: of([{ name: 'Active' }, { name: "Inactive" }]), type: 'select', key: 'name', label: 'name' },
      { name: 'Provider Name', data$: of([]), type: 'select', key: 'providerId', label: 'name' },
      { name: 'Denomination Type Id', data$: of([{ name: "Fixed" }, { name: 'Range' }]), type: 'select', key: 'name', label: 'name' },]



    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a field for each item in the component filters array.', () => {

    component.filters.forEach((field, i) => {
      let filterField = fixture.debugElement.query(By.css(`[data-test="${field.name}"`)).nativeElement
      expect(filterField).toBeTruthy();
    })

  })

  it('should call selectionChanged when any option is clicked', () => {
    const moreBtn = fixture.debugElement.query(By.css('button[data-test="more"]')).nativeElement
    moreBtn.click();

    fixture.detectChanges();

    component.allFilters.forEach((_, i) => {
      let filterOption = fixture.debugElement.query(By.css(`[data-test=option-${i}]`)).nativeElement
      filterOption.click()
    })

    fixture.detectChanges();

    //Should call the method when any option is clicked unless if the option is disabled. Since
    //we have at least one option disabled and selected, hence -1
    expect(filterSelectionChangedSpy).toHaveBeenCalledTimes(component.allFilters.length - 1)

  })

  it('should have an apply button for filter', () => {
    const applyBtn = fixture.debugElement.query(By.css('button[data-test="apply"]')).nativeElement
    expect(applyBtn).toBeTruthy()
    expect(applyBtn.textContent).toContain('Apply')
  })

  it('should call applyFilters method when apply button is clicked', () => {
    const applyBtn = fixture.debugElement.query(By.css('button[data-test="apply"]')).nativeElement
    expect(applyBtn.textContent).toContain('Apply')
    applyBtn.click()
    fixture.detectChanges()
    expect(applyFiltersSpy).toHaveBeenCalledTimes(1)
  })

  it('should have a more button for more filter', () => {
    const moreBtn = fixture.debugElement.query(By.css('button[data-test="more"]')).nativeElement
    expect(moreBtn).toBeTruthy()
    expect(moreBtn.textContent).toContain('More')
  })



  it('should have an option to toggle filters from more menu. Options should be from compoent allFilters array', () => {
    const moreBtn = fixture.debugElement.query(By.css('button[data-test="more"]')).nativeElement
    moreBtn.click();

    fixture.detectChanges();

    component.allFilters.forEach((_, i) => {
      let filterOption = fixture.debugElement.query(By.css(`[data-test=option-${i}]`)).nativeElement
      expect(filterOption).toBeTruthy();
    })

  })



  it('should add and remove filter fields based on more options', () => {
    const moreBtn = fixture.debugElement.query(By.css('button[data-test="more"]')).nativeElement
    moreBtn.click();

    fixture.detectChanges();

    //Selecting lists of options that are selected and not disabled, from the more menu
    let selectedFilterOptions = fixture.debugElement.queryAll(By.css(`[ng-reflect-selected="true"][ng-reflect-disabled="false"]`))

    if (selectedFilterOptions.length > 0) {

      let filter = selectedFilterOptions[0].nativeElement
      let value = filter.getAttribute('ng-reflect-value')


      let filterFieldBeforeClick = fixture.debugElement.query(By.css(`[data-test="${value}"]`))
      expect(filterFieldBeforeClick).toBeTruthy()

      filter.click();
      fixture.detectChanges();
      let filterFieldAfterClick = fixture.debugElement.query(By.css(`[data-test="${value}"]`))
      expect(filterFieldAfterClick).toBeFalsy()
    }


    //Selecting an option that is NOT selected and not disabled, from the more menu
    let unSelectedFilterOptions = fixture.debugElement.queryAll(By.css(`[ng-reflect-selected="false"][ng-reflect-disabled="false"]`))

    if (unSelectedFilterOptions.length > 0) {
      let filter = unSelectedFilterOptions[0].nativeElement
      let value = filter.getAttribute('ng-reflect-value')

      let filterFieldBeforeClick = fixture.debugElement.query(By.css(`[data-test="${value}"]`))

      expect(filterFieldBeforeClick).toBeFalsy()

      filter.click();
      fixture.detectChanges();

      let filterFieldAfterClick = fixture.debugElement.query(By.css(`[data-test="${value}"]`))
      expect(filterFieldAfterClick).toBeTruthy()
    }


  })



});
