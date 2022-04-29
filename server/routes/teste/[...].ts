import { useServerContext } from "@/composables/serverContext";

// https://v3.nuxtjs.org/guide/features/server-routes#server-routes-1

export default defineEventHandler(async (event) => {
  const { context, query, body } = await useServerContext(event);

  // const config = useRuntimeConfig();

  return {
    type: "route",
    [event.req.method]: event.req.url,
    context,
    query,
    body,
    // config
  };
});
