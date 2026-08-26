import { closedWeekdays } from "@/app/data/restaurante-config";

export type SiteContent = {
  identity: {
    name: string;
    fullName: string;
    tagline: string;
    phone: { display: string; e164: string };
    email: string;
    address: { street: string; postalCode: string; city: string };
    geo: { latitude: number; longitude: number };
    mapEmbedUrl: string;
    social: { instagram?: string };
    footerCredit: { label: string; name: string; url: string };
  };
  legal: {
    companyName: string;
    cif: string;
    legalForm: string;
    cnae: string;
    incorporationDate: string;
    registryInfo: string;
  };
  theme: {
    primary: string;
    accent: string;
    background: string;
  };
  reviews: {
    url: string;
    items: { author: string; rating: number; text: string }[];
  };
  hours: {
    closedWeekdays: readonly number[];
    openingHours: { days: string; hours: string }[];
  };
  seo: {
    defaultDescription: string;
    ogImage: string;
    pages: {
      home: { title: string; description: string };
      carta: { title: string; description: string };
      contacto: { title: string; description: string };
      reservas: { title: string; description: string };
    };
  };
  images: Record<string, { src: string; alt: string }>;
  media: {
    eventsVideos: { src: string; caption: string }[];
  };
  copy: {
    amenities: {
      football: { headline: string; text: string };
      events: { headline: string; text: string };
    };
    hero: {
      subheadline: string;
      tagline: string;
      taglineSecondLine: string;
    };
    about: {
      eyebrow: string;
      headline: string;
      paragraphs: string[];
    };
    menuPreview: {
      eyebrow: string;
      headline: string;
      subheadline: string;
      highlightCategoryIds: string[];
    };
    reservationCta: {
      headline: string;
      subheadline: string;
    };
    contactPage: {
      eyebrow: string;
      headline: string;
      subheadline: string;
      formHeadline: string;
      formSubheadline: string;
    };
    cartaPage: {
      eyebrow: string;
      headline: string;
      subheadline: string;
      exploreLabel: string;
      allergenNote: string;
    };
    reservasPage: {
      eyebrow: string;
      headline: string;
      subheadline: string;
      noteConfirmation: string;
      pendingTitle: string;
      pendingBody: string;
    };
  };
};

export const siteContent: SiteContent = {
  identity: {
    name: "Tía María",
    fullName: "Restaurante Tía María Vallecas",
    tagline: "Restaurante & Cervecería",
    phone: { display: "911 386 700", e164: "+34911386700" },
    email: "info@tiamariavallecas.com",
    address: {
      street: "Calle Carlos Solé, 74",
      postalCode: "28038",
      city: "Vallecas, Madrid",
    },
    geo: { latitude: 40.3914271, longitude: -3.6478483 },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d780.3131275504825!2d-3.647931425758394!3d40.3913443918124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4225315c13f3db%3A0x608365b9aeeeeca3!2sRestaurante%20T%C3%ADa%20Mar%C3%ADa!5e0!3m2!1ses!2ses!4v1787272029400!5m2!1ses!2ses",
    social: {},
    footerCredit: {
      label: "Creada por",
      name: "Luis Miguel Montalván",
      url: "https://luismiguelmontalvan.com",
    },
  },
  legal: {
    companyName: "Eugeadria S.L.",
    cif: "B22455083",
    legalForm: "Sociedad Limitada (S.L.)",
    cnae: "5611 - Restaurantes y puestos de comidas",
    incorporationDate: "14/05/2025",
    registryInfo: "Registro Mercantil de Madrid",
  },
  theme: {
    primary: "#1e3023",
    accent: "#b29365",
    background: "#f3f0e7",
  },
  reviews: {
    url: "https://g.page/r/CaPs7q65ZYNgEBM/review",
    items: [
      {
        author: "Sergio R.",
        rating: 5,
        text: "Cafetería restaurante con muy buena terraza. Los camareros muy amables y nos atendieron muy bien. La comida estaba muy buena y las raciones generosas. Las croquetas (croquetones) muy ricas.",
      },
      {
        author: "Cristina D.",
        rating: 4,
        text: "Nuestra experiencia en el restaurante fue magnífica, un servicio increíble, los chicos eran súper simpáticos y agradables, nos hicieron la velada inolvidable. La comida estaba muy buena y la relación calidad precio igual. Recomiendo este sitio 100%.",
      },
      {
        author: "Carmen C.",
        rating: 5,
        text: "Un restaurante con terraza perfectos en el barrio. La carta se compone entre otras cosas de raciones (las croquetas están buenísimas), tostas, bocadillos, platos combinados... y el personal encantador. ¡Volveré más veces seguro!",
      },
      {
        author: "Cris G.",
        rating: 5,
        text: "Hacía tiempo que no disfrutábamos tanto en una terraza. La comida y el ambiente son geniales, pero lo que realmente marca la diferencia es el equipo. El servicio ha sido sencillamente espectacular. Sin duda alguna, repetiremos muy pronto. ¡Totalmente recomendado!",
      },
    ],
  },
  hours: {
    closedWeekdays,
    openingHours: [
      { days: "Lunes", hours: "Cerrado" },
      { days: "Martes a domingo", hours: "12:00 - 23:30" },
    ],
  },
  seo: {
    defaultDescription:
      "Cocina tradicional, tapas, raciones y terraza en Vallecas, Madrid.",
    ogImage: "/images/hero-terraza.webp",
    pages: {
      home: {
        title: "Tía María | Restaurante y Terraza en Vallecas",
        description:
          "Cocina tradicional, tapas, raciones y terraza en Vallecas, Madrid.",
      },
      carta: {
        title: "Carta | Tía María Vallecas",
        description:
          "Consulta la carta de Tía María en Vallecas: tapas, croquetas, raciones, bocadillos, pescados, postres y platos combinados.",
      },
      contacto: {
        title: "Contacto | Tía María Vallecas",
        description:
          "Contacta con el restaurante Tía María en Vallecas. Consulta nuestra ubicación, horarios, teléfono y formulario de contacto.",
      },
      reservas: {
        title: "Reservar mesa | Tía María Vallecas",
        description:
          "Reserva tu mesa en Tía María y disfruta de nuestra cocina tradicional, terraza acristalada, zona para eventos y ambiente acogedor en Vallecas. ¡Haz tu reserva online ahora!",
      },
    },
  },
  images: {
    hero: {
      src: "/images/hero-terraza.webp",
      alt: "Terraza del restaurante Tía María en Vallecas",
    },
    cartaHeader: {
      src: "/images/hero-terraza.webp",
      alt: "",
    },
    reservationCta: {
      src: "/images/hero-terraza.webp",
      alt: "Terraza del restaurante Tía María preparada para recibir clientes",
    },
    galleryTerrazaAcristalada: {
      src: "/images/terraza-acristalada-interior.webp",
      alt: "Terraza acristalada",
    },
    galleryTerraza: {
      src: "/images/Terraza.webp",
      alt: "Terraza al aire libre",
    },
    galleryComedor: {
      src: "/images/comedor.webp",
      alt: "Comedor interior",
    },
    galleryMiniTerraza: {
      src: "/images/mini-terraza.webp",
      alt: "Mini terraza",
    },
    galleryMesaGrupos: {
      src: "/images/mesa-grupos.webp",
      alt: "Mesa preparada para grupos",
    },
    galleryTerrazaExterior: {
      src: "/images/terraza-exterior.webp",
      alt: "Terraza exterior",
    },
    footballPosterWhite: {
      src: "/images/futbol-white.webp",
      alt: "Cartel: todo el fútbol en Tía María",
    },
    footballPosterBlue: {
      src: "/images/futbol-blue.webp",
      alt: "Cartel: todo el fútbol en Tía María",
    },
    bebidasHeader: {
      src: "/images/bar-bebidas.webp",
      alt: "Selección de bebidas y licores de Tía María",
    },
  },
  media: {
    eventsVideos: [
      {
        src: "/images/sala.mp4",
        caption: "Nuestro salón, listo para tu celebración",
      },
      {
        src: "/images/sala-eventos.mp4",
        caption: "Espacio disponible para tus eventos",
      },
    ],
  },
  copy: {
    amenities: {
      football: {
        headline: "Ve el fútbol con nosotros",
        text: "Pantalla grande para no perderte ningún partido de Liga, Champions o Europa League en buena compañía.",
      },
      events: {
        headline: "Salón para tus eventos",
        text: "Un espacio privado ideal para cumpleaños, comuniones y celebraciones de empresa. Consúltanos sin compromiso.",
      },
    },
    hero: {
      subheadline: "Restaurante & Cervecería",
      tagline: "Tapas, raciones y cocina tradicional",
      taglineSecondLine: "en un espacio para disfrutar.",
    },
    about: {
      eyebrow: "Nuestra esencia",
      headline:
        "Un lugar donde la comida y la tranquilidad se encuentran.",
      paragraphs: [
        "En Tía María creemos que disfrutar de una buena comida es mucho más que sentarse a la mesa. Es compartir momentos, conversar sin prisas y sentirse como en casa.",
        "Nuestra terraza acristalada y nuestra cocina tradicional crean un ambiente acogedor para desayunar, comer, cenar o simplemente tomar algo en buena compañia.",
      ],
    },
    menuPreview: {
      eyebrow: "Nuestra carta",
      headline: "Cocina tradicional para disfrutar sin prisas.",
      subheadline:
        "Una carta pensada para compartir, descubrir sabores de siempre y disfrutar alrededor de la mesa.",
      highlightCategoryIds: ["para-compartir", "platos-combinados", "postres"],
    },
    reservationCta: {
      headline: "Reserva tu mesa y ven a disfrutar.",
      subheadline: "Haz tu reserva online en unos pocos pasos.",
    },
    contactPage: {
      eyebrow: "Contacto",
      headline: "Estamos aquí para ayudarte.",
      subheadline:
        "Escríbenos para resolver cualquier consulta sobre el restaurante, celebraciones, alérgenos o reservas.",
      formHeadline: "Envíanos un mensaje",
      formSubheadline: "Completa el formulario y nos pondremos en contacto contigo.",
    },
    cartaPage: {
      eyebrow: "Nuestra carta",
      headline: "Cocina de siempre para compartir y disfrutar.",
      subheadline:
        "Tapas, croquetas, raciones y platos preparados para disfrutar alrededor de la mesa, sin prisas y en buena compañía.",
      exploreLabel: "Explora la carta",
      allergenNote:
        "Consulta con nuestro personal cualquier duda sobre alérgenos o ingredientes.",
    },
    reservasPage: {
      eyebrow: "Reservas",
      headline: "Reserva tu mesa en Tía María",
      subheadline:
        "Elige el número de personas, la zona del restaurante y el horario que prefieras. Después solo necesitaremos tus datos de contacto.",
      noteConfirmation:
        "Recibirás un correo con los detalles de la solicitud y un enlace privado para consultar, modificar o cancelar la reserva.",
      pendingTitle: "La reserva quedará pendiente",
      pendingBody:
        "El restaurante comprobará la disponibilidad y te enviará la confirmación definitiva por correo electrónico.",
    },
  },
};
