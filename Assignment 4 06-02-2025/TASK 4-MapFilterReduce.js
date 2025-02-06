

const products = [
    { name: "laptop", price: 1200, category: "electronics" },
    { name: "t-shirt", price: 25, category: "clothing" },
    { name: "headphones", price: 100, category: "electronics" },
    { name: "jeans", price: 75, category: "clothing" },
    { name: "keyboard", price: 99, category: "electronics" }
  ];

  const upperCasedNames=products.map(prod=>{return prod.name.toUpperCase();})
  console.log(upperCasedNames);


  const electronicProducts=products.filter((prod)=>prod.category === "electronics")
  console.log(electronicProducts);


  const total=products.reduce((acc,prod)=>acc+prod.price,0);
  console.log("Total of all products: "+total);



//   const totalIncategory=function(category){
//     return products.filter((prod)=>prod.category===category).reduce((acc,prod)=>{return acc+prod.price},0);
//   }
//   console.log(totalIncategory("clothing"));


//other way can be:

function totalIncategory(products, category) {
    return products
      .filter(product => product.category === category)
      .map(product => product.price) 
      .reduce((sum, price) => sum + price, 0);
  }

  console.log("Total in electronics Category: "+totalIncategory(products,"electronics"));


  //OUTPUT:
//   [ 'LAPTOP', 'T-SHIRT', 'HEADPHONES', 'JEANS', 'KEYBOARD' ]
//   [
//     { name: 'laptop', price: 1200, category: 'electronics' },
//     { name: 'headphones', price: 100, category: 'electronics' },
//     { name: 'keyboard', price: 99, category: 'electronics' }
//   ]
//   Total of all products: 1499
//   Total in electronics Category: 1399