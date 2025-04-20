export function formatDate(dateString: string, locale = "fr") {
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
