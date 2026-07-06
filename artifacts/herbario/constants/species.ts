export interface Taxonomy {
  division: string;
  clase: string;
  orden: string;
  familia: string;
  genero: string;
}

export interface PhotoCategory {
  key: string;
  label: string;
  /** The first image is treated as the main/representative photo. */
  images: string[];
}

export interface Species {
  id: string;
  scientificName: string;
  authority: string;
  family: string;
  genus: string;
  commonName: string;
  taxonomy: Taxonomy;
  altitude: string;
  distribution: string[];
  morphology: string[];
  phenomenology: string[];
  ecology: string;
  photoLabels: string[];
  photos?: PhotoCategory[];
  /** Reference to the species record in Herbario Digital. */
  sourceUrl?: string;
  /** Bibliographic references for the species. */
  references?: string[];
}

const PHOTO_BASE = "https://oasisudd.github.io/herbario";

const CATALOGO_GENERAL_REF =
  "Rodríguez, R., C. Marticorena, D. Alarcón, C. Baeza, L. Cavieres, V. L. Finot, N. Fuentes, A. Kiessling, M. Mihoc, A. Pauchard, E. Ruiz, P. Sánchez & A. Marticorena. 2018. Catálogo de las plantas vasculares de Chile. Gayana Botánica 75(1): 1-430.";

const LLULLAILLACO_REF =
  "Peñaloza, A., Pardo, V., Marticorena, A., Cavieres, L., & Frugone, F. (2013). Flora y vegetación del parque nacional Llullaillaco. Región de Antofagasta.";

export const SPECIES_LIST: Species[] = [
  {
    id: "arenaria-rivularis",
    scientificName: "Arenaria rivularis",
    authority: "Phil.",
    family: "Caryophyllaceae",
    genus: "Arenaria",
    commonName: "Flor de atacama",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      orden: "Caryophyllales",
      familia: "Caryophyllaceae",
      genero: "Arenaria",
    },
    altitude: "3.200 – 4.700 m s.n.m.",
    distribution: ["AYP", "TAR", "ANT", "ATA", "COQ"],
    morphology: [
      "Hierba de crecimiento bajo (de 2 a 5 cm), crece en forma decumbente (los tallos crecen en forma rastrera pero los ápices en forma erguida) formando cojines en bofedales altoandinos o grietas rocosas que poseen humedad.",
      "Tallos erectos, con entrenudos cortos, glabros (sin pelos o tricomas), cilíndricos, de no más de 5 cm de altura, que crecen apoyándose sobre otras plantas o el sustrato. Muy ramificados desde la base.",
      "Hojas pequeñas (3 mm aprox.), muy juntas entre sí, opuestas imbricadas (dispuestas como las escamas de un pez) y algo carnosas (suculentas), más largas que anchas, glabras, de color verde claro luminoso, margen liso y ápice agudo.",
      "Flores blancas, solitarias, con 5 pétalos ovados y anchos. El cáliz se forma por sépalos glabros, ovado-triangulares de color verde. Posee alrededor de 10 estambres de color blanco o violáceo. Se distingue de las otras especies de Arenaria porque la parte femenina, en el centro de la flor, tiene 3 estilos.",
      "El fruto es una cápsula ovoide dehiscente, es decir que al madurar se abre espontáneamente para liberar sus semillas. Semillas de color negro brillante, reniformes (en forma de riñón), diminutas, con un tamaño similar a un grano de arena fina o la punta de una aguja de coser.",
    ],
    phenomenology: [
      "Hemicriptófita: en malas condiciones se seca y solo sobreviven yemas a ras de suelo que rebrotan cuando mejoran las condiciones. Sus hojas, aunque pequeñas, son gruesas y algo suculentas, lo que le permite almacenar agua. Su crecimiento pulvinado (en cojín) le permite disminuir la pérdida de agua por evaporación, adaptándose a condiciones extremas de alta montaña.",
      "Cuenta con un ciclo de vida perenne, es decir, la planta se mantiene viva durante todo el año. Aunque en períodos desfavorables puede perder parte de su follaje manteniendo solo los brotes de renuevo.",
      "Florece en forma abundante durante la estación estival (diciembre a febrero), pero, si eres buen observador, durante todo el año se puede encontrar alguna flor, sobre todo cuando crece en ambientes saturados en agua con disponibilidad hídrica permanente.",
      "Las semillas son liberadas durante el estío o transición entre verano-otoño. Entran en dormancia durante la época más fría para luego germinar y crecer durante el calor del verano.",
      "No tiene un síndrome de dispersión especializado, aunque por su diminuto tamaño puede hacerlo por hidrocoria (agua), barocoria (gravedad o salpicadura) o anemocoria (viento).",
    ],
    ecology:
      "Es una especie altoandina que crece entre los 3.200 y 4.700 m s.n.m., típica de vegas, bofedales y márgenes de cursos de agua.",
    photoLabels: ["Foto flor", "Foto tallo"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Arenaria_rivularis/principal/DSC_7448.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Arenaria_rivularis/flor/20250114_132955.jpg`],
      },
      {
        key: "tallo",
        label: "Tallo",
        images: [`${PHOTO_BASE}/Arenaria_rivularis/tallo/20250117_104621.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/1870/",
    references: [
      "Montesinos-Tubée, D., & Teillier, S. (2022). Arenaria L. (Caryophyllaceae) en Chile. Gayana Botánica, 79(2), 124-139.",
      LLULLAILLACO_REF,
      CATALOGO_GENERAL_REF,
      "Volponi, C. R. (1985). Sinopsis de las especies argentinas de Arenaria (Caryophyllaceae). Darwiniana, 331-351.",
    ],
  },
  {
    id: "azorella-cryptantha",
    scientificName: "Azorella cryptantha",
    authority: "(Clos) Reiche",
    family: "Apiaceae",
    genus: "Azorella",
    commonName: "Llareta",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      orden: "Apiales",
      familia: "Apiaceae",
      genero: "Azorella",
    },
    altitude: "2.500 – 4.300 m s.n.m.",
    distribution: ["ATA", "COQ"],
    morphology: [
      "Subarbusto bajo (en la base el tronco y las ramas más antiguas son leñosos, pero las ramas nuevas son herbáceas) que forma cojines planos adaptados a la forma del sustrato. El crecimiento tiende a ser más rápido en la periferia que en el centro y la forma, dureza y extensión de las hojas y ramas pueden variar dentro de un mismo individuo.",
      "Tallos con entrenudos cortos que alcanzan apenas unos cm de alto. Presentan numerosas hojas dispuestas en rosetas en los extremos de las ramas; hacia la base están cubiertos por restos foliares que persisten en la planta.",
      "Hojas rígidas y punzantes, pueden ser enteras, aciculares (con forma de aguja) o trífidas (divididas en 3 lóbulos aciculares divergentes). Márgenes lisos, dentados o laciniados, con cilios o diminutas vellosidades. Cuentan con una base ensanchada que puede ser amplexicaule (abraza el tallo), membranácea y blanquecina.",
      "La inflorescencia es una umbela sésil (las bases de las flores nacen desde un mismo punto, como las varillas de un paraguas). Flores amarillas con 5 pétalos: estaminadas en la periferia (solo función masculina) y perfectas en el centro (hermafroditas, con ambas funciones reproductivas).",
      "El fruto es un esquizocarpo que al madurar se divide en dos mericarpos (cada uno con una semilla). Tiene contorno ovado u oblongo y se caracteriza por estar muy comprimido dorsalmente.",
    ],
    phenomenology: [
      "Especie caméfita: planta perenne, generalmente leñosa como un arbusto enano, que puede vivir varios años. Sus yemas de reemplazo permanecen sobre el suelo pero a menos de 25 cm de altura. Su crecimiento pulvinado reduce la superficie expuesta a evapotranspiración, optimizando el almacenamiento de agua.",
      "Es resistente al estrés hídrico y tolera temperaturas bajo 0 °C, por lo que se le reconoce por su verdor durante todo el año. Sus hojas tienen consistencia endurecida y cartilaginosa, propia de especies xeromórficas (adaptadas a ambientes muy secos).",
      "Florece en la estación estival, entre diciembre y febrero, aprovechando el aumento del agua por los deshielos. Los frutos aparecen a finales de febrero y marzo. Difícilmente se observan flores fuera de la temporada primavera-verano.",
      "El principal síndrome de dispersión es anemocórico (viento) y barocórico (gravedad y arrastre). Su reproducción puede ser sexuada o asexuada, por fragmentación de un individuo que genera nuevos vástagos.",
    ],
    ecology:
      "Es una especie típica de la Cordillera de los Andes entre los 2.500 y 4.300 m s.n.m., frecuente en vegas, bofedales y márgenes de cursos de agua altoandinos.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Azorella_cryptantha/principal/20250119_133300.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Azorella_cryptantha/flor/20250119_135412.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Azorella_cryptantha/hoja/20250119_133305.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/2069/",
    references: [
      "Calviño, C. I., Fernández, M., & Martínez, S. G. (2016). Las especies de Azorella (Azorelloideae, Apiaceae) con distribución extra-Argentina. Darwiniana, nueva serie, 4(1), 57-82.",
      "Martínez, S. (1989). El género Azorella (Apiaceae-Hydrocotyloideae) en la Argentina. Darwiniana, 139-178.",
      "Martínez, S. (1993). Sinopsis del género Azorella (Apiaceae, Hydrocotyloideae). Darwiniana, 171-184.",
      CATALOGO_GENERAL_REF,
    ],
  },
  {
    id: "calandrinia-compacta",
    scientificName: "Calandrinia compacta",
    authority: "Barnéoud",
    family: "Montiaceae",
    genus: "Calandrinia",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      orden: "Caryophyllales",
      familia: "Montiaceae",
      genero: "Calandrinia",
    },
    altitude: "1.900 – 4.600 m s.n.m.",
    distribution: ["AYP", "TAR", "ANT", "ATA", "COQ", "RMS"],
    morphology: [
      "Hierba rizomatosa de crecimiento bajo, de 2 a 3 cm de altura, adaptada al crecimiento en condiciones de alta montaña.",
      "Tiene tallos cortos con hojas dispuestas en rosetas densas. Las hojas son lineares, dilatadas en la base, algo obtusas, de textura carnosa o suculenta, de láminas glabras (sin tricomas), aunque a veces presentan pequeñas vellosidades en el borde.",
      "Flores solitarias, con un pedúnculo del mismo largo o menor al de las hojas, por lo que parecen anidadas entre ellas. Tienen 5 a 6 pétalos de color rosa pálido hasta blanco; el cáliz se caracteriza por sépalos anchamente ovado-agudos, enteros y glabros. Puede tener entre 9 y 14 estambres por flor, que se ven rosado intenso antes de liberar el polen.",
      "Fruto cápsula dehiscente que se abre espontáneamente al madurar. Contiene semillas orbicular-reniformes (como riñón), de color negro o castaño oscuro y reticuladas, como si las rodeara una red.",
    ],
    phenomenology: [
      "Hemicriptófita: durante la estación desfavorable, la parte aérea muere o se reduce, pero sus yemas de reemplazo quedan protegidas a ras del suelo para rebrotar en mejores condiciones. Concentra su follaje de forma circular y compacta pegada al suelo (en roseta), minimizando la exposición a los vientos y optimizando la captación de calor.",
      "Tiene hojas suculentas o carnosas que le permiten almacenar agua. Su ciclo de vida es perenne y perennifolio: puede durar varios años y en buenas condiciones mantiene el verdor todo el año. Aunque delicada, resiste temperaturas bajo 0 y condiciones de congelamiento.",
      "Florece en primavera-verano, coincidiendo con la mayor disponibilidad hídrica por el deshielo (entre noviembre y febrero). Rara vez se ven flores fuera de esta temporada.",
      "Su síndrome de dispersión se asocia a barocoria (dispersión por gravedad).",
    ],
    ecology:
      "Especie andina que se distribuye entre los 1.900 y 4.600 m s.n.m., típica de vegas, bofedales y márgenes de cursos de agua altoandinos.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Calandrinia_compacta/principal/20250118_114038.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Calandrinia_compacta/flor/20250118_102156.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Calandrinia_compacta/hoja/DSC_7699.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/2312/",
    references: [
      LLULLAILLACO_REF,
      "Peralta, I. E. (1988). Sinopsis de las especies de Calandrinia (Portulacaceae) de los Andes Mendocinos. Boletín de la Sociedad Argentina de Botánica, 25(3/4), 511-537.",
      CATALOGO_GENERAL_REF,
    ],
  },
  {
    id: "carex-melanocystes",
    scientificName: "Carex melanocystis",
    authority: "Desv.",
    family: "Cyperaceae",
    genus: "Carex",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Liliopsida",
      orden: "Poales",
      familia: "Cyperaceae",
      genero: "Carex",
    },
    altitude: "0 – 3.500 m s.n.m.",
    distribution: [
      "AYP", "TAR", "ANT", "ATA", "COQ", "VAL", "RMS", "LBO",
      "MAU", "NUB", "BIO", "ARA", "LRI", "LLA", "AIS", "MAG",
    ],
    morphology: [
      "Hierba con rizomas largos, delgados y de color marrón oscuro (tallos que crecen horizontalmente justo bajo la superficie del suelo). Crece en forma de champa o grupos apretados que nacen a lo largo del rizoma. Alcanza alturas de 10 a 20 cm.",
      "Tallos glabros (pelados), erectos o ligeramente curvados, generalmente cubiertos por las bases marrón claro de las hojas. Sus hojas son glabras, estrechas, plegadas hacia la base y planas hacia el ápice, de estructura robusta y rígida por la presencia de cristales de sílice en sus tejidos.",
      "Presenta inflorescencias parecidas a las gramíneas, como espigas apretadas, glabras, de forma lineal-oblonga a oblongo-ovoide. Espigas andróginas (con flores pistiladas/femeninas y estaminadas/masculinas). Las glumas son ovales, castañas y con margen hialino (traslúcido). El periginio o utrículo es más corto que las glumas, de forma oblonga, color castaño, lustroso y de base redondeada.",
      "Fruto aquenio, seco y con una sola semilla de forma lenticular.",
    ],
    phenomenology: [
      "Hemicriptófita: durante el invierno más frío las partes aéreas pueden secarse o reducirse drásticamente, pero el sistema de yemas superficiales sobrevive protegido por la nieve o el sustrato pedregoso, listo para reactivarse en primavera. Suele encontrarse en ambientes saturados en agua o muy húmedos y en los bordes de humedales.",
      "Especie perenne y perennifolia: se mantiene viva por varios años y conserva su verdor en todas las estaciones, aunque su período de crecimiento más activo es la primavera y también el otoño (tras las lluvias de verano).",
      "Florece en primavera y suele alcanzar su madurez total en un período de uno a dos años.",
      "Su síndrome de dispersión más propio es la anemocoria (viento) e hidrocoria (arrastre en los cursos de agua).",
    ],
    ecology:
      "Con una amplia distribución entre los 0 y 3.500 m s.n.m., característica de vegas, bofedales y márgenes de cursos de agua altoandinos.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Carex_melanocystis/principal/20251130_163809.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Carex_melanocystis/flor/IMG_1489.JPG`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Carex_melanocystis/hoja/20250115_132054.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/20287/",
    references: [
      "Moore, D. M. (1983). Flora of Tierra del Fuego.",
      "Muñoz-Schüler, P., García-Moro, P., Márquez-Corro, J. I., Penneckamp, D., Sanz-Arnal, M., Martín-Bravo, S., & Jiménez-Mejías, P. (2023). The genus Carex (Cyperaceae) in Chile: a general update of its knowledge, with an identification key. Gayana Botánica, 80(2), 103-132.",
      LLULLAILLACO_REF,
      CATALOGO_GENERAL_REF,
    ],
  },
  {
    id: "cinnagrostis-velutina",
    scientificName: "Cinnagrostis velutina",
    authority: "(Nees & Meyen) P.M. Peterson & Soreng",
    family: "Poaceae",
    genus: "Cinnagrostis",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Liliopsida",
      orden: "Poales",
      familia: "Poaceae",
      genero: "Cinnagrostis",
    },
    altitude: "2.300 – 4.200 m s.n.m.",
    distribution: [
      "AYP", "TAR", "ANT", "ATA", "COQ", "RMS", "LBO", "MAU", "NUB", "BIO", "ARA",
    ],
    morphology: [
      "Hierba que crece formando champas densas y compactas de hasta 30 cm de altura. Los tallos forman cañas delgadas, glabras y filiformes (finas como un hilo). Las cañas floríferas son pubescentes, cubiertas de un suave vello.",
      "Las hojas, como en casi todas las gramíneas, tienen una vaina que abraza al tallo, una lámina que hace la fotosíntesis y una lígula en la unión entre ambas. Las láminas son filiformes, conduplicadas (dobladas a lo largo del nervio central), rígidas, junciformes (con forma de junco) y punzantes. La lígula es triangular, con pequeñas pestañas en el borde y márgenes hialinos.",
      "Las inflorescencias son panojas espiciformes (un racimo de espiguillas), con pedicelos escabrosos (ásperos al tacto). En las gramíneas las hojas cercanas a la flor se transformaron en glumas (protegen el conjunto) y en lemma y pálea (envuelven la flor); los pétalos quedaron reducidos a dos lodículas. Aquí las glumas son lanceoladas y finamente escabrosas, casi iguales en longitud; las lemmas tienen 5 nervios ligeramente ásperos, con arista dorsal algo retorcida.",
      "Las semillas se encuentran en frutos secos (cariópsides) indehiscentes, con forma de huso o fusiformes.",
    ],
    phenomenology: [
      "Herbácea hemicriptófita: sus yemas de renuevo se sitúan en la superficie del suelo. Durante el frío invierno de la alta cordillera las partes aéreas pueden secarse, pero las yemas quedan protegidas por la base de las hojas marchitas, la hojarasca o la nieve. Se ramifica densamente desde la base formando cojines o matas compactas (crecimiento cespitoso) que retienen calor y protegen los puntos de crecimiento del viento y la congelación.",
      "Su ciclo de vida es perenne: los individuos se mantienen vivos varios años, aunque sus estructuras foliares visibles se marchiten en las temporadas desfavorables.",
      "Florece a finales del verano entrando el otoño (entre febrero y mayo).",
      "El síndrome de dispersión característico de las gramíneas es la anemocoria: sus semillas son pequeñas, ligeras y presentan una plumilla que favorece su volatilidad.",
    ],
    ecology:
      "Es una especie típica de la Cordillera de los Andes entre los 2.300 y 4.200 m s.n.m., característica de pajonales hídricos y vegas, presente en condiciones de transición entre sistemas hídricos de diferente naturaleza (bofedal, vega, pajonal, humedal).",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Cinnagrostis_velutina/principal/20250114_123000.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Cinnagrostis_velutina/flor/DSC_7418.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Cinnagrostis_velutina/hoja/DSC_7422.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/2817/",
    references: [
      "De Agrasar, Z. E. R. (1978). Las especies australes del género Deyeuxia Clar. (Gramineae) de la Argentina y de Chile. Darwiniana, 417-453.",
      LLULLAILLACO_REF,
      CATALOGO_GENERAL_REF,
    ],
  },
  {
    id: "erythranthe-depressa",
    scientificName: "Erythranthe depressa",
    authority: "(Phil.) G.L. Nesom",
    family: "Phrymaceae",
    genus: "Erythranthe",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      orden: "Lamiales",
      familia: "Phrymaceae",
      genero: "Erythranthe",
    },
    altitude: "0 – 3.700 m s.n.m.",
    distribution: ["ANT", "ATA", "COQ"],
    morphology: [
      "Hierba con tallos cortos, formando una roseta basal laxa, con hojas opuestas y entrenudos que se alargan.",
      "Tallos ascendentes, cortos y redondeados, a veces fistulosos (huecos en su interior); también pueden desarrollar rizomas.",
      "Hojas delgadas, sésiles o con pecíolos cortos, que pueden medir hasta 6 cm de largo. Su forma es anchamente ovada, con margen irregular y dientes grandes o aserrados, ápice agudo, glabras por ambos lados.",
      "Flores solitarias cortamente pediceladas, dispuestas en la parte superior de los tallos o en las axilas de las hojas superiores. Hermafroditas. Los sépalos están fusionados formando una campana verde; los pétalos forman una corola tubular amarilla con 5 lóbulos. El lóbulo central es más largo y presenta manchas rojas conspicuas que actúan como guía de néctar para los polinizadores.",
      "Su fruto es una cápsula que se abre lateralmente. Genera semillas café oscuras, oblongas, reticuladas y apiculadas (terminan bruscamente en una punta corta y aguda).",
    ],
    phenomenology: [
      "Planta criptófita: sus yemas de renuevo y tallos rastreros quedan ocultos bajo el suelo en condiciones desfavorables. Además es helófita, de hábito anfibio, con raíces y base de los tallos bajo el agua, pero con hojas superiores, flores y frutos fuera del agua. Las yemas pasan el invierno protegidas bajo la capa de agua o el fango saturado.",
      "Perenne (un mismo individuo vive varios años) y perennifolia (mantiene su verdor y actividad fotosintética durante todo el año).",
      "El máximo de floración ocurre en primavera y verano temprano (entre septiembre y enero), pero por su asociación estricta a ambientes húmedos y saturados se pueden encontrar flores casi todo el año.",
      "El síndrome de dispersión más conocido es la barocoria (gravedad) y la hidrocoria (arrastre por cursos de agua). También se reproduce vegetativamente a través de rizomas.",
    ],
    ecology:
      "Es una especie propia de ambientes acuáticos, desde los 0 a 3.700 m s.n.m., típica de vegas, bofedales, márgenes de cursos de agua altoandinos y nacimientos de vertientes, presente tanto en la ecorregión del altiplano como en la mediterránea o desértica.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Erythranthe_depressa/principal/DSC_8363.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Erythranthe_depressa/flor/20250120_131924.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Erythranthe_depressa/hoja/DSC_8350.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/3606/",
    references: [
      "MMA. Ficha final de antecedentes de especie, Reglamento para la Clasificación de Especies Silvestres, Ministerio del Medio Ambiente.",
      CATALOGO_GENERAL_REF,
      "Von Bohlen, C. (1995). El género Mimulus L. (Scrophulariaceae) en Chile. Gayana Botánica, 52, 7-28.",
    ],
  },
  {
    id: "gamocarpha-compacta",
    scientificName: "Gamocarpha compacta",
    authority: "(Phil.) S. Denham & Pozner",
    family: "Calyceraceae",
    genus: "Gamocarpha",
    commonName: "Chicorea",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      orden: "Asterales",
      familia: "Calyceraceae",
      genero: "Gamocarpha",
    },
    altitude: "500 – 4.300 m s.n.m.",
    distribution: ["ANT", "ATA", "COQ", "RMS", "MAU"],
    morphology: [
      "Hierba rosulada o de crecimiento arrosetado, no supera los 3,5 cm de altura ni los 10 cm de diámetro aproximadamente.",
      "Presenta un tallo central con entrenudos muy cortos. Las hojas son gruesas, con base atenuada en el pecíolo, con lóbulos irregulares y lineales.",
      "Las flores se organizan en cabezuelas de 25 a 30 flores, llegando a más de 100 en la cabezuela central. Las cabezuelas están soportadas por pedúnculos carnosos agrupados en el centro de la roseta. En la base de la cabezuela hay un involucro con 7 lóbulos anchamente triangulares. Las flores son blancas, muy pequeñas (5 mm aprox.), con sépalos y una corola de pétalos soldados en cilindro o embudo terminado en 5 a 6 lóbulos triangulares.",
      "Los frutos son aquenios blancos, prismáticos, con 5 costillas longitudinales estrechas y planas. La consistencia externa es blanca y esponjosa, lo que les da una textura liviana y porosa.",
    ],
    phenomenology: [
      "Herbácea hemicriptófita: cuando los individuos duran varios años, sus yemas de renuevo permanecen a ras de suelo, casi imperceptibles durante la época desfavorable (invierno y sequía). La parte aérea muere anualmente, lo que le permite sobrevivir en ambientes extremos.",
      "Se considera perenne, pero puede actuar como anual o bienal facultativa: los individuos pueden vivir varios años, aunque en condiciones muy adversas mueren y dependen de nuevas semillas.",
      "Florece durante la primavera tardía y el verano (noviembre a enero).",
      "El síndrome de dispersión más probable es la anemocoria (viento), dado el volumen y consistencia de su fruto.",
    ],
    ecology:
      "Es una especie típica de la Cordillera de los Andes entre los 500 y 4.300 m s.n.m. Se encuentra en los alrededores de vegas y bofedales, donde aún persiste humedad en el suelo aunque no haya saturación hídrica; por ello no se le considera estrictamente hidrófila.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Gamocarpha_compactaR/principal/20250118_102108.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Gamocarpha_compactaR/flor/20250118_102118.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Gamocarpha_compactaR/hoja/DSC_7718.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/3828/",
    references: [
      CATALOGO_GENERAL_REF,
      "Zavala-Gallo, L., Denham, S., & Pozner, R. (2010). Revisión del género Nastanthus (Calyceraceae). Gayana Botánica, 67(2), 158-175.",
    ],
  },
  {
    id: "gayophytum-micranthum",
    scientificName: "Gayophytum micranthum",
    authority: "Hook. & Arn.",
    family: "Onagraceae",
    genus: "Gayophytum",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      orden: "Myrtales",
      familia: "Onagraceae",
      genero: "Gayophytum",
    },
    altitude: "2.500 – 4.500 m s.n.m.",
    distribution: ["ANT", "ATA", "COQ", "VAL", "RMS", "LBO", "MAU"],
    morphology: [
      "Hierba de crecimiento postrado, decumbente o erecto, de hasta 40 cm, generalmente ramificada en la base y a lo largo de todo el tallo, con ramas inferiores a menudo tan largas como el tallo principal.",
      "Los tallos son frecuentemente rojizos, glabros (pelados) o escasamente pubescentes. Las hojas son casi glabras, sésiles y de disposición alterna, con un largo de 5-30 mm por 1-3 mm de ancho, es decir delgadas y lineares.",
      "Las flores son subsésiles, casi unidas al tallo por un pecíolo inapreciable. El cáliz es glabro a escasamente pubescente, y la corola tiene cuatro pétalos blancos de 1-2 mm de largo. Presenta una estructura tubular o en forma de copa (por fusión de las bases de sépalos, pétalos y estambres) en cuyo interior se desarrolla el ovario.",
      "Su fruto es una cápsula alargada de hasta 10 mm. Cada fruto contiene menos de 10 semillas, dispuestas en forma alternada, tan pequeñas como la punta de un lápiz pasta.",
    ],
    phenomenology: [
      "Tiene un hábito terófito (anual): completa germinación, crecimiento, floración y producción de semillas durante la estación favorable, y muere en condiciones desfavorables. Por su aparición intermitente es difícil registrar su presencia.",
      "Herbácea que crece en la transición de sistemas azonales hídricos y zonales secos. Su presencia es indicadora de humedad, por lo que se asocia de forma periférica a los sistemas vegetacionales azonales hídricos.",
      "Florece en primavera-verano, y es una especie adaptada a climas fríos, tolerando temperaturas de hasta -8 °C y nevadas ocasionales.",
      "Sus síndromes de dispersión son la barocoria (gravedad) y la anemocoria (viento).",
    ],
    ecology:
      "Gayophytum micranthum es una de las dos especies del género descritas para Chile. Su presencia está restringida a la Cordillera de los Andes, por sobre la línea de crecimiento leñoso, entre los 2.500 y 4.500 m s.n.m.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Gayophytum_micranthum/principal/20250119_134030.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Gayophytum_micranthum/flor/DSC_8062.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Gayophytum_micranthum/hoja/DSC_8061.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/3896/",
    references: [
      "Lewis, H., & Szweykowski, J. (1964). The genus Gayophytum (Onagraceae). Brittonia, 16(4), 343-391.",
      LLULLAILLACO_REF,
      CATALOGO_GENERAL_REF,
      "Teillier, S. (1998). Las especies chilenas de Gayophytum (Onagraceae). Chloris Chilensis Año 1, Nº1. http://www.chlorischile.cl",
    ],
  },
  {
    id: "halerpestres-exilis",
    scientificName: "Halerpestes exilis",
    authority: "(Phil.) Tamura",
    family: "Ranunculaceae",
    genus: "Halerpestes",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      orden: "Ranunculales",
      familia: "Ranunculaceae",
      genero: "Halerpestes",
    },
    altitude: "2.000 – 4.300 m s.n.m.",
    distribution: ["AYP", "TAR", "ANT", "ATA", "COQ"],
    morphology: [
      "Hierba que, según el ambiente, puede tener crecimiento rastrero (en suelos húmedos) o erecto (cuando se encuentra dentro de un cuerpo de agua).",
      "Los tallos pueden alcanzar hasta 50 cm y desarrollar raíces en los nudos de los tallos rastreros. Las hojas son pequeñas (2,5 a 10 mm × 5 a 6 mm), largamente pecioladas, divididas en 3-5 lóbulos, con el central generalmente más grande que los laterales. Las láminas son de un verde brillante, aunque a veces toman tonalidades rojizas.",
      "Las flores se disponen en grupos de pocas flores o solitarias, sostenidas por un tallo floral de longitud variable. El cáliz tiene 5-6 sépalos amarillos ovados o suborbiculares, algo asimétricos. Cada flor tiene 5-6 pétalos principalmente amarillos (a veces blancos), con margen entero y una escama gruesa en la base que forma un bolsillo productor de néctar. Posee numerosas anteras y numerosos carpelos libres agrupados en el centro.",
      "Los frutos son aquenios (fruto seco con una sola semilla) que se desarrollan de la modificación de los carpelos y quedan unidos al receptáculo, formando un poliaquenio.",
    ],
    phenomenology: [
      "Planta terófita: por su dependencia hídrica, en ambientes andinos donde el agua es marcadamente estacional funciona como anual, muriendo la planta madre con la sequía o las heladas y sobreviviendo la estación desfavorable como semilla.",
      "En condiciones de humedad constante, sus partes aéreas se destruyen con el hielo pero mantiene microrizomas o bases caulinares vivas bajo el agua, actuando como criptófita facultativa cuyas yemas pasan la estación desfavorable protegidas en el agua o el fango saturado.",
      "Florece principalmente durante el verano, aunque las flores se pueden observar hasta el otoño temprano (marzo-abril).",
      "El principal síndrome de dispersión es la zoocoria, así como la anemocoria (viento).",
    ],
    ecology:
      "Es una especie altoandina que se encuentra entre los 2.000 y 4.300 m s.n.m., típica de los sistemas vegetacionales hídricos como bofedales y vegas, orillas de lagunas y salares, y humedales de puna y pre-puna; en general, sistemas saturados en agua.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Halerpestes_exilis/principal/20250118_093615.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Halerpestes_exilis/flor/20250118_093409.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Halerpestes_exilis/hoja/20250120_105529.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/234970/",
    references: [
      LLULLAILLACO_REF,
      CATALOGO_GENERAL_REF,
      "Spegazzini, C. (1905). Flora de la provincia de Buenos Aires (Vol. 1). Imp. de M. Biedma é hijo.",
    ],
  },
  {
    id: "lobelia-spp",
    scientificName: "Lobelia oligophylla",
    authority: "(Wedd.) Lammers",
    family: "Campanulaceae",
    genus: "Lobelia",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      orden: "",
      familia: "Campanulaceae",
      genero: "Lobelia",
    },
    altitude: "0 – 4.000 m s.n.m.",
    distribution: [
      "AYP", "TAR", "ANT", "ATA", "COQ", "VAL", "RMS", "LBO",
      "MAU", "NUB", "BIO", "ARA", "LRI", "LLA", "AIS", "MAG",
    ],
    morphology: [
      "Hierba estolonífera, con tallos de crecimiento rastrero capaces de generar raíces en los nudos, lo que le permite formar densas alfombras. Es completamente glabra, de tamaño pequeño (no sobrepasa los 5 cm de altura), pero puede cubrir varios centímetros de superficie.",
      "Los tallos son delgados, generalmente blancos y frágiles. Las hojas son simples, ovadas a elípticas, con margen entero o débilmente lobulado, a menudo con pequeñas glándulas rojizas. Son pecioladas, de no más de 3-12 mm de largo, en disposición alterna, a veces plegadas a lo largo del nervio medio (conduplicadas).",
      "Las flores nacen en la axila entre el tallo y el pecíolo de la hoja. Son solitarias y pequeñas. El cáliz forma 5 dientes triangulares; los pétalos, fusionados en la base, forman una corola asimétrica en tubo corto con los ápices libres. La corola puede ser blanca, celeste pálido o lila, con manchas amarillas en la base y líneas moradas que actúan como guía para los polinizadores.",
      "Como fruto produce una cápsula modificada de paredes carnosas que parece una baya y se abre tardíamente. La cápsula es globosa, con numerosas semillas diminutas.",
    ],
    phenomenology: [
      "Planta criptófita / helófita: sus yemas de reemplazo pasan el invierno protegidas a nivel del suelo, cubiertas por el agua o el fango saturado. Crece a pleno sol, tolera heladas intensas, largos períodos de nieve y suelos compactos o anegados, actuando muchas veces como especie formadora de césped en humedales de montaña.",
      "Es una especie perenne: un mismo individuo puede vivir varios años y, aunque puede mantener su verdor todo el año, en épocas desfavorables pierde gran parte de sus hojas.",
      "Florece principalmente en primavera-verano en la alta montaña (entre septiembre y abril). Durante el invierno permanece latente o con crecimiento muy reducido.",
      "El principal síndrome de dispersión es la hidrocoria: sus semillas, muy pequeñas y livianas, se desplazan con la ayuda de los cursos de agua y la microcirculación en los bofedales y vegas.",
    ],
    ecology:
      "Es una especie de amplia distribución, desde el nivel del mar hasta los 4.000 m s.n.m. Es particularmente frecuente en ambientes altoandinos y subantárticos húmedos, donde la humedad compensa las bajas temperaturas. Característica de vegas y bofedales altoandinos, bordes de lagunas, esteros y cursos de agua permanentes, pantanos, turberas y suelos saturados en agua.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Lobelia_oligophylla/principal/calvario/IMG_8024.JPG`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Lobelia_oligophylla/flor/cancosa/IMG_2109.JPG`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Lobelia_oligophylla/hoja/20251129_151919.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/4634/",
    references: [
      "Lammers, T. G. (1999). Nomenclatural consequences of the synonymization of Hypsela reniformis (Campanulaceae: Lobelioideae). Novon, 73-76.",
      LLULLAILLACO_REF,
      CATALOGO_GENERAL_REF,
    ],
  },
  {
    id: "oxychloe-andina",
    scientificName: "Oxychloe andina",
    authority: "Phil.",
    family: "Juncaceae",
    genus: "Oxychloe",
    commonName: "Puko, pako macho",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Liliopsida",
      orden: "Poales",
      familia: "Juncaceae",
      genero: "Oxychloe",
    },
    altitude: "3.000 – 5.000 m s.n.m.",
    distribution: ["AYP", "TAR", "ANT", "ATA", "COQ", "RMS"],
    morphology: [
      "Hierba de crecimiento bajo que forma cojines o carpetas densas que asemejan una alfombra punzante de aproximadamente 30 cm de espesor y que alcanza varios metros de diámetro.",
      "Tallos lisos de crecimiento rastrero, con parte de su estructura sumergida en agua, cortos, fuertemente comprimidos, ocultos por la disposición apretada de las hojas, rizomatosos en la base. Las vainas terminan en dos aurículas (apéndices redondeados) y envuelven al tallo; la lámina, ensanchada en la base, termina en un ápice puntiagudo y punzante, de color verde oscuro a verde amarillento.",
      "La especie es mayoritariamente dioica (\"dos casas\"): son frecuentes los individuos unisexuados con flores masculinas o femeninas. Las flores son solitarias, se insertan en las axilas de las hojas cerca del ápice de los brotes y tienen dos brácteas protectoras. Sépalos y pétalos son similares, de color púrpura a rojizo. Las flores masculinas son largamente pedunculadas y las femeninas sésiles, protegidas dentro del cojín.",
      "El fruto es una cápsula de color rojo intenso a purpúreo, seca, que se abre en su madurez. Cada cápsula puede contener entre 40 y 70 semillas ovaladas, minúsculas, de color amarillo-ocre.",
    ],
    phenomenology: [
      "Hemicriptófita: las yemas activas de renovación se protegen a ras de suelo, en la base de la densa masa de hojas. Las hojas muertas de temporadas anteriores quedan unidas al tallo, formando una estructura interna maciza y aislante que protege las yemas vivas.",
      "Perenne: los individuos pueden vivir varios años y, en buenas condiciones de irrigación y temperaturas sobre 4 °C, pueden ser también perennifolios (mantener el verdor todo el año).",
      "Florece en la estación estival (verano), en lo que se conoce como invierno altiplánico, entre octubre y marzo, con un pico entre diciembre y enero.",
      "El principal síndrome de dispersión es la hidrocoria (transporte por el agua) y, en segunda instancia, la barocoria (los frutos caen al suelo por su propio peso).",
    ],
    ecology:
      "Presenta una distribución discontinua, estrictamente asociada a condiciones hídricas que permitan la formación de bofedales de altura. Su rango altitudinal va de los 3.000 a 5.000 m s.n.m., con ocurrencias concentradas entre los 3.500 y 4.500 m s.n.m.",
    photoLabels: ["Foto flor masculina", "Foto flor femenina", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Oxychloe_andina/principal/20250118_161348.jpg`],
      },
      {
        key: "flor_masculina",
        label: "Flor masculina",
        images: [`${PHOTO_BASE}/Oxychloe_andina/flor_masculina/20250118_095853.jpg`],
      },
      {
        key: "flor_femenina",
        label: "Flor femenina",
        images: [`${PHOTO_BASE}/Oxychloe_andina/flor_femenina/20250118_134159.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Oxychloe_andina/hoja/DSC_7838.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/20258/",
    references: [
      "Balslev, H. (1996). Juncaceae. Flora Neotropica, 1-167.",
      "Barros, M. (1953). Las juncáceas de la Argentina, Chile y Uruguay. Darwiniana, 10(3), 279-460.",
      CATALOGO_GENERAL_REF,
    ],
  },
  {
    id: "phylloscirpus-acaulis",
    scientificName: "Phylloscirpus acaulis",
    authority: "(Phil.) Goetgh. & D.A. Simpson",
    family: "Cyperaceae",
    genus: "Phylloscirpus",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Liliopsida",
      orden: "Poales",
      familia: "Cyperaceae",
      genero: "Phylloscirpus",
    },
    altitude: "2.000 – 3.500 m s.n.m.",
    distribution: [
      "AYP", "TAR", "ANT", "ATA", "COQ", "RMS", "LBO", "MAU", "NUB", "BIO", "ARA",
    ],
    morphology: [
      "Hierba de crecimiento cespitoso: forma densas carpetas creando superficies completamente cubiertas de hojas muy apretadas.",
      "Los tallos principales son subterráneos o crecen a ras del suelo, en forma rastrera, uniendo las rosetas de hojas. Las hojas son cortas, ensanchadas en la base y unidas al tallo mediante una vaina corta, con disposición basal en roseta que le da apariencia de pequeñas matas densas.",
      "Presenta una inflorescencia compacta en forma de cabezuela (capituliforme) que agrupa de 2 a 5 espiguillas en el centro de una densa roseta de hojas. Las cabezuelas miden 10 a 15 mm de diámetro y se sitúan sobre un pedúnculo que sobresale hasta 5 cm. Las glumas son verdes en el centro, con bordes amarillentos y diminutos puntos rojos; los pétalos y sépalos se transformaron en 6 setas o filamentos que al madurar superan el largo del fruto, dándole una apariencia \"chascona\" o plumosa.",
      "Como fruto produce un aquenio (fruto seco) triangular, de color brillante oscuro, de aproximadamente 2 mm, rodeado de 6 filamentos más largos que este.",
    ],
    phenomenology: [
      "Hemicriptófita: durante el invierno altoandino más desfavorable las partes aéreas pueden secarse parcialmente, pero las yemas basales permanecen protegidas a nivel del suelo por la densa cobertura de sus hojas arrosetadas. Se encuentra habitualmente en la periferia y zonas más secas de un bofedal.",
      "Perenne y perennifolia: un mismo individuo puede vivir varios años y mantener su verdor todo el año si las condiciones de humedad y temperatura lo permiten.",
      "Florece en primavera temprana, apenas ocurren los primeros deshielos y desaparece la nieve; las flores se pueden mantener hasta finales de febrero o principios de marzo.",
      "Su síndrome de dispersión preferencial es la anemocoria (viento).",
    ],
    ecology:
      "Especie nativa de Sudamérica (entre los 18°S y 38°S), propia de ambientes cordilleranos y precordilleranos. Su distribución altitudinal abarca de los 2.000 a los 3.500 m s.n.m. Característica de vegas, bofedales, orillas de lagunas, manantiales y cursos de agua cordilleranos, y de depresiones mal drenadas. Crece sobre suelos permanentemente húmedos o anegados, generalmente finos, orgánicos o limo-arcillosos. Es tolerante a heladas frecuentes, alta radiación UV y marcadas amplitudes térmicas diarias.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Phylloscirpus_acaulis/principal/IMG_8414.JPG`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Phylloscirpus_acaulis/flor/cancosa/IMG_2115.JPG`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Phylloscirpus_acaulis/hoja/DSC_7424.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/5659/",
    references: [
      "Barros, M. (1969). Cyperaceae. En M. N. Correa, Flora Patagónica, Colecc. Ci. Inst. Nac. Tecnol. Agropecu. 8(2): 38-92.",
      "Dhooge, S., & Goetghebeur, P. (2004). Phylloscirpus (Cyperaceae) revisited. Novon, 278-284.",
      CATALOGO_GENERAL_REF,
    ],
  },
  {
    id: "puccinellia-frigida",
    scientificName: "Puccinellia frigida",
    authority: "(Phil.) I.M. Johnst.",
    family: "Poaceae",
    genus: "Puccinellia",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Liliopsida",
      orden: "Poales",
      familia: "Poaceae",
      genero: "Puccinellia",
    },
    altitude: "200 – 4.600 m s.n.m.",
    distribution: ["AYP", "TAR", "ANT", "ATA", "COQ"],
    morphology: [
      "Hierba perenne de crecimiento erguido que, según las condiciones de humedad y luz, puede adoptar una posición decumbente. Forma céspedes compactos, densos y en forma de almohadillas, con hojas principalmente basales que forman una champa.",
      "Los tallos florales sobrepasan las hojas y pueden alcanzar de 35 a 50 cm de altura, con forma articulada (cañas con nudos y entrenudos), en cuyos ápices se encuentran las espiguillas.",
      "Las láminas son erectas y angostas; en su fase madura son planas, pero pueden encontrarse convolutas (con los márgenes curvados hacia adentro). Presentan lígulas membranáceas y traslúcidas de 2 a 4 mm. Su inflorescencia es una panícula, con espiguillas verdosas y glabras de 2-5 flores. Las glumas son desiguales; las lemmas ovadas, glabras, con 5 nervios visibles y ápice denticulado; las páleas similares a las lemmas con ápices de dos lóbulos.",
      "Produce un fruto tipo cariópside (fruto seco pequeño con una semilla) de color castaño claro, finamente reticulado.",
    ],
    phenomenology: [
      "Hemicriptófita cespitosa: sus yemas de renuevo se sitúan en la superficie del suelo. Durante el frío invierno de la alta cordillera las partes aéreas pueden secarse, pero las yemas quedan protegidas por la base de las hojas marchitas, la hojarasca o la nieve.",
      "Herbácea que crece en suelos hidromórficos (saturados en agua de forma permanente o temporal gran parte del año). Está adaptada a condiciones extremas de alta montaña y puede soportar temperaturas de hasta -15 °C o -20 °C.",
      "Habitualmente perenne, pero ante mayor estrés ambiental puede tener hábito anual y reproducirse por semillas en la siguiente temporada favorable.",
      "El pico de floración ocurre en primavera (entre septiembre y octubre), pero se pueden encontrar inflorescencias ya envejecidas durante el verano. Su dispersión es principalmente por anemocoria (viento).",
    ],
    ecology:
      "Es nativa de Sudamérica, con distribución exclusiva en la Cordillera de los Andes y zonas altoandinas, en un rango altitudinal de 200 a 4.600 m s.n.m. Propia de ecosistemas con alta disponibilidad hídrica, como bordes de salares y pampas desérticas, bofedales, vegas y pajonales. Está adaptada a bajas temperaturas, radiación UV extrema y alta evapotranspiración, y crece en suelos finos y compactos con alta salinidad edáfica.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Puccinellia_frigida/principal/20250114_155125.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Puccinellia_frigida/flor/DSC_7403.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Puccinellia_frigida/hoja/DSC_7488.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/5956/",
    references: [
      "Nicora, E. G. (1999). Sinopsis de las especies del género Puccinellia (Poaceae, Pooideae, Poeae) de Argentina, Bolivia, Chile y Uruguay. Darwiniana, 301-314.",
      LLULLAILLACO_REF,
      CATALOGO_GENERAL_REF,
    ],
  },
  {
    id: "triglochin-concinna",
    scientificName: "Triglochin concinna",
    authority: "Burtt Davy",
    family: "Juncaginaceae",
    genus: "Triglochin",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Liliopsida",
      orden: "Alismatales",
      familia: "Juncaginaceae",
      genero: "Triglochin",
    },
    altitude: "0 – 3.900 m s.n.m.",
    distribution: ["TAR", "ANT", "ATA", "VAL", "MAG"],
    morphology: [
      "Hierba rizomatosa: posee tallos subterráneos que le permiten extenderse horizontalmente, formando rebrotes con matas nuevas (reproducción vegetativa o por estolones).",
      "Los tallos son principalmente subterráneos; los de la superficie son tallos florales (escapos) de textura lisa y glabra, teretes (cilíndricos) y huecos, de color verdoso oscuro a violáceo, que sobresalen entre 10 y 50 cm.",
      "Las hojas nacen de una roseta basal. Se componen de una vaina de márgenes hialinos, una lígula con dos lóbulos y una lámina carnosa, erecta, glabra, ovalada y semicilíndrica.",
      "Inflorescencias en racimo, con flores en verticilos que se separan al alargarse el escapo, de tonalidad violácea, con 3 a 10 flores por escapo. Las flores son diminutas, sésiles o cortamente pediceladas, con 6 apéndices (3 sépalos y 3 pétalos que no se distinguen entre sí). Cada apéndice interno tiene un estambre sésil, y en el centro está el pistilo.",
      "El fruto es un esquizocarpo con aspecto de huevo o barril pequeño que al madurar se divide en 6 mericarpos, cada uno con una semilla.",
    ],
    phenomenology: [
      "Especie criptófita: sus yemas permanecen ocultas bajo el suelo en condiciones desfavorables. Según el ambiente puede ser geófita rizomatosa (yemas enterradas, propagación por rizomas subterráneos) o helófita (en ambientes saturados en agua, con yemas protegidas bajo el lodo o el sustrato inundado).",
      "Perenne: un mismo individuo puede vivir varios años y mantener su tonalidad verde todo el año si las condiciones son favorables. Se desarrolla lentamente, en particular durante sus primeros tres años.",
      "Se activa tras las primeras lluvias: rebrota de los rizomas en primavera y florece entre octubre y marzo, con una fenología oportunista o pulsátil gatillada por pulsos de disponibilidad de agua. En el altiplano florece en verano (enero a marzo) y, hacia el sur, la floración se adelanta a la primavera (en Magallanes, entre agosto y noviembre).",
      "Su síndrome de dispersión es principalmente por rizomas. Cuando genera semillas, estas se dispersan por hidrocoria (flujo de agua).",
    ],
    ecology:
      "Es una especie típica de la Cordillera de los Andes, entre los 0 y los 3.900 m s.n.m., propia de vegas, bofedales y márgenes de cursos de agua altoandinos.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Triglochin_concinna/principal/20250114_142652.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Triglochin_concinna/flor/20251129_151701.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Triglochin_concinna/hoja/20251130_175249.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/6892/",
    references: [LLULLAILLACO_REF, CATALOGO_GENERAL_REF],
  },
  {
    id: "triglochin-palustris",
    scientificName: "Triglochin palustris",
    authority: "L.",
    family: "Juncaginaceae",
    genus: "Triglochin",
    commonName: "",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Liliopsida",
      orden: "Alismatales",
      familia: "Juncaginaceae",
      genero: "Triglochin",
    },
    altitude: "0 – 3.900 m s.n.m.",
    distribution: ["ANT", "ATA", "COQ", "RMS", "MAU", "LLA", "MAG"],
    morphology: [
      "Hierba de crecimiento rizomatoso, con rizomas cortos y delgados (menos de 1 mm de diámetro). Durante la temporada de crecimiento emite estolones subterráneos muy finos; hacia el final del verano u otoño, su extremo se engrosa y acumula reservas, formando una yema protegida por escamas carnosas (bulbillos).",
      "Hojas agrupadas en rosetas, erectas, glabras. Vainas lineares carnosas con un leve ensanchamiento en la base; láminas más o menos cilíndricas, carnosas, de ápice agudo y largas. Entre la vaina y la lámina se desarrolla una lígula corta.",
      "El escapo o tallo floral es terete (cilíndrico) y hueco, de color verdoso, y sobresale entre 10 y 40 cm. En general tiene un aspecto más robusto y de mayor tamaño que Triglochin concinna. Inflorescencias en racimo, con 15 a 70 flores dispuestas helicoidalmente a lo largo del eje, de tonalidad verde-amarillo a púrpura. Las flores son diminutas, sésiles o cortamente pediceladas, con 6 apéndices anchamente ovados; en el centro hay 6 estambres y el pistilo.",
      "El fruto es un esquizocarpo lineal que se angosta hacia la base. Al madurar se divide en 6 mericarpos; solo 3 contienen semillas y se desprenden al madurar, mientras los infértiles quedan planos adosados al eje central.",
    ],
    phenomenology: [
      "Criptófita: sus yemas permanecen ocultas bajo el suelo en condiciones desfavorables. Según el ambiente puede ser geófita bulbosa (sobrevive el invierno mediante estolones subterráneos que forman bulbillos carnosos terminales) o helófita (en ambientes saturados en agua, con yemas y bulbos protegidos bajo el lodo o el sustrato inundado).",
      "Perenne: aunque en las estaciones desfavorables (otoño-invierno) la parte aérea se seca por escasez hídrica o temperaturas bajo 0 °C, las yemas reproductivas permanecen activas.",
      "Se activa tras las primeras lluvias: rebrota de los rizomas en primavera y florece entre octubre y marzo, con una fenología oportunista o pulsátil gatillada por pulsos de disponibilidad de agua.",
      "Su síndrome de dispersión es principalmente vegetativo (extensión de rizomas). Cuando se reproduce sexualmente, la dispersión de las semillas ocurre por hidrocoria (cursos de agua) o barocoria (gravedad).",
    ],
    ecology:
      "Por sus hábitos semiacuáticos es común en vegas, pajonales hídricos, bordes de salares y cursos de agua someros, entre el nivel del mar y los 3.900 m s.n.m. Es tolerante a estrés salino, temperaturas bajo 0 °C y anoxia radicular. Su estrategia es de tipo ruderal, estableciéndose en la periferia o zonas de transición entre suelos saturados en agua y suelos húmedos a secos, con competencia reducida; rara vez se la encuentra en sistemas de bofedal.",
    photoLabels: ["Foto flor", "Foto tallo"],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/6893/",
    references: [LLULLAILLACO_REF, CATALOGO_GENERAL_REF],
  },
  {
    id: "zameioscirpus-atacamensis",
    scientificName: "Zameioscirpus atacamensis",
    authority: "(Phil.) Dhooge & Goetgh.",
    family: "Cyperaceae",
    genus: "Zameioscirpus",
    commonName: "Puko hembra",
    taxonomy: {
      division: "Magnoliophyta",
      clase: "Liliopsida",
      orden: "Poales",
      familia: "Cyperaceae",
      genero: "Zameioscirpus",
    },
    altitude: "3.200 – 4.700 m s.n.m.",
    distribution: ["TAR", "ATA", "COQ"],
    morphology: [
      "Hierba de crecimiento cespitoso que forma cojines densos, como carpetas de césped de 1,5 a 11 cm de espesor y de varios metros de diámetro. Pertenece a un género descrito recientemente, en el año 2003.",
      "Los tallos (o culmos) son teretes (cilíndricos), no ramificados, con su parte inferior a veces inflada, de crecimiento rastrero y con parte de su estructura sumergida en agua.",
      "Las vainas de las hojas abrazan al tallo, son de apariencia \"vieja\" pardo-marrones y quedan unidas de forma permanente. Las láminas son más largas que anchas, lineares, de margen liso o débilmente escabroso, con ápice en espátula terminado en un pequeño mucrón; se diferencian de Oxychloe andina por no ser punzantes. En la unión de la vaina y la lámina presentan una lígula membranosa, a veces débilmente fimbriada.",
      "La inflorescencia es una sola espiguilla terminal. Los pétalos y sépalos no se desarrollan, por lo que la flor está compuesta solo por tres estambres y un pistilo. Cada inflorescencia puede presentar de 3 a 18 glumas fértiles, lo que le da una apariencia \"chascona\".",
      "El fruto es un aquenio (fruto seco con una sola semilla), obovado (forma de huevo) y finamente reticulado.",
    ],
    phenomenology: [
      "Hemicriptófita: sus yemas de renuevo se protegen a ras de suelo, en la base de la densa masa de hojas. Las hojas muertas de temporadas anteriores quedan unidas al tallo, formando una estructura interna maciza y aislante que protege las yemas vivas.",
      "Perenne: un mismo individuo puede vivir varios años. Tiende a reducir los brotes activos en la estación desfavorable (invierno), aunque puede mantener su verdor todo el año en zonas con buena irrigación.",
      "Florece en la estación estival (verano), en lo que se conoce como invierno altiplánico, entre octubre y marzo, con un pico entre diciembre y enero.",
      "Su síndrome de dispersión principal es la hidrocoria, además de la barocoria (gravedad o salpicadura) y, ocasionalmente, la anemocoria (viento).",
    ],
    ecology:
      "Es una especie típica de la Cordillera de los Andes entre los 3.200 y 4.700 m s.n.m., propia de vegas, bofedales y márgenes de cursos de agua altoandinos. Su distribución abarca el noroeste de Argentina, parte de Bolivia y, en Chile, Atacama, Antofagasta y Tarapacá. A veces se encuentra dentro de cojines formados por especies de bofedal como Oxychloe andina, por lo que hay que poner mucha atención para encontrarla.",
    photoLabels: ["Foto flor", "Foto hoja"],
    photos: [
      {
        key: "principal",
        label: "Principal",
        images: [`${PHOTO_BASE}/Zameioscirpus_atacamensis/principal/20250118_141618.jpg`],
      },
      {
        key: "flor",
        label: "Flor",
        images: [`${PHOTO_BASE}/Zameioscirpus_atacamensis/flor/DSC_7383.jpg`],
      },
      {
        key: "hoja",
        label: "Hoja",
        images: [`${PHOTO_BASE}/Zameioscirpus_atacamensis/hoja/DSC_7384.jpg`],
      },
    ],
    sourceUrl: "https://www.herbariodigital.cl/catalog/details/7234/",
    references: [
      "Dhooge, S., Goetghebeur, P., & Muasya, A. M. (2003). Zameioscirpus, a new genus of Cyperaceae from South America. Plant Systematics and Evolution, 243(1), 73-84.",
      LLULLAILLACO_REF,
      CATALOGO_GENERAL_REF,
    ],
  },
];
