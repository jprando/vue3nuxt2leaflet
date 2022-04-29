import { useServerContext } from "@/composables/serverContext";

const inDevMode = process.env.NODE_ENV !== "production";

// https://v3.nuxtjs.org/guide/features/server-routes#server-middleware
// Middleware handlers should not return anything
// (nor close or respond to the request)
// and only inspect or extend the request context or throw an error.

const stringify = (context, value) =>
  value !== undefined && `${context} ${JSON.stringify(value)}`;

export default defineEventHandler(async (event) => {
  if (inDevMode) {
    const { context, query, body } = await useServerContext(event);

    console.info(
      "[LOG]",
      event.req.method,
      `"${event.req.url}"`,
      ...Object.entries({ context, query, body })
        .map((i) => stringify(...i))
        .filter(Boolean)
    );
  }
});
