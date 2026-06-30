"use client";

import { useState } from "react";

const paraStyle: React.CSSProperties = {
  fontFamily: "var(--font-montserrat)",
  color: "var(--color-text-dark)",
  fontSize: "17px",
  lineHeight: 1.85,
  opacity: 0.75,
};

const paragraphs = [
  `The Guild traces its origins to 2008, when a group of veteran organists and choirmasters recognised the need to unite the profession across Nigeria under one organised body. After nearly two years of wide consultation, the Guild was formally constituted by the Corporate Affairs Commission in Abuja in January 2012. The coordinating efforts of Mr. Donatus Ajayi and the early support of Chief Dr. Mofolorunso Akintoye Olumide Kuti were instrumental in securing that registration.`,

  `The Guild was registered with ten founding members on its Board of Trustees: Dr. Daniel Kolawole Olukoya (Founder and General Overseer, Mountain of Fire and Miracle Ministries Worldwide); Chief Dr. Mofolorunso Akintoye Olumide Kuti (Organist/Choirmaster Emeritus, St Paul's Cathedral, Abeokuta); Mr. James Adekunle (Choirmaster/Organist, Holy Trinity Anglican Church, Lagos, and Director, MUSON School of Music); Mrs. Tolu Obajimi (Master of the Music, Cathedral Church of Christ, Marina, Lagos); Alabo Dr. C. I. T. Wokoma JP (Christ Church, Port Harcourt); Deacon Olalekan Dosunmu (Nigerian Baptist Convention); Chief Maria Asseeva (MUSON School of Music, Lagos); Kayode Oni FTCL JP (Hoare's Memorial Methodist Cathedral, Yaba); Sir Emeka Nwokedi (Lagos City Chorale); and Mr. Donatus Rotimi Ajayi.`,

  `The inauguration was held on 2 March 2014 at the Cathedral Church of Christ, Lagos, led by the Provost, Very Revd. Pelu Johnson. The programme featured organ recitals by Tunji Ogunnoiki, Harry Ibiyefiebo, Tolu Obajimi, Biodun Ojo, and Kayode Oni, with choral music directed by Emeka Nwokedi and the Lagos City Chorale.`,

  `In the years that followed, the Guild organised a programme of recitals, lectures, and concerts. The first Organ Recital with Lecture was held on 1 February 2015 at Our Saviour's Church, Tafawa Balewa Square, Lagos. In January 2018, the Guild presented the Opening Concert at Bishop Adelakun Howells Memorial Church, Surulere, featuring a 53-person GONIG Choir and nine recitalists. Following the disruption of the COVID-19 pandemic, the Guild marked its return with the Freedom Concert at Goodnews Baptist Church, Surulere in May 2022. The Guild's maiden Organ Recital Series launched on 24 April 2024 at All Saints Anglican Church, Yaba.`,

  `As membership expanded, the Guild inaugurated the Southwest Zone at the Chapel of the Resurrection, University of Ibadan in July 2017, and the South-South Zone at St. Andrews Anglican Church, Port Harcourt in October 2020. In December 2022, the Board of Trustees appointed a pioneer National Executive, formally dedicated at the Cathedral Church of Christ, Marina in February 2023. The Guild has grown from sixty founding members to over three hundred, drawn from across Christian denominations, regions, and the Nigerian diaspora in the United Kingdom and United States.`,
];

export default function HistoryExpander() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* First paragraph — always visible */}
      <p style={paraStyle}>{paragraphs[0]}</p>

      {/* Remaining paragraphs — collapsed on mobile, always visible on desktop */}
      <div className={expanded ? "flex flex-col gap-6" : "hidden lg:flex lg:flex-col lg:gap-6"}>
        {paragraphs.slice(1).map((text, i) => (
          <p key={i} style={paraStyle}>{text}</p>
        ))}
      </div>

      {/* Read more / Read less toggle — mobile only */}
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="lg:hidden self-start"
          style={{
            fontFamily: "var(--font-montserrat)",
            color: "var(--color-navbar)",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            background: "none",
            border: "none",
            borderBottom: "1px solid var(--color-navbar)",
            paddingBottom: "2px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Read more
        </button>
      ) : (
        <button
          onClick={() => setExpanded(false)}
          className="lg:hidden self-start"
          style={{
            fontFamily: "var(--font-montserrat)",
            color: "var(--color-navbar)",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            background: "none",
            border: "none",
            borderBottom: "1px solid var(--color-navbar)",
            paddingBottom: "2px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Read less
        </button>
      )}
    </div>
  );
}
