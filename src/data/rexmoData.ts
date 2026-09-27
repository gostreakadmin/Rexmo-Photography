export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  category: string;
  sampleImages?: string[];
}

export interface FeaturedStory {
  id: string;
  title: string;
  couple: string;
  location: string;
  date: string;
  coverImage: string;
  galleryImages: string[];
  quote: string;
  synopsis: string;
  category: string;
}

export interface CinemaFilmItem {
  id: string;
  title: string;
  couple: string;
  location: string;
  duration: string;
  aspectRatio: string;
  youtubeId: string;
  localVideo?: string;
  coverImage: string;
  description: string;
  tag: string;
  channelName?: string;
  channelUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'WEDDINGS' | 'MATERNITY' | 'NEWBORN' | 'MODELING' | 'EVENTS';
  image: string;
  orientation: 'portrait' | 'landscape' | 'square' | 'wide';
  caption: string;
  location?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  category: string;
  eventDate?: string;
  location?: string;
}

export interface DestinationItem {
  name: string;
  region: 'Tamil Nadu' | 'Kerala' | 'Karnataka' | 'International';
  description: string;
  highlights: string[];
  tag: string;
  image?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
}

export const STUDIO_INFO = {
  name: "REXMO PHOTOGRAPHY",
  established: "1992",
  tagline: "Preserving the profound, fleeting moments of your legacy.",
  founder: "Francis Jeya Balan",
  creativeDirector: "Jesley Frantin",
  phone: "+91 94427 88952",
  phoneFormatted: "+91 94427 88952",
  email: "jesleyfrantin@gmail.com",
  whatsappUrl: "https://wa.me/919442788952?text=Hello%20Rexmo%20Photography%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.",
  address: {
    line1: "4/48-2 Near Church, Main Road",
    area: "Kovalam",
    district: "Kanyakumari District",
    state: "Tamil Nadu",
    pincode: "629702",
    country: "India",
    full: "4/48-2 Near Church, Main Road, Kovalam, Kanyakumari District, Tamil Nadu 629702, India"
  },
  social: {
    instagram: "https://www.instagram.com/rexmophotography",
    facebook: "https://www.facebook.com/rexmophotography",
    youtube: "https://www.youtube.com/@rexmophotography",
    pinterest: "https://www.pinterest.com/rexmophotography"
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "weddings",
    number: "01",
    title: "WEDDINGS",
    subtitle: "Wedding Narratives",
    description: "Our flagship offering. Comprehensive editorial coverage of your wedding weekend, blending digital precision with analog warmth and fine-art composition.",
    details: [
      "Full weekend or single-day bespoke editorial coverage",
      "Lead artist & secondary fine-art photographer",
      "Handcrafted heirloom fine-art album",
      "High-resolution digital master gallery & print rights"
    ],
    image: "images/service-weddings.jpg",
    category: "WEDDINGS",
    sampleImages: [
      "images/gallery-feature-1.jpg",
      "images/gallery-wedding-11.jpg",
      "images/gallery-wedding-12.jpg",
      "images/gallery-wedding-10.jpg"
    ]
  },
  {
    id: "maternity",
    number: "02",
    title: "MATERNITY",
    subtitle: "Maternity Sessions",
    description: "Intimate, editorial-style portraiture celebrating motherhood. Guided posing, creative direction, and access to curated styling ensure timeless, graceful memories.",
    details: [
      "Studio or private scenic outdoor destination",
      "Creative direction & guided pose curation",
      "Artistic fine-art monochrome and warm tones",
      "Archival matte prints & private web showcase"
    ],
    image: "images/service-maternity.jpg",
    category: "MATERNITY",
    sampleImages: [
      "images/service-maternity.jpg",
      "images/gallery-maternity-1.jpg",
      "images/gallery-maternity-2.jpg",
      "images/53.jpg"
    ]
  },
  {
    id: "newborn",
    number: "03",
    title: "NEWBORN",
    subtitle: "Newborn Portraits",
    description: "Delicate, natural lighting and minimalist styling focus entirely on the pure, fleeting details of your newest addition, crafted in a serene, controlled environment.",
    details: [
      "Gentle, baby-led workflow with prioritized comfort",
      "Minimalist organic textures and natural light emulation",
      "Parent & sibling heirloom portraits included",
      "Preservation-grade matted keepsake box"
    ],
    image: "images/service-newborn.jpg",
    category: "NEWBORN",
    sampleImages: [
      "images/service-newborn.jpg",
      "images/gallery-newborn-1.jpg",
      "images/gallery-newborn-2.jpg",
      "images/gallery-feature-5.jpg"
    ]
  },
  {
    id: "modeling",
    number: "04",
    title: "MODELING",
    subtitle: "Editorial & Portfolios",
    description: "High-fashion editorial shoots designed to elevate your personal brand. Cinematic lighting setups, creative direction, and industry-standard retouching for comp cards and campaigns.",
    details: [
      "Conceptual moodboarding & lighting design",
      "Multiple wardrobe changes & editorial staging",
      "Commercial grade digital retouches",
      "Agency-ready comp card layouts"
    ],
    image: "images/service-modeling.jpg",
    category: "MODELING",
    sampleImages: [
      "images/service-modeling.jpg",
      "images/gallery-modeling-1.jpg",
      "images/gallery-modeling-2.jpg",
      "images/fhfhfh.jpg"
    ]
  },
  {
    id: "events",
    number: "05",
    title: "EVENTS",
    subtitle: "Curated Celebrations",
    description: "Sophisticated documentation of private celebrations, anniversaries, galas, and milestones. Captured with a refined, unobtrusive eye to preserve atmosphere and authentic energy.",
    details: [
      "Discreet, documentary-style photojournalism",
      "Full ambient and atmosphere preservation",
      "Expedited preview gallery within 48 hours",
      "Permanent private archival cloud storage"
    ],
    image: "images/service-events.jpg",
    category: "EVENTS",
    sampleImages: [
      "images/service-events.jpg",
      "images/gallery-events-1.jpg",
      "images/gallery-events-2.jpg",
      "images/gallery-events-3.jpg"
    ]
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g-01",
    title: "Golden Hour Vows",
    category: "WEDDINGS",
    image: "images/gallery-feature-1.jpg",
    orientation: "wide",
    caption: "A quiet moment of serene intimacy as the evening sun washes over the South Indian coast.",
    location: "Kovalam, Tamil Nadu"
  },
  {
    id: "g-02",
    title: "The Editorial Silhouette",
    category: "WEDDINGS",
    image: "images/gallery-feature-3.jpg",
    orientation: "portrait",
    caption: "Delicate bridal craftsmanship and dramatic shadow play inspired by European fashion editorials.",
    location: "Chennai, Tamil Nadu"
  },
  {
    id: "g-03",
    title: "Grace in Anticipation",
    category: "MATERNITY",
    image: "images/service-maternity.jpg",
    orientation: "portrait",
    caption: "Sculptural lighting accentuating the serene beauty and timeless strength of motherhood.",
    location: "Rexmo Studio, Kanyakumari"
  },
  {
    id: "g-04",
    title: "Pure Beginnings",
    category: "NEWBORN",
    image: "images/service-newborn.jpg",
    orientation: "square",
    caption: "Soft, organic warmth focusing purely on fragile details and unconditional tender touch.",
    location: "Private Residence, Trivandrum"
  },
  {
    id: "g-05",
    title: "Vogue Persona",
    category: "MODELING",
    image: "images/service-modeling.jpg",
    orientation: "portrait",
    caption: "High-contrast editorial lighting framing modern character and refined personal style.",
    location: "Studio Stage A"
  },
  {
    id: "g-06",
    title: "Sacred Ritual & Fire",
    category: "WEDDINGS",
    image: "images/gallery-feature-2.jpg",
    orientation: "landscape",
    caption: "Documenting centuries of ancestral wedding heritage with deep cinematic reverence.",
    location: "Madurai, Tamil Nadu"
  },
  {
    id: "g-07",
    title: "Gala & Festivity",
    category: "EVENTS",
    image: "images/service-events.jpg",
    orientation: "landscape",
    caption: "Spontaneous laughter and joyous cadence documented without interruption.",
    location: "Kochi, Kerala"
  },
  {
    id: "g-08",
    title: "The Quiet Embrace",
    category: "WEDDINGS",
    image: "images/gallery-feature-7.jpg",
    orientation: "landscape",
    caption: "Authentic romantic connection bathed in natural ambient daylight.",
    location: "Bangalore, Karnataka"
  },
  {
    id: "g-09",
    title: "Fine Art Monochrome",
    category: "MATERNITY",
    image: "images/53.jpg",
    orientation: "portrait",
    caption: "Timeless black and white tones stripping away distractions to reveal raw emotional grace.",
    location: "Rexmo Studio"
  },
  {
    id: "g-10",
    title: "Fleeting Serenity",
    category: "NEWBORN",
    image: "images/gallery-feature-5.jpg",
    orientation: "square",
    caption: "Unfiltered innocence preserved in stillness, a memory for future generations.",
    location: "Rexmo Studio"
  },
  {
    id: "g-11",
    title: "Contemporary Stature",
    category: "MODELING",
    image: "images/fhfhfh.jpg",
    orientation: "portrait",
    caption: "Sharp tailoring and architectural geometry captured with precision optics.",
    location: "Urban Loft, Chennai"
  },
  {
    id: "g-12",
    title: "Generational Joy",
    category: "EVENTS",
    image: "images/gallery-feature-6.jpg",
    orientation: "square",
    caption: "Milestone celebration capturing three generations united in pride and happiness.",
    location: "Coimbatore, Tamil Nadu"
  },
  {
    id: "g-13",
    title: "Heritage Heirlooms",
    category: "WEDDINGS",
    image: "images/gallery-feature-4.jpg",
    orientation: "portrait",
    caption: "Traditional silk attire, gold ornaments, and poised cultural majesty.",
    location: "Trivandrum, Kerala"
  },
  {
    id: "g-14",
    title: "The Bridal Gaze",
    category: "WEDDINGS",
    image: "images/15-1.jpg",
    orientation: "portrait",
    caption: "A candid glance in the bridal suite moments before walking down the aisle.",
    location: "Grand Resort, Erode"
  },
  {
    id: "g-15",
    title: "Maternal Radiance",
    category: "MATERNITY",
    image: "images/55.jpg",
    orientation: "portrait",
    caption: "Soft billowing fabrics and ethereal golden hour reflections.",
    location: "Coastal Dunes, Kanyakumari"
  },
  {
    id: "g-16",
    title: "First Steps of Wonder",
    category: "NEWBORN",
    image: "images/5....JPG",
    orientation: "square",
    caption: "Gentle natural expressions captured with patience and quiet attention.",
    location: "Rexmo Studio"
  },
  {
    id: "g-17",
    title: "Couture in Movement",
    category: "MODELING",
    image: "images/IMG_8772.JPG",
    orientation: "portrait",
    caption: "Expressive editorial poses exploring balance, poise, and fabric dynamics.",
    location: "Editorial Studio"
  },
  {
    id: "g-18",
    title: "The Toast",
    category: "EVENTS",
    image: "images/46.JPG",
    orientation: "landscape",
    caption: "Crystal glasses raised in celebration as heartfelt speeches echo through the hall.",
    location: "Private Villa, Dindigul"
  },
  {
    id: "g-19",
    title: "Candid Twilight",
    category: "WEDDINGS",
    image: "images/25.JPG",
    orientation: "landscape",
    caption: "A stolen whisper between newly married partners under the starlit canopy.",
    location: "Backwater Pavilion, Kochi"
  },
  {
    id: "g-20",
    title: "Bespoke Portfolio",
    category: "MODELING",
    image: "images/IMG-20250923-WA0081.jpg",
    orientation: "portrait",
    caption: "International model comp card portfolio session with natural and directional strobe.",
    location: "Chennai"
  },
  {
    id: "g-21",
    title: "Coastal Sun-kissed Union",
    category: "WEDDINGS",
    image: "images/gallery-wedding-10.jpg",
    orientation: "landscape",
    caption: "Vows whispered amidst the sea breeze of coastal Kanyakumari.",
    location: "Kovalam Coast, Tamil Nadu"
  },
  {
    id: "g-22",
    title: "The Garland Exchange",
    category: "WEDDINGS",
    image: "images/gallery-wedding-11.jpg",
    orientation: "portrait",
    caption: "A reverent celebration of two families uniting under sacred Vedic chants.",
    location: "Chennai, Tamil Nadu"
  },
  {
    id: "g-23",
    title: "Gilded Radiance",
    category: "WEDDINGS",
    image: "images/gallery-wedding-12.jpg",
    orientation: "portrait",
    caption: "Intricate gold jhumkas and heirloom silk saree capturing ancestral grace.",
    location: "Madurai, Tamil Nadu"
  },
  {
    id: "g-24",
    title: "The Grand Procession",
    category: "WEDDINGS",
    image: "images/gallery-wedding-13.jpg",
    orientation: "wide",
    caption: "Vibrant colors and jubilant music leading the royal wedding entrance.",
    location: "Bangalore Palace, Karnataka"
  },
  {
    id: "g-25",
    title: "Quiet Reverie",
    category: "WEDDINGS",
    image: "images/gallery-wedding-14.jpg",
    orientation: "square",
    caption: "Unrehearsed affection between ceremonies, framed with cinema stillness.",
    location: "Fort Kochi, Kerala"
  },
  {
    id: "g-26",
    title: "The Royal Reception",
    category: "WEDDINGS",
    image: "images/gallery-wedding-15.jpg",
    orientation: "landscape",
    caption: "Dramatic chandeliers and stately architectural grandeur framing the couple.",
    location: "Trivandrum, Kerala"
  },
  {
    id: "g-27",
    title: "Whispers of Life",
    category: "MATERNITY",
    image: "images/gallery-maternity-1.jpg",
    orientation: "portrait",
    caption: "Intimate studio portrait celebrating the glow of expectancy.",
    location: "Rexmo Studio"
  },
  {
    id: "g-28",
    title: "Golden Horizon",
    category: "MATERNITY",
    image: "images/gallery-maternity-2.jpg",
    orientation: "landscape",
    caption: "Sunset silhouettes along the coastal shoreline framing the miracle of new life.",
    location: "Kovalam Beach"
  },
  {
    id: "g-29",
    title: "Slumber in Bloom",
    category: "NEWBORN",
    image: "images/gallery-newborn-1.jpg",
    orientation: "square",
    caption: "Tender swaddled serenity resting peacefully in organic handcrafted textures.",
    location: "Rexmo Studio"
  },
  {
    id: "g-30",
    title: "Tiny Miracles",
    category: "NEWBORN",
    image: "images/gallery-newborn-2.jpg",
    orientation: "portrait",
    caption: "Macro details capturing delicate newborn fingers in parents' sheltering embrace.",
    location: "Rexmo Studio"
  },
  {
    id: "g-31",
    title: "Editorial High Fashion",
    category: "MODELING",
    image: "images/gallery-modeling-1.jpg",
    orientation: "portrait",
    caption: "Bold directional lighting and structured couture tailoring for global agencies.",
    location: "Chennai Studio"
  },
  {
    id: "g-32",
    title: "Monochrome Allure",
    category: "MODELING",
    image: "images/gallery-modeling-2.jpg",
    orientation: "portrait",
    caption: "Minimalist studio portraiture highlighting sculptural facial contours and depth.",
    location: "Studio Stage B"
  },
  {
    id: "g-33",
    title: "Evening of Splendor",
    category: "EVENTS",
    image: "images/gallery-events-1.jpg",
    orientation: "landscape",
    caption: "Grand anniversary gala under starry illumination and bespoke floral pavilions.",
    location: "Leela Palace, Bangalore"
  },
  {
    id: "g-34",
    title: "Joyous Rhythm",
    category: "EVENTS",
    image: "images/gallery-events-2.jpg",
    orientation: "portrait",
    caption: "Spontaneous dance celebration capturing boundless enthusiasm and familial bond.",
    location: "Kochi, Kerala"
  },
  {
    id: "g-35",
    title: "The Silver Jubilee",
    category: "EVENTS",
    image: "images/gallery-events-3.jpg",
    orientation: "landscape",
    caption: "Celebrating 25 years of shared memories surrounded by three generations.",
    location: "Coimbatore, Tamil Nadu"
  },
  {
    id: "g-36",
    title: "Culmination of Grace",
    category: "EVENTS",
    image: "images/gallery-events-4.jpg",
    orientation: "square",
    caption: "An elegant corporate soiree and milestone celebration documented discreetly.",
    location: "Chennai, Tamil Nadu"
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t-01",
    quote: "Outstanding wedding photography! Creative shots, perfect timing, and excellent quality. The team was super easy to work with and understood exactly what we wanted from the first consultation.",
    author: "Irone Fleedon",
    category: "Wedding Client",
    location: "Tamil Nadu",
    eventDate: "Destination Wedding"
  },
  {
    id: "t-02",
    quote: "Absolutely loved the wedding photography! Every moment was captured so beautifully and naturally. Very professional, punctual, and friendly team. The heirloom album is something our family will treasure forever.",
    author: "Rohan",
    category: "Wedding Client",
    location: "Kerala",
    eventDate: "Traditional & Reception"
  },
  {
    id: "t-03",
    quote: "I booked Rexmo photography for my son’s first birthday. My family members and myself totally loved the photos and videos. Their team literally made our day special and went above and beyond.",
    author: "Sandhya Sekhar",
    category: "Event Client",
    location: "Kanyakumari",
    eventDate: "Milestone Celebration"
  },
  {
    id: "t-04",
    quote: "Perfect wedding photography! Great quality, natural candid moments, and a very friendly team. Loved every single shot. They made everyone feel completely at ease in front of the lens.",
    author: "Amal Aaron",
    category: "Wedding Client",
    location: "South India",
    eventDate: "Grand Celebration"
  }
];

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: "1992",
    title: "THE BEGINNING",
    subtitle: "The Vision of Francis Jeya Balan",
    description: "Francis Jeya Balan established Rexmo in 1992 with an enduring passion for analog medium-format wedding photography. Believing every union holds sacred emotional weight, he set the artistic standard for integrity, discipline, and timeless grace.",
    quote: "A photograph is not taken for today; it is created to speak with eloquence to people fifty years from now."
  },
  {
    year: "2005",
    title: "THE LEGACY",
    subtitle: "Pioneering Visual Standards Across South India",
    description: "Expanding from Kanyakumari across Tamil Nadu and Kerala, Rexmo became the trusted photography house for prestigious multi-day cultural weddings, known for uncompromised print quality and royal poise.",
    quote: "Every ritual deserves absolute respect, patience, and photographic fidelity."
  },
  {
    year: "2018",
    title: "THE NEXT GENERATION",
    subtitle: "Creative Direction of Jesley Frantin",
    description: "Carrying forward the mantle, Jesley Frantin introduced contemporary fashion-editorial aesthetics and 4K cinema while fiercely protecting the authentic warmth and documentary truth of Rexmo’s foundational philosophy.",
    quote: "We don't manufacture moments. We design the conditions for authenticity to flourish."
  },
  {
    year: "TODAY",
    title: "REXMO TODAY",
    subtitle: "International Destinations & Heirloom Art",
    description: "Documenting select luxury weddings across India, the United Arab Emirates, and Europe, Rexmo stands as a boutique international studio revered for refined light, analog nostalgia, and poetic storytelling.",
    quote: "Preserving the profound, fleeting moments of your legacy."
  }
];

export const DESTINATIONS_DATA: DestinationItem[] = [
  {
    name: "Chennai",
    region: "Tamil Nadu",
    tag: "Metropolitan Heritage",
    description: "From historic heritage halls to pristine coastal resorts along the East Coast Road, capturing the vibrant elegance of Tamil Nadu's cultural capital.",
    highlights: ["MGM Beach Resorts", "Mayor Ramanathan Chettiar Hall", "Kovalam Beach", "Mahabalipuram Shore"],
    image: "images/dest-chennai.jpg"
  },
  {
    name: "Kochi",
    region: "Kerala",
    tag: "Colonial Waters",
    description: "Framing love stories against tranquil backwaters and Portuguese-Dutch colonial charm, blending rich regional tradition with cinematic grace.",
    highlights: ["Fort Kochi", "Bolgatty Palace", "Kumarakom Backwaters", "Grand Hyatt Kochi"],
    image: "images/dest-kochi.jpg"
  },
  {
    name: "Dubai",
    region: "International",
    tag: "Desert Grandeur",
    description: "Architectural majesty meets desert golden hours. Documenting opulent celebrations across the Emirates with a high-fashion editorial eye.",
    highlights: ["Bab Al Shams", "One&Only Royal Mirage", "Burj Al Arab Terraces", "Dubai Marina"],
    image: "images/dest-dubai.jpg"
  },
  {
    name: "Bangalore",
    region: "Karnataka",
    tag: "Garden Elegance",
    description: "Sophisticated metropolitan celebrations and lush colonial garden weddings, documented with a modern editorial aesthetic.",
    highlights: ["Bangalore Palace", "Tamarind Tree", "The Leela Palace", "Jade 735"],
    image: "images/dest-bangalore.jpg"
  },
  {
    name: "Coimbatore",
    region: "Tamil Nadu",
    tag: "Kongu Tradition",
    description: "Where scenic Western Ghat hillscapes meet grand cultural festivities. Preserving the authentic, colorful rituals of the Kongu territory.",
    highlights: ["Le Meridien", "The Residency Towers", "Anaimalai Foothills", "Private Plantations"],
    image: "images/gallery-feature-6.jpg"
  },
  {
    name: "London",
    region: "International",
    tag: "Historic Romance",
    description: "Timeless romance amidst cobblestone streets and neoclassical venues. Providing bespoke, analog-inspired coverage for UK and European destinations.",
    highlights: ["The Savoy", "Kew Gardens", "Hampton Court", "Mayfair Townhouses"],
    image: "images/gallery-feature-7.jpg"
  },
  {
    name: "Madurai",
    region: "Tamil Nadu",
    tag: "Ancient Splendor",
    description: "Honoring the vivid colors, sacred rituals, and profound emotions of traditional South Indian temple weddings in the Temple City.",
    highlights: ["Heritage Madurai", "Courtyard by Marriott", "Meenakshi Temple Precincts", "Chettinad Mansions"],
    image: "images/gallery-feature-2.jpg"
  },
  {
    name: "Trivandrum",
    region: "Kerala",
    tag: "Royal Coast",
    description: "Pristine cliffside beaches and Travancore royal architecture providing the perfect canvas for our unobtrusive, storytelling approach.",
    highlights: ["Kovalam Cliffs", "The Leela Kovalam", "Travancore Heritage", "Varkala Coast"],
    image: "images/gallery-feature-4.jpg"
  },
  {
    name: "Abu Dhabi",
    region: "International",
    tag: "Island Luxury",
    description: "Cinematic storytelling against breathtaking gulf skylines, desert dunes, and palatial resorts, crafting timeless visual heirlooms.",
    highlights: ["Emirates Palace", "Saadiyat Island", "Qasr Al Sarab", "St. Regis Saadiyat"],
    image: "images/story-1.jpg"
  }
];

export const SERVICE_LOCATIONS_LIST = [
  "Chennai", "Coimbatore", "Dindigul", "Erode", "Kanyakumari", "Madurai", 
  "Tirunelveli", "Trichy", "Kochi", "Trivandrum", "Kozhikode", "Bangalore", 
  "Mysore", "Dubai", "Abu Dhabi", "London", "Maldives", "Singapore", "Paris"
];

export const FEATURED_STORIES_DATA: FeaturedStory[] = [
  {
    id: "story-1",
    title: "The Coastal Vows of Kovalam",
    couple: "Meera & Siddharth",
    location: "Kovalam Beach, Tamil Nadu",
    date: "Winter 2025",
    coverImage: "images/story-1.jpg",
    galleryImages: ["images/story-1.jpg", "images/gallery-feature-1.jpg", "images/gallery-wedding-10.jpg"],
    quote: "The sun dipped into the Arabian Sea just as the sacred fire was lit. Rexmo preserved not just the images, but the exact salt-air feeling of that evening.",
    synopsis: "A three-day coastal celebration honoring centuries-old Tamil wedding rituals, framed with modern editorial composition and natural ocean twilight.",
    category: "Coastal Heritage"
  },
  {
    id: "story-2",
    title: "Royal Backwaters & Heritage Silk",
    couple: "Ananya & Arjun",
    location: "Kumarakom & Fort Kochi, Kerala",
    date: "Autumn 2025",
    coverImage: "images/story-2.jpg",
    galleryImages: ["images/story-2.jpg", "images/dest-kochi.jpg", "images/gallery-feature-4.jpg"],
    quote: "Every photograph looks like a vintage oil painting brought to life. Subtle, timeless, and completely unpretentious.",
    synopsis: "A tranquil backwater union surrounded by lotus ponds and Dutch colonial architecture, documented with Super-8 inspired cinema stills.",
    category: "Royal Backwaters"
  },
  {
    id: "story-3",
    title: "Metropolitan Grandeur & Golden Lights",
    couple: "Rhea & Vikram",
    location: "The Leela Palace, Bangalore",
    date: "Spring 2025",
    coverImage: "images/story-3.jpg",
    galleryImages: ["images/story-3.jpg", "images/dest-bangalore.jpg", "images/gallery-wedding-13.jpg"],
    quote: "In a ballroom of 800 guests, Jesley and the Rexmo team made us feel like the only two people in the room.",
    synopsis: "An opulent royal sangeet and reception celebrating two prominent families, balancing high-energy choreography with intimate editorial portraits.",
    category: "Palace Elegance"
  },
  {
    id: "story-4",
    title: "Desert Twilight & Modern Architecture",
    couple: "Farida & Tariq",
    location: "Bab Al Shams, Dubai",
    date: "Winter 2024",
    coverImage: "images/story-4.jpg",
    galleryImages: ["images/story-4.jpg", "images/dest-dubai.jpg", "images/gallery-wedding-15.jpg"],
    quote: "Rexmo traveled from South India to Dubai and delivered an international editorial masterpiece that stunned our families.",
    synopsis: "Dune-side vows under desert starlight, where contemporary haute couture meets traditional Middle Eastern hospitality.",
    category: "Destination Luxury"
  },
  {
    id: "story-5",
    title: "Chettinad Mansions & Ancestral Sanctity",
    couple: "Kavitha & Aravind",
    location: "Heritage Palace, Karaikudi & Madurai",
    date: "Summer 2025",
    coverImage: "images/story-5.jpg",
    galleryImages: ["images/story-5.jpg", "images/gallery-feature-2.jpg", "images/gallery-wedding-12.jpg"],
    quote: "They honored every religious ritual without ever staging or interrupting the solemn sanctity of the ceremony.",
    synopsis: "Burmese teak pillars, Athangudi tiles, and thousand-year-old temple rituals documented with authentic archival depth.",
    category: "Ancestral Sacred"
  },
  {
    id: "story-6",
    title: "East Coast Road Sunset Romance",
    couple: "Divya & Ashwin",
    location: "MGM Beach Resort, Chennai",
    date: "Autumn 2024",
    coverImage: "images/story-6.jpg",
    galleryImages: ["images/story-6.jpg", "images/dest-chennai.jpg", "images/gallery-feature-3.jpg"],
    quote: "We never wanted stiff, awkward poses. Rexmo gave us living, breathing memories that our children will marvel at.",
    synopsis: "A sunset beach exchange followed by a breezy open-air reception under swaying palm trees and lantern canopies.",
    category: "Coastal Romance"
  }
];

export const CINEMA_FILMS_DATA: CinemaFilmItem[] = [
  {
    id: "film-01",
    title: "The Symphony of Stolen Glances",
    couple: "Ashwin & Ananyaa",
    location: "Chennai, Tamil Nadu",
    duration: "03:42",
    aspectRatio: "2.39:1 Anamorphic",
    youtubeId: "EoYXai-bRec",
    localVideo: "videos/video-reel-1.webm",
    coverImage: "images/gallery-feature-1.jpg",
    description: "Shot across heritage courtyards with anamorphic prime lenses, documenting the unhurried cadence of familial grace and sacred rituals.",
    tag: "4K Digital Cinema & Super 8",
    channelName: "Rexmo Cinema Suite",
    channelUrl: "https://www.youtube.com/@rexmophotography"
  },
  {
    id: "film-02",
    title: "Tassels of True Love",
    couple: "Harish & Raveena",
    location: "Thiruvananthapuram, Kerala",
    duration: "04:15",
    aspectRatio: "16:9 Cinema",
    youtubeId: "mXx4s0uzfeo",
    localVideo: "videos/video-reel-2.mp4",
    coverImage: "images/gallery-feature-4.jpg",
    description: "Pristine cliffside twilight and Travancore architecture framing a tender celebration documented with broadcast fidelity.",
    tag: "Royal Heritage Film",
    channelName: "Kerala Wedding Cinema",
    channelUrl: "https://www.youtube.com/watch?v=mXx4s0uzfeo"
  },
  {
    id: "film-03",
    title: "Ancestral Sanctity & Golden Embers",
    couple: "Ajay & Divya",
    location: "Tamil Nadu",
    duration: "03:18",
    aspectRatio: "2.39:1 Anamorphic",
    youtubeId: "N75cXTI0im8",
    localVideo: "videos/video-reel-3.webm",
    coverImage: "images/gallery-feature-2.jpg",
    description: "Sacred fire, temple bells, and the timeless vibrancy of traditional Vedic chants captured with poetic precision.",
    tag: "Sacred Temple Rites",
    channelName: "Tamil Wedding Cinema",
    channelUrl: "https://www.youtube.com/watch?v=N75cXTI0im8"
  },
  {
    id: "film-04",
    title: "The Sapphire Rays",
    couple: "Sanjay & Gayathri",
    location: "Kochi, Kerala",
    duration: "03:55",
    aspectRatio: "16:9 Cinema",
    youtubeId: "dQ95gd5e3ZE",
    localVideo: "videos/video-reel-4.webm",
    coverImage: "images/story-2.jpg",
    description: "Tranquil backwaters and colonial charm meeting Super 8 nostalgia in a quiet, deeply emotive wedding monograph.",
    tag: "Backwater Poetry",
    channelName: "Kerala Heritage Films",
    channelUrl: "https://www.youtube.com/watch?v=dQ95gd5e3ZE"
  },
  {
    id: "film-05",
    title: "The Grand Royal Dynasty",
    couple: "Vikram & Sneha",
    location: "Bangalore Palace, Karnataka",
    duration: "05:12",
    aspectRatio: "2.39:1 Anamorphic",
    youtubeId: "Qj90PIBV4Ms",
    localVideo: "videos/video-reel-5.webm",
    coverImage: "images/story-3.jpg",
    description: "Opulent royal baraat, magnificent grand ballroom chandelier glow, and regal South Indian celebration aesthetics.",
    tag: "Palace Dynasty Film",
    channelName: "The Kalakars Cinema",
    channelUrl: "https://www.youtube.com/watch?v=Qj90PIBV4Ms"
  },
  {
    id: "film-06",
    title: "Monograph of Eternal Vows",
    couple: "Karthik & Pooja",
    location: "Kovalam Beach Resort, Tamil Nadu",
    duration: "04:30",
    aspectRatio: "16:9 Cinema",
    youtubeId: "2g85rONTbrI",
    localVideo: "videos/video-reel-6.webm",
    coverImage: "images/story-1.jpg",
    description: "Gentle Arabian Sea breeze and sun-drenched golden hour vows documented with fine-art analog Kodak emulation.",
    tag: "Coastal Destination Monograph",
    channelName: "Weva Photography Channel",
    channelUrl: "https://www.youtube.com/watch?v=2g85rONTbrI"
  }
];
