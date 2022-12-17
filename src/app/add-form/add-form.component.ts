import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../shared/services/communication.service';
import { DataService } from '../shared/services/data.service';
import { budget } from './form.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  public addForm: FormGroup;
  public id!: number;
  public isSubmit:boolean
public length?:string;
  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private communicationService: CommunicationService,
    public activatedRoute: ActivatedRoute,
    public router:Router
    ) {
    this.addForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.pattern('^[-+]?[0-9]+$')]],
      description: ['', [Validators.required,Validators.maxLength(30)]]
    })
    this.isSubmit=false;
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.id = res['id']
      console.log(this.activatedRoute.data);
      this.getData()

    })
  }
  onSubmit() {
    this.isSubmit=true;
    console.log(this.addForm);
    if (this.addForm.valid) {
      if (this.id) {
        this.dataService.editData(this.id, this.addForm.value).subscribe(res => {
          this.communicationService.data.next(this.addForm.value)
          this.addForm.reset()
          this.isSubmit=false;
          this.router.navigate([''])
        })
      }
      else {
        this.dataService.postData(this.addForm.value).subscribe((res: any) => {
          console.log(res);
          this.communicationService.data.next(this.addForm.value)
          this.addForm.reset()
          this.isSubmit=false;
        })
      }
    }
  }
  getData() {
    this.dataService.getData().subscribe((res: any) => {
      const b = res.find((res: any) => res.id == this.id)
      this.addForm.patchValue(b)
    })
  }
}
