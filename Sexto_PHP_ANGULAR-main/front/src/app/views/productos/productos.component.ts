import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IProducto } from '../../Interfaces/iproducto';
import { ProductoService } from '../../Services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],

})
export class ProductosComponent {

  title = 'Productos';
  productos: IProducto[];

  constructor(private ProductoServicio: ProductoService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.ProductoServicio.todos().subscribe((listaproductos) => {
      this.productos = listaproductos;
      console.log(listaproductos);
    });
  }
  alerta() {
    Swal.fire('Productos', 'Mensaje en productos', 'success');
  }

  eliminar(ProductoId: number) {
    Swal.fire({
      title: 'Productos',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProductoServicio.eliminar(ProductoId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Productos',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Productos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}

