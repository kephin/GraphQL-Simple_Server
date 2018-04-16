const faker = require('faker');

const generateCustomers = () => {
  const patients = [];

  for (let id = 0; id < 10; id++) {
    const name = faker.name.findName();
    const age = faker.random.number({min: 20, max: 80});
    const phoneNumber = faker.phone.phoneNumberFormat();
    const email = faker.internet.email();

    patients.push({
      id, name, age, phoneNumber, email
    });
  }

  return { patients };
};

module.exports = generateCustomers;
