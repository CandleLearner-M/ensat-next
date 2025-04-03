import { StructuredEnsatPage } from "@/types/strapi";
import { transformEnsatData } from "./strapi-utils";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${BASE_URL}/api`;

export async function getEnsatItemFromStrapi(): Promise<StructuredEnsatPage[]> {
  const url = `${API_URL}/ensats?populate[localizations][populate][pageComponents][populate]=*&populate[pageComponents][populate]=*`;
  try {
    const res = await axios.get(url);
    return transformEnsatData(res.data);
  } catch (_err) {
    throw _err;
  }
}
