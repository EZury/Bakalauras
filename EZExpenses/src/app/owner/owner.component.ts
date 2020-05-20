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

  constructor(
    public ownerService: OwnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ownerService.getOwnerList().then(res => this.ownerArray = res as Owner[]);
  }

  addOwner(Name: string) {
    Name = Name.trim();
    if (!Name ) { return; }
    this.ownerService.addOwner({Name} as Owner).subscribe(owner => {
        this.router.navigate(['/owner']);
        this.ownerArray.push(owner);
      }
    );
  }

}
