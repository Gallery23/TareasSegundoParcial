import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStock } from '../Interfaces/istock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private urlBase: string =
    'http://localhost/Sexto_PHP_ANGULAR/Inventario/Controllers/Stock.Controller.php?op=';

  constructor(private clientePhp: HttpClient) {}

  insertar(stock: IStock): Observable<any> {
    const formData = new FormData();
    formData.append('ProductoId', stock.ProductoId.toString()); // Agregar ProductoId
    formData.append('ProveedorId', stock.ProveedorId.toString()); // Agregar ProveedorId
    formData.append('Precio_Venta', stock.Precio_Venta.toString());
    formData.append('Cantidad', stock.Cantidad.toString());

    return this.clientePhp.post(this.urlBase + 'insertar', formData);
  }

  eliminar(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('StockId', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', formData);
  }

  uno(id: number): Observable<IStock> {
    const formData = new FormData();
    formData.append('StockId', id.toString());
    return this.clientePhp.post<IStock>(this.urlBase + 'uno', formData);
  }

  actualizar(stock: IStock, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('StockId', id.toString());
    formData.append('ProductoId', stock.ProductoId.toString()); // Agregar ProductoId
    formData.append('ProveedorId', stock.ProveedorId.toString()); // Agregar ProveedorId
    formData.append('Precio_Venta', stock.Precio_Venta.toString());
    formData.append('Cantidad', stock.Cantidad.toString());

    return this.clientePhp.post(this.urlBase + 'actualizar', formData);

    
  }
}