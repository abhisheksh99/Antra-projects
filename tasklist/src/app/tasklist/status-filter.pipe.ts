import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(task: Task[], status:string): Task[] {
    if(!status) return task;
    return task.filter(task => task.status.toLowerCase()===status.toLowerCase());
  }
  }

