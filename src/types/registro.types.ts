export interface Documento {
  nombre: string;
  tipo: "PDF" | "JPG";
  url: string;
}

export interface TitularResumen {
  nombres: string;
  apellidos: string;
  dni: string;
  celular: string;
  parentesco: string;
}

export interface RegistroDifunto {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string | null;
  fechaFallecimiento: string;
  fechaRegistro: string;
  ubicacionNicho: string;
  documentos: Documento[];
  titular: TitularResumen;
}