import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.interface';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {

  transform(tasks: Task[],status: string): Task[] {
     return tasks.filter(task => task.status === status);
  }

}
