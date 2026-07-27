import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import type { ImageSourcePropType } from "react-native";

type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export interface PaisajeSubtype {
  name: string;
  description: string;
}

export interface Paisaje {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: MaterialIconName;
  color: string;
  description: string[];
  subtypes?: PaisajeSubtype[];
  images: ImageSourcePropType[];
}

/** Imágenes generales del paisaje para portada y encabezados. */
export const PAISAJE_GLOBAL_IMAGES: ImageSourcePropType[] = [
  require("../assets/images/paisaje_global/DSC_7375.jpg"),
  require("../assets/images/paisaje_global/DSC_7980.jpg"),
  require("../assets/images/paisaje_global/DSC_8026.jpg"),
  require("../assets/images/paisaje_global/DSC_8034.jpg"),
  require("../assets/images/paisaje_global/DSC_8064.jpg"),
  require("../assets/images/paisaje_global/DSC_8519.jpg"),
  require("../assets/images/paisaje_global/DSC_8520.jpg"),
  require("../assets/images/paisaje_global/DSC_8563.jpg"),
  require("../assets/images/paisaje_global/DSC_8575.jpg"),
  require("../assets/images/paisaje_global/DSC_8648.jpg"),
  require("../assets/images/paisaje_global/DSC_9131.jpg"),
  require("../assets/images/paisaje_global/DSC_9254.jpg"),
  require("../assets/images/paisaje_global/IMG-20231129-WA0030.jpg"),
];

export const PAISAJES_LIST: Paisaje[] = [
  {
    id: "bofedal",
    name: "Bofedales",
    shortName: "Bofedal",
    tagline: "Humedales de saturación permanente y baja salinidad",
    icon: "water",
    color: "#00a99d",
    description: [
      "Los bofedales altoandinos son humedales de baja salinidad y alta disponibilidad hídrica, caracterizados por la saturación permanente de sus suelos. Su abastecimiento de agua proviene principalmente de vertientes alimentadas por aguas subterráneas, deshielos y, en menor medida, de precipitaciones pluvionivales. La vegetación dominante está formada por especies de crecimiento pulviniforme (en cojín). En el Parque Nacional Nevado Tres Cruces las especies características de bofedales son Oxychloe andina y Zameioscirpus atacamensis.",
      "Según su geomorfología, origen del agua y funcionamiento ecológico e hidrológico, se distinguen tres tipos de bofedales.",
      "En conjunto, los bofedales cumplen funciones ecosistémicas clave, incluyendo regulación hídrica, almacenamiento y liberación gradual de agua, captura de carbono y provisión de hábitat para numerosas especies acuáticas y semiacuáticas.",
    ],
    subtypes: [
      {
        name: "Bofedales de ladera (sloping peatlands)",
        description:
          "Se desarrollan en fondos de quebradas y valles estrechos con pendientes pronunciadas. Presentan forma alargada y angosta, siguiendo la dirección del flujo de agua. Su principal fuente hídrica son las descargas subterráneas locales, complementadas por deshielo y escorrentía superficial. Son sistemas dinámicos y muy sensibles a variaciones en la disponibilidad de agua, por lo que constituyen buenos indicadores del estado hidrológico de las cuencas. Un ejemplo de este tipo es el Bofedal de La Gallina.",
      },
      {
        name: "Bofedales de cuenca (basin peatlands)",
        description:
          "Se ubican en depresiones, circos glaciares o detrás de morrenas. Tienen mayor extensión y pendientes suaves, pudiendo alcanzar cientos de metros de ancho y varios kilómetros de longitud. Se alimentan por escorrentía glaciar, precipitaciones y aguas subterráneas, integrando flujos locales y regionales. Presentan una hidrología más compleja y mayor heterogeneidad ecológica, siendo generalmente más estables que los de ladera. Se encuentran en el sistema lagunar de Santa Rosa y a lo largo del corredor biológico de Ciénaga Redonda.",
      },
      {
        name: "Bofedales planos",
        description:
          "Se desarrollan en extensas planicies altoandinas y forman grandes áreas continuas de vegetación húmeda, frecuentemente asociadas a usos pastoriles y manejo ancestral. Este tipo de bofedales manejados no fue identificado dentro del área del Sitio Ramsar Complejo Lacustre Laguna del Negro Francisco y Laguna Santa Rosa.",
      },
    ],
    images: [require("../assets/images/paisajes/bofedal.jpg")],
  },
  {
    id: "vega",
    name: "Vegas",
    shortName: "Vega",
    tagline: "Herbáceas higrófilas de régimen hídrico estacional",
    icon: "sprout",
    color: "#a98743",
    description: [
      "Las vegas altoandinas son humedales formados por herbáceas higrófilas adaptadas a un régimen de inundación temporal, con suelos saturados pero no necesariamente anegados todo el año, por lo que presentan una dinámica hídrica estacional. Sus fuentes de agua son más bien superficiales o subsuperficiales, asociadas a regímenes de precipitación pluvionival y cursos de agua permanente. Su vegetación está dominada por ciperáceas, juncáceas y herbáceas de crecimiento abierto y disperso o laxo (con coberturas entre el 50 y 70%).",
      "Tienen una baja acumulación de carbono en comparación con los bofedales y presentan una alta tasa de descomposición, siendo sistemas más dinámicos. Su aporte a la regulación hídrica es bajo y responden con rapidez a los cambios del clima, con menor resiliencia. Pueden encontrarse unidades mixtas o de transición funcional bofedal-vega, donde las vegas se ubican en la periferia con menor saturación de agua y mayor concentración salina.",
      "Presentan alta productividad y regeneración anual, por lo que tienen un rol relevante para la ganadería camélida. Se ubican habitualmente en fondos de valle y zonas de drenaje o áreas con napas someras, y su distribución está controlada por el nivel freático. Son altamente sensibles a la extracción de agua, el sobrepastoreo y las sequías prolongadas. En el Parque Nacional Nevado de Tres Cruces se les encuentra en el sector de laguna Sur del sistema lacustre Santa Rosa y en la periferia de la laguna del Negro Francisco.",
    ],
    images: [require("../assets/images/paisajes/vega.jpg")],
  },
  {
    id: "pajonal",
    name: "Pajonales hídricos",
    shortName: "Pajonal",
    tagline: "Gramíneas cespitosas de menor saturación hídrica",
    icon: "grass",
    color: "#FF7BAC",
    description: [
      "Los pajonales hídricos son una tercera formación de los humedales altoandinos: una formación herbácea dominada por gramíneas de la familia Poaceae, asociadas a condiciones de humedad edáfica pero con menor grado de saturación que vegas y bofedales. Son parte del SVAHT (Sistema Vegetacional Azonal Hídrico Terrestre) y pueden comportarse como formaciones puras o como transición con bofedales, vegas y la vegetación zonal.",
      "Al depender en menor grado de la humedad del suelo, en su condición de transición pueden ser indicadores de degradación por estrés hídrico de las otras dos formas de humedales. El origen del agua es principalmente la precipitación, los escurrimientos difusos o la infiltración local, y no están asociados a un nivel freático superficial constante durante el año. Su rasgo característico es el crecimiento cespitoso en manchones o matas, con una cobertura parchosa y de menor densidad que vegas y bofedales.",
      "Las especies dominantes son Cinnagrostis velutina, Puccinellia frígida, Stipa spp. y Festuca spp. Tienen relevancia para la ganadería de camélidos como fuente de forraje. Son sensibles al sobrepastoreo y a la disponibilidad hídrica, por lo que son buenos indicadores tempranos de pérdida de humedad, particularmente gatillada por la disminución de precipitaciones producto de la crisis climática.",
    ],
    images: [require("../assets/images/paisajes/pajonal.jpg")],
  },
];

export function getPaisaje(id: string | undefined): Paisaje | undefined {
  return PAISAJES_LIST.find((p) => p.id === id);
}
