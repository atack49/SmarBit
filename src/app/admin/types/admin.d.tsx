//Datos que se resiven en los apartados de la creación del admin
export interface Admin {
  _id: string;
  correo: string;
  foto?: string;
  rol: string;
  isVerified: boolean;
};

//Datos que se resiven en los apartados del modulo de Quejas - Sugerencias
export type QuejaSugerencia = {
  _id: string;
  tipo: 'queja' | 'sugerencia';
  mensaje: string;
  usuarioId?: string;
  emailContacto?: string;
  categoria: 'acceso' | 'funcionalidad';
  estado: 'nuevo' | 'en revisión' | 'respondido' | 'cerrado';
  respuesta?: string;
  fechaRespuesta?: string;
  createdAt?: string;
};
