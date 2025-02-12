var Department = /** @class */ (function () {
    function Department() {
        this.employees = [];
    }
    Department.prototype.addEmployee = function (item) {
        this.employees.push(item);
    };
    Department.prototype.listEmployees = function () {
        console.log(this.employees);
    };
    Department.prototype.removeEmployee = function (id) {
        this.employees = this.employees.filter(function (element) { return element.id !== id; });
        console.log("".concat(id, " deleted "));
        console.log(this.employees);
    };
    Department.prototype.getTotalSalary = function () {
        return this.employees.reduce(function (sum, element) { return sum + element.salary; }, 0);
    };
    return Department;
}());
// var deptObj = new Department();
// deptObj.addEmployee({ id: 1, name: "Jafar", position: "SDE-2", salary: 150000 });
// deptObj.addEmployee({ id: 2, name: "Rahul", position: "SDE-3", salary: 150000 });
// console.log(deptObj.getTotalSalary());
// deptObj.removeEmployee(1);
// deptObj.listEmployees();

//output:
// 300000
// 1 deleted 
// [ { id: 2, name: 'Rahul', position: 'SDE-3', salary: 150000 } ]
// [ { id: 2, name: 'Rahul', position: 'SDE-3', salary: 150000 } ]




    class GenericStorage<T>{
        arr:T[]=[];
        add(item:T):void{
       this.arr.push(item);
        }
        remove(item:T):void{
       this.arr=this.arr.filter((element)=>item!==element);
       console.log(`Item ${item} Deleted successfully`);
        }
        getAll():T[]{
           return this.arr;
        }
               }
             function  updateSalary <T extends Employee>(employee:T,newSalary:number):T{
                console.log({...employee,salary:newSalary})
                return {...employee,salary:newSalary}
            }
                const emp:Employee={id:1,name:"Jafar",position:"SDE-2",salary:15000};
                var emp2 = { id: 2, name: "Person2", position: "SDE-3", salary: 15000 };
var emp3 = { id: 3, name: "Person3", position: "SDE-4", salary: 15000 };
var emp4 = { id: 4, name: "Person4", position: "SDE-5", salary: 15000 };
               const obj1=new GenericStorage();
               obj1.add(emp2);
               obj1.add(emp3);
               obj1.add(emp4);
               obj1.remove(emp2)
             console.log(obj1.getAll())
             updateSalary(emp,800)
//output:
// [LOG]: "Item Deleted successfully" 
// [LOG]: [{
//     "id": 1,
//     "name": "Jafar",
//     "position": "SDE-2",
//     "salary": 15000
//   }, {
//     "id": 3,
//     "name": "Person3",
//     "position": "SDE-4",
//     "salary": 15000
//   }, {
//     "id": 4,
//     "name": "Person4",
//     "position": "SDE-5",
//     "salary": 15000
//   }] 
//   [LOG]: {
//     "id": 1,
//     "name": "Jafar",
//     "position": "SDE-2",
//     "salary": 800
//   } 
