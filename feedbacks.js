import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const getFeedbackCount = async (c) => {
    const courseId = c.req.param("courseId");
    const i = c.req.param("i");
    const kv = await Deno.openKv();
    const count = await kv.get(["feedback", courseId, i]);
    return count.value ?? 0
}

const setFeedbackCount = async (c, count) => {
    const courseId = c.req.param("courseId");
    const i = c.req.param("i");
    const kv = await Deno.openKv();
    await kv.set(["feedback", courseId, i], count);
}
const increaseFeedbackCount = async (c) => {
    const courseId = c.req.param("courseId");
    let count = await getFeedbackCount(c);
    count++;
    await setFeedbackCount(c, count);
    return c.redirect(`/courses/${courseId}`);
}

const returnFeedback = async (c) => await c.html(eta.render("index.eta"));

const getFeedback = async (c) => {
    const count = await getFeedbackCount(c);
    return c.text(`Feedback ${c.req.param("i")}: ${count}`);
}

export {returnFeedback, getFeedback, increaseFeedbackCount}