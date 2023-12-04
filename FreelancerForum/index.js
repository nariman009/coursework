const spanCount = document.querySelector('#spanCount');
const spanAverageCount = document.querySelector('#spanAverageCount');
const ul = document.querySelector('ul');


const freelancers = [
    { name: 'Sam', occupation: 'Developer', price: 65},
    { name: 'Tom', occupation: 'Programmer', price: 55},
];

const names = ['Sam', 'Tom', 'Joe', 'Kim', 'Pil'];
const occupations = ['Developer', 'Programmer', 'Tester', 'Designer'];

// console.log(spanCount);
spanCount.innerHTML = freelancers.length;

// let sum = 0

// freelancers.forEach((freelancer)=>{
//     sum = sum + freelancer.price;
// });

// const average = sum / freelancers.length;

const average = freelancers.reduce((acc, item) => (acc + item.price), 0)/freelancers.length;
spanAverageCount.innerHTML = average;

const html = freelancers.map((freelancer)=>{
    return `
        <li>${freelancer.name}</li>
    `
});

// console.log(html);
ul.innerHTML = html;