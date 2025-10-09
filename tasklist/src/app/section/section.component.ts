import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() section: any;
  @Input() activeColor: string = 'black';
  @Output() colorClicked = new EventEmitter<string>();

  toggleColor() {
    this.colorClicked.emit(this.section.color);
  }

  get borderColor() {
    return this.activeColor === this.section.color ? this.section.color : 'black';
  }
}
