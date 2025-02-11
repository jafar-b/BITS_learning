

// ## Employee Management System

// Create Employee class with name, id, #salary.
// Subclasses: Manager, Engineer, Intern.
// Polymorphism: Override calculateBonus() for each role.



class  Employee{
    public id:number;
    public name:string;
    protected salary:number;
        constructor(id:number,name:string,salary:number){
            this.salary=salary;
            this.name=name;
            this.id=id;
        }
        calculateBonus():number{
        return this.salary*0.1; //10% bonus for any other type of employee
        }
    
    }
    
    
    class Manager extends Employee{
        constructor (id:number,name:string,salary:number){
            super(id,name,salary);
        }
    
        calculateBonus():number{
    return this.salary*0.3 //30% bonus for Manager
        }
    }
    
    class Engineer extends Employee{
        constructor(id:number,name:string,salary:number){
    super(id,name,salary)
        }
            calculateBonus():number{
    return this.salary*0.2 //20% bonus for Engineer
        }
    }
    
    
    class  Intern extends Employee{
        constructor(id:number,name:string,salary:number){
            super(id,name,salary);
        }
            calculateBonus():number{
    return this.salary*0.15 //15% bonus for Intern
        }
    }
    
    const empobj:Employee=new Employee(1,"Jafar",100000);
    console.log(empobj.calculateBonus());
    
    const manobj:Manager=new Manager(1,"Jafar",100000);
    console.log(manobj.calculateBonus());
    
    const engobj:Engineer=new Engineer(1,"Jafar",100000);
    console.log(engobj.calculateBonus());
    
    const intobj:Intern=new Intern(1,"Jafar",100000);
    console.log(intobj.calculateBonus());
    
    //output: [LOG]: 10000 
           // [LOG]: 30000 
           // [LOG]: 20000 
           // [LOG]: 15000
    


// ## Vehicle Rental System

// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).


           
class Vehicle {
    brand:string;
    model:number;
    rentPricePerDay:number;
   
       constructor(brand:string,model:number,rentPricePerDay:number){
           this.brand=brand;
           this.model=model;
           this.rentPricePerDay=rentPricePerDay;
       }
   calculateRentalCost(days:number){
   return this.rentPricePerDay*days;
   }
   }
   
   class Car extends Vehicle{
       constructor(brand:string,model:number,rentPricePerDay:number){
           super(brand,model,rentPricePerDay);  
       }
       calculateRentalCost(days:number):number{
   return super.calculateRentalCost(days)*1.5; //50% for car 
   }
   }
   
   
   class Bike extends Vehicle{
       constructor(brand:string,model:number,rentPricePerDay:number){
           super(brand,model,rentPricePerDay);
       }
       calculateRentalCost(days:number):number{
           return super.calculateRentalCost(days)*1.2 //20% extra for bike 
       }
   }
   
   
   class Truck extends Vehicle{
       constructor(brand:string,model:number,rentPricePerDay:number){
   super(brand,model,rentPricePerDay);
       }
   
       calculateRentalCost(days:number):number
   {
       return super.calculateRentalCost(days)*2;  //200% extra for truck
   
   }
   }
   
   
   
   const obj:Vehicle=new Vehicle("Mercedes",2024,100); 
   console.log(obj.calculateRentalCost(2)) //for 2 days    o/p: 200
   
   // const Carobj:Car=new Car("BMW",2025,1000);
   // console.log(Carobj.calculateRentalCost(2))    o/p: 3000
   
   // const obj:Bike=new Bike("Ducati",2024,100);
   // console.log(obj.calculateRentalCost(1))       o/p: 120
   
   // const obj:Truck=new Truck("BharatBenz",2024,100);
   // console.log(obj.calculateRentalCost(1)) //for 2 days    o/p: 200



   // ## Online Payment System

// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.


// abstract class Payments{
//     amount:number;
//     date:string;
//         constructor(amount:number,date:string,){
//             this.amount=amount;
//             this.date=date;
//             this.amount=amount;
//         }
//         abstract processPayments():void;
//     }
    
    
//     class CreditCardPayment extends Payments{
//     private cardNumber:number;
    
//         constructor(amount:number,date:string,cardNumber:number){
//             super(amount,date);
//             this.cardNumber=cardNumber;
//         }
//     processPayments():void{
//             console.log(`Processed credit card payment of ${this.amount} on ${this.date}`);
//     }    
//     }
    

//     class PaypalPayment extends Payments{
//        private cardNumber:number;
    
//         constructor(amount:number,date:string,cardNumber:number){
//             super(amount,date);
//             this.cardNumber=cardNumber;
//         }
//     processPayments():void{
//             console.log(`Processed Paypal card payment of ${this.amount} on ${this.date}`);
//     } 
//     }
    
    
//     class CryptoPayment extends Payments{
//        private wallet:number;
    
//         constructor(amount:number,date:string,cardNumber:number){
//             super(amount,date);
//             this.wallet=cardNumber;
//         }
//     processPayments():void{
//             console.log(`Processed Crypto payment of ${this.amount} on ${this.date}`);
//     } 
    
//     }


//     const cryptObj:CryptoPayment=new CryptoPayment(100,"20-02-2025",123456789)
//     cryptObj.processPayments()

//     const creditCardobj:PaypalPayment=new PaypalPayment(100,"20-02-2025",123456789)
//     creditCardobj.processPayments()

//     const obj:CreditCardPayment=new CreditCardPayment(100,"20-02-2025",123456789)
//     obj.processPayments()    


// [LOG]: "Processed Crypto payment of 100 on 20-02-2025" 
// [LOG]: "Processed Paypal card payment of 100 on 20-02-2025" 
// [LOG]: "Processed credit card payment of 100 on 20-02-2025" 