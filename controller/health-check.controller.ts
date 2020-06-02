import { Context } from "https://deno.land/x/oak/mod.ts";

export default async (contx: Context) => {
  contx.response.status = 200;
  contx.response.body = { status: "pass" };
};
