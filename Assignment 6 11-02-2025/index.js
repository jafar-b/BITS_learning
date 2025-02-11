var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Employee = /** @class */ (function () {
    function Employee(id, name, salary) {
        this.salary = salary;
        this.name = name;
        this.id = id;
    }
    Employee.prototype.calculateBonus = function () {
        return this.salary * 0.1; //10% bonus for any other type of employee
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(id, name, salary) {
        return _super.call(this, id, name, salary) || this;
    }
    Manager.prototype.calculateBonus = function () {
        return this.salary * 0.3; //30% bonus for Manager
    };
    return Manager;
}(Employee));
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer(id, name, salary) {
        return _super.call(this, id, name, salary) || this;
    }
    Engineer.prototype.calculateBonus = function () {
        return this.salary * 0.2; //20% bonus for Engineer
    };
    return Engineer;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern(id, name, salary) {
        return _super.call(this, id, name, salary) || this;
    }
    Intern.prototype.calculateBonus = function () {
        return this.salary * 0.15; //15% bonus for Intern
    };
    return Intern;
}(Employee));
var empobj = new Employee(1, "Jafar", 100000);
console.log(empobj.calculateBonus());
var manobj = new Manager(1, "Jafar", 100000);
console.log(manobj.calculateBonus());
var engobj = new Engineer(1, "Jafar", 100000);
console.log(engobj.calculateBonus());
var intobj = new Intern(1, "Jafar", 100000);
console.log(intobj.calculateBonus());
