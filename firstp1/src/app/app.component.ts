import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
// import { Label, SingleDataSet } from 'ng2-charts';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,NgxEchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  employees: Employee[] = [];
  employeesTotal: Employee[] = [];
  sortedEmployees: { employee: Employee, totalTimeWorked: number }[] = [];
  employeeTotals: EmployeeTotal[] = [];
  pieChartOptions: EChartsOption = {};
  title = 'firstp1';

  
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
    setTimeout(() => {
      this.updateChartOptions(); 
    }, 1000); 

  }


  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        this.calculateTotalTimeWorked();
        this.sortEmployeesByTotalTimeWorked();
       this.updateChartOptions()
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  updateChartOptions() {
    console.log("test")
    const data = this.employeeTotals.map(employee => ({
      value: employee.totalTimeWorked,
      name: employee.employeeName
    }));
    console.log(data)
    this.pieChartOptions = {
      title: {
        text: 'Employee Total Time Worked',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Total Time Worked',
          type: 'pie',
          radius: '50ng %',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
  calculateTotalTimeWorked(): void {
    const employeeTimeMap: { [name: string]: number } = {};

    this.employees.forEach(employee => {
      const totalTimeWorked = this.calculateTimeDifference(employee.StarTimeUtc, employee.EndTimeUtc);
      if (employeeTimeMap[employee.EmployeeName]) {
        employeeTimeMap[employee.EmployeeName] += totalTimeWorked;
      } else {
        employeeTimeMap[employee.EmployeeName] = totalTimeWorked;
      }
    });

    this.employeeTotals = Object.keys(employeeTimeMap).map(name => ({
      employeeName: name,
      totalTimeWorked: employeeTimeMap[name]
    }));
  }

  calculateTimeDifference(startTime: string, endTime: string): number {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
  }

  sortEmployeesByTotalTimeWorked(): void {
    this.employeeTotals.sort((a, b) => b.totalTimeWorked - a.totalTimeWorked);
  }
}
interface EmployeeTotal {
  employeeName: string;
  totalTimeWorked: number;
}

