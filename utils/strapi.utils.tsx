import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${BASE_URL}/api`;

export async function getEnsatItemFromStrapi() {
  const url = `${API_URL}/ensats?populate[navItem][on][nav-item.hero][fields][0]=headline&populate[navItem][on][nav-item.hero][fields][1]=subHeading&populate[navItem][on][nav-item.hero][populate][background]=true&populate[localizations][populate]=*`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (_err) {
    throw _err;
  }
}
