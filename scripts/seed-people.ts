/**
 * Seed script — populates all 30 people into Sanity.
 *
 * Run once after setting SANITY_API_TOKEN in .env.local:
 *   npx tsx --env-file=.env.local scripts/seed-people.ts
 *
 * Safe to re-run: checks for existing records by name before creating.
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "fhu063z2",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type PersonInput = {
  name: string;
  board: "executives" | "advisers" | "trustees";
  trusteeType?: "founding" | "appointee";
  bio?: string;
  inMemoriam?: boolean;
  order: number;
};

const PEOPLE: PersonInput[] = [
  // ── National Executives ──────────────────────────────────────────────────
  {
    name: "Dr. Toyin Samuel Ajose",
    board: "executives",
    order: 1,
    bio: "Toyin Samuel Ajose is a lecturer and the immediate past Head of Department of Music, University of Ibadan. He possesses a broad range of experience in choral directing and organ musicianship. As the Director of Music at the Chapel of the Resurrection, University of Ibadan, he coordinates various organ music programmes including periodic organ recitals and manages a pool of young organists under the Chapel Organ Scholar initiative, in collaboration with the Department of Music. He has participated in organ playing development programmes organised by ABRSM London and Viscount SPA Italy. A member from inception, Samuel Ajose has always been committed to contributing meaningfully to the advancement of the Guild by facilitating collegiate, professional, artistic, and educational activities in pursuance of its objectives.",
  },
  {
    name: "Olugbemi Muyiwa Okunnuga",
    board: "executives",
    order: 2,
    bio: "Born into the musical family of Ven. Dr B.O. Okunnuga (rtd), Gbemi holds church music in high esteem. He is an Associate of the Royal Schools of Music and holds an Associate Diploma (Organ Major) from the Musical Society of Nigeria. Whilst studying Zoology at the University of Ibadan, he served as accompanist of the Students' Chorale Ensemble and Assistant Organist at the Cathedral of St. David, Kudeti, and later St. James' The Great Cathedral, Oke-Bola, Ibadan. He is currently the Organist at Good News Baptist Church, Surulere, Lagos, where he has served for fifteen years. He has been the recording scribe to the Guild of Organists of Nigeria since its inception and is passionate about educational training and skill acquisition for budding organists. His marriage to Sedode, an organist, choirmistress, and fellow Guild member, is blessed with children.",
  },
  {
    name: "Babatunde Olurombi",
    board: "executives",
    order: 3,
    bio: "Tunde Olurombi has been a chorister for over three and a half decades, holding several elective positions and currently assisting with the playing of the organ at Hoares Memorial Methodist Cathedral, Yaba, Lagos. He holds a B.Eng. (Hons) in Electrical Engineering from the University of Ilorin and an MBA from Obafemi Awolowo University, Ile-Ife, in addition to several professional certifications and training undertaken locally and internationally. He is married to Tolulope Olurombi and the marriage is blessed with children.",
  },
  {
    name: "Samuel Abiodun Ojo",
    board: "executives",
    order: 4,
    bio: "Abiodun Ojo has played an active role in the Nigerian church music scene for over two decades. A graduate of Mass Communication, he has functioned as organist, choir director, and church music consultant to various denominations across Nigeria. He is presently the Music Director and Choirmaster at Hoare's Memorial Methodist Cathedral, Sabo, Yaba, Lagos. He is married to Abimbola Ojo and the marriage is blessed with two children.",
  },
  {
    name: "Engr. Wilcox Abbey",
    board: "executives",
    order: 5,
    bio: "Engr. Wilcox Abbey is the Diocesan Music Director and Choirmaster of Evo Diocese, and Chief Organist of All Saints Cathedral Church, Evo Diocese, Rivers State. He holds a Bachelor of Technology in Electrical and Electronics Engineering and works with the Shell Petroleum Development Company (SPDC), with experience spanning oil and gas facilities and construction, drilling and completions, production operations, business planning, and corporate governance.",
  },
  {
    name: "Dr. Adeolu Samuel Akeredolu",
    board: "executives",
    order: 6,
    bio: "Dr. Adeolu Samuel Akeredolu was born in Ibadan into a Christ Apostolic Church family. He received his primary and secondary education in Ibadan before attending Ladoke Akintola University of Technology, where he obtained an MBBS. He holds further postgraduate qualifications from Obafemi Awolowo University, the National Open University of Nigeria, and the National Postgraduate Medical College. He currently works at Osun State University. His musical formation was shaped under the tutelage of several distinguished practitioners including the late Mr Kayode Oni (FTCL), the late Pa Olaolu Omideyi (FRCO), and others. Dr. Akeredolu served as cathedral organist at St. Peter's Anglican Cathedral, Aremo, where he played a three-manual pipe organ for seven years, and is currently among the organists at All Souls Anglican Church, Osogbo. He is also the CEO of Clarion Multimedia Studio, which specialises in live multichannel audio, multicamera concert recording, organ and piano recital recording, live streaming, and sheet music and hymnal publishing.",
  },
  {
    name: "Olusegun Stanley Akinfenwa",
    board: "executives",
    order: 7,
    bio: "Segun Akinfenwa is a founding member of the Guild of Organists of Nigeria and also holds membership of the RSCM and RCO, UK. A graduate of the University of Ibadan, he holds ABRSM and ICMP certifications. After serving as Organist and Choirmaster in Nigeria, he is currently Teacher of Musical Instruments and Theory of Music at St. Crispin's Grammar School, Leicester City, UK, and Organist at St. Michael's Church, C.O.E., Waddington, Lincolnshire.",
  },

  // ── Board of Advisers ─────────────────────────────────────────────────────
  { name: "Mr. Ibiyefiebo Harry", board: "advisers", order: 1 },
  { name: "Mr. Oluwamuyiwa Akinmejiwa", board: "advisers", order: 2 },
  { name: "Dr. Segun Fadeyi", board: "advisers", order: 3 },
  { name: "Mr. Akin Olubi", board: "advisers", order: 4 },
  { name: "Engr. Babajide Idowu", board: "advisers", order: 5 },
  { name: "Dr. Dayo Oyedun", board: "advisers", order: 6 },
  { name: "Mr. Theophilus Okang", board: "advisers", order: 7 },
  { name: "Prof. Soji Adejumo", board: "advisers", order: 8 },
  { name: "Revd. Canon Bola Omodun Ilori", board: "advisers", order: 9 },

  // ── Board of Trustees — Founding ──────────────────────────────────────────
  { name: "Dr. D.K. Olukoya", board: "trustees", trusteeType: "founding", order: 1 },
  { name: "Mr. D.R. Ajayi", board: "trustees", trusteeType: "founding", order: 2 },
  { name: "Chief Maria Aseeva", board: "trustees", trusteeType: "founding", order: 3 },
  { name: "Deacon Dr. O.A. Dosunmu", board: "trustees", trusteeType: "founding", order: 4 },
  { name: "Mrs. Tolu Obajimi", board: "trustees", trusteeType: "founding", order: 5 },
  { name: "Sir Emeka Nwokedi", board: "trustees", trusteeType: "founding", order: 6 },
  { name: "Chief Dr. M.O.A. Kuti", board: "trustees", trusteeType: "founding", order: 7, inMemoriam: true },
  { name: "Mr. James Adekunle", board: "trustees", trusteeType: "founding", order: 8, inMemoriam: true },
  { name: "Alabo Dr. C.I.T. Wokoma", board: "trustees", trusteeType: "founding", order: 9, inMemoriam: true },
  { name: "Mr. Kayode Oni FTCL", board: "trustees", trusteeType: "founding", order: 10, inMemoriam: true },

  // ── Board of Trustees — New Appointees ───────────────────────────────────
  {
    name: "Sir Brig. Gen. Charles Adisa Bossman (Rtd)",
    board: "trustees",
    trusteeType: "appointee",
    order: 1,
    bio: "Born in Lafiaji, Lagos Island on 28 January 1963, Charles Adisa Bossman studied at the Universities of Ibadan, Lagos, Lagos State University, and Tai Solarin University, where he obtained bachelor's degrees, postgraduate qualifications, and specialist certificates. He received a Presidential Commission into the Nigerian Army as a Second Lieutenant in 1989, rose through the ranks serving at tactical, operational, and strategic levels across the country, and retired voluntarily in 2021 as a decorated senior officer. His love for organ music began early in life. He was enrolled as a chorister at the Methodist Church of the Trinity, Tinubu, Lagos in 1980 and had the privilege of studying under distinguished organists including Pa Derby Osotuke-Johnson, Kweku Harrison, and the late Kayode Oni. He served as Assistant Organist, Organist, Choirmaster, and Director of Music at various churches across Nigeria through the course of his military postings, and is currently the Choirmaster at the Methodist Church of the Trinity, Tinubu, Lagos. A former member of the MUSON Choir, he now holds Sustainer Membership. He is a foundation member of the Guild of Organists of Nigeria. He is married to Barrister (Mrs) Folashade Bossman and the marriage is blessed with children.",
  },
  {
    name: "Mr. Ebenezer Ekundayo Omole",
    board: "trustees",
    trusteeType: "appointee",
    order: 2,
    bio: "Ebenezer Ekundayo Omole began his career in church music in 1959 as a chorister at Anglican Church, Irolu-Remo, Ogun State. He joined the Holy Trinity Church, Ebute-Ero Choir in 1972 and had the opportunity to study under the late Pa James Adekunle. He joined the Lagos Musical Society under Pa Christopher Oyesiku in 1974, and by 1979 had joined the Laz Ekwueme National Chorale at the University of Lagos. He began playing the organ in 1968 and held various organist positions in Lagos churches before becoming Organist and Master of the Music at the Cathedral of St. Paul, Sagamu in 1985, where he served until 1990. He then served as Assistant Choirmaster and Organist at Archbishop Vining Memorial Church, Ikeja (1990 to 1994) before being appointed Organist and Choirmaster at St. Jude's Church, Odi-Olowo in 1994, where he continues as Director of Music to date. As a music educator, he contributed to the teaching and development of music in schools at state level and in higher institutions for many years, including as a teacher on LTV's Teaching Music programme in 1979 and 1980. He was appointed Head of Music and Music Education by the Lagos State Ministry of Education from 1990 to 2008 and was a pioneer teacher at MUSON School of Music, where he taught Piano, Voice, and Theory of Music from 1991 to 2019. He holds a BA in Music Performance and Composition, an MA in Music Composition and Musicology, and an MA in Creative Arts and Music Theory.",
  },
  {
    name: "Sir Engr. Tamunobubelebara Poloamina",
    board: "trustees",
    trusteeType: "appointee",
    order: 3,
    bio: "Sir Obele, as he is popularly known, hails from Okrika in Rivers State and has been a registered member of the Guild of Organists of Nigeria since 2012. Following the death of Alabo Dr. C.I.T. Wokoma in January 2020, Sir Obele championed and successfully coordinated the inauguration of the South-South Zone of the Guild in October 2020 at St. Andrew's Anglican Church, Rumuobiakani Deanery, in a service officiated by the Rt. Revd. Innocent U. Odu, Bishop of the Diocese of Evo. Over sixty organists and choirmasters were inducted on the occasion. Sir Obele was elected pioneer Vice President of the South-South Zone and subsequently handed over to his successor upon his relocation from the zone. He is currently the Music Director of the Anglican Missionary Congregations (AMC) England and Ireland, headquartered in Manchester, United Kingdom. He is married and blessed with four children.",
  },
  {
    name: "Rev. Emmanuel Oluyemi Akinpelu",
    board: "trustees",
    trusteeType: "appointee",
    order: 4,
    bio: "Rev. Yemi Akinpelu's introduction to music began as a choirboy at Comprehensive High School, Aiyetoro, Egbado (1970 to 1974), under the tutelage of the late Chief M.A.O. Kuti, whose musical mentorship inspired him to pursue music as a vocation. He is a graduate of Music who majored in Performance (Piano) for his first degree. He lectured in the Department of Music at Alvan Ikoku College of Education, Owerri (1985 to 1986) and Osun State College of Education, Ilesa (1986 to 1996), before moving to the International School, University of Lagos as Head of Music, where he served until retirement from active teaching. He was appointed Organist and Master of the Music at Holy Trinity Anglican Church, Ilesa (1986 to 1991) and is the Choirmaster-General for the Blood of Jesus Apostolic Church International. He currently serves as Chief Examiner and Chairman of the Body of Music Examiners for both WAEC and NECO in Nigeria. He is a church music composer and arranger, married to Deaconess Ayomikun Oluwatoyin Akinpelu, and the marriage is blessed with two children.",
  },
];

async function seed() {
  console.log(`Seeding ${PEOPLE.length} people into Sanity...`);

  for (const person of PEOPLE) {
    const existing = await client.fetch(
      `*[_type == "person" && name == $name][0]._id`,
      { name: person.name }
    );

    if (existing) {
      console.log(`  SKIP  ${person.name} (already exists)`);
      continue;
    }

    await client.create({
      _type: "person",
      name: person.name,
      board: person.board,
      ...(person.trusteeType ? { trusteeType: person.trusteeType } : {}),
      ...(person.bio ? { bio: person.bio } : {}),
      inMemoriam: person.inMemoriam ?? false,
      order: person.order,
    });

    console.log(`  ADDED ${person.name}`);
  }

  console.log("\nDone.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
