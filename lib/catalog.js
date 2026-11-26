// Static training catalog. Member-specific data (workouts, bookings) lives in MongoDB;
// this content ships with the app so it can render on the server and the client.

export const MUSCLE_GROUPS = ["Legs", "Back", "Chest", "Shoulders", "Arms", "Core", "Full body", "Conditioning"];

export const exercises = [
  { slug: "back-squat", name: "Back Squat", group: "Legs", equipment: "Barbell", level: "Intermediate", tracksWeight: true,
    summary: "The foundational lower-body lift. Builds quads, glutes and a strong trunk.",
    cues: ["Brace before you descend: big breath, ribs down", "Knees track over the middle of the foot", "Drive the floor away and stand tall"] },
  { slug: "front-squat", name: "Front Squat", group: "Legs", equipment: "Barbell", level: "Advanced", tracksWeight: true,
    summary: "A more upright squat that loads the quads and upper back.",
    cues: ["Elbows high, bar resting on the shoulders", "Sit straight down between the hips", "Keep the chest proud on the way up"] },
  { slug: "goblet-squat", name: "Goblet Squat", group: "Legs", equipment: "Dumbbell", level: "Beginner", tracksWeight: true,
    summary: "The best way to learn the squat. Holding the weight in front keeps you upright.",
    cues: ["Hold the bell at the chest, elbows in", "Push the knees out at the bottom", "Pause for a beat, then stand"] },
  { slug: "romanian-deadlift", name: "Romanian Deadlift", group: "Legs", equipment: "Barbell", level: "Intermediate", tracksWeight: true,
    summary: "Hinge pattern for hamstrings and glutes with a long, controlled stretch.",
    cues: ["Soft knees, push the hips back", "Bar stays close to the thighs", "Stop when the hips stop moving back"] },
  { slug: "walking-lunge", name: "Walking Lunge", group: "Legs", equipment: "Dumbbell", level: "Beginner", tracksWeight: true,
    summary: "Single-leg strength and balance. Exposes left-to-right differences.",
    cues: ["Long step, back knee kisses the floor", "Front shin stays roughly vertical", "Push through the front heel"] },
  { slug: "deadlift", name: "Deadlift", group: "Back", equipment: "Barbell", level: "Intermediate", tracksWeight: true,
    summary: "Picks heavy things up from the floor. Trains the entire posterior chain.",
    cues: ["Bar over mid-foot, shins touch the bar", "Pull the slack out before the bar leaves the floor", "Hips and shoulders rise together"] },
  { slug: "pull-up", name: "Pull-up", group: "Back", equipment: "Bodyweight", level: "Intermediate", tracksWeight: false,
    summary: "The benchmark upper-body pull. Lats, grip and trunk control.",
    cues: ["Start from a dead hang, shoulders engaged", "Drive the elbows down to the ribs", "Chin clears the bar without craning"] },
  { slug: "barbell-row", name: "Barbell Row", group: "Back", equipment: "Barbell", level: "Intermediate", tracksWeight: true,
    summary: "Horizontal pull that builds a thick upper back.",
    cues: ["Hinge to about 45°, back flat", "Row the bar to the lower ribs", "Control it down, no bouncing"] },
  { slug: "single-arm-db-row", name: "Single-arm Dumbbell Row", group: "Back", equipment: "Dumbbell", level: "Beginner", tracksWeight: true,
    summary: "Unilateral row with a big range of motion. Easy to load and learn.",
    cues: ["Support hand under the shoulder", "Pull the elbow toward the hip", "Keep the hips square to the floor"] },
  { slug: "lat-pulldown", name: "Lat Pulldown", group: "Back", equipment: "Machine", level: "Beginner", tracksWeight: true,
    summary: "Scalable vertical pull that builds toward the pull-up.",
    cues: ["Lean back slightly, chest up", "Pull the bar to the collarbone", "Let the arms fully straighten at the top"] },
  { slug: "bench-press", name: "Bench Press", group: "Chest", equipment: "Barbell", level: "Intermediate", tracksWeight: true,
    summary: "The classic upper-body press for chest, shoulders and triceps.",
    cues: ["Shoulder blades pinned, feet planted", "Lower to the mid-chest with control", "Press up and slightly back"] },
  { slug: "incline-db-press", name: "Incline Dumbbell Press", group: "Chest", equipment: "Dumbbell", level: "Beginner", tracksWeight: true,
    summary: "Upper-chest emphasis with a freer path than the barbell.",
    cues: ["Bench at 30°, not steeper", "Elbows about 45° from the body", "Bells finish over the shoulders"] },
  { slug: "push-up", name: "Push-up", group: "Chest", equipment: "Bodyweight", level: "Beginner", tracksWeight: false,
    summary: "A moving plank. Trains pressing strength and trunk stiffness together.",
    cues: ["Body in one straight line", "Hands just outside the shoulders", "Chest touches first, not the hips"] },
  { slug: "overhead-press", name: "Overhead Press", group: "Shoulders", equipment: "Barbell", level: "Intermediate", tracksWeight: true,
    summary: "Standing strict press. Shoulders, triceps and a braced core.",
    cues: ["Squeeze glutes, ribs down", "Move the head back, then through", "Lock out with the bar over mid-foot"] },
  { slug: "lateral-raise", name: "Lateral Raise", group: "Shoulders", equipment: "Dumbbell", level: "Beginner", tracksWeight: true,
    summary: "Isolation for the side delts. Light weight, strict reps.",
    cues: ["Slight bend in the elbows", "Lead with the elbows, not the hands", "Stop at shoulder height"] },
  { slug: "db-curl", name: "Dumbbell Curl", group: "Arms", equipment: "Dumbbell", level: "Beginner", tracksWeight: true,
    summary: "Simple biceps work. Control beats momentum.",
    cues: ["Elbows pinned to the sides", "Turn the palms up as you curl", "Three-second lower"] },
  { slug: "cable-pushdown", name: "Cable Pushdown", group: "Arms", equipment: "Machine", level: "Beginner", tracksWeight: true,
    summary: "Triceps isolation with constant tension.",
    cues: ["Elbows stay by the ribs", "Spread the rope at the bottom", "Full lockout every rep"] },
  { slug: "plank", name: "Plank", group: "Core", equipment: "Bodyweight", level: "Beginner", tracksWeight: false,
    summary: "Anti-extension hold. Log seconds as reps.",
    cues: ["Elbows under shoulders", "Squeeze glutes and quads", "Breathe without letting the hips sag"] },
  { slug: "hanging-knee-raise", name: "Hanging Knee Raise", group: "Core", equipment: "Bodyweight", level: "Intermediate", tracksWeight: false,
    summary: "Builds the lower abs and grip in one move.",
    cues: ["Start still, no swinging", "Curl the pelvis up, not just the knees", "Lower slowly"] },
  { slug: "kettlebell-swing", name: "Kettlebell Swing", group: "Full body", equipment: "Kettlebell", level: "Intermediate", tracksWeight: true,
    summary: "Explosive hip hinge. Power and conditioning at once.",
    cues: ["Hike the bell back like a football", "Snap the hips, the arms just guide", "Float the bell to chest height"] },
  { slug: "farmers-carry", name: "Farmer's Carry", group: "Full body", equipment: "Dumbbell", level: "Beginner", tracksWeight: true,
    summary: "Walk with heavy weights. Grip, posture and work capacity. Log metres as reps.",
    cues: ["Stand tall, shoulders packed", "Short, quick steps", "Do not let the bells touch the legs"] },
  { slug: "rower-intervals", name: "Rower Intervals", group: "Conditioning", equipment: "Machine", level: "Beginner", tracksWeight: false,
    summary: "Low-impact engine work. Log calories as reps.",
    cues: ["Legs, then body, then arms", "Return in reverse order", "Keep the stroke rate steady"] },
  { slug: "assault-bike", name: "Air Bike Sprints", group: "Conditioning", equipment: "Machine", level: "Intermediate", tracksWeight: false,
    summary: "Short, brutal efforts that raise your ceiling. Log calories as reps.",
    cues: ["Push and pull with the arms", "Stay seated and tall", "Go all-out, then fully recover"] },
  { slug: "box-jump", name: "Box Jump", group: "Conditioning", equipment: "Box", level: "Intermediate", tracksWeight: false,
    summary: "Lower-body power with a soft landing.",
    cues: ["Swing the arms to load the jump", "Land softly in a quarter squat", "Step down, do not jump down"] },
];

export const exerciseBySlug = Object.fromEntries(exercises.map((e) => [e.slug, e]));

// Start and end position photos for each exercise (public/images/exercises, see CREDITS.md there).
export function demoFrames(slug) {
  return [`/images/exercises/${slug}-0.jpg`, `/images/exercises/${slug}-1.jpg`];
}

export const programs = [
  {
    slug: "foundations",
    name: "Foundations",
    level: "Beginner",
    weeks: 6,
    daysPerWeek: 3,
    image: "/images/gym-dumbbells.jpg",
    tagline: "Learn the lifts. Build the habit.",
    description:
      "Three full-body sessions a week that teach the core movement patterns: squat, hinge, push, pull and carry. Start light, add a little each week and finish with real strength.",
    days: [
      { name: "Day A — Squat & push", exercises: [
        { slug: "goblet-squat", sets: 3, reps: 10, rest: 90 },
        { slug: "push-up", sets: 3, reps: 10, rest: 60 },
        { slug: "single-arm-db-row", sets: 3, reps: 10, rest: 60 },
        { slug: "plank", sets: 3, reps: 30, rest: 45 },
      ] },
      { name: "Day B — Hinge & pull", exercises: [
        { slug: "romanian-deadlift", sets: 3, reps: 10, rest: 90 },
        { slug: "lat-pulldown", sets: 3, reps: 10, rest: 60 },
        { slug: "incline-db-press", sets: 3, reps: 10, rest: 60 },
        { slug: "farmers-carry", sets: 3, reps: 40, rest: 60 },
      ] },
      { name: "Day C — Single leg & engine", exercises: [
        { slug: "walking-lunge", sets: 3, reps: 12, rest: 75 },
        { slug: "kettlebell-swing", sets: 4, reps: 15, rest: 60 },
        { slug: "lateral-raise", sets: 3, reps: 12, rest: 45 },
        { slug: "rower-intervals", sets: 5, reps: 12, rest: 60 },
      ] },
    ],
  },
  {
    slug: "base-strength",
    name: "Base Strength",
    level: "Intermediate",
    weeks: 8,
    daysPerWeek: 3,
    image: "/images/about-strength.jpg",
    tagline: "Five heavy sets. Add weight every week.",
    description:
      "A classic barbell program built on the squat, bench, deadlift and press. Low reps, long rests and steady progression. Simple to run and hard to argue with.",
    days: [
      { name: "Day A — Squat & bench", exercises: [
        { slug: "back-squat", sets: 5, reps: 5, rest: 180 },
        { slug: "bench-press", sets: 5, reps: 5, rest: 180 },
        { slug: "barbell-row", sets: 3, reps: 8, rest: 120 },
      ] },
      { name: "Day B — Squat & press", exercises: [
        { slug: "back-squat", sets: 5, reps: 5, rest: 180 },
        { slug: "overhead-press", sets: 5, reps: 5, rest: 150 },
        { slug: "deadlift", sets: 1, reps: 5, rest: 180 },
        { slug: "pull-up", sets: 3, reps: 6, rest: 120 },
      ] },
      { name: "Day C — Volume", exercises: [
        { slug: "front-squat", sets: 3, reps: 6, rest: 150 },
        { slug: "bench-press", sets: 3, reps: 8, rest: 120 },
        { slug: "romanian-deadlift", sets: 3, reps: 8, rest: 120 },
        { slug: "hanging-knee-raise", sets: 3, reps: 10, rest: 60 },
      ] },
    ],
  },
  {
    slug: "build-split",
    name: "Build Split",
    level: "Intermediate",
    weeks: 8,
    daysPerWeek: 4,
    image: "/images/kettlebell-training.jpg",
    tagline: "Upper, lower, repeat. Built for muscle.",
    description:
      "Four sessions a week alternating upper and lower body. Moderate weights, more sets and a focus on slow, controlled reps close to failure.",
    days: [
      { name: "Upper 1", exercises: [
        { slug: "bench-press", sets: 4, reps: 8, rest: 120 },
        { slug: "barbell-row", sets: 4, reps: 8, rest: 120 },
        { slug: "overhead-press", sets: 3, reps: 10, rest: 90 },
        { slug: "db-curl", sets: 3, reps: 12, rest: 60 },
      ] },
      { name: "Lower 1", exercises: [
        { slug: "back-squat", sets: 4, reps: 8, rest: 150 },
        { slug: "romanian-deadlift", sets: 3, reps: 10, rest: 120 },
        { slug: "walking-lunge", sets: 3, reps: 12, rest: 90 },
        { slug: "plank", sets: 3, reps: 45, rest: 45 },
      ] },
      { name: "Upper 2", exercises: [
        { slug: "incline-db-press", sets: 4, reps: 10, rest: 90 },
        { slug: "pull-up", sets: 4, reps: 8, rest: 120 },
        { slug: "lateral-raise", sets: 4, reps: 15, rest: 45 },
        { slug: "cable-pushdown", sets: 3, reps: 12, rest: 60 },
      ] },
      { name: "Lower 2", exercises: [
        { slug: "deadlift", sets: 3, reps: 5, rest: 180 },
        { slug: "front-squat", sets: 3, reps: 8, rest: 150 },
        { slug: "farmers-carry", sets: 3, reps: 40, rest: 60 },
        { slug: "hanging-knee-raise", sets: 3, reps: 12, rest: 60 },
      ] },
    ],
  },
  {
    slug: "engine",
    name: "Engine",
    level: "All levels",
    weeks: 4,
    daysPerWeek: 3,
    image: "/images/hero-training.jpg",
    tagline: "Conditioning that carries over.",
    description:
      "Short, structured conditioning blocks that pair well with any strength plan. Intervals on the rower and bike, swings and carries. Scale every effort to you.",
    days: [
      { name: "Intervals", exercises: [
        { slug: "rower-intervals", sets: 8, reps: 15, rest: 60 },
        { slug: "kettlebell-swing", sets: 4, reps: 20, rest: 60 },
      ] },
      { name: "Power", exercises: [
        { slug: "box-jump", sets: 5, reps: 5, rest: 90 },
        { slug: "assault-bike", sets: 6, reps: 12, rest: 90 },
        { slug: "farmers-carry", sets: 4, reps: 40, rest: 60 },
      ] },
      { name: "Grind", exercises: [
        { slug: "walking-lunge", sets: 4, reps: 20, rest: 60 },
        { slug: "push-up", sets: 4, reps: 15, rest: 45 },
        { slug: "rower-intervals", sets: 4, reps: 25, rest: 90 },
      ] },
    ],
  },
];

export const programBySlug = Object.fromEntries(programs.map((p) => [p.slug, p]));

export const coaches = [
  { slug: "mara", name: "Mara Cole", role: "Strength & power", image: "/images/coach-airam.jpg",
    bio: "Former national-level powerlifter. Mara coaches the barbell lifts with patience and precision." },
  { slug: "noah", name: "Noah James", role: "Boxing & conditioning", image: "/images/coach-thomas.jpg",
    bio: "Ten years in the ring. Noah's classes are sharp, technical and leave nothing in the tank." },
  { slug: "talia", name: "Talia Reed", role: "Mobility & performance", image: "/images/coach-joshua.jpg",
    bio: "Talia blends strength work with mobility so you move better the stronger you get." },
  { slug: "eli", name: "Eli Mercer", role: "Olympic lifting", image: "/images/about-strength.jpg",
    bio: "Eli teaches the snatch and clean & jerk from the ground up, one clean position at a time." },
];

export const coachBySlug = Object.fromEntries(coaches.map((c) => [c.slug, c]));

// Recurring weekly timetable. weekday: 0 = Monday … 6 = Sunday. time in 24h club-local time.
export const classTemplates = [
  { id: "mon-0630-strength", weekday: 0, time: "06:30", minutes: 60, title: "Barbell Strength", coach: "mara", capacity: 12, level: "Intermediate", room: "Platform" },
  { id: "mon-1215-engine", weekday: 0, time: "12:15", minutes: 45, title: "Engine 45", coach: "noah", capacity: 16, level: "All levels", room: "Turf" },
  { id: "mon-1830-mobility", weekday: 0, time: "18:30", minutes: 50, title: "Mobility Flow", coach: "talia", capacity: 14, level: "All levels", room: "Studio" },
  { id: "tue-0630-boxing", weekday: 1, time: "06:30", minutes: 50, title: "Boxing Fundamentals", coach: "noah", capacity: 14, level: "Beginner", room: "Turf" },
  { id: "tue-1800-oly", weekday: 1, time: "18:00", minutes: 75, title: "Olympic Lifting", coach: "eli", capacity: 8, level: "Advanced", room: "Platform" },
  { id: "wed-0630-strength", weekday: 2, time: "06:30", minutes: 60, title: "Barbell Strength", coach: "mara", capacity: 12, level: "Intermediate", room: "Platform" },
  { id: "wed-1215-core", weekday: 2, time: "12:15", minutes: 30, title: "Core 30", coach: "talia", capacity: 16, level: "All levels", room: "Studio" },
  { id: "wed-1900-engine", weekday: 2, time: "19:00", minutes: 45, title: "Engine 45", coach: "noah", capacity: 16, level: "All levels", room: "Turf" },
  { id: "thu-0630-mobility", weekday: 3, time: "06:30", minutes: 50, title: "Mobility Flow", coach: "talia", capacity: 14, level: "All levels", room: "Studio" },
  { id: "thu-1800-foundations", weekday: 3, time: "18:00", minutes: 60, title: "Lifting Foundations", coach: "mara", capacity: 10, level: "Beginner", room: "Platform" },
  { id: "fri-0630-boxing", weekday: 4, time: "06:30", minutes: 50, title: "Boxing Conditioning", coach: "noah", capacity: 14, level: "Intermediate", room: "Turf" },
  { id: "fri-1730-oly", weekday: 4, time: "17:30", minutes: 75, title: "Olympic Lifting", coach: "eli", capacity: 8, level: "Advanced", room: "Platform" },
  { id: "sat-0900-team", weekday: 5, time: "09:00", minutes: 60, title: "Saturday Team WOD", coach: "noah", capacity: 20, level: "All levels", room: "Turf" },
  { id: "sat-1030-strength", weekday: 5, time: "10:30", minutes: 60, title: "Open Strength", coach: "mara", capacity: 12, level: "All levels", room: "Platform" },
  { id: "sun-1000-mobility", weekday: 6, time: "10:00", minutes: 60, title: "Long Mobility", coach: "talia", capacity: 14, level: "All levels", room: "Studio" },
];

export const classTemplateById = Object.fromEntries(classTemplates.map((c) => [c.id, c]));
