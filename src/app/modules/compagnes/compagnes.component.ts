import { Component, OnInit, TemplateRef } from '@angular/core';
import { IBrand } from '@app/core/models/brand';
import { IRequest } from '@app/core/models/request';
import { RequestsService } from '@app/core/services/requests.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AnnexeService } from '@app/core/services/annexe.service';
import { IMedia } from '@app/core/models/media';

@Component({
  selector: 'app-compagnes',
  templateUrl: './compagnes.component.html',
  styleUrls: ['./compagnes.component.scss']
})
export class CompagnesComponent implements OnInit {
  brandsList: IBrand[] = [];
  MediasList: IMedia[] = [];
  allRequestsList: IRequest[] = [];
  RequestsList: IRequest[] = [];
  selectedDataRequest!:{request:IRequest,mediasListChecked:any[]}
  filterForm: FormGroup = this.createFilterForm();
  constructor(
    private annexeService: AnnexeService,
    private requestsService: RequestsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBrandsList();
    this.getMediasList();
    this.getAllRequests();
  }
  // get list brands
  getBrandsList() {
    this.annexeService.getBrandsList().subscribe((res: IBrand[]) => {
      this.brandsList = res;
    });
  }
   // get list Medias
   getMediasList() {
    this.annexeService.getMediasList().subscribe((res: IMedia[]) => {
      this.MediasList = res;
    });
  }
  // get data list requests
  getAllRequests() {
    this.requestsService
      .getRequestsList()
      .subscribe((res: { requests: IRequest[]; totalVolume: number }) => {
        this.allRequestsList = res.requests as IRequest[];
        this.RequestsList = res.requests as IRequest[];
      });
  }
  //generate Form Filter
  createFilterForm() {
    return this.formBuilder.group({
      search: [''],
      brandId: ['']
    });
  }
  // apply filter request by campaign name , brand
  filterRequests() {
    let array = this.allRequestsList;
    if (this.filterForm.value.search !== '') {
      array = array.filter((item: any) => {
        return item.campaignName
          .toLowerCase()
          .includes(this.filterForm.value.search.toLowerCase());
      });
    }
    if (this.filterForm.value.brandId !== '') {
      array = array.filter((item: any) => {
        return item.brand.brandId == this.filterForm.value.brandId;
      });
    }
    this.RequestsList = array;
  }
//  open dialog request
  openDialogRequest(request:IRequest,content:TemplateRef<any>){
    this.selectedDataRequest={request:request,mediasListChecked:[]}
     this.MediasList.forEach((element:any) => {
      element.checked=false;
      this.selectedDataRequest?.mediasListChecked.push(element)
    });
    for (const media of this.selectedDataRequest.request.media) {
      let index= this.selectedDataRequest.mediasListChecked.findIndex(item=> item.value==media.value)
     if(index>=0) this.selectedDataRequest.mediasListChecked[index].checked=true;
    }

    this.dialog.open(content,{
      width: '640px',
    })
  }
  // edit request and close dialog
  editRequest(event:any){
    if (event.action=="save") {
     let selectedIndex :any= this.RequestsList.findIndex(item=> item.requestId==event.request)
     this.RequestsList[selectedIndex]=event.request
    }
    this.dialog.closeAll()
  }
}
