class Employee {
  constructor(id, name, salary) {
    this.id = id;
    this.name = name;
    this.#salary = salary;
  }
  #salary;
  calculateBonus() {
    return this.#salary * 0.2; //20% of basic salary
  }
}

class Manager extends Employee {
  #salary;
  constructor(id, name, salary) {
    super(id, name);
    this.#salary = salary;
  }
  calculateBonus() {
    return this.#salary * 0.4; //40% bonus
  }
}

class Intern extends Employee {
  #salary;
  constructor(id, name, salary) {
    super(id, name);
    this.#salary = salary;
  }

  calculateBonus() {
    return this.#salary * 0.2; //20% for the intern
  }
}

const Empobj=new Employee(1,"jafar",1000);
console.log(obj.calculateBonus());

const manobj=new Manager(1,"jafar",1000);
console.log(manobj.calculateBonus());

const inobj=new Intern(1,"jafar",1000);
console.log(inobj.calculateBonus());





// ######### VEHICLE CLASS ###############
class Vehicle{
    constructor(brand,model,rentPricePerDay){
        this.brand=brand;
        this.model=model;
        this.rentPricePerDay=rentPricePerDay;
    }
    calculateRentalCost(days){
        return days*this.rentPricePerDay;
    }
}

class Car extends Vehicle {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days) * 1.1; // 10% extra charge
    }
}

class Bike extends Vehicle {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days) * 0.9; // 10% discount
    }
}

class Truck extends Vehicle {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days) * 1.5; // 50% extra charge
    }
}

const obj=new Vehicle("merc","2023",200);
console.log(obj.calculateRentalCost(1));
const truckobj=new Truck("BharatBenz","2020",500);
console.log(truckobj.calculateRentalCost(1));
const carobj=new Car("alto","2020",400);
console.log(carobj.calculateRentalCost(5));




// ############ PAYMENT CLASS ##################
class Payment {
  constructor(amount, date) {
    this.amount = amount;
    this.date = date;
  }
  //example function
  processPayment() {
    return `Processing payment of $${this.amount} on ${this.date}`;
  }
}

class CreditCardPayment extends Payment {
  #cardNumber;                          //here cardnumber is private

  constructor(amount, date, cardNumber) {
    super(amount, date);
    this.#cardNumber = cardNumber;
  }

  processPayment() {
    return `Processing Credit Card payment of $${this.amount} on ${this.date}`;
  }
}

class PayPalPayment extends Payment {
  constructor(amount, date, email) {
    super(amount, date);
    this.email = email;
  }

  processPayment() {
    return `Processing PayPal payment of $${this.amount} from ${this.email}`;
  }
}

class CryptoPayment extends Payment {
    #walletAddress              // here walletradress is private
  constructor(amount, date, walletAddress) {
    super(amount, date);
    this.#walletAddress = walletAddress;
  }

  processPayment() {
    return `Processing Crypto payment of $${this.amount} from ${this.walletAddress}`;
  }
}

const creditCard = new CreditCardPayment(
  100,
  "2025-02-04",
  "1234-5678-9012-3456"
);
console.log(creditCard.processPayment()); 

const paypal = new PayPalPayment(200, "2025-02-04", "user123124@gmal.com");
console.log(paypal.processPayment());

const crypto = new CryptoPayment(300, "2025-02-04", "123456789qwerty");
console.log(crypto.processPayment());

// example output:
// Processing Credit Card payment of $100 on 2025-02-04..

