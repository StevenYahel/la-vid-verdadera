export const SITE = {
  name: 'La Vid Verdadera',
  fullName: 'Iglesia Cristiana Cuadrangular La Vid Verdadera',
  tagline: 'Un lugar para conocer a Dios',
  //  Descripción  para SEO 
  description:
    'Iglesia Cristiana Cuadrangular en Buritaca, Magdalena. Creemos en el poder de Jesús para transformar vidas, restaurar familias y llevar esperanza a nuestra comunidad.',
  verse: {
    text: 'Yo soy la vid; ustedes son las ramas. El que permanece en mí, como yo en él, ese lleva mucho fruto.',
    ref: 'Juan 15:5 — RVR60',
  },
  location: {
    address: 'Buritaca, Magdalena',
    city: 'Santa Marta, Colombia',
    mapsUrl: 'https://maps.google.com/?q=Buritaca,Magdalena,Colombia',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15681.00000000001!2d-73.98!3d11.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef4f8b8b8b8b8b8%3A0x0!2sBuritaca%2C+Magdalena!5e0!3m2!1ses!2sco!4v1234567890',
  },
  contact: {
    email: 'info@lavidverdadera.com',
    whatsapp: null as string | null,
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: null as string | null,
  },
  years: 15,
}

export const PASTORS = [
  {
    id: 'pastor',
    name: 'Juvenal Flórez Romero',
    role: 'Pastor Principal',
    bio: 'Apasionado por ver vidas transformadas por el amor de Cristo. Su corazón es enseñar la Palabra de Dios y equipar a la iglesia para cumplir su propósito en esta generación.',
    image: '/images/pastor-juvenal1.jpg',
  },
  {
    id: 'pastora',
    name: 'Luz Dary Polo Lerma',
    role: 'Pastora',
    bio: 'Mujer de fe y oración, comprometida con el discipulado y el crecimiento espiritual de cada familia de la congregación.',
    image: '/images/pastora-luz.jpg',
  },
]

export const STATS = [
  { value: '+500', label: 'Miembros' },
  { value: '5',    label: 'Ministerios' },
  { value: '+15',  label: 'Años sirviendo' },
  { value: '1',    label: 'Misión' },
]

// Cada link tiene:
//   href      → ruta o ancla usada en la HOME (/)
//   page      → ruta real para navegar desde subpáginas
//   homeAnchor → ancla dentro de la home
export const NAV_LINKS = [
  { href: '/',              homeAnchor: '#inicio',      label: 'Inicio' },
  { href: '/nosotros',      homeAnchor: '#nosotros',    label: 'Nosotros' },
  { href: '/#ministerios',  homeAnchor: '#ministerios', label: 'Ministerios' },
  { href: '/#horarios',     homeAnchor: '#horarios',    label: 'Horarios' },
  { href: '/#galeria',      homeAnchor: '#galeria',     label: 'Galería' },
  { href: '/#contacto',     homeAnchor: '#contacto',    label: 'Contacto' },
]

export const VALUES = [
  {
    icon: 'Heart',
    title: 'Amamos a Dios',
    description: 'Levantamos a Jesús como el centro de todo lo que hacemos.',
  },
  {
    icon: 'Users',
    title: 'Amamos a las personas',
    description: 'Construimos relaciones que transforman vidas.',
  },
  {
    icon: 'Globe',
    title: 'Servimos a nuestra comunidad',
    description: 'Llevamos esperanza y servicio a nuestra ciudad y más allá.',
  },
]

export const MINISTRIES = [
  {
    id: 'ninos',
    name: 'Niños',
    tagline: 'Semillitas de fe',
    description: 'Formamos a la próxima generación en el amor de Jesús a través de dinámicas, juegos y la Palabra de Dios.',
    image: '/images/ministerio-ninos.jpg',
    color: '#F5A800',
    icon: 'Star',
  },
  {
    id: 'jovenes',
    name: 'Jóvenes',
    tagline: 'Generación de impacto',
    description: 'Conectamos jóvenes con propósito y una fe que transforma su presente y su futuro.',
    image: '/images/ministerio-jovenes.jpg',
    color: '#5B2D8E',
    icon: 'Zap',
  },
  {
    id: 'damas',
    name: 'Damas',
    tagline: 'Mujeres de fe',
    description: 'Creamos espacios para que las mujeres crezcan, sean fortalecidas y vivan su identidad en Cristo.',
    image: '/images/ministerio-damas.jpg',
    color: '#CC2229',
    icon: 'Heart',
  },
  {
    id: 'caballeros',
    name: 'Caballeros',
    tagline: 'Hombres de Dios',
    description: 'Desarrollamos hombres íntegros que lideran con sabiduría su hogar, su iglesia y su entorno.',
    image: '/images/ministerio-caballeros.jpg',
    color: '#1B4FA0',
    icon: 'Shield',
  },
  {
    id: 'musica',
    name: 'Música',
    tagline: 'Alabanza y adoración',
    description: 'Llevamos a la congregación a la presencia de Dios a través de la música y la adoración en espíritu y verdad.',
    image: '/images/ministerio-musica.jpg',
    color: '#0F6E56',
    icon: 'Music',
  },
]

export const SCHEDULES = [
  {
    day: 'Lunes',
    name: 'Culto de Oración',
    time: '6:00 PM',
    duration: '1 hora',
    color: '#5B2D8E',
    icon: 'BookOpen',
  },
  {
    day: 'Miércoles',
    name: 'Día de Ayuno',
    time: 'Congregacional',
    duration: 'Todo el día',
    color: '#1B4FA0',
    icon: 'Sun',
  },
  {
    day: 'Jueves',
    name: 'Culto Formal',
    time: '7:00 PM',
    duration: '1 hora',
    color: '#CC2229',
    icon: 'Church',
  },
  {
    day: 'Domingo',
    name: 'Escuela Dominical + Culto Principal',
    time: '7:30 AM',
    duration: 'Hasta las 9:30 AM',
    color: '#F5A800',
    icon: 'Users',
  },
]

export const PILLARS = [
  { color: '#CC2229', role: 'Salvador',      symbol: '✝' },
  { color: '#1B4FA0', role: 'Sanador',       symbol: '🏆' },
  { color: '#F5A800', role: 'Bautizador',    symbol: '🕊' },
  { color: '#5B2D8E', role: 'Rey que viene', symbol: '👑' },
]