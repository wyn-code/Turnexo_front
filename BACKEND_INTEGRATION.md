# 🔗 Guía Paso a Paso - Conectar Backend FastAPI

Este documento te guía **paso a paso** para conectar tu frontend React con tu backend FastAPI.

---

## 📍 PASO 1: Ubicación de tu Backend FastAPI

### ¿Dónde está corriendo tu backend?

Cuando ejecutas:

```bash
uvicorn main:app --reload --port 8000
```

Ves algo como:

```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Esto significa:**

- **Host**: `localhost` o `127.0.0.1` (misma máquina)
- **Puerto**: `8000` (puedes cambiar)
- **URL**: `http://localhost:8000`

### 🔴 Si el puerto es diferente

Si ves:

```
INFO:     Uvicorn running on http://127.0.0.1:9000
```

Reemplaza `8000` por `9000` en los pasos siguientes.

---

## 📝 PASO 2: Configura el archivo `.env.local`

En la carpeta raíz del proyecto (`c:\Users\lavec\dev\Turnexo_front\`), abre o crea el archivo `.env.local`:

```env
# Cloudinary (ya deberías tener esto)
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset

# Backend API - AGREGA ESTO
VITE_API_URL=http://localhost:8000
```

### 📌 Notas importantes:

- **No incluyas `/api/v1` aquí** - se agrega automáticamente en el código
- **Si el puerto es diferente**, reemplaza `8000`
- **Si el backend está en otra máquina**, reemplaza `localhost` por la IP

### 🎯 Guardaste el archivo?

**⚠️ Reinicia el servidor React en la terminal:**

```bash
# Si estaba corriendo, presiona Ctrl+C
# Luego:
npm run dev
```

El navegador debería actualizar automáticamente. Si no, recarga manualmente (F5).

---

## 🛡️ PASO 3: Configura CORS en FastAPI

En tu backend, abre `main.py` (o donde esté tu app de FastAPI):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ AGREGA ESTO AL INICIO, ANTES DE TUS RUTAS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React dev server
        "http://127.0.0.1:5173",
        "http://localhost:3000",  # Alternativa
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tus rutas van aquí...
@app.get("/")
def read_root():
    return {"message": "Backend funcionando"}
```

### ⚠️ Recarga el backend:

Si estaba corriendo, presiona **Ctrl+C** en su terminal y reinicia:

```bash
uvicorn main:app --reload --port 8000
```

---

## 🎯 PASO 4: Implementa los Endpoints en FastAPI

Crea estos **6 endpoints mínimos** en tu backend:

### 1️⃣ POST - Crear Negocio

```python
@app.post("/api/v1/businesses")
def create_business(business_data: dict):
    """Crea un nuevo negocio"""
    # 1. Validar datos
    if not business_data.get("name"):
        raise HTTPException(status_code=400, detail="El nombre es requerido")

    # 2. Insertar en BD (pseudocódigo con SQLAlchemy)
    # new_business = Business(
    #     name=business_data["name"],
    #     slug=business_data["slug"],
    #     category=business_data["category"],
    #     ...
    # )
    # db.add(new_business)
    # db.commit()

    # 3. Retornar los datos guardados
    return {
        "id": "uuid-generado",
        "name": business_data["name"],
        "slug": business_data["slug"],
        "category": business_data["category"],
        "createdAt": "2026-03-27T10:00:00Z"
        # ... otros campos
    }
```

### ✅ Datos que recibirás:

```json
{
  "name": "Barbería Don Carlos",
  "slug": "barberia-don-carlos",
  "category": "Barbería",
  "description": "La mejor barbería del barrio",
  "image": "https://res.cloudinary.com/...",
  "address": "Av. Corrientes 1234",
  "city": "Buenos Aires",
  "province": "Buenos Aires",
  "locality": "Palermo",
  "phone": "+54 11 1234-5678",
  "whatsapp": "+54 11 9876-5432",
  "instagram": "@barberiadoncarlos",
  "facebook": "facebook.com/barberia",
  "website": "https://barberia.com"
}
```

### 2️⃣ GET - Obtener todos los negocios

```python
@app.get("/api/v1/businesses")
def list_businesses(category: str = None, city: str = None):
    """Lista todos los negocios con filtros opcionales"""
    # Pseudocódigo
    # query = db.query(Business)
    # if category:
    #     query = query.filter(Business.category == category)
    # if city:
    #     query = query.filter(Business.city == city)
    # return query.all()

    return [
        {
            "id": "uuid1",
            "name": "Barbería 1",
            "category": "Barbería",
            ...
        },
        {
            "id": "uuid2",
            "name": "Barbería 2",
            "category": "Barbería",
            ...
        }
    ]
```

### 3️⃣ GET - Obtener por slug

```python
@app.get("/api/v1/businesses/{slug}")
def get_business_by_slug(slug: str):
    """Obtiene un negocio por su slug"""
    # Pseudocódigo
    # business = db.query(Business).filter(Business.slug == slug).first()
    # if not business:
    #     raise HTTPException(status_code=404, detail="Negocio no encontrado")
    # return business

    return {
        "id": "uuid",
        "name": "Barbería Don Carlos",
        "slug": "barberia-don-carlos",
        "category": "Barbería",
        ...
    }
```

### 4️⃣ GET - Obtener por ID

```python
@app.get("/api/v1/businesses/{business_id}")
def get_business(business_id: str):
    """Obtiene un negocio por su ID"""
    return {
        "id": business_id,
        "name": "Barbería Don Carlos",
        ...
    }
```

### 5️⃣ PUT - Actualizar Negocio

```python
@app.put("/api/v1/businesses/{business_id}")
def update_business(business_id: str, business_data: dict):
    """Actualiza un negocio existente"""
    # Pseudocódigo
    # business = db.query(Business).filter(Business.id == business_id).first()
    # if not business:
    #     raise HTTPException(status_code=404, detail="Negocio no encontrado")
    #
    # for key, value in business_data.items():
    #     setattr(business, key, value)
    # db.commit()

    return {
        "id": business_id,
        "name": business_data.get("name", "Barbería Don Carlos"),
        ...
    }
```

### 6️⃣ DELETE - Eliminar Negocio

```python
@app.delete("/api/v1/businesses/{business_id}")
def delete_business(business_id: str):
    """Elimina un negocio"""
    # Pseudocódigo
    # business = db.query(Business).filter(Business.id == business_id).first()
    # if not business:
    #     raise HTTPException(status_code=404, detail="Negocio no encontrado")
    # db.delete(business)
    # db.commit()

    return {"message": "Negocio eliminado exitosamente"}
```

---

## 🧪 PASO 5: Prueba los Endpoints

### Opción A: Prueba con Postman/Insomnia

1. Descarga [Postman](https://www.postman.com/downloads/)
2. Crea una **nueva request**
3. Selecciona **POST**
4. Pega la URL: `http://localhost:8000/api/v1/businesses`
5. En **Headers**, agrega:
   ```
   Content-Type: application/json
   ```
6. En **Body** (raw JSON), pega:
   ```json
   {
     "name": "Barbería Test",
     "slug": "barberia-test",
     "category": "Barbería",
     "description": "Test description",
     "image": "https://via.placeholder.com/300",
     "address": "Calle 123",
     "city": "Buenos Aires",
     "province": "Buenos Aires",
     "whatsapp": "+54 11 1234-5678"
   }
   ```
7. Haz clic en **Send**
8. Deberías recibir **Status 200** con los datos guardados

### Opción B: Prueba con cURL

En PowerShell, corre:

```powershell
$body = @{
    name = "Barbería Test"
    slug = "barberia-test"
    category = "Barbería"
    description = "Test description"
    image = "https://via.placeholder.com/300"
    address = "Calle 123"
    city = "Buenos Aires"
    province = "Buenos Aires"
    whatsapp = "+54 11 1234-5678"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/v1/businesses" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### ✅ Resultado esperado:

```json
{
  "id": "some-uuid",
  "name": "Barbería Test",
  "slug": "barberia-test",
  "createdAt": "2026-03-27T10:00:00Z"
}
```

---

## 💻 PASO 6: Conecta el Frontend

### En `src/pages/RegistrarNegocio.tsx`

Abre el archivo y busca estos comentarios (aproximadamente en la línea 230):

```typescript
// TODO: Descomentar cuando tengas el backend listo
// import { businessService } from "@/services/api";
```

**Descomenta** esa línea. Debería quedar:

```typescript
import { businessService } from "@/services/api";
```

### Luego, busca la función `onSubmit` (alrededor de la línea 240):

```typescript
const onSubmit = form.handleSubmit(async (data) => {
  // ... código de construcción de datos ...

  // TODO: Descomentar cuando backend esté listo
  // try {
  //   const response = await businessService.createBusiness(businessData);
  //   console.log("Negocio creado:", response);
  //   toast.success("¡Negocio registrado exitosamente!");
  //   // router.push(`/negocios/${response.slug}`);
  // } catch (error) {
  //   console.error("Error:", error);
  //   alert("Error al registrar: " + error.message);
  // }

  setSubmitted(true);
});
```

**Descomenta** el bloque try-catch. Debería quedar:

```typescript
try {
  const response = await businessService.createBusiness(businessData);
  console.log("Negocio creado:", response);
  toast.success("¡Negocio registrado exitosamente!");
  // router.push(`/negocios/${response.slug}`);
} catch (error) {
  console.error("Error:", error);
  alert("Error al registrar: " + error.message);
}

setSubmitted(true);
```

### 💾 Guarda el archivo

El servidor de desarrollo actualiza automáticamente.

---

## 🚀 PASO 7: Prueba la Conexión Completa

### Abre tu navegador:

1. Abre `http://localhost:5173`
2. Abre las **DevTools** (F12) → **Consola**
3. Navega a **"Registrar Negocio"**
4. Completa el formulario:
   - Nombre: "Mi Barbería"
   - Categoría: "Barbería"
   - Descripción: "Una barbería de prueba"
   - Imagen: (sube una foto)
   - Etc...
5. Haz clic en **"Registrar"**

### Espera estos eventos en la consola:

✅ **Esperado:**

```
"Enviando datos al backend: {...}"
"Negocio creado: { id: 'uuid', name: 'Mi Barbería', ... }"
```

❌ **Si ves error CORS:**

```
Access to XMLHttpRequest at 'http://localhost:8000/api/v1/businesses'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

→ Verifica que CORS esté configurado en FastAPI (Paso 3)

❌ **Si ves Connection refused:**

```
Failed to fetch: Cannot GET http://localhost:8000/api/v1/businesses
```

→ Verifica que el backend esté corriendo en `http://localhost:8000`

---

## 🐛 Troubleshooting

### ❌ Error: "Cannot POST /api/v1/businesses"

**Problema**: El endpoint no existe en FastAPI

**Solución**:

1. Verifica que escribiste `@app.post("/api/v1/businesses")` exactamente
2. Asegúrate de haber reiniciado el servidor FastAPI
3. En Postman, intenta GET a `http://localhost:8000/` - debería retornar algo

### ❌ Error: CORS policy blocked

**Problema**: FastAPI no acepta requests desde React

**Solución**:

```python
# En main.py, agrega esto ANTES de las rutas:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Luego reinicia el backend.

### ❌ Error: "TypeError: Cannot read property 'name' of undefined"

**Problema**: Los datos no llegan correctamente desde el formulario

**Solución**:

1. En la consola (F12), ve a **Network**
2. Haz clic en registrar
3. Busca la request POST a `/api/v1/businesses`
4. Haz clic y revisa el **Request > Payload**
5. Compara con lo que espera el backend

### ❌ Error: "500 Internal Server Error"

**Problema**: Error en el backend de FastAPI

**Solución**:

1. Abre la terminal donde corre el backend
2. Mira el mensaje de error exacto
3. Síntomas comunes:
   - `Column not found` → Agrega la columna a la BD
   - `IntegrityError` → Los datos no cumplen validaciones
   - `NameError` → Una variable o función no existe

---

## 📋 Checklist Final

Marca lo que ya hiciste:

- [ ] **Backend corriendo** en `http://localhost:8000`
- [ ] **CORS configurado** en FastAPI
- [ ] **`.env.local` creado** con `VITE_API_URL=http://localhost:8000`
- [ ] **Servidor React reiniciado** (`npm run dev`)
- [ ] **Endpoints implementados** (POST, GET, GET by slug, PUT, DELETE)
- [ ] **Probaste con Postman** - ¿funcionó?
- [ ] **Probaste desde React** - ¿ves console logs?
- [ ] **Registró un negocio** - ¿está en la BD?

---

## 📚 Archivos Importantes

Estos archivos ya están configurados en tu proyecto:

| Archivo                          | Propósito                               |
| -------------------------------- | --------------------------------------- |
| `src/lib/api-config.ts`          | Define las URLs de los endpoints        |
| `src/lib/api-client.ts`          | Cliente HTTP que envía las requests     |
| `src/services/api.ts`            | Funciones para CRUD de negocios         |
| `src/hooks/useApi.ts`            | Hooks de React para usar en componentes |
| `src/pages/RegistrarNegocio.tsx` | Formulario que ya está conectado        |

**No necesitas modificar nada en estos archivos.** Solo descomenta el código en `RegistrarNegocio.tsx`.

---

## 💡 Próximos Pasos (después de que funcione)

1. **Agregar más endpoints**: servicios, profesionales, citas
2. **Agregar autenticación**: login/registro con JWT
3. **Agregar validaciones**: en backend
4. **Agregar errores amigables**: mensajes para usuarios
5. **Despliegue**: cambiar `localhost` por servidor real

---

## ✨ ¡Ahora sí estás listo!

Sigue los 7 pasos en orden:

1. ✅ Identifica tu backend
2. ✅ Crea `.env.local`
3. ✅ Configura CORS
4. ✅ Implementa endpoints
5. ✅ Prueba con Postman
6. ✅ Descomenta código React
7. ✅ Prueba desde el navegador

¡La integración es así de simple! 🚀
