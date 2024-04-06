import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import 'zone.js';
import { Gasto } from './gasto';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
  <div class="contenedor-principal">
  <div class="form presupuesto">
    <label for="presupuesto">Enter your budget:</label>
    <input
      id="presupuesto"
      type="number"
      [(ngModel)]="presupuesto"
      (keyup.enter)="ingresarSaldoInicial()"
      [readonly]="saldoInicialIngresado"
    />
    <button (click)="ingresarSaldoInicial()"
    *ngIf="!saldoInicialIngresado"
    >
      Check
    </button>
  </div>

    <div class="form gasto" *ngIf="saldoInicialIngresado">    
      <h3>Add the spents</h3>    
      <div>      
        <label for="nombre-gasto">Name of product:</label>      
        <input 
          id="nombre-gasto" 
          type="text" 
          [(ngModel)]="nombreGasto"      
        />     
      </div>    
      <div>      
        <label for="cantidad-gasto">Amount:</label>      <input        
          id="cantidad-gasto"        
          type="number"        
          [(ngModel)]="cantidadGasto"
          (keyup.enter)="agregarGasto()"      
        />      
      </div> 
      <div>
        <label for="costo">Price</label>
        <input
          id="costo"
          type="number"
          [(ngModel)]="costo"
          (keyup.enter)="agregarGasto()"
        />
      </div>
      <button (click)="agregarGasto()"> Add Spent</button>
    </div>
    <div class="contenedor-lista">
    <div class="restante" *ngIf="saldoInicialIngresado">
      <p>Available Balance</p>
      <p>{{saldo}} Bs</p>
    </div>
    <div class="caja-lista">
      <ul>
        <li *ngFor="let gasto of gastos">
          <p>{{gasto.nombre}}</p>
          <span>{{gasto.cantidad}} Units</span>
          <div>
            <span>{{gasto.costo}} Bs</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>


  `,
})
export class App {
  name = 'Rodri';
  nombreGasto = '';
  cantidadGasto = 0;
  costo = 0;
  gastos: Gasto[] = [];
  presupuesto = 0;
  saldo = 0;

  agregarGasto(): void {
    if (this.cantidadGasto != 0 && this.nombreGasto != '' && this.costo != 0) {
      const gasto = new Gasto(this.nombreGasto, this.cantidadGasto, this.costo);
      this.gastos.push(gasto);
      this.saldo -= gasto.cantidad * gasto.costo;
      if (this.saldo < 0) {
        alert('Your budget is minor to 0, the finaly product remove to list');
        this.saldo += gasto.cantidad * gasto.costo;
        this.gastos.pop();
      }
      this.nombreGasto = '';
      this.cantidadGasto = 0;
      this.costo = 0;
    } else if (this.nombreGasto != '') {
      alert('Alert. The amount is 0!');
    } else if (this.cantidadGasto != 0) {
      alert('Alert the name of product is empty');
    } else if(this.costo != 0) {
      alert('Alert the Price is 0');
    }
    else {
      alert('Alert the fields are empty');
    }
  }

  saldoInicialIngresado = false;

  ingresarSaldoInicial(): void {
    if (this.presupuesto != 0) {
      this.saldo = this.presupuesto;
      this.saldoInicialIngresado = true;
    } else {
      alert('The Budget is 0!');
    }
  }
}

bootstrapApplication(App);
