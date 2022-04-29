import { useServerContext } from "@/composables/serverjContext";

// https://v3.nuxtjs.org/guide/features/server-routes#example

export default defineEventHandler(async (event) => {
  const { context, query, body } = await useServerContext(event);

  // const config = useRuntimeConfig();

  return {
    type: "api",
    [event.req.method]: event.req.url,
    context,
    query,
    body,
    // config,
  };
});
