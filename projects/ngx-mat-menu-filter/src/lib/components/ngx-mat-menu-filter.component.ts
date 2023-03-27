import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-mat-menu-filter',
  templateUrl: './ngx-mat-menu-filter.html',
  styleUrls: ['./ngx-mat-menu-filter.scss']
})

export class NgxMatMenuFilterComponent {
  form!: FormGroup
  @Input() filters: Filter[] = []
  @Input() allFilters: Filter[] = []


  @Output() filterValues = new EventEmitter();
  @Output() reloadFilterValues = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm()

  }

  applyFilters() {
    let filters = {}
    this.form.value.filters?.forEach((filter: { name: string, value: string }) => {
      filter.value ?
        filters = {
          ...filters,
          [filter.name]: filter.value?.trim()
        } : null
    });

    this.filterValues.emit(filters)
  }


  get filtersFormArray() {
    return this.form.get('filters') as FormArray;
  }

  filterSelectionChanged(filterName: string, selected: boolean) {
    if (!selected) {
      let index = this.filtersFormArray.controls.findIndex((filter) => {
        return filter.value.name === filterName
      })
      this.filtersFormArray.removeAt(index)
      this.filters.splice(index, 1)
    }
    else {
      this.filtersFormArray.push(
        this.formBuilder.group({
          name: filterName,
          value: new FormControl(null)
        })
      )
      let index = this.allFilters.findIndex((filter) => {
        return filter.name === filterName
      })
      let filter = { ...this.allFilters[index] }
      this.filters.push(filter)
    }
  }

  reload(name: string) {
    this.reloadFilterValues.emit(name)
  }

  initForm() {
    let defaultFiltersControls = this.filters.map((filter) =>
      this.formBuilder.group({
        name: filter.name,
        value: new FormControl(null)
      })
    )

    this.form = this.formBuilder.group({
      filters: this.formBuilder.array(defaultFiltersControls),
    });
  }
  clearFilters() {
    this.initForm();
    this.filterValues.emit({})
  }
}

type Filter = {
  name: string;
  data$?: Observable<any>;
  type: string;
  key?: string;
  label?: string;
  allOption?: string;
  placeholder?: string;
}
