import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  displayedColumns: string[] = ['date', 'name', 'user', 'email', 'status', 'amount'];
  dataSource: Transaction[] = transactions;

  @ViewChild('filterMenuTrigger', { static: true }) filterMenu!: MatMenuTrigger;

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

  appliedFilters = {}
  numberOfAppliedFilters: number = 0;

  applyFilters(filters: any) {
    this.numberOfAppliedFilters = Object.keys(filters)?.length;
    this.dataSource = this.searchTransaction(filters as Transaction)
    this.filterMenu.closeMenu()
  }

  searchTransaction(transactionObj: Transaction) {
    if (Object.keys(transactionObj)?.length == 0) {
      return transactions
    }
    return transactions.filter((transaction) => {
      return transaction.userName?.toLowerCase().includes(transactionObj.userName?.toLowerCase())
        || transaction.productName?.toLowerCase().includes(transactionObj.productName?.toLowerCase())
        || transaction.email?.toLowerCase().includes(transactionObj.email?.toLowerCase())
        || transaction.amount === (transactionObj.amount)
        || transaction.status?.toLowerCase() === (transactionObj.status?.toLowerCase())
    })
  }

}


const transactions: Transaction[] = [
  { id: 1, amount: 100, date: '2022-03-15', productName: 'Item A', userName: 'John Doe', status: 'completed', email: 'john.doe@example.com' },
  { id: 2, amount: -50, date: '2022-03-16', productName: 'Item B', userName: 'Jane Smith', status: 'completed', email: 'jane.smith@example.com' },
  { id: 3, amount: 75, date: '2022-03-17', productName: 'Item C', userName: 'Bob Johnson', status: 'pending', email: 'bob.johnson@example.com' },
  { id: 4, amount: -20, date: '2022-03-18', productName: 'Item D', userName: 'Emily Lee', status: 'completed', email: 'emily.lee@example.com' },
  { id: 5, amount: -30, date: '2022-03-19', productName: 'Item E', userName: 'David Chen', status: 'failed', email: 'david.chen@example.com' },
  { id: 6, amount: 200, date: '2022-03-20', productName: 'Item F', userName: 'Amy Kim', status: 'completed', email: 'amy.kim@example.com' },
];

interface Transaction {
  id: number;
  amount: number;
  date: string;
  productName: string;
  userName: string;
  status: 'pending' | 'completed' | 'failed';
  email: string;
}
