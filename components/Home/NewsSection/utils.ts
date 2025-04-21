export function formatDate(dateString: string, locale: string = "fr"): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(
    locale === "fr" ? "fr-FR" : "en-US",
    options
  ).format(date);
}
