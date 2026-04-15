export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    slug: "bodas",
    name: "Bodas y Parejas",
    description:
      "Discursos para novios, padrinos, padres, brindis y aniversarios de boda",
    icon: "Heart",
    color: "#9B2335",
    subcategories: [
      "Novios",
      "Padrinos",
      "Padres",
      "Brindis",
      "Bodas de oro",
      "Bodas de plata",
      "Boda civil",
      "Boda religiosa",
    ],
  },
  {
    slug: "cumpleanos",
    name: "Cumpleanos y Aniversarios",
    description:
      "Discursos y frases para quinceañeras, 18, 50, 60, 70, 80 años y más",
    icon: "Cake",
    color: "#C4A35A",
    subcategories: [
      "Quinceañera",
      "18 años",
      "50 años",
      "60 años",
      "70 años",
      "80 años",
      "Aniversarios",
    ],
  },
  {
    slug: "graduaciones",
    name: "Graduaciones y Educación",
    description:
      "Palabras para graduaciones, inicio de clases, clausuras y maestros",
    icon: "GraduationCap",
    color: "#16213E",
    subcategories: [
      "Preescolar",
      "Primaria",
      "Secundaria",
      "Bachillerato",
      "Universidad",
      "Maestros",
      "Inicio de clases",
      "Clausura",
    ],
  },
  {
    slug: "eventos",
    name: "Eventos y Protocolo",
    description:
      "Discursos de bienvenida, inauguraciones, eventos deportivos y culturales",
    icon: "Mic",
    color: "#2D6A4F",
    subcategories: [
      "Inauguraciones",
      "Eventos deportivos",
      "Eventos culturales",
      "Maestro de ceremonias",
      "Bienvenidas",
      "Presentaciones",
    ],
  },
  {
    slug: "profesional",
    name: "Vida Profesional",
    description:
      "Discursos de jubilación, reconocimientos laborales y aniversarios de empresa",
    icon: "Briefcase",
    color: "#3A506B",
    subcategories: [
      "Jubilación",
      "Reconocimientos",
      "Despedida laboral",
      "Aniversario empresa",
      "Agradecimiento",
    ],
  },
  {
    slug: "familia",
    name: "Familia y Fe",
    description:
      "Palabras para bautizos, funerales, homenajes y ceremonias religiosas",
    icon: "Users",
    color: "#7B4B94",
    subcategories: [
      "Bautizos",
      "Funerales",
      "Homenajes",
      "Sacerdotes",
      "Familia",
      "Madres",
      "Padres",
    ],
  },
  {
    slug: "oratoria",
    name: "Liderazgo y Oratoria",
    description:
      "Técnicas de oratoria, tipos de discurso, discursos históricos y políticos",
    icon: "BookOpen",
    color: "#1A1A2E",
    subcategories: [
      "Técnicas",
      "Tipos de discurso",
      "Discursos históricos",
      "Política",
      "Parlamento infantil",
      "Delegado de clase",
    ],
  },
  {
    slug: "despedidas",
    name: "Despedidas y Homenajes",
    description:
      "Discursos de despedida, homenajes póstumos, reencuentros y amistad",
    icon: "HandHeart",
    color: "#5C4033",
    subcategories: [
      "Fallecimiento",
      "Despedida amigos",
      "Reencuentros",
      "Homenaje póstumo",
      "Carnaval",
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
