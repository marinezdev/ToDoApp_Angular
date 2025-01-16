import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';


@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {

  colorCtrl = new FormControl();
  constructor() 
  {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  welcome = 'Bienvenid@s!';
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio'
  ]);
  name = signal('Rubén');
  age = 42;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name:'Marinez',
    age:42,
    avatar:'https://w3schools.com/howto/img_avatar.png',
  });

  

  clickHandler() 
  {
    alert('hola.....');
  }

  changeHandler(event: Event) 
  {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);

    console.log(event);
  }

  keydownHandler(event: KeyboardEvent)
  {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAgeHandler(event: Event) 
  {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue,10),
      }
    });

    console.log(event);
  }

  changeName(event: Event)
  {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue,
      }
    });

    console.log(event);
  }

  

}
