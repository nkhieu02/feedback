import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import {getFeedbackCount, increaseFeedbackCount} from "./feedbacks.js"

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const app = new Hono();

app.get("/", async (c) => {
  return await c.html(eta.render("index.eta"));
});

app.get("/feedbacks/:i", async (c) => {
  const count = await getFeedbackCount(c.req.param("i"));
  return c.text(`Feedback ${c.req.param("i")}: ${count}`);
})

app.post("/feedbacks/:i", async (c) => {
  await increaseFeedbackCount(c.req.param("i"));
  return c.redirect("/");
})
export default app;
