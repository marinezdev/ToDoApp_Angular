import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from './../../models/task.model';
import { compileClassDebugInfo } from '@angular/compiler';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: true,
    },
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear servicio',
      completed: false,
    },
  ]);

  newTaskHandler(event: Event) 
  {
    const input = event.target as HTMLInputElement;
    const newTaskValue = input.value;
    this.addTask(newTaskValue);
    input.value='';
  }

  addTask(title: string)
  {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };

    this.tasks.update( (tasks) => [newTask, ...tasks] );
  }

  deleteTaskHandler(index: number) 
  {
    this.tasks.update(
      (tasks) => tasks.filter(
        (task, position) => position !== index
      )
    );

    // this.tasks.update((tasks) => {
    //   tasks.splice(index, 1);
    //   return tasks;
    // });
  }

  updateTask(index: number) 
  {
    // actualizacion del array sin mutarlo
    this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if (position === index)
          {
            return {
              ...task,
              completed: !task.completed,
            }
          };
          return task;
        })
      }
    );
  }

  completedTask(index: number) 
  {
    // es la misma funcion que updateTask
    this.tasks.update((value) =>
      value.map((task, position) => {
        if (position === index)
          return {
            ...task,
            completed: !task.completed,
          };
        return task;
      })
    );
  }

}