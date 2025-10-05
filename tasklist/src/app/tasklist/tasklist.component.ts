import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent {
  tasks = [
  {
    title: 'Design Homepage Layout',
    description: 'Create wireframes and a mockup for the new homepage layout.'
  },
  {
    title: 'Update User Profile Feature',
    description: 'Enhance the user profile page with new fields and validation.'
  },
  {
    title: 'Fix Bugs in Task Management Module',
    description: 'Resolve the bugs reported in the task management module.'
  },
  {
    title: 'Develop Notification System',
    description: 'Implement a notification system for task updates.'
  },
  {
    title: 'Code Review for Authentication Module',
    description: 'Conduct a code review for the recently developed authentication module.',
  },
  ];
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
  const { title, description } = this.taskForm.value;
  this.tasks.push({ title: title || '', description: description || '' });
  this.taskForm.reset();
  }


}
