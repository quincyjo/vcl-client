import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormStatus } from '../../shared/form-status.class';

@Component({
  selector: 'vcl-form-status',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.scss']
})
export class FormStatusComponent implements OnInit {
  @Input() status: FormStatus = new FormStatus();

  @Output() save: EventEmitter<any>;

  constructor() {
    this.save = new EventEmitter();
  }

  onSaveClick(event: MouseEvent): void {
    this.save.emit();
  }

  ngOnInit() {

  }
}
