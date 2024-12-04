export class Coordinates {
  lat: number;
  lng: number;

  constructor(data: any) {
    this.lat = data.lat;
    this.lng = data.lng;
  }
}

export class Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;

  constructor(data: any) {
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.stateCode = data.stateCode;
    this.postalCode = data.postalCode;
    this.coordinates = new Coordinates(data.coordinates);
    this.country = data.country;
  }
}

export class Hair {
  color: string;
  type: string;

  constructor(data: any) {
    this.color = data.color;
    this.type = data.type;
  }
}

export class Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;

  constructor(data: any) {
    this.cardExpire = data.cardExpire;
    this.cardNumber = data.cardNumber;
    this.cardType = data.cardType;
    this.currency = data.currency;
    this.iban = data.iban;
  }
}

export class Company {
  department: string;
  name: string;
  title: string;
  address: Address;

  constructor(data: any) {
    this.department = data.department;
    this.name = data.name;
    this.title = data.title;
    this.address = new Address(data.address);
  }
}

export class CryptoData {
  coin: string;
  wallet: string;
  network: string;

  constructor(data: any) {
    this.coin = data.coin;
    this.wallet = data.wallet;
    this.network = data.network;
  }
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: CryptoData;
  role: string;

  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.maidenName = data.maidenName;
    this.age = data.age;
    this.gender = data.gender;
    this.email = data.email;
    this.phone = data.phone;
    this.username = data.username;
    this.password = data.password;
    this.birthDate = data.birthDate;
    this.image = data.image;
    this.bloodGroup = data.bloodGroup;
    this.height = data.height;
    this.weight = data.weight;
    this.eyeColor = data.eyeColor;
    this.hair = new Hair(data.hair);
    this.ip = data.ip;
    this.address = new Address(data.address);
    this.macAddress = data.macAddress;
    this.university = data.university;
    this.bank = new Bank(data.bank);
    this.company = new Company(data.company);
    this.ein = data.ein;
    this.ssn = data.ssn;
    this.userAgent = data.userAgent;
    this.crypto = new CryptoData(data.crypto);
    this.role = data.role;
  }
}
