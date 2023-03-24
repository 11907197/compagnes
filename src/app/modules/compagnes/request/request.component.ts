import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IBrand } from '@app/core/models/brand';
import { IMedia } from '@app/core/models/media';
import { IRequest } from '@app/core/models/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Output() actionRequest: EventEmitter<any> = new EventEmitter<any>()
  @Input() brandsList:IBrand[]=[]
  @Input() set selectedDataRequest(value:any){
   if(value){
    this.selectedRequest=value.request
    this.mediasListChecked=value.mediasListChecked
     this.requestForm=this.createRequestForm(this.selectedRequest)
    }
  }
  requestForm:FormGroup=this.createRequestForm()
  mediasListChecked:any=[]
  selectedRequest!: IRequest;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }
    //generate Form Filter
    createRequestForm(request?:IRequest) {
      return this.formBuilder.group({
        requestId:[request?.requestId||null, Validators.required],
        campaignName: [request?.campaignName||'',[Validators.required]],
        brandId: [request?.brand.brandId||null,[Validators.required]],
        media:[request?.media || null,[Validators.required,Validators.minLength(1)]],
        submittedDate:[request?.submittedDate||null,Validators.required]
      });
    }
    // checked list media request
    checkedMedia(event:MatCheckboxChange,index:number){
      this.mediasListChecked[index].checked=event.checked
      this.requestForm.get("media")?.setValue(
        this.mediasListChecked.filter((item:any)=> {
          return item.checked;
        })
        )
        this.requestForm.get("media")?.markAsTouched()
        this.requestForm.get("media")?.markAsDirty()
    }
    // save form request && emit data
    save(){
      if (this.requestForm.valid) {
        const brand=this.brandsList.find(item=>item.brandId==this.requestForm.value.brandId)
     this.selectedRequest.campaignName=this.requestForm.value.campaignName
     this.selectedRequest.media=this.requestForm.value.media
     this.selectedRequest.submittedDate=this.requestForm.value.submittedDate
     if(brand)this.selectedRequest.brand=brand
        this.actionRequest.emit({action:"save",request:this.selectedRequest})
      }else{
        this.requestForm.markAsDirty()
        this.requestForm.markAllAsTouched()
      }
    }
    // close dialog update Request
    close(){
    this.actionRequest.emit({action:"close"})
    }

}
