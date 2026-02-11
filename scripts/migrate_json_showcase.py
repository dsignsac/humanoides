import json
import os

projects_dir = "public/proyectos"
default_tasks = [
    {"title": "Creative Audit", "solution": "Análisis y diagnóstico de la situación actual de marca."},
    {"title": "Strategic Sync", "solution": "Sincronización de activos digitales y puntos de contacto."},
    {"title": "Visual Output", "solution": "Ejecución de entregables de alta fidelidad según requerimiento."}
]
default_process = [
    {"code": "Res-01", "name": "Research", "desc": "Investigación profunda del mercado y competencia."},
    {"code": "Str-02", "name": "Strategy", "desc": "Definición del tono de voz y pilares visuales."},
    {"code": "Dev-03", "name": "Development", "desc": "Construcción de la infraestructura digital."},
    {"code": "Lnc-04", "name": "Launch", "desc": "Despliegue y optimización continua."}
]

for folder in os.listdir(projects_dir):
    if folder == "melbourne": continue # Skip melbourne as it's already updated
    
    info_path = os.path.join(projects_dir, folder, "info.json")
    if os.path.exists(info_path):
        with open(info_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        gallery_size = len(data.get("gallery", []))
        
        # Add basic slides structure
        data["slides"] = [
            {
                "id": "slide-01",
                "label": "Project Identity",
                "type": "hero",
                "mobileGalleryIndices": [0] if gallery_size > 0 else []
            },
            {
                "id": "slide-02",
                "label": "Intervention 01",
                "type": "tasks",
                "items": default_tasks,
                "mobileGalleryIndices": [1, 2] if gallery_size > 2 else ([1] if gallery_size > 1 else [])
            },
            {
                "id": "slide-03",
                "label": "Methodology 02",
                "type": "process",
                "items": default_process,
                "mobileGalleryIndices": ([3, 4] if gallery_size > 4 else ([3] if gallery_size > 3 else []))
            }
        ]
        
        # Ensure gallery items have captions if missing (fallback to title)
        for i, item in enumerate(data.get("gallery", [])):
            if "caption" not in item:
                item["caption"] = f"{data.get('title', 'Project')} - Item {i+1}"
        
        with open(info_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Updated {info_path}")
