export interface Documento {
  nombre: string;
  tipo: "PDF" | "JPG";
  url: string;
}

export interface Difunto {
  id: string;
  nombres: string;
  apellidos: string;
  fechaFallecimiento: string;
  fechaRegistro: string;
  ubicacionNicho: string;
  documentos: Documento[];
}

export interface RegistroTitular {
  id: string;
  titular: {
    nombres: string;
    apellidos: string;
    dni: string;
    celular: string;
    parentesco: string;
  };
  difuntos: Difunto[];
}