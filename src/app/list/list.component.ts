import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '../shared/services/communication.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public income: any[] = []
  public expenses: any[] = [];
  public availableBalance: number;
  constructor(private dataService: DataService,
    private communicationSerice: CommunicationService,
    private router: Router) {
    this.availableBalance = 0;
  }

  ngOnInit(): void {
    this.getData()
    this.communicationSerice.data.subscribe((res: any) => {
      this.getData()
    })
  }
  getData() {
    this.dataService.getData().subscribe((res: any) => {
      console.log(res);
      this.expenses = res.filter((res: any) => res.amount < 0)
      this.income = res.filter((res: any) => res.amount >= 0)
      const value: number[] = res.map((res: any) => res.amount)
      this.availableBalance = value.reduce((a, b) => (+a) + (+b));
      this.communicationSerice.totalBalance.next(this.availableBalance)
    })
  }
  onEdit(id: number) {
    this.router.navigate(['edit', id])
  }
  onDelete(id: number) {
    this.dataService.deleteData(id).subscribe((res) => {
      console.log(res);
      this.getData()
      this.router.navigate([''])
    })
  }
}
