const fs = require('fs');

const genders = ['M','F'];
const maleNames = ['John', 'Carl', 'Steve', 'Luc', 'Mike', 'Danny', 'Adam'];
const femaleNames = ['Sally', 'Jenna', 'Blake', 'Lisa', 'Julia', 'Regina', 'Lauren'];
const lastNames = ['Swank', 'Butler', 'Murphy', 'Newhart', 'MacLaine', 'Livingson', 'Seyfried', 'Tucci', 'Ambrose', 'Stanton', 'Nedivi', 'Weedle', 'Shankar', 'Wolpert'];

const getRand = (arr) => {
  const rand = arr[Math.floor(Math.random() * arr.length)];
  return rand;
};

const people = [];

for (let i = 1; i < 21; i++) {
  const gender = getRand(genders);
  const surname = getRand(lastNames);
  const age = Math.floor(Math.random() * 70);
  let name = '';
  let id = `person${i}`;
  let phone = '';
  let person = { id, gender, name, surname, age, phone };

  switch (gender) {
    case 'F':
      name = getRand(femaleNames);
      person.name = name;
      person.phone = (`${name}.${surname}${i}@gmail.com`.toLowerCase());
      break;
      case 'M':
        name = getRand(maleNames);
        person.name = name;
        person.phone = (`${name}.${surname}${i}@gmail.com`.toLowerCase());
      break;
  }
  people.push(JSON.stringify(person));
}
const data = JSON.stringify(people);

fs.writeFile('people.json', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
