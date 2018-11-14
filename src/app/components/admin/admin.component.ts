import { Component, OnInit } from '@angular/core';
import { PinService } from '../../services/pin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public pins;

  constructor(private pinService: PinService) { }

  ngOnInit() {
    this.getPins();
  }

  getPins() {
    this.pinService.getPins().subscribe(
      data => { this.pins = Array.of(data)},
      err => console.error(err),
      () => console.log('pins loaded ' + Array.of(this.pins).length)
    );

    console.log('pins loaded ' + Array.of(this.pins).length)
  }
}
