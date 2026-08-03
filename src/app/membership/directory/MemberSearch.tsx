"use client";

import { useState } from "react";
import type { SanityMember } from "@/sanity/lib/queries";

function StatusLabel({ status }: { status: SanityMember["status"] }) {
  const isActive = status === "Active";
  return (
    <span
      style={{
        fontFamily: "var(--font-montserrat)",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: isActive ? "#2A6040" : "#8A7B6B",
      }}
    >
      {status}
    </span>
  );
}

type StatusFilter = "All" | "Active" | "Inactive";

const STATUS_FILTERS: StatusFilter[] = ["All", "Active", "Inactive"];

export default function MemberSearch({ members }: { members: SanityMember[] }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const filtered = members.filter((m) => {
    if (statusFilter !== "All" && m.status !== statusFilter) return false;
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      m.fullName.toLowerCase().includes(q) ||
      m.membershipNo.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Search bar */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(32px, 4vw, 48px)",
          paddingBottom: "clamp(32px, 4vw, 48px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderBottom: "1px solid #E8E0D0",
        }}
      >
        <div style={{ maxWidth: "960px" }}>
          <div className="flex flex-col sm:flex-row sm:items-start" style={{ gap: "16px" }}>
            <div className="w-full" style={{ maxWidth: "480px" }}>
              <label htmlFor="member-search" className="sr-only">
                Search members
              </label>
              <input
                id="member-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or membership number..."
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  width: "100%",
                  height: "52px",
                  padding: "0 20px",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "16px",
                  color: "var(--color-text-dark)",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D8D0C0",
                  borderRadius: "2px",
                  outline: focused ? "2px solid var(--color-navbar)" : "none",
                  outlineOffset: focused ? "2px" : undefined,
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Status filter — segmented toggle */}
            <div
              role="group"
              aria-label="Filter by membership status"
              className="flex w-full sm:w-auto flex-shrink-0"
              style={{
                border: "1px solid #D8D0C0",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              {STATUS_FILTERS.map((status) => {
                const isSelected = statusFilter === status;
                return (
                  <button
                    key={status}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setStatusFilter(status)}
                    className="flex-1 sm:flex-none"
                    style={{
                      minHeight: "52px",
                      padding: "0 clamp(20px, 3vw, 32px)",
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: isSelected ? "var(--color-nav-text)" : "var(--color-text-dark)",
                      backgroundColor: isSelected ? "var(--color-navbar)" : "#FFFFFF",
                      opacity: isSelected ? 1 : 0.75,
                      border: "none",
                      borderRight: status !== "Inactive" ? "1px solid #D8D0C0" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "13px",
              color: "var(--color-text-dark)",
              opacity: 0.7,
              marginTop: "16px",
            }}
          >
            Showing {filtered.length} of {members.length} member{members.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Directory rows */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(64px, 8vw, 100px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8E0D0",
            borderTop: "3px solid var(--color-navbar)",
          }}
        >
          {/* Column header row — desktop only */}
          <div
            className="hidden lg:grid"
            style={{
              gridTemplateColumns: "20% 55% 25%",
              padding: "16px clamp(28px, 4vw, 44px)",
              borderBottom: "1px solid #E8E0D0",
              backgroundColor: "#FAFAF8",
            }}
          >
            {["Membership No.", "Full Name", "Status"].map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-navbar)",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "clamp(40px, 6vw, 72px) clamp(28px, 4vw, 44px)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "16px",
                  color: "var(--color-text-dark)",
                  opacity: 0.7,
                }}
              >
                No members match your search.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {filtered.map((member, index) => (
                <div
                  key={member.membershipNo}
                  style={{
                    borderBottom: index < filtered.length - 1 ? "1px solid #E8E0D0" : "none",
                    padding: "clamp(20px, 2.5vw, 28px) clamp(28px, 4vw, 44px)",
                  }}
                >
                  {/* Desktop */}
                  <div
                    className="hidden lg:grid items-center"
                    style={{ gridTemplateColumns: "20% 55% 25%" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "13px",
                        color: "var(--color-text-dark)",
                        opacity: 0.7,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {member.membershipNo}
                    </span>
                    <span
                      className="font-heading"
                      style={{ fontSize: "18px", color: "var(--color-text-dark)" }}
                    >
                      {member.fullName}
                    </span>
                    <StatusLabel status={member.status} />
                  </div>

                  {/* Mobile */}
                  <div className="flex flex-col gap-2 lg:hidden">
                    <span
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "13px",
                        color: "var(--color-text-dark)",
                        opacity: 0.7,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {member.membershipNo}
                    </span>
                    <span
                      className="font-heading"
                      style={{ fontSize: "18px", color: "var(--color-text-dark)", lineHeight: 1.2 }}
                    >
                      {member.fullName}
                    </span>
                    <StatusLabel status={member.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
