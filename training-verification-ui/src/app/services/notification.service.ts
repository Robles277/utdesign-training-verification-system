import { Injectable } from '@angular/core';
  
import { ToastrService } from 'ngx-toastr';
  
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private toastr: ToastrService) { }
  

  showSuccess(message:any) {
    this.toastr.success(message, "" , {
      positionClass: 'toast-bottom-left',
      timeOut: 3500
   })
}

  
  showError(message:any, title:any){
      this.toastr.error(message, title, {
        positionClass: 'toast-bottom-left',
        timeOut: 3500
     })
  }
  
  showInfo(message:any, title:any){
      this.toastr.info(message, title, {
        positionClass: 'toast-bottom-left',
        timeOut: 3500
     })
  }
  
  showWarning(message:any, title:any){
      this.toastr.warning(message, title, {
        positionClass: 'toast-bottom-left',
        timeOut: 3500
     })
  }
  
}