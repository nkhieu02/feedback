const createCourse = async (course) => {
    course.courseId = crypto.randomUUID();
  
    const kv = await Deno.openKv();
    await kv.set(["courses", course.courseId], course);
  };

const listCourses = async () => {
    const kv = await Deno.openKv();
    const courseEntries = kv.list({ prefix: ["courses"] });

    const courses = [];

    for await (const course of courseEntries) {
        courses.push(course.value);
    }

    return courses;
};

const getCourse = async (courseId) => {
    const kv = await Deno.openKv();
    const course = await kv.get(["courses", courseId]);
    return course?.value ?? {}
};

const deleteCourse = async (courseId) => {
    const kv = await Deno.openKv();
    await kv.delete(["courses", courseId]);
};

export {createCourse, listCourses, getCourse, deleteCourse}