const getFeedbackCount = async (i) => {
    const kv = await Deno.openKv();
    const count = await kv.get(["feedback", i]);
    console.log(count);
    return count.value ?? 0;
}

const setFeedbackCount = async (i, count) => {
    const kv = await Deno.openKv();
    await kv.set(["feedback", i], count);
}
const increaseFeedbackCount = async (i) => {
    let count = await getFeedbackCount(i);
    count++;
    console.log(count);
    await setFeedbackCount(i, count);
}

export {getFeedbackCount, increaseFeedbackCount}