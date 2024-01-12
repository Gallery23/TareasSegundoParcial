import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from '../Interfaces/iproducto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private urlBase: string =
    'http://localhost/Sexto_PHP_ANGULAR/Inventario/Controllers/Producto.Controller.php?op=';

  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<IProducto[]> {
    return this.clientePhp.get<IProducto[]>(this.urlBase + 'todos');
  }

  insertar(producto: IProducto): Observable<any> {
    const formData = new FormData();
    formData.append('Nombre', producto.Nombre);
    formData.append('Precio', producto.Precio.toString());
    formData.append('Cantidad', producto.Cantidad.toString());

    // Convertir la fecha a formato ISO antes de agregarla al FormData
    formData.append('FechaIngreso', producto.FechaIngreso.toISOString());

    return this.clientePhp.post(this.urlBase + 'insertar', formData);
  }

  eliminar(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('ProductoId', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', formData);
  }

  uno(id: number): Observable<IProducto> {
    const formData = new FormData();
    formData.append('ProductoId', id.toString());
    return this.clientePhp.post<IProducto>(this.urlBase + 'uno', formData);
  }

  actualizar(producto: IProducto, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('ProductoId', id.toString());
    formData.append('Nombre', producto.Nombre);
    formData.append('Precio', producto.Precio.toString());
    formData.append('Cantidad', producto.Cantidad.toString());

    // Convertir la fecha a formato ISO antes de agregarla al FormData
    formData.append('FechaIngreso', producto.FechaIngreso.toISOString());

    return this.clientePhp.post(this.urlBase + 'actualizar', formData);
  }
}


