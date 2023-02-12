// Your code here
function createEmployeeRecord(arr) {
    let newObj = {}
    newObj['firstName'] = arr[0]
    newObj['familyName'] = arr[1]
    newObj['title'] = arr[2]
    newObj['payPerHour'] = arr[3]
    newObj['timeInEvents'] = []
    newObj['timeOutEvents'] = []
    return newObj
}

function createEmployeeRecords(arr) {
    let arrOfObjects = []
    arr.map(employee => {
        arrOfObjects.push(createEmployeeRecord(employee))
    })
    return arrOfObjects
}

function createTimeInEvent(employee, dateTimeString) {
    let dateTimeObject = {}
    let employeeArr = Object.values(employee)
    let employeeOutTime = employee['timeOutEvents']
    dateTimeObject['type'] = 'TimeIn'
    let hr = (dateTimeString[dateTimeString.length - 4] + dateTimeString[dateTimeString.length - 3] + '00')
    dateTimeObject['hour'] = Math.floor(hr)
    dateTimeObject['date'] = dateTimeString.slice(0,10)
    let newEmployeeInfo = createEmployeeRecord(employeeArr)
    newEmployeeInfo['timeInEvents'].push(dateTimeObject)
    newEmployeeInfo['timeOutEvents'] = employeeOutTime
    return newEmployeeInfo
}

function createTimeOutEvent(employee, dateTimeString) {
    let dateTimeObject = {}
    let employeeArr = Object.values(employee)
    let employeeInTime = employee['timeInEvents']
    dateTimeObject['type'] = 'TimeOut'
    let hr = (dateTimeString[dateTimeString.length - 4] + dateTimeString[dateTimeString.length - 3] + '00')
    dateTimeObject['hour'] = Math.floor(hr)
    dateTimeObject['date'] = dateTimeString.slice(0,10)
    let newEmployeeInfo = createEmployeeRecord(employeeArr)
    newEmployeeInfo['timeOutEvents'].push(dateTimeObject)
    newEmployeeInfo['timeInEvents'] = employeeInTime
    return newEmployeeInfo
}

function hoursWorkedOnDate(employee, dateTimeString) {
    let timeEvents = employee['timeInEvents']
    for (let i = 0; i < timeEvents.length; i++) {
        if (timeEvents[i]['date'] === dateTimeString) {
            let timeWorked = employee['timeOutEvents'][i].hour - employee['timeInEvents'][i].hour
            return (timeWorked/100)
        }
    }
}
function wagesEarnedOnDate(employee, dateTimeString) {
    let hoursWorked = hoursWorkedOnDate(employee, dateTimeString)
    return (hoursWorked * employee['payPerHour'])
}

function allWagesFor(employee) {
    let daysWorked = []
    let timeEvents = employee['timeInEvents']
    for (let i = 0; i < timeEvents.length; i++) {
        daysWorked.push(timeEvents[i]['date'])
    }
    let allWages = 0
    daysWorked.forEach(day => allWages + wagesEarnedOnDate(employee, day))
    return allWages
}

function calculatePayroll(arr) {
    return arr.map(employee => allWagesFor(employee))
    }
    


let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
cRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
cRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
console.log(hoursWorkedOnDate(cRecord, "0044-03-15"))