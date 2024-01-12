import { Component } from '@angular/core';
import { IProveedor } from '../../Interfaces/iproveedor';
import { ProveedorService } from '../../Services/proveedor.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css',
})
export class ProveedoresComponent {
  title = 'Proveedores';
  proveedores: IProveedor[];

  constructor(private proveedoresServicio: ProveedorService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.proveedoresServicio.todos().subscribe((listaproveedores) => {
      this.proveedores = listaproveedores;
      console.log(listaproveedores);
    });
  }
  alerta() {
    Swal.fire('Proveedores', 'Mensaje en proveedores', 'success');
  }

  eliminar(proveedorId: number) {
    Swal.fire({
      title: 'Proveedores',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedoresServicio.eliminar(proveedorId).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Proveedores',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Proveedores',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
