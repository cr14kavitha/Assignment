using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using EmployeeHoursApp.Models;
using EmployeeHoursApp.Services;    
namespace EmployeeApp.Pages;

using System.Collections.Generic;
using System.Threading.Tasks;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;


    private readonly EmployeeService _employeeService;
    private const string ApiUrl = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";

    public IndexModel(EmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    public List<EmployeeWork> Employees { get; set; }

    public async Task OnGetAsync()
    {
        Employees = await _employeeService.GetEmployeesAsync(ApiUrl);
        Employees.Sort((e1, e2) => e2.TotalTimeWorked.CompareTo(e1.TotalTimeWorked));
    }
}
