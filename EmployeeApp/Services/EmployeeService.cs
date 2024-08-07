using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using EmployeeHoursApp.Models;
using Newtonsoft.Json;

namespace EmployeeHoursApp.Services
{
    public class EmployeeService
    {
        private readonly HttpClient _httpClient;

        public EmployeeService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<EmployeeWork>> GetEmployeesAsync(string apiUrl)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            var totalWorkTimeByEmployee = new Dictionary<string, TimeSpan>();
            var workEntries = JsonConvert.DeserializeObject<List<Employee>>(responseBody);

            foreach (var entry in workEntries)
            {// Ensure EmployeeName is not null or empty
                if (string.IsNullOrEmpty(entry.EmployeeName))
                {
                    entry.EmployeeName="Uknown";
                
                }
                if (DateTime.TryParse(entry.StarTimeUtc, out DateTime startTime) &&
                    DateTime.TryParse(entry.EndTimeUtc, out DateTime endTime))
                {
                    var duration = endTime - startTime;

                    if (totalWorkTimeByEmployee.ContainsKey(entry.EmployeeName))
                    {
                        totalWorkTimeByEmployee[entry.EmployeeName] += duration;

                    }
                    else
                    {
                        totalWorkTimeByEmployee[entry.EmployeeName] = duration;
                    }
                }
            }

            var employeeWorkList = new List<EmployeeWork>();

            foreach (var employee in totalWorkTimeByEmployee)
            {
                employeeWorkList.Add(new EmployeeWork
                {
                    EmployeeName = employee.Key,
                    TotalTimeWorked = employee.Value
                });
            }

            return employeeWorkList;
        }
    }
}
