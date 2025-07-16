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
