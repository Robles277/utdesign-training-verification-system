import { Component } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})

export class NavComponent {
  constructor() {

  }

  promptBox() {
    prompt('Please enter the staff password to proceed', '');
  }
}
