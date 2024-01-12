import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProveedor } from '../Interfaces/iproveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private urlBase: string =
    'http://localhost/Sexto_PHP_ANGULAR/Inventario/Controllers/Proveedor.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<IProveedor[]> {
    return this.clientePhp.get<IProveedor[]>(this.urlBase + 'todos');
  }
  insertar(proveedor: IProveedor): Observable<any> {
    var prov = new FormData();
    prov.append('Nombres', proveedor.Nombres);
    prov.append('Telefono', proveedor.Telefono);
    prov.append('Correo', proveedor.Correo);
    return this.clientePhp.post(this.urlBase + 'insertar', prov);
  }
  eliminar(id: number): Observable<any> {
    var prov = new FormData();
    prov.append('proveedorId', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', prov);
  }
  uno(id: number): Observable<IProveedor> {
    var prov = new FormData();
    prov.append('proveedorId', id.toString());
    return this.clientePhp.post<IProveedor>(this.urlBase + 'uno', prov);
  }
  actualizar(proveedor: IProveedor, id: number): Observable<any> {
    var prov = new FormData();
    prov.append('proveedorId', id.toString());
    prov.append('Nombres', proveedor.Nombres);
    prov.append('Telefono', proveedor.Telefono);
    prov.append('Correo', proveedor.Correo);
    return this.clientePhp.post(this.urlBase + 'actualizar', prov);
  }
}
