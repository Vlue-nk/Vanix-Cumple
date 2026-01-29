export const content = {
  // ESCENA 0: Preloader Assets
  preloader: {
    snoopy: "/assets/snoopy_perfil.webp",
    cookyRun: "/assets/cooky_run.webp",
    cookyStand: "/assets/cooky_stand.webp",
  },

  // 1. COMPROMETIDOS (Hero) - Foto Yan Areas Verdes
  hero: {
    title: "NUESTRO PACTO",
    subtitle: "Desde siempre.",
    image: "/assets/yan_foto.webp",
    audio: "/assets/committed.mp3",
    theme: "hero"
  },

  // 2. LA MIRADA (Arctic Monkeys) - Ojos + Salchipapa
  gaze: {
    title: "LA MIRADA",
    video: "/assets/trend_ojos.mp4",
    videoWait: "/assets/docca_comida.mp4", // Esperando salchipapa
    audio: "/assets/party_anthem.mp3", // Arctic Monkeys
    phrase: "Eres mi vista favorita...",
    theme: "gaze"
  },

  // 3. EL ARTE (TV Girl) - Lienzo 17-03-2025
  canvas: {
    date: "17 · 03 · 2025",
    video: "/assets/pintura_manos.mp4",
    audio: "/assets/lovers_rock.mp3",
    secretDate: "17.03.2025",
    theme: "canvas"
  },

  // 4. DUALIDAD (HIM vs Deftones)
  duality: {
    // Lado HIM (Oscuro/Romántico)
    himImage: "/assets/cama_foto.webp",
    himVideo: "/assets/nocheparque_sentados.mp4",
    // Lado Deftones (Melancolía/Lluvia)
    rainImages: ["/assets/lluvia_foto1.webp", "/assets/lluvia_foto2.webp"],
    rainVideo: "/assets/lluvia_universidad1.mp4",
    theme: "rain"
  },

  // 5. INTIMIDAD (Descanso + Lluvia)
  intimacy: {
    bedImage: "/assets/cama_foto.webp",
    dollsGif: "/assets/muñecos_snoopy.mp4", // Gif muñecos
    rainImages: ["/assets/lluvia_foto1.webp", "/assets/lluvia_foto2.webp"],
    libraryVideo: "/assets/biblioteca_filtro.mp4", // Biblioteca filtro
    audio: "/assets/lovers_rock.mp3",
    theme: "rain"
  },

  // 6. ENERGY (Conciertos)
  energy: {
    videos: [
      "/assets/zen1_concierto.mp4",
      "/assets/libido1_concierto.mp4",
      "/assets/zen3_concierto.mp4",
      "/assets/libido5_concierto.mp4",
      "/assets/zen4_concierto.mp4",
      "/assets/libido2_concierto.mp4",
    ],
    theme: "party"
  },

  // 7. NOCHE Y FIESTA (Yan Block / Reggaeton)
  party: {
    parkVideo: "/assets/nocheparque_sentados.mp4",
    patioVideo: "/assets/patio_universidad.mp4",
    discoVideo: "/assets/salida_discoteca.mp4",
    rainUniVideo: "/assets/lluvia_universidad1.mp4",
    audio: "/assets/yan_block_remix.mp3", // Yogurcito / Yan Block
    theme: "party"
  },

  // 8. SPOOKY SEASON (Halloween - Playboi Carti Aesthetic)
  spooky: {
    taxiImage: "/assets/cartitaxi2_halloween.webp", // Joker/Carti makeup
    marqueeVideos: [
      "/assets/video1_halloween.mp4",
      "/assets/video2_halloween.mp4",
      "/assets/video3_halloween.mp4",
      "/assets/video4_halloween.mp4",
      "/assets/video5_halloween.mp4",
    ],
    audio: "/assets/halloween_track.mp3", // Musica de la fiesta o Carti
    theme: "halloween"
  },

  // 9. MULTIVERSE (Cute vs Horror)
  multiverse: {
    // Dimension Cute
    cooky: "/assets/cooky_stand.webp",
    cookyShocked: "/assets/cooky_shocked.webp",
    floatingPics: [
      "/assets/ascensor1_universidad.webp",
      "/assets/ascensor2_universidad.webp",
      "/assets/ascensor3_universidad.webp",
      "/assets/arverde_universiadd.mp4"
    ],
    // Dimension Horror
    balloon: "/assets/pennywise_balloon.webp",
    scareFace: "/assets/pennywise_face.webp",
    pennywiseAudio: "/assets/pennywise_laugh.mp3",
    theme: "halloween"
  },

  // 10. EL CLIMAX (Rosemary - Deftones) - Ascensor
  climax: {
    mainPhoto: "/assets/LAFOTO.webp", // Beso espejo ascensor
    hugPhoto: "/assets/ascensor_abrazo.webp", // (Si tienes la del abrazo)
    audio: "/assets/rosemary.mp3",
    bgText: ["TE AMO", "ETERNAMENTE", "TU Y YO", "MI ALMA GEMELA", "SIEMPRE", "NOSOTROS", "19 AÑOS", "MI PERSONA FAVORITA"],
    theme: "climax"
  },

  // 11. RANDOM FILES (Filtros graciosos) - Outro
  outro: {
    memories: [
      "/assets/docca_comida.mp4",
      "/assets/esperando_rest.mp4",
      "/assets/patio_universidad.mp4",
      "/assets/filtro1_universidad.mp4",
      "/assets/filtro2_universidad.mp4",
      "/assets/filtro6_universidad.mp4",
      "/assets/filtro10_universidad.mp4",
      "/assets/biblioteca_filtro.mp4",
      "/assets/salida_discoteca.mp4",
      "/assets/ultsalida_parque.mp4"
    ],
    theme: "canvas" // Vuelve a claro para contraste
  },

  // 12. DESPEDIDA (Parque Grau / Bebidas)
  goodbye: {
    parkVideo: "/assets/ultsalida_parque.mp4", // Tarde antes de viajar
    drinksImage: "/assets/bebidas.webp",
    audio: "/assets/yan_block_sad.mp3", // Cancion de despedida
    dedication: "La distancia es solo un número cuando el sentimiento es infinito. Felices 19, amor.",
    theme: "sunset"
  },

  // 13. The End
  end: {
    finalImage: "/assets/bebidas.webp",
    dedication: "A pesar de la distancia, siempre estamos en la misma sintonía. Felices 19, amor. - Kevin"
  },

  // Multiverso Pennywise (Hidden)
  pennywiseScare: {
    balloon: "/assets/pennywise_balloon.webp",
    scare: "/assets/pennywise_face.webp",
    scream: "/assets/pennywise_scream.mp3"
  }
};
