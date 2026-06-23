import { client } from "./client";

/* ── Shared cache option: revalidate every 60 seconds ── */
const CACHE = { next: { revalidate: 60 } };

/* ── Types ── */

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
  inMemoriam: boolean;
};

/* ── Queries ── */

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
    `*[_type == "person" && board == "trustees" && trusteeType == "founding"] | order(order asc) {
      name,
      inMemoriam
    }`,
    {},
    CACHE
  );
}

export async function getAppointees(): Promise<SanityPerson[]> {
  return client.fetch(
    `*[_type == "person" && board == "trustees" && trusteeType == "appointee"] | order(order asc) {
      name,
      bio,
      inMemoriam,
      "photo": photo.asset->url
    }`,
    {},
    CACHE
  );
}
