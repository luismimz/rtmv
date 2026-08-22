export type MenuItem = {
  name: string;
  price: string;
  description?: string;
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
  "Se incrementa un 10% en terraza.",
  "Tenemos información sobre alérgenos. Nuestro personal estará encantado de informarle.",
];