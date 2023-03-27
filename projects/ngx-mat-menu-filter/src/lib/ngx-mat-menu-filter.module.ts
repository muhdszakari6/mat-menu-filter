import { NgModule } from '@angular/core';
import { NgxMatMenuFilterComponent } from './components/ngx-mat-menu-filter.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { ArraySomePipe } from './pipes/array-some/array-some.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    NgxMatMenuFilterComponent,
    ArraySomePipe
  ],
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
    CommonModule
  ],
  exports: [
    NgxMatMenuFilterComponent
  ]
})
export class NgxMatMenuFilterModule { }
