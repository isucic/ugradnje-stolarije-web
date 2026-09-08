/**
 * Središnje mjesto za sve podatke o tvrtki, proizvodima, projektima i FAQ-u.
 * Sve tekstove, slike, kontakt podatke i katalog mijenjajte ovdje.
 */

import heroKuca from "@/assets/hero-kuca.jpg";
import oNamaSlika from "@/assets/o-nama.jpg";
import profilSlika from "@/assets/kommerling.png";
import pvcProzori from "@/assets/pvc-prozori.jpg";
import pvcVrata from "@/assets/pvc-vrata.jpg";
import klizneStijene from "@/assets/klizne-stijene.jpg";
import komarnici from "@/assets/komarnici.jpg";
import grilje from "@/assets/grilje.jpg";
import rolete from "@/assets/rolete.jpg";
import projekt1 from "@/assets/projekt-1.jpg";
import projekt2 from "@/assets/projekt-2.jpg";
import projekt3 from "@/assets/projekt-3.jpg";
import logo from "@/assets/branemont-logo.png";
import trohadillogo from "@/assets/troha-dil-logo.png";
import handshake from "@/assets/handshake.png";
import okvirProzora from "@/assets/okvir_prozora_grafika.png";

export const company = {
  name: "Brane-mont",
  tagline: "Više od 20 godina iskustva u ugradnji PVC stolarije.",
  street: "Nakide 8",
  city: "Kaštel Kambelovac",
  country: "Hrvatska",
  phone: "021 220 330",
  phoneHref: "tel:+38521220330",
  email: "brane-mont@st.t-com.hr",
  mapsEmbed:
    "https://www.google.com/maps?q=Nakide%208,%20Ka%C5%A1tel%20Kambelovac&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Nakide+8+Ka%C5%A1tel+Kambelovac",
};

export const images = {
  hero: heroKuca,
  oNama: oNamaSlika,
  profil: profilSlika,
  logo: logo,
  trohadillogo: trohadillogo,
  handshake: handshake,
  okvirProzora: okvirProzora
};

/**
 * Katalog proizvoda.
 * Kada dobijete pravi PDF: stavite ga u mapu `public/katalog/` i ovdje upišite
 * putanju, npr. `file: "/katalog/brane-mont-katalog.pdf"`.
 * Dok je `file` postavljen na `null`, na stranici se prikazuje jasna oznaka
 * da katalog još nije dostupan.
 */
export const catalog: { file: string | null; fileName: string } = {
  file: null,
  fileName: "brane-mont-katalog.pdf",
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  image: string;
  alt: string;
  benefits: string[];
  /** Uredivi dio – ovdje kasnije dodajte konkretne informacije. */
  placeholderNote: string;
  gallery: { src: string; alt: string }[];
};

export const products: Product[] = [
  {
    slug: "pvc-prozori",
    name: "PVC prozori",
    short: "Ugradnja PVC prozora za nove objekte i zamjenu postojeće stolarije.",
    intro:
      "PVC prozori čine osnovu svake kvalitetne stolarije na objektu. Izrađujemo ih od Kömmerling profila i ugrađujemo prema mjerama vašeg objekta, za novogradnju i za zamjenu postojećih prozora.",
    image: pvcProzori,
    alt: "Veliki bijeli PVC prozori u svijetlom dnevnom boravku",
    benefits: [
      "Izrada po mjeri prema stanju na objektu",
      "Kömmerling profili",
      "Profesionalna ugradnja",
      "Dogovor oko rješenja prije narudžbe",
    ],
    placeholderNote:
      "Ovdje će biti dodane detaljnije informacije o izvedbama, bojama i opremi prozora.",
    gallery: [
      { src: pvcProzori, alt: "PVC prozori u dnevnom boravku" },
      { src: projekt1, alt: "Ugrađeni PVC prozori na pročelju obiteljske kuće" },
      { src: projekt2, alt: "PVC balkonska vrata s pogledom na more" },
    ],
  },
  {
    slug: "pvc-vrata",
    name: "PVC vrata",
    short: "Ulazna i balkonska PVC vrata prilagođena vašem objektu.",
    intro:
      "PVC vrata izrađujemo i ugrađujemo za ulaze, balkone i terase. Rješenje dogovaramo prema izgledu objekta i vašim željama, uz izmjeru na terenu.",
    image: pvcVrata,
    alt: "Bijela ulazna PVC vrata sa staklenim poljem na pročelju kuće",
    benefits: [
      "Ulazna i balkonska izvedba",
      "Kömmerling profili",
      "Izmjera i ugradnja na objektu",
      "Usklađivanje s ostalom stolarijom",
    ],
    placeholderNote:
      "Ovdje će biti dodane detaljnije informacije o modelima ispuna, okovu i bojama vrata.",
    gallery: [
      { src: pvcVrata, alt: "Ulazna PVC vrata na kući" },
      { src: projekt2, alt: "PVC balkonska vrata otvorena prema terasi" },
      { src: projekt1, alt: "Pročelje kuće s novom PVC stolarijom" },
    ],
  },
  {
    slug: "pvc-klizne-stijene",
    name: "PVC klizne stijene",
    short: "Velike staklene površine za izlaz na terasu ili vrt.",
    intro:
      "Klizne stijene omogućuju velike staklene otvore i jednostavan prijelaz iz prostora na terasu ili vrt. Izvedbu i dimenzije dogovaramo prema mogućnostima vašeg objekta.",
    image: klizneStijene,
    alt: "Bijela PVC klizna stijena s pogledom na more",
    benefits: [
      "Velike staklene površine",
      "Kömmerling profili",
      "Izvedba po mjeri otvora",
      "Profesionalna ugradnja",
    ],
    placeholderNote:
      "Ovdje će biti dodane detaljnije informacije o tipovima kliznih sustava i dostupnim dimenzijama.",
    gallery: [
      { src: klizneStijene, alt: "Klizna stijena prema terasi" },
      { src: projekt3, alt: "Klizna stijena u stanu s pogledom na obalu" },
      { src: projekt2, alt: "Otvoreni izlaz na terasu" },
    ],
  },
  {
    slug: "komarnici",
    name: "Komarnici",
    short: "Zaštita od insekata za prozore i vrata.",
    intro:
      "Komarnike izrađujemo po mjeri za prozore i vrata, kao dopunu novoj ili postojećoj stolariji.",
    image: komarnici,
    alt: "Bijela mreža komarnika na prozoru s pogledom na zelenilo",
    benefits: [
      "Izrada po mjeri otvora",
      "Za prozore i za vrata",
      "Moguća ugradnja i na postojeću stolariju",
      "Jednostavno održavanje",
    ],
    placeholderNote:
      "Ovdje će biti dodane detaljnije informacije o vrstama komarnika (fiksni, klizni, rolo).",
    gallery: [
      { src: komarnici, alt: "Komarnik na prozoru" },
      { src: pvcProzori, alt: "Prozori pripremljeni za ugradnju komarnika" },
    ],
  },
  {
    slug: "grilje",
    name: "Grilje",
    short: "Klasična zaštita od sunca u dalmatinskom stilu.",
    intro:
      "Grilje su tradicionalno rješenje za zasjenjenje i zaštitu prozora, česta na objektima u priobalju. Izvedbu usklađujemo s izgledom objekta i ostalom stolarijom.",
    image: grilje,
    alt: "Bijele grilje na prozoru kamene dalmatinske kuće",
    benefits: [
      "Zaštita od sunca i pogleda",
      "Usklađivanje s izgledom objekta",
      "Izrada po mjeri",
      "Profesionalna ugradnja",
    ],
    placeholderNote:
      "Ovdje će biti dodane detaljnije informacije o izvedbama i načinima otvaranja grilja.",
    gallery: [
      { src: grilje, alt: "Grilje na kamenoj kući" },
      { src: projekt1, alt: "Pročelje kuće sa stolarijom i zaštitom od sunca" },
    ],
  },
  {
    slug: "rolete",
    name: "Rolete",
    short: "Zasjenjenje i dodatna zaštita otvora.",
    intro:
      "Rolete ugrađujemo uz novu stolariju ili naknadno, kao rješenje za zasjenjenje i dodatnu zaštitu otvora.",
    image: rolete,
    alt: "Bijele vanjske rolete spuštene preko prozora moderne kuće",
    benefits: [
      "Zasjenjenje prostora",
      "Dodatna zaštita otvora",
      "Izrada po mjeri",
      "Ugradnja uz novu ili postojeću stolariju",
    ],
    placeholderNote:
      "Ovdje će biti dodane detaljnije informacije o vrstama roleta i načinima upravljanja.",
    gallery: [
      { src: rolete, alt: "Vanjske rolete na pročelju" },
      { src: pvcProzori, alt: "Prozori s pripremom za rolete" },
    ],
  },
];

export const productCategories = products.map((p) => ({
  slug: p.slug,
  name: p.name,
}));

export type GalleryItem = {
  src: string;
  alt: string;
  category: string;
};

export const galleryCategories = [
  "Kuće i zgrade",
  "PVC Prozori",
  "PVC Vrata",
  "PVC Klizne stijene",
  "PVC Rolete",
  "PVC i Alu grilje",
  "Komarnici",
  "Ostalo"
] as const;

/** Zamijenite ove slike stvarnim fotografijama projekata. */
export const gallery: GalleryItem[] = [
  { src: projekt1, alt: "Ugrađeni PVC prozori na pročelju obiteljske kuće", category: "PVCProzori" },
  { src: projekt2, alt: "PVC balkonska vrata s izlazom na terasu i pogledom na more", category: "PVC Vrata" },
  { src: projekt3, alt: "PVC klizna stijena u stanu s pogledom na obalu", category: "PVC Klizne stijene" },
  { src: pvcProzori, alt: "PVC prozori u svijetlom dnevnom boravku", category: "PVC Prozori" },
  { src: rolete, alt: "Vanjske rolete na prozorima obiteljske kuće", category: "PVC Rolete" },
  { src: komarnici, alt: "Komarnik ugrađen na prozor", category: "Komarnici" },
  { src: grilje, alt: "Grilje na prozoru kamene kuće", category: "PVC i Alu grilje" },
  { src: klizneStijene, alt: "Klizna stijena prema terasi s pogledom na more", category: "Klizne stijene" },
  { src: pvcVrata, alt: "Ulazna PVC vrata na obiteljskoj kući", category: "PVC Vrata" },
  {src: pvcProzori, alt: "PVC prozori u dnevnom boravku", category: "Kuće i zgrade" },
];

export const faq = [
  {
    q: "Kako poslati upit za ponudu?",
    a: "Upit možete poslati putem obrasca na stranici Kontakt, telefonom ili e-poštom. U upitu je korisno navesti lokaciju objekta, približan broj otvora i njihove dimenzije, a možete priložiti i fotografije ili nacrt.",
  },
  {
    q: "Koliko dugo se čeka na ugradnju?",
    a: "Okvirno mjesec dana, ovisno o vrsti proizvoda i opsegu posla.",
  },
  {
    q: "Radite li završnu obradu?",
    a: "Završna građevinska obrada nakon ugradnje nije uključena u našu uslugu.",
  },
  {
    q: "Na kojem području radite?",
    a: "Podatak o području rada bit će naknadno dopunjen. Za informacije o vašoj lokaciji slobodno nas kontaktirajte telefonom ili putem obrasca.",
  },
  {
    q: "Kako izgleda proces od upita do ugradnje?",
    a: "Detaljan opis procesa bit će naknadno dopunjen. Okvirno: zaprimanje upita, dogovor i izmjera, ponuda, izrada te ugradnja stolarije.",
  },
  {
    q: "Mogu li poslati fotografije ili nacrt objekta?",
    a: "Da. Fotografije, nacrte ili postojeće mjere možete priložiti uz obrazac na stranici Kontakt ili ih poslati e-poštom.",
  },
];

export const whyUs = [
  {
    title: "20+ godina iskustva",
    text: "Dugogodišnji rad na ugradnji PVC stolarije na objektima različitih veličina.",
  },
  {
    title: "Kömmerling profili",
    text: "Za izradu PVC stolarije koristimo profile renomiranog proizvođača PVC sustava.",
  },
  {
    title: "Profesionalna ugradnja",
    text: "Izmjera, priprema i ugradnja odrađuju se pažljivo i prema stanju na objektu.",
  },
  {
    title: "Pouzdana usluga",
    text: "Jasan dogovor, dostupnost i korektan odnos od upita do završetka posla.",
  },
];

export const navigation = [
  { label: "Početna", to: "/" },
  { label: "O nama", to: "/o-nama" },
  { label: "Proizvodi", to: "/proizvodi" },
  { label: "Projekti", to: "/projekti" },
  { label: "FAQ", to: "/faq" },
  { label: "Kontakt", to: "/kontakt" },
] as const;
