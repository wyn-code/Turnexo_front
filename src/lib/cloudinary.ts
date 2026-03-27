// Configuración de Cloudinary
// Reemplaza estos valores con tus credenciales de Cloudinary
// Mira la sección SETUP en el README para instrucciones

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dvxj8ck3o",
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "turnexo_uploads",
};

export default CLOUDINARY_CONFIG;
