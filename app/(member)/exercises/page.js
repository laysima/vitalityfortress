import ExerciseBrowser from "@/components/app/ExerciseBrowser";
import PageHeader from "@/components/app/PageHeader";
import { exercises } from "@/lib/catalog";

export const metadata = { title: "Exercise library" };

export default function ExercisesPage() {
  return (
    <>
      <PageHeader kicker={`${exercises.length} movements`} title="Library" />
      <ExerciseBrowser />
    </>
  );
}
