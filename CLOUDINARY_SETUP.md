# 🚀 Configuración de Cloudinary para Turnexo

Esta guía te ayudará a configurar Cloudinary para el upload de imágenes de negocios.

## 📋 Pasos de Configuración

### 1. Crear una cuenta en Cloudinary

- Ve a [cloudinary.com](https://cloudinary.com/)
- Haz clic en **"Sign Up"**
- Completa el registro con tu email (puedes usar GitHub)
- Confirma tu email

### 2. Obtén tu Cloud Name

- Una vez logueado, ve a tu [Dashboard](https://cloudinary.com/console)
- En la parte superior verás tu **Cloud Name** (algo como `dvxj8ck3o`)
- Cópialo

### 3. Crear un Upload Preset

- Ve a **Settings** (rueda de engranaje en la esquina inferior derecha)
- Haz clic en la pestaña **Upload**
- Baja hasta **Upload Presets**
- Haz clic en **Add upload preset** (o "Add unsigned preset")
- Completa lo siguiente:
  - **Preset Name**: `turnexo_uploads` (o el nombre que prefieras)
  - **Unsigned**: Marca como "ON" (esto permite uploads sin autenticación)
  - Deja el resto por defecto
  - Haz clic en **Save**

### 4. Configura tu `.env.local`

En la raíz del proyecto, crea un archivo `.env.local` (o actualiza el existente) con:

```
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
VITE_CLOUDINARY_UPLOAD_PRESET=turnexo_uploads
```

Reemplaza `tu_cloud_name_aqui` con tu Cloud Name de Cloudinary.

### 5. Reinicia el servidor

```bash
npm run dev
# o
pnpm dev
```

## ✅ Verificación

Ve a la página de registrar negocio:

- http://localhost:5173/registrar-negocio
- En el paso 2 ("Foto del negocio") deberías poder subir una imagen
- Al subir, verás la imagen en preview

## 🎯 Características del Upload

- ✅ Drag & drop support
- ✅ Click para seleccionar archivo
- ✅ Preview antes de guardar
- ✅ Máximo 5MB
- ✅ Formatos: PNG, JPG, GIF
- ✅ URL se guarda automáticamente en el formulario

## 🔐 Seguridad

- El upload preset es "unsigned" (sin autenticación en cliente)
- Cloudinary tiene límites de rate-limit
- Para producción, considera usar un backend para validar uploads
- Las imágenes se guardan en Cloudinary, no en tu servidor

## 💰 Precios

- **Free**: 25 GB/mes de storage, transformaciones ilimitadas
- Perfecto para startups y proyectos pequeños

## 🐛 Troubleshooting

### "Error al subir la imagen"

- Verifica que tu `.env.local` tenga los valores correctos
- Check la consola del navegador para más detalles
- Asegúrate que el upload preset tenga "Unsigned" = ON

### Imagen no aparece en preview

- Espera a que termine de subir (debe mostrar el botón)
- Verifica que sea un archivo de imagen válido
- Máximo 5MB

### "Network error"

- Tu conexión a internet es inestable
- Cloudinary está caído (raro)
- CORS issue (solo importa si accedes desde otro dominio)

## 📚 Recursos

- [Documentación de Cloudinary](https://cloudinary.com/documentation)
- [Upload API Reference](https://cloudinary.com/documentation/image_upload_api_reference)
- [JavaScript SDK](https://cloudinary.com/documentation/cloudinary_js)

---

¿Preguntas? Revisa la documentación de Cloudinary o abre un issue en el repo.
