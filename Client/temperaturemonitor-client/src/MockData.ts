import { DayTemperature } from "./Models/DayTemperature";

const mockData: DayTemperature[] = [
  {
    date: new Date(), // Oggi
    temperatures: Array.from({ length: 6 }, (_, hour) => ({
      temperature: 20 + Math.random() * 5, // Temperatura casuale tra 20 e 25
      createdAt: new Date(new Date().setHours(hour * 4, 0, 0, 0)) // Creiamo un nuovo oggetto Date con il timestamp corretto
    }))
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 1)), // Ieri
    temperatures: Array.from({ length: 6 }, (_, hour) => ({
      temperature: 18 + Math.random() * 4, // Temperatura casuale tra 18 e 22
      createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(hour * 4, 0, 0, 0))
    }))
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)), // Due giorni fa
    temperatures: Array.from({ length: 6 }, (_, hour) => ({
      temperature: 17 + Math.random() * 5, // Temperatura casuale tra 17 e 22
      createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(hour * 4, 0, 0, 0))
    }))
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 3)), // Tre giorni fa
    temperatures: Array.from({ length: 6 }, (_, hour) => ({
      temperature: 16 + Math.random() * 4, // Temperatura casuale tra 16 e 20
      createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 3)).setHours(hour * 4, 0, 0, 0))
    }))
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 4)), // Quattro giorni fa
    temperatures: Array.from({ length: 6 }, (_, hour) => ({
      temperature: 15 + Math.random() * 5, // Temperatura casuale tra 15 e 20
      createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 4)).setHours(hour * 4, 0, 0, 0))
    }))
  }
];

export default mockData;
