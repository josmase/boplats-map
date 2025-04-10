import * as cheerio from "cheerio";

async function getApartmentPage(url: URL | RequestInfo) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    return cheerio.load(html);
  } catch (error) {
    console.warn("Unable to get apartment page", error);
  }
}

function getApartmentInfoText($: cheerio.CheerioAPI) {
  return $(".objectinfo p").text();
}

function isInfoTextSayingClosedForApplication(
  apartmentInfoText: string,
): boolean {
  return (apartmentInfoText.includes("ansökningstiden") &&
    apartmentInfoText.includes("stängt")) || (
      apartmentInfoText.includes("application period") &&
      apartmentInfoText.includes("closed")
    );
}

export async function getApplicationStateForApartment(
  url: URL | RequestInfo,
): Promise<"open" | "closed"> {
  const document = await getApartmentPage(url);
  if (!document) {
    throw new Error("Unable to create document for scraping apartment application state: " + url);
  }
  const apartmentInfoText = getApartmentInfoText(document);
  return isInfoTextSayingClosedForApplication(apartmentInfoText)
    ? "closed"
    : "open";
}
