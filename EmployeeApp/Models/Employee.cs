namespace EmployeeHoursApp.Models
{
    public class Employee
    {
        public string EmployeeName { get; set; }
        public double TotalTimeWorked { get; set; }
         public string Id { get; set; }
        
        public string StarTimeUtc { get; set; }
        public string EndTimeUtc { get; set; }
         public string EntryNotes { get; set; }
        public string DeletedOn { get; set; }
    }
}
