import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'training-verification-ui';

  promptBox()  
  {  
    prompt('Please enter the staff password to proceed', '');  
  }
}
