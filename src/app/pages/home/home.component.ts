import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.model';
import { compileClassDebugInfo } from '@angular/compiler';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
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

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  });

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFileter = computed( () => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending')
    {
      return tasks.filter(task => !task.completed);
    }

    if (filter === 'completed')
    {
        return tasks.filter(task => task.completed);
    }

    return tasks;
  });

  newTaskHandler()
  {
    // if (this.newTaskCtrl.valid)
    // {
    //   const value = this.newTaskCtrl.value;
    //   this.addTask(value);
    //   this.newTaskCtrl.setValue('');
    // }

    if (this.newTaskCtrl.invalid || this.newTaskCtrl.value.trim() === '')
    {
      return;
    }
    
    this.addTask(this.newTaskCtrl.value.trim());
    this.newTaskCtrl.setValue('');
  }

  updateTaskEditingMode(index: number)
  {
    // validamos si la tarea se encuentra completa, no permitir la edicion
    if (this.tasks()[index].completed)
    {
      return;
    }

    // actualizacion del array sin mutarlo
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index && !task.completed)
        {
          return {
            ...task,
            editing: true,
          }
        };
        return {
          ...task,
          editing: false,
        };
      })
    });
  }

  updateTaskTitle(index: number, event: Event)
  {
    const input = event.target as HTMLInputElement;
    
    // actualizacion del array sin mutarlo
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index && !task.completed)
        {
          return {
            ...task,
            title: input.value,
            editing: false,
          }
        };
        return task;
      })
    });
  }

  // newTaskHandler(event: Event) 
  // {
  //   const input = event.target as HTMLInputElement;
  //   const newTaskValue = input.value;
  //   this.addTask(newTaskValue);
  //   input.value='';
  // }

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

  changeFilter(filter: 'all' | 'pending' | 'completed') 
  {
    this.filter.set(filter);
  }

}