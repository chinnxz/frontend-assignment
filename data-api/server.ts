import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/random";
import axios from "axios";
import { User } from "./model/User";
import { DataResponse } from "./proto/randomPackage/DataResponse";
import { Hair } from "./proto/randomPackage/Hair";
import { RandomHandlers } from "./proto/randomPackage/Random";

const PORT = 8082;
const PROTO_FILE = "./proto/random.proto";
const API_URL = "https://dummyjson.com/users";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;
const randomPackage = grpcObj.randomPackage;

const main = () => {
  const server = getServer();

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Your server as started on port ${PORT}`);
    server.start();
  });
};

const getServer = () => {
  const server = new grpc.Server();
  server.addService(randomPackage.Random.service, {
    GetDataByDepartment: getDepartmentData,
  });

  return server;
};

const getDepartmentData = async (call, callback) => {
  try {
    const data = await fetchApiData();
    const userData = data.users.map((user: any) => new User(user));
    const responseData = mappedUsersDataByDepartment(userData);
    callback(null, { data: responseData });
  } catch (error) {
    callback(error, null);
  }
};

const mappedUsersDataByDepartment = (users: User[]): DataResponse => {
  let response: DataResponse = {};
  const departmentNames = Array.from(new Set(users.map((user) => user.company.department)));

  departmentNames.forEach((department) => {
    const filteredUserByDepartment = users.filter((user) => user.company.department === department);
    const hairColors = Array.from(new Set(filteredUserByDepartment.map((user) => user.hair.color)));
    let hair: Hair = {};
    hairColors.forEach((color) => {
      hair[color] = 0;
    });

    response[department] = {
      male: 0,
      female: 0,
      ageRange: "",
      hair,
      addressUser: {},
    };

    let maleCount = 0;
    let femaleCount = 0;
    let minAge = filteredUserByDepartment[0].age;
    let maxAge = filteredUserByDepartment[0].age;

    filteredUserByDepartment.forEach((user) => {
      if (user.age < minAge) {
        minAge = user.age;
      }
      if (user.age > maxAge) {
        maxAge = user.age;
      }
      if (user.gender === "male") {
        maleCount++;
      }
      if (user.gender === "female") {
        femaleCount++;
      }

      const userHairColor = user.hair.color;
      response[department].hair[userHairColor]++;

      response[department].addressUser[`${user.firstName}${user.lastName}`] = user.address.postalCode;
    });

    response[department].male = maleCount;
    response[department].female = femaleCount;
    response[department].ageRange = `${minAge}-${maxAge}`;
  });

  return response;
};

const fetchApiData = async (): Promise<any> => {
  try {
    const response = await axios.get(API_URL);
    const jsonData = response.data;
    return jsonData;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

main();
