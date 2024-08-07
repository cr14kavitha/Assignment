import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='; // Update this to match your API URL

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(Id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${Id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(Id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${Id}`, employee);
  }

  deleteEmployee(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${Id}`);
  }
}
