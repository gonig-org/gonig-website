"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Photo = { url: string; caption: string | null };

export default function EventGallery({
  photos,
  eventTitle,
}: {
  photos: Photo[];
  eventTitle: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : i === 0 ? photos.length - 1 : i - 1)),
    [photos.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : i === photos.length - 1 ? 0 : i + 1)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, close, prev, next]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const activePhoto = open !== null ? photos[open] : null;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-1.5">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ aspectRatio: "4 / 3", display: "block", padding: 0, border: "none", background: "#0D0101", cursor: "pointer" }}
            aria-label={photo.caption ?? `Photo ${i + 1}`}
          >
            <Image
              src={photo.url}
              alt={photo.caption ?? `${eventTitle} — photo ${i + 1}`}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }}
            >
              {photo.caption && (
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    padding: "12px 14px",
                    opacity: 0.9,
                  }}
                >
                  {photo.caption}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && activePhoto && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.95)" }}
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{
              width: "44px",
              height: "44px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <span
            className="absolute top-6 left-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "#FFFFFF",
              fontSize: "13px",
              letterSpacing: "0.08em",
              opacity: 0.55,
            }}
          >
            {open + 1} / {photos.length}
          </span>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-4 lg:left-8 flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{
              width: "48px",
              height: "48px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "none",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="relative"
            style={{ maxWidth: "min(92vw, 1100px)", maxHeight: "85vh", width: "100%", height: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePhoto.url}
              alt={activePhoto.caption ?? `${eventTitle} — photo ${open + 1}`}
              fill
              className="object-contain"
              sizes="92vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-4 lg:right-8 flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{
              width: "48px",
              height: "48px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "none",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Caption */}
          {activePhoto.caption && (
            <p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "#FFFFFF",
                fontSize: "14px",
                lineHeight: 1.6,
                opacity: 0.65,
                maxWidth: "560px",
                padding: "0 24px",
              }}
            >
              {activePhoto.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
