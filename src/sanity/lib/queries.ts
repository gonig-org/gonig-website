import { client } from "./client";

/* ── Shared cache option: revalidate every 60 seconds ── */
const CACHE = { next: { revalidate: 60 } };

/* ── Types ── */

export type SanityHeroEvent = {
  title: string;
  slug: string;
  date: string;
  standfirst: string | null;
  heroImage: string | null;
};

export type SanityEventDetail = {
  title: string;
  slug: string;
  date: string;
  standfirst: string | null;
  writeup: string | null;
  heroImage: string | null;
  gallery: { url: string; caption: string | null }[];
};

export type SanityEventSummary = {
  title: string;
  slug: string;
  date: string;
  standfirst: string | null;
  heroImage: string | null;
};

export type SanityMember = {
  membershipNo: string;
  fullName: string;
  status: "Active" | "Inactive";
};

export type SanityPerson = {
  name: string;
  bio: string | null;
  photo: string | null;
  inMemoriam: boolean;
};

export type SanityAdviser = {
  name: string;
};

export type SanityTrustee = {
  name: string;
};

/* ── Queries ── */

export async function getHeroEvents(): Promise<SanityHeroEvent[]> {
  return client.fetch(
    `*[_type == "event" && showInHero == true] | order(heroOrder asc) {
      title,
      "slug": slug.current,
      date,
      standfirst,
      "heroImage": heroImage.asset->url
    }`,
    {},
    CACHE
  );
}

export async function getEventBySlug(slug: string): Promise<SanityEventDetail | null> {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      date,
      standfirst,
      writeup,
      "heroImage": heroImage.asset->url,
      "gallery": gallery[]{
        "url": asset->url,
        caption
      }
    }`,
    { slug },
    CACHE
  );
}


export type SanityEventSitemapEntry = {
  slug: string;
  date: string;
};

export async function getAllEventSlugs(): Promise<SanityEventSitemapEntry[]> {
  return client.fetch(
    `*[_type == "event"] {
      "slug": slug.current,
      date
    }`,
    {},
    CACHE
  );
}

export async function getPastEvents(): Promise<SanityEventSummary[]> {
  const today = new Date().toISOString().split("T")[0];
  return client.fetch(
    `*[_type == "event" && date < $today] | order(date desc) {
      title,
      "slug": slug.current,
      date,
      standfirst,
      "heroImage": heroImage.asset->url
    }`,
    { today },
    CACHE
  );
}

export async function getMembersDirectory(): Promise<SanityMember[]> {
  return client.fetch(
    `*[_type == "member"] | order(membershipNo asc) {
      membershipNo,
      fullName,
      status
    }`,
    {},
    CACHE
  );
}

export async function getExecutives(): Promise<SanityPerson[]> {
  return client.fetch(
    `*[_type == "person" && board == "executives"] | order(order asc) {
      name,
      bio,
      inMemoriam,
      "photo": photo.asset->url
    }`,
    {},
    CACHE
  );
}

export async function getAdvisers(): Promise<SanityAdviser[]> {
  return client.fetch(
    `*[_type == "person" && board == "advisers"] | order(order asc) {
      name
    }`,
    {},
    CACHE
  );
}

export async function getFoundingTrustees(): Promise<SanityTrustee[]> {
  return client.fetch(
    `*[_type == "person" && board == "trustees" && trusteeType == "founding" && inMemoriam != true] | order(order asc) {
      name
    }`,
    {},
    CACHE
  );
}

export type SanityZoneOfficer = {
  name: string;
  zone: string;
  role: string;
};

export async function getZoneOfficers(): Promise<SanityZoneOfficer[]> {
  return client.fetch(
    `*[_type == "zoneOfficer"] | order(zone asc, order asc) {
      name,
      zone,
      role
    }`,
    {},
    CACHE
  );
}

export async function getAppointees(): Promise<SanityTrustee[]> {
  return client.fetch(
    `*[_type == "person" && board == "trustees" && trusteeType == "appointee" && inMemoriam != true] | order(order asc) {
      name
    }`,
    {},
    CACHE
  );
}
