import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedback  from "./feedbacks.js"
import * as courseController from "./courseController.js"

const app = new Hono();

app.get("/", async (c) => await feedback.returnFeedback(c));
app.get("/courses/:courseId/feedbacks/:i", async (c) => await feedback.getFeedback(c));
app.post("/courses/:courseId/feedbacks/:i", async (c) => await feedback.increaseFeedbackCount(c));
app.get("/courses", async (c) => await courseController.listCourses(c));
app.post("/courses", async (c) => await courseController.addCourse(c));
app.get("/courses/:courseId", async (c) => await courseController.getSingleCourse(c));
app.post("/courses/:courseId/delete", async (c) => await courseController.deleteCourse(c));

export default app;
