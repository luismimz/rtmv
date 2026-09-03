export type AllergenId =
  | "gluten"
  | "crustaceos"
  | "huevos"
  | "pescado"
  | "cacahuetes"
  | "soja"
  | "lacteos"
  | "frutos-cascara"
  | "apio"
  | "mostaza"
  | "sesamo"
  | "sulfitos"
  | "altramuces"
  | "moluscos";

export const allergenCatalog: { id: AllergenId; number: number; label: string }[] = [
  { id: "gluten", number: 1, label: "Gluten" },
  { id: "crustaceos", number: 2, label: "Crustáceos" },
  { id: "huevos", number: 3, label: "Huevos" },
  { id: "pescado", number: 4, label: "Pescado" },
  { id: "cacahuetes", number: 5, label: "Cacahuetes" },
  { id: "soja", number: 6, label: "Soja" },
  { id: "lacteos", number: 7, label: "Lácteos" },
  { id: "frutos-cascara", number: 8, label: "Frutos de cáscara" },
  { id: "apio", number: 9, label: "Apio" },
  { id: "mostaza", number: 10, label: "Mostaza" },
  { id: "sesamo", number: 11, label: "Sésamo" },
  { id: "sulfitos", number: 12, label: "Sulfitos" },
  { id: "altramuces", number: 13, label: "Altramuces" },
  { id: "moluscos", number: 14, label: "Moluscos" },
];

export type MenuItem = {
  name: string;
  price: string;
  description?: string;
  allergens?: AllergenId[];
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const foodMenuCategories: MenuCategory[] = [
  {
    id: "nuestras-tapas",
    title: "Nuestras tapas",
    items: [
      { name: "Sartén huevos con morcilla", price: "7,00€" },
      { name: "Sartén huevos con solomillo y pimientos", price: "7,00€" },
      { name: "Sartén huevos con jamón", price: "8,00€" },
      { name: "Sartén huevos pollo y bacon", price: "7,00€" },
      { name: "Coquetones de jamón", price: "7,00€" },
      { name: "Croquetas de bacalao", price: "7,00€" },
      { name: "Croquetas de puchero de la abuela", price: "7,00€" },
      { name: "Croquetas de boletus", price: "7,00€" },
      { name: "Patatas bravas o ali oli", price: "6,50€" },
      { name: "Delicias de pollo a la mostaza y miel", price: "7,50€" },
      { name: "Oreja al ajillo", price: "8,00€" },
      { name: "Calamares", price: "9,00€" },
      { name: "Rabas de calamar", price: "7,00€" },
      { name: "Chorizo o salchichón ibérico", price: "7,00€" },
      { name: "Lomo ibérico", price: "10,00€" },
    ],
  },
  {
    id: "nuestras-croquetas",
    title: "Nuestras croquetas",
    items: [
      { name: "Coquetones de jamón", price: "12,00€" },
      { name: "Croquetas de bacalao", price: "12,00€" },
      { name: "Croquetas de puchero de la abuela", price: "12,00€" },
      { name: "Croquetas de boletus", price: "12,00€" },
    ],
  },
  {
    id: "para-compartir",
    title: "Para compartir",
    items: [
      { name: "Surtido de ibéricos", price: "19,50€" },
      { name: "Jamón de Guijuelo", price: "19,00€" },
      { name: "Tortilla española al aceite de trufa", price: "10,00€" },
      { name: "Ensalada Tía María", price: "10,00€" },
      { name: "Tomate aliñado al estilo de la casa", price: "11,00€" },
      { name: "Berenjenas fritas con miel y mostaza", price: "10,00€" },
      { name: "Parrillada de verduras", price: "12,00€" },
      { name: "Súper hamburguesa Tía María", price: "12,00€" },
      { name: "Alitas de pollo de corral", price: "11,50€" },
      { name: "Torreznos de Soria", price: "9,00€" },
      {
        name: "Entrecot de buey 300 gr.",
        price: "19,00€",
        description: "Con patatas y verduritas",
      },
    ],
  },
  {
    id: "nuestras-raciones",
    title: "Nuestras raciones",
    items: [
      { name: "Patatas bravas o ali oli", price: "11,00€" },
      { name: "Delicias de pollo a la mostaza y miel", price: "12,50€" },
      { name: "Oreja al ajillo", price: "13,00€" },
      { name: "Calamares", price: "14,00€" },
      { name: "Rabas de calamar", price: "12,00€" },
      { name: "Chorizo o salchichón ibérico", price: "11,00€" },
      { name: "Lomo ibérico", price: "15,00€" },
    ],
  },
  {
    id: "tostas-y-bocadillos",
    title: "Tostas y bocadillos",
    items: [
      {
        name: "Tosta de solomillo ibérico",
        price: "9,50€",
        description: "Con cebolla caramelizada",
      },
      {
        name: "Tosta de cebolla caramelizada",
        price: "8,50€",
        description: "Y queso de cabra",
      },
      { name: "Pepito de ternera", price: "8,50€" },
      { name: "De calamares", price: "8,50€" },
      { name: "De lomo con tomate y queso", price: "8,00€" },
      { name: "De jamón y pan tumaca", price: "8,00€" },
      { name: "De chorizo, salchichón o lomo ibérico", price: "7,00€" },
    ],
  },
  {
    id: "postres",
    title: "Postres",
    items: [
      { name: "Helados variados", price: "6,00€" },
      {
        name: "Coulant de chocolate negro",
        price: "8,00€",
        description: "Con dulce de leche y aromas de canela",
      },
      {
        name: "Brownie de chocolate",
        price: "8,00€",
        description: "Con nueces",
      },
    ],
  },
  {
    id: "nuestros-pescados",
    title: "Nuestros pescados",
    items: [
      { name: "Dorada al horno", price: "13,00€" },
      { name: "Lubina con jamón al horno", price: "14,00€" },
    ],
  },
  {
    id: "platos-combinados",
    title: "Platos combinados",
    items: [
      {
        name: "Huevos fritos",
        price: "9,00€",
        description: "Con bacon y patatas fritas",
      },
      {
        name: "Plato de croquetas variadas",
        price: "9,00€",
        description: "Y patatas",
      },
      {
        name: "Filete de ternera",
        price: "10,00€",
        description: "Con patatas o ensalada",
      },
      {
        name: "Filete de pollo a la plancha",
        price: "9,00€",
        description: "Con patatas o ensalada",
      },
      {
        name: "Filete de lomo adobado",
        price: "9,00€",
        description: "Con patatas o ensalada",
      },
    ],
  },
];

export const foodMenuNotes = [
  "Tenemos información sobre alérgenos. Nuestro personal estará encantado de informarle.",
];

export const drinkMenuCategories: MenuCategory[] = [
  {
    id: "vinos-tintos",
    title: "Vinos tintos",
    items: [
      {
        name: "David Moreno Crianza Selección",
        price: "19,00€",
        description: "D.O. Rioja",
      },
      { name: "Nobbis", price: "18,50€", description: "D.O. Ribera del Duero" },
      { name: "Angelitos Negros", price: "18,50€", description: "D.O. Toro" },
      { name: "Madai Mencía Origen", price: "16,50€", description: "D.O. Bierzo" },
    ],
  },
  {
    id: "vinos-rosados",
    title: "Vinos rosados",
    items: [
      { name: "David Moreno Rosado", price: "14,00€", description: "D.O. Rioja" },
    ],
  },
  {
    id: "vinos-blancos",
    title: "Vinos blancos",
    items: [
      {
        name: "David Moreno Fermentado Barrica",
        price: "16,00€",
        description: "D.O. Rioja",
      },
      { name: "Peramor Verdejo", price: "14,00€", description: "D.O. Rueda" },
      {
        name: "Hacienda Grimón Sauvignon",
        price: "14,00€",
        description: "D.O. Rioja",
      },
      { name: "Ruchel Godello", price: "16,00€", description: "D.O. Valdeorras" },
      { name: "2 Amigos Albariño", price: "20,00€", description: "D.O. Rías Baixas" },
    ],
  },
  {
    id: "tonica-original",
    title: "Tónica Original",
    items: [
      { name: "Hendrick's", price: "12,00€" },
      { name: "Tanqueray", price: "8,00€" },
      { name: "Citadelle", price: "11,00€" },
      { name: "Martin Miller's", price: "10,00€" },
      { name: "Magellan Gin", price: "12,00€" },
      { name: "Bombay Sapphire", price: "9,00€" },
    ],
  },
  {
    id: "ginger-ale",
    title: "Ginger Ale",
    items: [
      { name: "Cutty Sark", price: "7,00€" },
      { name: "Ballantine's Finest", price: "7,00€" },
      { name: "Black Label", price: "9,00€" },
      { name: "Jack Daniel's", price: "Consultar precio" },
      { name: "Red Label", price: "7,00€" },
      { name: "J&B", price: "6,50€" },
    ],
  },
  {
    id: "tonica-limon",
    title: "Tónica Limón",
    items: [
      { name: "Brugal", price: "7,00€" },
      { name: "Havana Club", price: "9,00€" },
      { name: "Santa Teresa Añejo", price: "8,00€" },
      { name: "Cacique", price: "7,00€" },
      { name: "Matusalem 7", price: "8,00€" },
      { name: "Barceló", price: "7,00€" },
    ],
  },
  {
    id: "tonica-pink",
    title: "Tónica Pink",
    items: [
      { name: "Puerto de Indias", price: "9,50€" },
      { name: "Smirnoff", price: "6,50€" },
      { name: "Seagram's", price: "8,00€" },
      { name: "Tanqueray", price: "8,00€" },
      { name: "Absolut", price: "7,00€" },
      { name: "Bombay Sapphire", price: "9,00€" },
    ],
  },
];