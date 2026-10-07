/**
 * Središnje mjesto za sve podatke o tvrtki, proizvodima, projektima i FAQ-u.
 * Sve tekstove, slike, kontakt podatke i katalog mijenjajte ovdje.
 */

import heroKuca from "@/assets/hero-kuca.jpg";
import oNamaSlika from "@/assets/o-nama.jpg";
import profilSlika from "@/assets/kommerling.png";
import pvcProzori from "@/assets/pvc-prozori.jpg";
import pvcVrata from "@/assets/pvc-vrata.jpg";
import klizneStijene from "@/assets/web_klizna_1.jpg";
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
import trohaDilBijeli from "@/assets/troha-dil-bijeli.png";

import prozori1 from "@/assets/prozor_i_roleta.jpg";

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
  okvirProzora: okvirProzora,
  trohaDilBijeli: trohaDilBijeli
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

const productModules = import.meta.glob("@/assets/galerija/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

// 2. Pomoćna funkcija koja automatski dohvaća slike za konkretni proizvod na temelju njegovog slug-a
const getProductImages = (slug: string) => {
  const matches = Object.entries(productModules)
    .filter(([path]) => path.includes(`/galerija/${slug}/`))
    .map(([path, module]) => {
      const fileNameWithExt = path.split("/").pop() || "";
      const fileName = fileNameWithExt.split(".")[0] || "slika";
      return {
        src: (module as { default: string }).default,
        alt: `${slug.replace(/-/g, " ")} - ${fileName.replace(/-/g, " ")}`,
      };
    });

  return matches;
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
      "Mogućnost ugradnje troslojnog stakla za maksimalnu uštedu energije i toplinu doma. Dostupno u klasičnoj bijeloj boji, elegantim antracit tonovima te imitacijama drva koje se uklapaju u svaki stil",
    gallery: getProductImages("prozori"),
  },
  {
    slug: "pvc-vrata",
    name: "PVC vrata",
    short: "Ulazna i balkonska PVC vrata prilagođena vašem objektu.",
    intro:
      "Svaka ulazna vrata izrađujemo prateći vaše želje i specifičnosti objekta. Na terenu radimo precizne izmjere kako biste dobili najbolje tehničko i estetsko rješenje.",
    image: pvcVrata,
    alt: "Bijela ulazna PVC vrata sa staklenim poljem na pročelju kuće",
    benefits: [
      "Kömmerling sustavi 76 AD i 88 za maksimalnu toplinu i mir.",
      "Brave sa sigurnosnim masivnim kljunovima u standardnoj opremi.",
      "Pocinčana čelična ojačanja za dugotrajnu stabilnost",
      "Više stotina modela s ukrasnim panelima",
    ],
    placeholderNote:
      "U ponudi imamo nekoliko stotina različitih modela s ukrasnim panelima prilagođenih vašem stilu. Svaka vrata standardno opremamo vrhunskim bravama sa sigurnosnim masivnim kljunovima (bez dodatne nadoplate), spojnicama visoke nosivosti do 120 kg te snažnim pocinčanim čeličnim ojačanjima u krilu i okviru za maksimalnu stabilnost.",
        gallery: getProductImages("ulaznaVrata"),

  },
  {
    slug: "pvc-klizne-stijene",
    name: "PVC klizne stijene",
    short: "Velike staklene površine za izlaz na terasu ili vrt.",
    intro:
      "Klizne stijene omogućuju spajanje unutarnjeg prostora s terasama i vrtovima uz osiguravanje maksimalne količine prirodne svjetlosti. Proizvodi se izrađuju prema preciznim dimenzijama otvora na objektu, uz izlazak na teren i tehničku prilagodbu svakom građevinskom projektu.",
    image: klizneStijene,
    alt: "Bijela PVC klizna stijena s pogledom na more",
    benefits: [
      "Velike staklene površine",
      "Konstrukcija prilagođena učestalom otvaranju i zatvaranju",
      "Niski prag na podizno kliznim sustavima olakšava prolaz bez visinskih prepreka.",
      "Dimenzioniranje i ugradnja prema specifičnim uvjetima i mjerama na objektu.",
    ],
placeholderNote: `Otklopno-klizni sustav (PSK): Kömmerling 76 MD i 88 profili s funkcijom otklapanja i paralelnog klizanja.
Podizno-klizni sustav (HS): Namijenjen velikim staklenim površinama s niskim pragom za lakši prolaz.
Mogućnost ugradnje dvoslojnog ili troslojnog IZO stakla, prilagođeno točnim mjerama otvora na objektu.`,
    gallery: getProductImages("klizneStijene"),
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
    ],
    placeholderNote:
      "U ponudi su fiksne i rolo izvedbe. Fiksni komarnici montiraju se kao zaseban element na prozor. Rolo komarnici se u roleti ne mogu montirati naknadno, već isključivo u isto vrijeme kada i rolete, stoga je planiranje ugradnje potrebno uskladiti prije same narudžbe.",
    gallery: getProductImages("komarnici"),
  },
  {
    slug: "grilje",
    name: "Grilje",
    short: "Klasična zaštita od sunca u dalmatinskom stilu.",
    intro:
      "Grilje su tradicionalno rješenje za zasjenjenje i zaštitu prozora, česta na objektima u Dalmaciji. Izvedbu usklađujemo s izgledom objekta i ostalom stolarijom.",
    image: grilje,
    alt: "Bijele grilje na prozoru kamene dalmatinske kuće",
    benefits: [
      "Fiksne lamele za više svjetlosti",
      "Pomične lamele za potpuno zamračivanje",
      "Velik izbor oblika: standardne, lučne, harmo i fasadne izvedbe",
      "Izrada po mjeri"
    ],
placeholderNote: 
      "Grilje se izrađuju s fiksnim ili pomičnim lamelama, pri čemu fiksne lamele propuštaju više svjetlosti, dok pomične omogućuju potpuno zamračivanje prostora. Uz standardne izvedbe, dostupne su lučne, harmo, fasadne i grilje na zaključavanje u PVC izvedbi ili aluminijskoj izvedbi s bojama prema RAL karti, kao i u imitaciji drveta. Za otpornost na uvjete na obali koristi se masivan Maco okov izrađen od kvalitetnih i dodatno plastificiranih materijala. Grilje se mogu ugraditi istovremeno s prozorima ili naknadno na već postojeće otvore, uz opciju odabira bijelog ili crnog okova.",
    gallery: getProductImages("grilje"),
  },
  {
    slug: "rolete",
    name: "Rolete",
    short: "Zasjenjenje i dodatna zaštita otvora.",
    intro:
      "Proizvodnja i ugradnja unutarnjih Kömmerling Vari nova roleta i vanjskih roleta s aluminijskom kutijom, uz izbor PVC ili aluminijskih lamela i raznih načina upravljanja.",
    image: rolete,
    alt: "Bijele vanjske rolete spuštene preko prozora moderne kuće",
    benefits: [
      "Zasjenjenje prostora",
      "Dodatna zaštita otvora",
      "Izrada po mjeri",
      "Fleksibilne opcije upravljanja ručnim rolet-automatom, kurblom ili elektromotorom.",
    ],
  placeholderNote:
   "U ponudi su unutarnje rolete Kömmerling Vari nova koje se ugrađuju tijekom proizvodnje i montiraju istovremeno s prozorima, te vanjske rolete s alu kutijom koje se mogu ugraditi naknadno na već montirane prozore. Unutarnje rolete zahtijevaju planiranje prostora za kutiju prije gradnje kako se ne bi smanjio svjetlosni otvor. Lamele su dostupne u PVC ili aluminijskoj izvedbi u različitim bojama, uz mogućnost upravljanja pomoću rolet-automata, kurble ili elektromotora, kao i izvedbu roleta na izbačaj koja omogućuje istovremeno prozračivanje i zamračivanje.",
    gallery: getProductImages("rolete"),
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
  { src: projekt2, alt: "PVC balkonska vrata s izlazom na terasu i pogledom na more", category: "PVC Vrata" },
  { src: projekt3, alt: "PVC klizna stijena u stanu s pogledom na obalu", category: "PVC Klizne stijene" },
  { src: rolete, alt: "Vanjske rolete na prozorima obiteljske kuće", category: "PVC Rolete" },
  { src: komarnici, alt: "Komarnik ugrađen na prozor", category: "Komarnici" },
  { src: grilje, alt: "Grilje na prozoru kamene kuće", category: "PVC i Alu grilje" },
  { src: klizneStijene, alt: "Klizna stijena prema terasi s pogledom na more", category: "Klizne stijene" },
  { src: pvcVrata, alt: "Ulazna PVC vrata na obiteljskoj kući", category: "PVC Vrata" },
  {src: pvcProzori, alt: "PVC prozori u dnevnom boravku", category: "Kuće i zgrade" },
  { src: prozori1, alt: "Trokrilni PVC prozor s vanjskom roletom", category: "PVC Prozori" },
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
  // { label: "FAQ", to: "/faq" },
  { label: "Kontakt", to: "/kontakt" },
] as const;
