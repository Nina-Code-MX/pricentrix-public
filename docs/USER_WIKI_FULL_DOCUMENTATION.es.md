# Documentación para Usuarios de Pricentrix (Wiki Maestro)

> Palabras clave SEO: guía de usuario de pricentrix, monitoreo de precios de competidores, asistente de matching de productos, importación de catálogos, reporte de comparación de precios, software de inteligencia de precios

Este documento es la documentación completa orientada al usuario de Pricentrix.

---

## Tabla de Contenidos

1. [Qué Es Pricentrix](#1-qué-es-pricentrix)
2. [Inicio Rápido (10 Minutos)](#2-inicio-rápido-10-minutos)
3. [Navegación Principal y Módulos](#3-navegación-principal-y-módulos)
4. [Configuración de Cuenta y Perfil](#4-configuración-de-cuenta-y-perfil)
5. [Gestión de Productos](#5-gestión-de-productos)
6. [Gestión de Competidores](#6-gestión-de-competidores)
7. [Importación de Catálogos](#7-importación-de-catálogos)
8. [Asistente de Matching de Productos](#8-asistente-de-matching-de-productos)
9. [Reportes y Análisis de Precios](#9-reportes-y-análisis-de-precios)
10. [Trabajos y Procesamiento en Segundo Plano](#10-trabajos-y-procesamiento-en-segundo-plano)
11. [Planes, Límites de Uso y Facturación](#11-planes-límites-de-uso-y-facturación)
12. [Seguridad, Autenticación y Verificación de Correo](#12-seguridad-autenticación-y-verificación-de-correo)
13. [Funciones de UI y Productividad](#13-funciones-de-ui-y-productividad)
14. [Resolución de Problemas y FAQ](#14-resolución-de-problemas-y-faq)
15. [Buenas Prácticas por Rol](#15-buenas-prácticas-por-rol)
16. [Glosario](#16-glosario)
17. [Blueprint del Menú Wiki (SEO Ready)](#17-blueprint-del-menú-wiki-seo-ready)

---

## 1. Qué Es Pricentrix

Pricentrix es una plataforma SaaS de inteligencia competitiva de precios.
Ayuda a los equipos a comparar sus precios frente a competidores mediante un flujo operativo:

1. Configurar la cuenta y los competidores.
2. Importar catálogos (catálogo propio y catálogo de competidores).
3. Relacionar productos equivalentes.
4. Revisar reportes comparativos de precios.
5. Exportar hallazgos y tomar decisiones de pricing.

### Quién debería usarlo

- Gerentes de pricing
- Operadores de eCommerce
- Category managers
- Analistas comerciales
- Equipos de revenue y estrategia

### Resultado principal

Los equipos pueden detectar si están por encima, por debajo o alineados con las referencias del mercado y reaccionar más rápido.

---

## 2. Inicio Rápido (10 Minutos)

### Paso 1: verifica tus datos base

- Abre Cuenta y configura:
  - Base URL
  - Product Base URL
- Abre Productos y verifica nombres y precios.
- Abre Competidores y verifica dominios de competidores.

### Paso 2: importa el catálogo del competidor

- Ve a Importación de Catálogos > Importar Catálogo de Competidor.
- Selecciona un competidor.
- Elige un método de importación:
  - Pegar o subir URLs conocidas de productos del competidor.
  - Crear un trabajo de scraping.

### Paso 3: sigue el procesamiento en Trabajos

- Abre Reportes > Trabajos.
- Espera a que los trabajos de importación terminen.
- Si un trabajo falla, revisa y corrige el input y luego reintenta.

### Paso 4: relaciona productos

- Ve a Importación de Catálogos > Asistente de Matching de Productos.
- Selecciona un competidor o todos.
- Vincula cada producto interno con los productos equivalentes del competidor.

### Paso 5: revisa los reportes

- Ve a Reportes.
- Revisa el Resumen de Pricing Competitivo y las vistas de comparación.

Criterios de éxito:

- Productos de competidores importados.
- Mapeos de productos creados.
- Reportes poblados con datos comparativos accionables.

---

## 3. Navegación Principal y Módulos

### Dashboard

Es la pantalla operativa principal.
Incluye checklist de onboarding y progreso de configuración.

### Tablas

- Cuenta: configuración base a nivel cuenta.
- Productos: catálogo interno.
- Competidores: entidades competidoras y dominios.
- Tipo de Producto: clasificación.
- Usuarios: gestión del equipo en contexto administrador.

### Importación de Catálogos

- Importar Catálogo Propio
- Importar Catálogo de Competidor
- Asistente de Matching de Productos

### Reportes

- Resumen de Pricing Competitivo
- Páginas de reportes dinámicos
- Cola de trabajos y seguimiento de jobs

### Plan

- Detalle del plan activo
- Uso y límites
- Flujos de upgrade o downgrade

### Perfil y Ajustes

- Perfil personal
- Preferencia de idioma
- Contraseña y preferencias de cuenta

---

## 4. Configuración de Cuenta y Perfil

## 4.1 Configuración de la cuenta

Usa Cuenta para definir los ajustes de URL de tu tienda.

Campos requeridos:

- Base URL: dominio raíz de tu tienda.
- Product Base URL: ruta base de las páginas de producto.

Por qué importa:

- La validación de importaciones y la verificación de pertenencia dependen de que el dominio esté bien configurado.
- Las operaciones impulsadas por URL son más confiables cuando estos valores son correctos.

## 4.2 Configuración del perfil

Usa Perfil para mantener:

- Nombre
- Apellido
- Preferencia de idioma (Español/Inglés)
- Acciones de actualización de contraseña

## 4.3 Comportamiento del checklist de onboarding

El Dashboard puede mostrar checkpoints como:

- URLs de cuenta configuradas
- Productos creados
- Competidores agregados
- Catálogo de competidor importado
- Matching de productos completado
- Reporte revisado

Los usuarios pueden continuar, reiniciar o descartar la guía de onboarding.

---

## 5. Gestión de Productos

## 5.1 Agregar productos manualmente

Ve a Tablas > Productos.
Crea productos con al menos:

- Nombre del producto
- Precio

Campos recomendados:

- URL del producto
- URL de imagen del producto
- Tipo de producto
- Descripción

## 5.2 Mantener buena calidad de datos

Buenas prácticas:

- Usa un formato consistente de nombre (marca/modelo/tamaño).
- Evita productos casi duplicados.
- Mantén los precios actualizados.
- Agrega imágenes cuando sea posible para mejorar la confianza en el matching.

## 5.3 Editar registros de productos

Usa las vistas de edición para actualizar precio, metadata y clasificación.
Una buena calidad del registro mejora la relevancia de los reportes.

---

## 6. Gestión de Competidores

## 6.1 Agregar competidores

Ve a Tablas > Competidores.
Agrega:

- Nombre del competidor
- Base URL (dominio)
- Product Base URL (si aplica)

## 6.2 Reglas de URL de competidor

Las URLs importadas deben pertenecer al dominio del competidor seleccionado.
Los dominios que no coinciden normalmente son rechazados durante la validación.

## 6.3 Recomendación operativa

Define una convención clara de nombres para competidores en el equipo, por ejemplo nombre oficial de la marca + país.

---

## 7. Importación de Catálogos

## 7.1 Importar catálogo propio

Úsalo cuando necesites procesar URLs de tu propio catálogo.

Flujo:

1. Pega URLs o sube un CSV.
2. Crea el trabajo de importación.
3. Sigue el progreso en Trabajos.

## 7.2 Importar catálogo de competidor con URLs conocidas

Flujo:

1. Selecciona competidor.
2. Opcional: limpia el catálogo del competidor antes de insertar (modo reemplazo).
3. Pega URLs o sube CSV.
4. Crea el trabajo de importación.
5. Monitorea el proceso en Trabajos.

## 7.3 Importar catálogo de competidor mediante scraping

Flujo:

1. Selecciona competidor.
2. Crea el trabajo de scraping.
3. Confirma la advertencia.
4. Sigue el progreso en Trabajos.

Notas importantes:

- El scraping puede tomar de minutos a horas.
- La cobertura depende de la estructura del sitio objetivo y de sus políticas de acceso.
- La app sigue siendo usable mientras los trabajos corren en segundo plano.

## 7.4 Patrón operativo soportado

Los equipos pueden combinar ambos métodos:

- URLs conocidas para cobertura rápida y dirigida.
- Scraping para descubrimiento más amplio.

---

## 8. Asistente de Matching de Productos

Este es el flujo central para crear equivalencias entre productos.

## 8.1 Objetivo

Vincular cada producto interno con uno o más productos equivalentes de competidores.

## 8.2 Prerrequisitos

- Existen productos internos.
- Los catálogos de competidores fueron importados.

## 8.3 Modos de matching

- Modo de un solo competidor
- Modo de todos los competidores

## 8.4 Controles principales

- Vincular: guarda el match seleccionado.
- Omitir: avanza al siguiente candidato.
- Ver todos: abre una lista ampliada de candidatos.
- Umbral de similitud: ajusta la exigencia de las sugerencias.

## 8.5 Guía del umbral de similitud

- Cerca de 0.3: sugerencias amplias.
- Cerca de 0.5: equilibrio razonable.
- Cerca de 0.7: sugerencias más estrictas.

Uso práctico:

- Aumenta el umbral si las sugerencias tienen mucho ruido.
- Disminúyelo si aparecen muy pocos candidatos.

## 8.6 Flujos alternativos de matching

Además del asistente, los equipos pueden usar asignaciones manuales como vistas de mapeo de catálogo completo.
Enfoque recomendado:

1. Empieza por el asistente.
2. Resuelve los ítems restantes con revisión manual del catálogo completo.

---

## 9. Reportes y Análisis de Precios

## 9.1 Resumen de Pricing Competitivo

Es el reporte visual principal para KPIs y distribución.
Insights típicos:

- Posición frente a referencias de competidores
- Cobertura de productos mapeados
- Productos por encima, alineados o por debajo del mercado

Filtros comunes:

- Tipo de producto
- Selección de competidor
- Regla de comparación (promedio, mínimo, máximo)

Patrón de interacción:

- Haz clic en segmentos o barras del gráfico para abrir el detalle a nivel producto.

## 9.2 Análisis comparativo a nivel producto

Usa tablas o reportes detallados para inspeccionar:

- Tu precio
- Precios de competidores
- Diferencia relativa y dispersión

## 9.3 Exportaciones

Las vistas de listas y reportes pueden ofrecer exportación para análisis externos, por ejemplo CSV o Excel según configuración.

## 9.4 Rutina de reporting

Cadencia diaria o semanal:

1. Refresca importaciones.
2. Relaciona productos nuevos.
3. Revisa cambios en los reportes.
4. Exporta paquetes de decisión para reuniones de pricing.

---

## 10. Trabajos y Procesamiento en Segundo Plano

Los trabajos registran procesos largos como:

- Importaciones de catálogo
- Operaciones de scraping
- Procesamientos batch de datos

Qué monitorear:

- Tipo de trabajo
- Estado del trabajo (pendiente/en ejecución/completado/fallido)
- Timestamps
- Progreso, cuando esté disponible

Guía operativa:

- Envía trabajos por lotes.
- Continúa con otras tareas mientras se ejecutan.
- Reintenta trabajos fallidos solo después de corregir calidad de datos o problemas de dominio.

---

## 11. Planes, Límites de Uso y Facturación

## 11.1 Catálogo de planes

Planes comerciales documentados en el proyecto:

- Free (acceso limitado por 3 meses)
- Starter
- eCommerce
- Enterprise

Precios base documentados:

- Starter: 19 USD mensual, 190 USD anual
- eCommerce: 49 USD mensual, 490 USD anual
- Enterprise: 159 USD mensual, 1590 USD anual

## 11.2 Facturación y suscripciones

- Stripe se usa para procesar suscripciones pagas.
- Se soportan planes mensuales y anuales.
- El plan gratuito no se renueva automáticamente como una suscripción paga.

## 11.3 Límites de uso

Los límites de productos y competidores se controlan mediante entitlements del plan.
Los números exactos pueden configurarse por ambiente o modelo de datos.

Efecto visible cuando se alcanza el límite:

- Las acciones de crear o agregar pueden bloquearse hasta hacer upgrade del plan.

## 11.4 Upgrade y downgrade

La página de Plan expone el plan actual y las transiciones disponibles.
Los equipos deberían coordinar cambios de plan con presupuesto y proyección de uso.

---

## 12. Seguridad, Autenticación y Verificación de Correo

## 12.1 Modelo de autenticación

- Login basado en credenciales
- Control de acceso basado en sesión
- Acceso a datos con alcance por tenant y cuenta

## 12.2 Flujo de registro y verificación

El flujo implementado incluye:

- Endpoint público de registro
- Token de verificación de correo
- Consumo del link de verificación
- Puente de auto login después de la verificación exitosa

Estados de verificación del ciclo de vida del usuario:

- PND: pendiente
- VER: verificado
- BOU: bounced
- SUP: suppressed

## 12.3 Guardrails de supresión de correo

El sistema bloquea correos transaccionales hacia destinatarios rebotados o suprimidos.
Esto protege la reputación del remitente y mejora la entregabilidad.

## 12.4 Protecciones de contraseña y acceso

- Restricciones mínimas de contraseña
- Flujo de reseteo de contraseña
- Rate limiting en operaciones sensibles de autenticación

---

## 13. Funciones de UI y Productividad

## 13.1 Soporte de idioma

La interfaz soporta español e inglés.
La preferencia de idioma se persiste por comportamiento de usuario o sesión.

## 13.2 Cambio de tema

Hay un toggle de dark/light mode disponible en los controles de tema.

## 13.3 Error boundaries y estados resilientes

La app incluye componentes de loading y manejo de errores para mejorar la continuidad del usuario ante fallas de runtime.

## 13.4 Usabilidad de tablas de datos

Funciones comunes de tablas:

- Búsqueda
- Ordenamiento
- Filtros
- Paginación
- Exportaciones, cuando están habilitadas

---

## 14. Resolución de Problemas y FAQ

## 14.1 Errores de importación

Problema:

- Falla la validación de URLs.

Revisiones:

1. Confirma que el competidor seleccionado sea correcto.
2. Confirma que las URLs pertenezcan al dominio correcto.
3. Elimina URLs malformadas y vuelve a intentar.

## 14.2 No hay candidatos en el asistente de matching

Revisiones:

1. Verifica que la importación del competidor haya finalizado.
2. Reduce ligeramente el umbral.
3. Usa Ver todos o la selección manual.

## 14.3 El trabajo tarda demasiado

Revisiones:

1. Confirma si es un trabajo de scraping, que normalmente tarda más.
2. Sigue monitoreando en Trabajos.
3. Continúa trabajando en paralelo.

## 14.4 Problemas con la verificación de correo

Revisiones:

1. Reenvía la verificación desde el flujo de autenticación.
2. Confirma que el correo no esté rebotado o suprimido.
3. Reintenta con una bandeja válida si existe estado de supresión.

## 14.5 Problemas de acceso o permisos

Revisiones:

1. Verifica la cuenta y el rol con los que ingresaste.
2. Confirma que la sesión no haya expirado.
3. Vuelve a autenticarte si hace falta.

---

## 15. Buenas Prácticas por Rol

## 15.1 Pricing Manager

- Revisa reportes de resumen todos los días.
- Prioriza productos con mayor riesgo de margen negativo.
- Sigue cambios de competidores después de promociones relevantes.

## 15.2 Operaciones de Catálogo

- Ejecuta importaciones recurrentes.
- Mantén la metadata de productos normalizada.
- Resuelve productos no relacionados en ciclos programados.

## 15.3 Liderazgo Comercial

- Monitorea uso del plan y KPIs de cobertura.
- Establece una cadencia semanal de decisiones usando resúmenes exportados.

---

## 16. Glosario

- Account Base URL: dominio principal de la tienda usado como contexto de validación a nivel cuenta.
- Competitor Base URL: dominio del competidor usado para validar URLs importadas del competidor.
- Match Wizard: interfaz guiada para vincular productos internos y productos de competidores.
- Similarity Threshold: parámetro de exigencia para sugerencias de candidatos.
- Job Queue: monitor de procesamiento en segundo plano para importaciones y scraping.
- Coverage: proporción de productos internos con mappings válidos de competidor.
- Pricing Rule: base de cálculo usada para benchmark comparativo (promedio/mínimo/máximo).

---

## 17. Blueprint del Menú Wiki (SEO Ready)

Usa esta estructura para publicar páginas del wiki manteniendo este archivo maestro como fuente canónica.

- Inicio
- Cuenta y Perfil
- Gestión de Productos
- Gestión de Competidores
- Importación de Catálogos
- Matching de Productos
- Reportes y Análisis
- Monitoreo de Trabajos
- Planes y Facturación
- Seguridad y Verificación
- Resolución de Problemas
- FAQ y Glosario

Slugs recomendados:

- pricentrix-inicio
- pricentrix-configuracion-de-cuenta
- pricentrix-gestion-de-productos
- pricentrix-importacion-de-catalogo-de-competidor
- pricentrix-asistente-de-matching-de-productos
- pricentrix-reportes-de-pricing-competitivo
- pricentrix-monitoreo-de-trabajos
- pricentrix-planes-y-facturacion
- pricentrix-verificacion-de-correo-y-seguridad
- pricentrix-resolucion-de-problemas

---

## Fundamento de la Fuente

Esta documentación se basa en:

- La documentación actual orientada al usuario dentro de la carpeta docs
- El comportamiento funcional de páginas y flujos API visibles para el usuario
- La documentación existente de pricing y verificación por correo

Los principales archivos validados incluyen docs/quick-start-user.md, docs/functional-user-guide.md, docs/PRICING_MODEL.md, docs/EMAIL_VERIFICATION_QUICKSTART.md, docs/REGISTRATION_AND_EMAIL_VERIFICATION.md y las rutas visibles para usuarios.
