import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../task.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  @Input() detail?: Task | undefined;
  @Output() updateTask = new EventEmitter<Task>();

  clicked: boolean = false;
  id?: number;
  title?: string;
  description?: string;
  dueDate?: Date;
  status?: string;
  priority?: string;

  ngOnInit() {
    if (this.detail) {
      this.id = this.detail.id;
      this.title = this.detail.title;
      this.description = this.detail.description;
      this.dueDate = this.detail.dueDate;
      this.status = this.detail.status;
      this.priority = this.detail.priority;
    }
  }

  edit() {
    this.clicked = true;
  }

  save() {
    if (
      this.id &&
      this.title &&
      this.description &&
      this.dueDate &&
      this.status &&
      this.priority
    ) {
      const task = {
        id: this.id,
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        status: this.status,
        priority: this.priority,
      };

      this.updateTask.emit(task);

      this.clicked = false;
    } else {
      window.alert('Invalid input');
    }
  }
  cancel() {
    this.clicked = false;
  }
}
