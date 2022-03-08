// Your code here
function createEmployeeRecord(employee) {
    return {
        "firstName": employee[0],
        "familyName": employee[1],
        "title": employee[2],
        "payPerHour": employee[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
   
}

function createEmployeeRecords(recordArray) {
    // recordArray.forEach(createEmployeeRecord)
    let answer = []
    //  for (let i = 0; i < recordArray.length; i++) {
    //      let record = createEmployeeRecord(recordArray[i])
    //      answer.push(record)
    //  }
   recordArray.forEach(x => {
       let record = createEmployeeRecord(x)
       answer.push(record)
   })
     return answer
 }

function createTimeInEvent (employee, timeDateString) {
    let obj = {
        "type": "TimeIn",
        "date": timeDateString.substring(0,10),
        "hour": parseInt(timeDateString.substring(11,13))*100
    }
    employee.timeInEvents.push(obj)
    return employee
}
function createTimeOutEvent (employee, timeDateString) {
    let obj = {
        "type": "TimeOut",
        "date": timeDateString.substring(0,10),
        "hour": parseInt(timeDateString.substring(11,13))*100
    }
    employee.timeOutEvents.push(obj)
    return employee
}

function hoursWorkedOnDate (employee, dateSearch) {
    let clockIn = employee.timeInEvents.filter((obj) => obj.date === dateSearch)
    let clockOut = employee.timeOutEvents.filter((obj) => obj.date === dateSearch)
    return (clockOut[0].hour - clockIn[0].hour)/100
}

function wagesEarnedOnDate (employee, dateSearch) {
    let hours = hoursWorkedOnDate(employee, dateSearch)
    return hours * employee.payPerHour
}

function allWagesFor (employee) {
    let datesWorked = []
    let allWages = 0
    for (let i = 0; i < Object.values(employee.timeInEvents).length; i++) {
        datesWorked.push(Object.values(employee.timeInEvents)[i].date)
    }
    for (let i = 0; i < datesWorked.length; i++) {
        let wages = wagesEarnedOnDate(employee, datesWorked[i])
        allWages += wages
    }
    return allWages
}

function calculatePayroll (employees) {
    let payroll = 0
    for (let i = 0; i < employees.length; i++) {
        payroll += allWagesFor(employees[i])
    }
    return payroll
}
