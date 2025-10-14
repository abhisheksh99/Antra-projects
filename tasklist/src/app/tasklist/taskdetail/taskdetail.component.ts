import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.scss'
})
export class TaskdetailComponent implements OnInit {
  @Input() taskDetails!: Task 
  @Output() editedDetails = new EventEmitter<any>();

  buttonClicked = false
  newTitle = ''
  newDescription = ''

  ngOnInit(): void {
    if (this.taskDetails) {
      this.newTitle = this.taskDetails.title
      this.newDescription = this.taskDetails.description

    }
  }

  edit() {
    this.buttonClicked = true
  }

  save() {
    const task = {
      id: this.taskDetails.id,
      title: this.newTitle,
      description: this.newDescription,
      dueDate: this.taskDetails?.dueDate,
      status: this.taskDetails?.status,
      priority: this.taskDetails?.priority
      
    }
    console.log(task);
    this.editedDetails.emit(task)
    this.buttonClicked = false;
  }
}



