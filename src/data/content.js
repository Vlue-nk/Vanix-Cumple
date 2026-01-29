export const content = {
  global: {
    cursor: { snoopy: '/assets/snoopy_perfil.png', eye: '/assets/trend_ojos.mp4' },
    progressBar: { runner: '/assets/cooky_run.png' }
  },
  sections: [
    {
      id: 'hero',
      type: 'hero_split',
      bg: '/assets/yan_foto.jpeg',
      title: 'COMMITTED',
      subtitle: 'EST. 17.03.2025',
      sticker: '/assets/cooky_stand.png'
    },
    {
      id: 'gaze',
      type: 'video_expand',
      src: '/assets/trend_ojos.mp4',
      caption: 'My favorite view...',
      theme: 'dark'
    },
    {
      id: 'canvas',
      type: 'interactive_canvas',
      src: '/assets/pintura_manos.mp4',
      secretDate: '17.03.2025',
      theme: 'paper'
    },
    {
      id: 'duality',
      type: 'diagonal_split',
      top: { src: '/assets/cama_foto.jpeg', style: 'him_goth' },
      bottom: { src: '/assets/nocheparque_sentados.mp4', style: 'deftones_sea' },
      title: 'DUALITY'
    },
    {
      id: 'energy',
      type: 'masonry_grid',
      items: [
        '/assets/zen1_concierto.mp4', '/assets/zen2_concierto.mp4',
        '/assets/zen3_concierto.mp4', '/assets/zen4_concierto.mp4',
        '/assets/libido1_concierto.mp4', '/assets/libido2_concierto.mp4'
      ],
      title: 'ENERGY',
      theme: 'brutalist_red'
    },
    {
      id: 'spooky',
      type: 'marquee_infinite',
      highlight: '/assets/cartitaxi2_halloween.jpeg',
      items: [
        '/assets/video1_halloween.mp4', '/assets/video2_halloween.mp4',
        '/assets/video3_halloween.mp4', '/assets/video4_halloween.mp4',
        '/assets/video5_halloween.mp4'
      ],
      theme: 'sin_city'
    },
    {
      id: 'multiverse',
      type: 'interactive_scene',
      bgChar: '/assets/cooky_run.png',
      scareChar: '/assets/pennywise_face.png',
      reactionChar: '/assets/cooky_shocked.png',
      trigger: '/assets/pennywise_balloon.png',
      theme: 'pastel_glitch'
    },
    {
      id: 'climax',
      type: 'parallax_text',
      mainImg: '/assets/LAFOTO.jpeg',
      bgText: 'TE AMO · SIEMPRE · NOSOTROS · 19 AÑOS',
      title: 'ETERNAL',
      subtitle: 'Time Shifts, We Stay'
    },
    {
      id: 'outro',
      type: 'film_strip',
      items: [
        '/assets/filtro1_universidad.mp4', '/assets/filtro2_universidad.mp4',
        '/assets/filtro3_universidad.mp4', '/assets/docca_comida.mp4',
        '/assets/esperando_rest.mp4', '/assets/ultsalida_parque.mp4'
      ],
      finalImg: '/assets/bebidas.jpeg',
      finalText: 'Happy 19th Birthday, Vania.'
    }
  ]
};
