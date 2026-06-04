import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AlaCarteView } from "./AlaCarteView";
import { ALA_CARTE_GROUPS, CATERING_PACKAGES, CATERING_MIN_PAX } from "@/data/alacarte";
import { WHATSAPP_NUMBER } from "@/data/booking";

/**
 * E2E-style click test.
 *
 * Simulates the full user flow: render the page, expand every collapsed
 * category, then *click* every WhatsApp CTA. We intercept each click,
 * prevent the real navigation, capture the URL the browser would have
 * opened, and assert that it contains the correct phone number and a
 * non-empty pre-filled message that references the relevant item/package.
 */

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

type Captured = { href: string; label: string };

const installClickInterceptor = (): { captures: Captured[]; restore: () => void } => {
  const captures: Captured[] = [];
  const handler = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest("a") as HTMLAnchorElement | null;
    if (!a) return;
    e.preventDefault();
    captures.push({ href: a.href, label: (a.textContent || "").trim() });
  };
  document.addEventListener("click", handler, true);
  // Also stub window.open in case any CTA uses it instead of an anchor.
  const originalOpen = window.open;
  window.open = vi.fn((url?: string | URL) => {
    captures.push({ href: String(url ?? ""), label: "window.open" });
    return null;
  }) as typeof window.open;
  return {
    captures,
    restore: () => {
      document.removeEventListener("click", handler, true);
      window.open = originalOpen;
    },
  };
};

const assertWhatsAppUrl = (href: string, expectedFragment: string) => {
  expect(href, `href should be set for "${expectedFragment}"`).toBeTruthy();
  const url = new URL(href);
  expect(["wa.me", "web.whatsapp.com", "api.whatsapp.com"]).toContain(url.hostname);
  const phoneInPath = url.pathname.replace(/\D/g, "");
  const phoneInQuery = (url.searchParams.get("phone") || "").replace(/\D/g, "");
  expect(
    [phoneInPath, phoneInQuery],
    `phone number must match for "${expectedFragment}" — got ${href}`
  ).toContain(WHATSAPP_NUMBER);
  const text = url.searchParams.get("text") || "";
  expect(text.length, `pre-filled text must not be empty for "${expectedFragment}"`).toBeGreaterThan(0);
  expect(text, `pre-filled text must mention "${expectedFragment}"`).toContain(expectedFragment);
};

const renderAndExpand = () => {
  render(
    <MemoryRouter>
      <AlaCarteView />
    </MemoryRouter>
  );
  screen
    .queryAllByRole("button", { name: /Show all \+ \d+ more/i })
    .forEach(btn => fireEvent.click(btn));
};

describe("AlaCarteView E2E — clicking every WhatsApp CTA", () => {
  let interceptor: ReturnType<typeof installClickInterceptor>;

  beforeEach(() => {
    interceptor = installClickInterceptor();
    return () => interceptor.restore();
  });

  it("clicks every item Add link and verifies the captured WhatsApp URL", () => {
    renderAndExpand();

    const addLinks = screen.getAllByRole("link", { name: /^Add →$/ }) as HTMLAnchorElement[];
    const allItems = ALA_CARTE_GROUPS.flatMap(g => g.items);
    expect(addLinks.length).toBe(allItems.length);

    addLinks.forEach(link => fireEvent.click(link));

    expect(interceptor.captures.length).toBe(allItems.length);
    interceptor.captures.forEach((cap, i) => {
      const item = allItems[i];
      assertWhatsAppUrl(cap.href, item.name);
      const text = new URL(cap.href).searchParams.get("text") || "";
      expect(text).toContain(formatPrice(item.price));
    });
  });

  it("clicks every catering package CTA and verifies the captured WhatsApp URL", () => {
    renderAndExpand();

    const ctas = screen.getAllByRole("link", { name: /Know more on WhatsApp/i }) as HTMLAnchorElement[];
    expect(ctas.length).toBe(CATERING_PACKAGES.length);

    ctas.forEach(cta => fireEvent.click(cta));

    expect(interceptor.captures.length).toBe(CATERING_PACKAGES.length);
    interceptor.captures.forEach((cap, i) => {
      const pkg = CATERING_PACKAGES[i];
      assertWhatsAppUrl(cap.href, pkg.name);
      const text = new URL(cap.href).searchParams.get("text") || "";
      expect(text).toContain(formatPrice(pkg.pricePerPerson));
      expect(text).toContain(String(CATERING_MIN_PAX));
    });
  });

  it("clicks the bottom 'Chat on WhatsApp' CTA and verifies the captured WhatsApp URL", () => {
    renderAndExpand();

    const cta = screen
      .getAllByText(/Chat on WhatsApp/i)
      .map(n => n.closest("a"))
      .find(Boolean) as HTMLAnchorElement | undefined;
    expect(cta).toBeTruthy();

    fireEvent.click(cta!);

    expect(interceptor.captures.length).toBe(1);
    assertWhatsAppUrl(interceptor.captures[0].href, "celebration");
  });

  it("clicks ALL WhatsApp CTAs in one pass and confirms total = items + catering + 1", () => {
    renderAndExpand();

    const totalExpected =
      ALA_CARTE_GROUPS.reduce((s, g) => s + g.items.length, 0) +
      CATERING_PACKAGES.length +
      1; // bottom CTA

    // Collect every <a> whose href targets a WhatsApp host
    const allAnchors = Array.from(document.querySelectorAll("a")) as HTMLAnchorElement[];
    const waAnchors = allAnchors.filter(a => {
      try {
        return /(^|\.)wa\.me$|whatsapp\.com$/.test(new URL(a.href).hostname);
      } catch {
        return false;
      }
    });
    expect(waAnchors.length).toBe(totalExpected);

    waAnchors.forEach(a => fireEvent.click(a));
    expect(interceptor.captures.length).toBe(totalExpected);

    // Every captured URL must be a valid WhatsApp link with our number and non-empty text
    interceptor.captures.forEach(cap => {
      const url = new URL(cap.href);
      const phoneInPath = url.pathname.replace(/\D/g, "");
      const phoneInQuery = (url.searchParams.get("phone") || "").replace(/\D/g, "");
      expect([phoneInPath, phoneInQuery]).toContain(WHATSAPP_NUMBER);
      expect((url.searchParams.get("text") || "").length).toBeGreaterThan(0);
    });
  });
});