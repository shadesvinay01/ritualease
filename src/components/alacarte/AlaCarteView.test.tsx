import { describe, it, expect } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AlaCarteView } from "./AlaCarteView";
import { ALA_CARTE_GROUPS, CATERING_PACKAGES, CATERING_MIN_PAX } from "@/data/alacarte";
import { WHATSAPP_NUMBER } from "@/data/booking";

const renderView = () =>
  render(
    <MemoryRouter>
      <AlaCarteView />
    </MemoryRouter>
  );

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const expectValidWhatsAppUrl = (href: string | null, expectedFragment: string) => {
  expect(href).not.toBeNull();
  const url = new URL(href!);
  // Must use a WhatsApp host that opens a chat directly (mobile + desktop friendly)
  expect(["wa.me", "web.whatsapp.com", "api.whatsapp.com"]).toContain(url.hostname);

  // Phone number must match the configured number — accepted either in path (wa.me) or as ?phone=
  const phoneInPath = url.pathname.replace(/\D/g, "");
  const phoneInQuery = (url.searchParams.get("phone") || "").replace(/\D/g, "");
  expect([phoneInPath, phoneInQuery]).toContain(WHATSAPP_NUMBER);

  // Pre-filled text must be present and contain the expected fragment
  const text = url.searchParams.get("text") || "";
  expect(text.length).toBeGreaterThan(0);
  expect(text).toContain(expectedFragment);
};

const getAnchorByText = (label: string | RegExp) => {
  const el = screen.getAllByText(label).find(n => n.closest("a"));
  return el?.closest("a") as HTMLAnchorElement | null;
};

describe("AlaCarteView WhatsApp CTAs", () => {
  it("expands every group so all item Add links are reachable", () => {
    renderView();
    // Click every "Show all + N more" toggle
    screen
      .queryAllByRole("button", { name: /Show all \+ \d+ more/i })
      .forEach(btn => fireEvent.click(btn));

    const expectedItemCount = ALA_CARTE_GROUPS.reduce((sum, g) => sum + g.items.length, 0);
    const addLinks = screen.getAllByRole("link", { name: /^Add →$/ });
    expect(addLinks.length).toBe(expectedItemCount);
  });

  it("each Add link points to a valid WhatsApp chat URL with item name + price", () => {
    renderView();
    screen
      .queryAllByRole("button", { name: /Show all \+ \d+ more/i })
      .forEach(btn => fireEvent.click(btn));

    const allItems = ALA_CARTE_GROUPS.flatMap(g => g.items);
    const addLinks = screen.getAllByRole("link", { name: /^Add →$/ }) as HTMLAnchorElement[];

    addLinks.forEach((link, i) => {
      const item = allItems[i];
      // Opens in new tab
      expect(link.getAttribute("target")).toBe("_blank");
      expectValidWhatsAppUrl(link.getAttribute("href"), item.name);
      // Price should also be embedded in the prefilled message
      const text = new URL(link.href).searchParams.get("text") || "";
      expect(text).toContain(formatPrice(item.price));
    });
  });

  it("each catering package 'Know more on WhatsApp' CTA is a valid WhatsApp link", () => {
    renderView();
    const ctas = screen.getAllByRole("link", { name: /Know more on WhatsApp/i }) as HTMLAnchorElement[];
    expect(ctas.length).toBe(CATERING_PACKAGES.length);

    ctas.forEach((cta, i) => {
      const pkg = CATERING_PACKAGES[i];
      expect(cta.getAttribute("target")).toBe("_blank");
      expect(cta.getAttribute("rel")).toMatch(/noopener/);
      expectValidWhatsAppUrl(cta.getAttribute("href"), pkg.name);
      const text = new URL(cta.href).searchParams.get("text") || "";
      expect(text).toContain(formatPrice(pkg.pricePerPerson));
      expect(text).toContain(String(CATERING_MIN_PAX));
    });
  });

  it("the bottom 'Chat on WhatsApp' CTA is a valid WhatsApp link opened in a new tab", () => {
    renderView();
    const cta = getAnchorByText(/Chat on WhatsApp/i);
    expect(cta).not.toBeNull();
    expect(cta!.getAttribute("target")).toBe("_blank");
    expectValidWhatsAppUrl(cta!.getAttribute("href"), "celebration");
  });
});