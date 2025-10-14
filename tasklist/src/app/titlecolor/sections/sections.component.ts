import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss'
})
export class SectionsComponent {
  @Input() sections: any;
  @Input() selectedColor!: string;
  @Output() colorSelected = new EventEmitter<string>();

  hoverColor: string = '';

  toggleColor(color: string){
    this.colorSelected.emit(color);
  }

  isSelected(color: string){
    return this.selectedColor === color;
  }

}
