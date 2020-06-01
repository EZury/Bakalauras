import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner.service';
import { Router } from '@angular/router';
import { Owner } from '../shared/owner.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styles: []
})
export class OwnerComponent implements OnInit {
  ownerArray: Owner[];
  formValid: boolean = true;

  constructor(
    public ownerService: OwnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ownerService.getOwnerList().then(res => this.ownerArray = res as Owner[]);
  }

  addOwner(Name: string) {
    if (this.validateForm(Name)) {
      Name = Name.trim();
      if (!Name ) { return; }
      this.ownerService.addOwner({Name} as Owner).subscribe(owner => {
          this.router.navigate(['/owner']);
          this.ownerArray.push(owner);
        }
      );
    }
  }

  validateForm(Name: string) {
    Name = Name.trim();
    this.formValid = true;
    if (Name === '' || this.ownerArray.find(owner => owner.Name === Name)) {
      this.formValid = false;
    }

    return this.formValid;
  }
}
