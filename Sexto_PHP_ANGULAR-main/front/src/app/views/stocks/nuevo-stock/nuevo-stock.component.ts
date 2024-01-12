import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../../Services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-stock',
  templateUrl: './nuevo-stock.component.html',
  styleUrls: ['./nuevo-stock.component.css'],
})
export class NuevoStockComponent implements OnInit {
  title = '';
  id!: number;
  stock: FormGroup;

  constructor(
    private stockServicio: StockService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.initializeForm();

    if (this.id && this.id !== 0) {
      this.title = 'Actualizar Stock';
      this.stockServicio.uno(this.id).subscribe((res) => {
        this.stock.patchValue({
          ProductoId: res.ProductoId,
          ProveedorId: res.ProveedorId,
          Precio_Venta: res.Precio_Venta,
          Cantidad: res.Cantidad,
        });
      });
    } else {
      this.title = 'Nuevo Stock';
    }
  }

  initializeForm() {
    this.stock = new FormGroup({
      ProductoId: new FormControl('', Validators.required),
      ProveedorId: new FormControl('', Validators.required),
      Precio_Venta: new FormControl('', Validators.required),
      Cantidad: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.stock.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Stocks',
      text: '¿Está seguro de que desea guardar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id && this.id !== 0) {
          // Lógica para actualizar
          this.stockServicio
            .actualizar(this.stock.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Stocks',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.router.navigate(['/stocks']);
              this.id = 0;
            });
        } else {
          // Lógica para insertar
          this.stockServicio
            .insertar(this.stock.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'Stocks',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.router.navigate(['/stocks']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Stocks',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
