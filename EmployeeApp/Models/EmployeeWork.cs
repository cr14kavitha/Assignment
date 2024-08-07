namespace EmployeeHoursApp.Models
{

public class EmployeeWork
{
    public string EmployeeName { get; set; }
    public TimeSpan TotalTimeWorked { get; set; }
   

    private string FormatTime(TimeSpan timeSpan)
{
    int hours = timeSpan.Hours;
    int minutes = timeSpan.Minutes;

    return $"{hours:D2}:{minutes:D2}";
}
}


}