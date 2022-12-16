import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../shared/services/communication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public availableBalace!:number;

  constructor(private communicationService:CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.totalBalance.subscribe((res)=>this.availableBalace=res)
  }

}
