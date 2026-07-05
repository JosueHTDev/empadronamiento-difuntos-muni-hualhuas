import { RegistroTitular } from "@/types/registro.types";

const documentosBase = (): RegistroTitular["difuntos"][number]["documentos"] => [
  { nombre: "Copia de DNI del titular", tipo: "PDF", url: "#" },
  { nombre: "Comprobante de pago del espacio usado", tipo: "PDF", url: "#" },
  { nombre: "Acta de defunción", tipo: "PDF", url: "#" },
  { nombre: "Fotografía del nicho o sepultura", tipo: "JPG", url: "#" },
];

export const registrosMock: RegistroTitular[] = [
  {
    id: "1",
    titular: { nombres: "Juan Carlos", apellidos: "Tapia Mendoza", dni: "45678912", celular: "987 654 321", parentesco: "Hijo" },
    difuntos: [
      { id: "d1", nombres: "María Elena", apellidos: "Gómez López", fechaFallecimiento: "15/05/2020", fechaRegistro: "20/05/2024 10:30", ubicacionNicho: "Pabellón B - Nicho 125", documentos: documentosBase() },
      { id: "d2", nombres: "Pedro", apellidos: "Tapia Ríos", fechaFallecimiento: "02/03/2018", fechaRegistro: "20/05/2024 10:32", ubicacionNicho: "Pabellón A - Nicho 40", documentos: documentosBase() },
    ],
  },
  {
    id: "2",
    titular: { nombres: "María del Pilar", apellidos: "Gómez Rojas", dni: "42345678", celular: "975 123 456", parentesco: "Esposa" },
    difuntos: [
      { id: "d3", nombres: "Luis", apellidos: "Ramírez Gómez", fechaFallecimiento: "10/01/2021", fechaRegistro: "20/05/2024 09:15", ubicacionNicho: "Pabellón D - Nicho 12", documentos: documentosBase() },
    ],
  },
  {
    id: "3",
    titular: { nombres: "Luis Alberto", apellidos: "Ramírez Díaz", dni: "40789012", celular: "912 345 678", parentesco: "Nieto" },
    difuntos: [
      { id: "d4", nombres: "Carmen", apellidos: "Díaz Vda. de Ramírez", fechaFallecimiento: "18/09/2017", fechaRegistro: "19/05/2024 04:45", ubicacionNicho: "Pabellón B - Nicho 90", documentos: documentosBase() },
    ],
  },
  {
    id: "4",
    titular: { nombres: "Pedro Miguel", apellidos: "Flores Quispe", dni: "41789056", celular: "901 234 567", parentesco: "Sobrino" },
    difuntos: [
      { id: "d5", nombres: "Julia", apellidos: "Quispe Mamani", fechaFallecimiento: "14/07/2019", fechaRegistro: "18/05/2024 03:10", ubicacionNicho: "Pabellón C - Nicho 30", documentos: documentosBase() },
      { id: "d6", nombres: "Marco", apellidos: "Flores Vega", fechaFallecimiento: "21/02/2016", fechaRegistro: "18/05/2024 03:12", ubicacionNicho: "Pabellón C - Nicho 31", documentos: documentosBase() },
    ],
  },
  {
    id: "5",
    titular: { nombres: "Ana Gabriela", apellidos: "Torres Silva", dni: "45123456", celular: "923 456 789", parentesco: "Esposa" },
    difuntos: [
      { id: "d7", nombres: "Jorge", apellidos: "Silva Cárdenas", fechaFallecimiento: "09/04/2023", fechaRegistro: "18/05/2024 09:05", ubicacionNicho: "Pabellón B - Nicho 60", documentos: documentosBase() },
    ],
  },
];