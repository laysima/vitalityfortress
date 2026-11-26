// Connection check: `npm run db:check`
// Reads .env.local, connects to MongoDB, and reports what works — never prints the password.
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "";
const dbName = process.env.MONGODB_DB || "paingains";
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg, hint) => {
  console.log(`  ✗ ${msg}`);
  if (hint) console.log(`    → ${hint}`);
  process.exit(1);
};

console.log("\nPain&Gains — database check\n");

if (!uri || uri.includes("PASTE_YOUR")) fail("MONGODB_URI is not set in .env.local", "Paste your Atlas connection string on the MONGODB_URI line, keep the quotes, and save.");
if (!/^mongodb(\+srv)?:\/\//.test(uri)) fail("MONGODB_URI doesn't start with mongodb+srv://", "Copy the full string from Atlas → Get connection string.");
// Split credentials from host on the LAST "@" so nothing from the password is ever printed.
const afterScheme = uri.replace(/^mongodb(\+srv)?:\/\//, "");
const at = afterScheme.lastIndexOf("@");
const creds = at === -1 ? "" : afterScheme.slice(0, at);
const host = (at === -1 ? afterScheme : afterScheme.slice(at + 1)).split(/[/?]/)[0];
const user = creds.split(":")[0] || "(none)";
const password = creds.slice(user.length + 1);

if (!creds) fail("No username/password in the string", "It should look like mongodb+srv://paingains-app:PASSWORD@cluster0.xxxxx.mongodb.net/...");
if (/[<>]/.test(user)) fail(`The username is still a placeholder (${user})`, "Replace <db_username> (including the < >) with your Atlas user, e.g. paingains-app.");
if (/[<>]/.test(password)) fail("The password still has < > around it or is a placeholder", "Remove the < and > — only the password itself goes between : and @.");
if (/[@:/?#\[\]]/.test(password)) fail("The password contains a special character (@ : / ? # [ ]) that breaks the string", "Easiest fix: Atlas → Database Users → Edit paingains-app → Autogenerate Secure Password, then paste the new one.");
ok("MONGODB_URI found and well-formed");
console.log(`    user: ${user}   host: ${host}   database: ${dbName}`);

if ((process.env.SESSION_SECRET ?? "").length < 32) fail("SESSION_SECRET is missing or shorter than 32 characters");
ok("SESSION_SECRET found");

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  ok("Connected to the cluster");

  const db = client.db(dbName);
  const probe = db.collection("_connection_check");
  const { insertedId } = await probe.insertOne({ at: new Date() });
  await probe.deleteOne({ _id: insertedId });
  await probe.drop().catch(() => {});
  ok(`Can write to the "${dbName}" database`);

  const names = (await db.listCollections().toArray()).map((c) => c.name);
  const counts = {};
  for (const name of ["users", "workouts", "bookings", "messages"]) {
    counts[name] = names.includes(name) ? await db.collection(name).countDocuments() : 0;
  }
  console.log(`    users: ${counts.users}  workouts: ${counts.workouts}  bookings: ${counts.bookings}  messages: ${counts.messages}`);
  console.log("\nAll good. Start the app with: npm run dev\n");
} catch (error) {
  const msg = String(error?.message ?? error);
  if (/bad auth|authentication failed/i.test(msg)) fail("Atlas rejected the username or password", "Check the password in the string. If it has symbols like @ : / ? #, regenerate it in Atlas (Autogenerate) and paste again.");
  if (/ENOTFOUND|querySrv|ENODATA/i.test(msg)) fail("Couldn't find the cluster host", "The part after @ looks wrong. Copy the string from Atlas again.");
  if (/timed out|Server selection|ECONNREFUSED|whitelist|IP/i.test(msg)) fail("Couldn't reach the cluster (timed out)", "Your current IP probably isn't allowed. Atlas → Database & Network Access → IP Access List → Add Current IP Address.");
  fail(`Connection failed: ${msg.split(uri).join("***").split(password || "\u0000").join("***")}`);
} finally {
  await client.close().catch(() => {});
}
