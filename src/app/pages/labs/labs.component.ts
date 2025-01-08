import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenid@s!';
  tasks = [
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ];
  name = 'Rubén';
  age = 42;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name:'Marinez',
    age:42,
    avatar:'https://w3schools.com/howto/img_avatar.png',
  };
}
