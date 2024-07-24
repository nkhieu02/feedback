import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as courseService from "./courseService.js"

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const addCourse = async (c) => {
    const body = await c.req.parseBody();
    await courseService.createCourse(body);
    return await c.redirect("/courses");
};

const listCourses = async (c) => {
    const courses = await courseService.listCourses();
    return await c.html(eta.render("courses.eta", {courses: courses}));
};

const getSingleCourse = async (c) => {
    const courseId = c.req.param("courseId");
    const course = await courseService.getCourse(courseId);
    return await c.html(eta.render("course.eta", {course: course}));
};

const deleteCourse = async (c) => {
    const courseId = c.req.param("courseId");
    await courseService.deleteCourse(courseId);
    return c.redirect("/courses");
};

export {listCourses, addCourse, getSingleCourse, deleteCourse}