# NgxMatMenuFilter

A plug and play filter for your projects that use angular material.

## Dependencies
*  [Angular](https://angular.io/)
* [Angular material](https://material.angular.io/)

## Features
* Different Types of Input Filters
* Multiple Input Filters

## Demo
 [Demo Application](https://mat-menu-filter.vercel.app/)
 
## Note
You need to have @angular/material installed in your project, as it is a Peer Dependency.

## Example
![mat-menu-filter example ](https://res.cloudinary.com/muhdsalim/image/upload/v1679937587/Screenshot_2023-03-27_at_18.13.12_ivzaqv.png)


## Installation
After installing the above dependencies. Install mat-tree-select-input via.
```bash 
npm i ngx-mat-menu-filter
```

Once installed you need to import our main module in your application module:
```javascript 
import { NgxMatMenuFilterModule } from "ngx-mat-menu-filter";

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgxMatMenuFilterModule, ...],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```


## Usage
ngx-mat-menu-filter is designed to work with mat-menu. Simply create a button that will trigger the menu filter. For example:
```html 
 <button [matMenuTriggerFor]="filterMenu" #filterMenuTrigger="matMenuTrigger">
    <mat-icon fontSet="material-icons-outlined">filter_alt</mat-icon>
    Filter
  </button>
  
  <mat-menu #filterMenu="matMenu">
    <ngx-mat-menu-filter (click)="$event.stopPropagation()" (filterValues)="applyFilters($event)"
      [filters]="defaultFilters" [allFilters]="allFilters">
    </ngx-mat-menu-filter>
  </mat-menu>

```
You'll need to create the required properties and method i.e: defaultFilters, allFilters and applyFilters
Hence, a sample for these would be.
```typescript 

  defaultFilters = [
    { name: 'productName', type: 'field', placeholder: 'Product Name' },
    { name: 'userName', type: 'field', placeholder: 'User Name' },
  ]

  allFilters = [
    { name: 'productName', type: 'field', placeholder: 'Product Name' },
    { name: 'userName', type: 'field', placeholder: 'User Name' },
    { name: 'email', type: 'field', placeholder: 'Email' },
    { name: 'amount', type: 'field', placeholder: 'Amount' },
    { name: 'date', type: 'date', placeholder: 'Date' },
    { name: 'status', data$: of([{ name: 'Pending' }, { name: "Completed" }, { name: "Failed" }]), type: 'select', key: 'name', label: 'name', placeholder: 'Order Status' },
  ]

  applyFilters(filters: any) {
    //
    console.log(filters)
  }

  ```
