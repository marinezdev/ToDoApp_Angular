import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio'
  ]);

  newTask(event: Event) 
  {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update( (tasks) => [...tasks, newTask] );
    input.value='';
  }

  deleteTask(index: number) 
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
}