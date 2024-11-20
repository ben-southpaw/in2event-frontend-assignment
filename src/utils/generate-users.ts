'use client';

import { User } from "@/types/user";

const firstNames = [
  "Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack",
  "Kate", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rachel", "Sam", "Tara"
];

const lastNames = [
  "Anderson", "Brown", "Clark", "Davis", "Evans", "Foster", "Garcia", "Harris", "Ingram", "Jones",
  "King", "Lee", "Miller", "Nelson", "Ortiz", "Parker", "Quinn", "Roberts", "Smith", "Taylor"
];

const companies = [
  { name: "Tech Solutions", catchPhrase: "Innovative tech for tomorrow", bs: "B2B solutions" },
  { name: "Digital Dynamics", catchPhrase: "Leading digital transformation", bs: "Digital services" },
  { name: "Future Systems", catchPhrase: "Building the future today", bs: "IT consulting" },
  { name: "Smart Corp", catchPhrase: "Smart solutions for smart business", bs: "Smart technology" },
  { name: "Cloud Nine", catchPhrase: "Your success in the cloud", bs: "Cloud computing" }
];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateRandomUsers = (count: number, startId: number = 1): User[] => {
  return Array.from({ length: count }, (_, index) => {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const company = getRandomElement(companies);
    
    return {
      id: startId + index,
      name: `${firstName} ${lastName}`,
      username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      website: `${firstName.toLowerCase()}${lastName.toLowerCase()}.com`,
      company: company,
      address: {
        street: `${Math.floor(Math.random() * 9000 + 1000)} Main St`,
        suite: `Suite ${Math.floor(Math.random() * 900 + 100)}`,
        city: "Example City",
        zipcode: `${Math.floor(Math.random() * 90000 + 10000)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        geo: {
          lat: `${(Math.random() * 180 - 90).toFixed(4)}`,
          lng: `${(Math.random() * 360 - 180).toFixed(4)}`
        }
      }
    };
  });
};
