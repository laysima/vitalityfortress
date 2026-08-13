import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Contact us | VitalityFortress",
};

function FloatingField({ label, type = "text", area = false }) {
  const fieldClasses =
    "peer w-full border-0 border-b-2 border-black/10 bg-transparent pb-1 text-[17px] text-[#1d2220] outline-none focus:border-[#3498db]";
  const labelClasses =
    "pointer-events-none absolute bottom-1 left-0 text-base text-neutral-500 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-[#3498db] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-sm";

  if (area) {
    return (
      <div className="relative">
        <textarea
          required
          placeholder=" "
          rows={6}
          className={`${fieldClasses} resize-none pt-2`}
        />
        <label className={`${labelClasses} bg-white`}>{label}</label>
      </div>
    );
  }

  return (
    <div className="relative h-10">
      <input
        type={type}
        required
        placeholder=" "
        className={fieldClasses}
      />
      <label className={labelClasses}>{label}</label>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/images/gym.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute top-[5%] left-[5%] z-10">
        <Link href="/">
          <Image
            src="/images/vitalityfortressmv.png"
            alt="VitalityFortress"
            width={160}
            height={70}
            className="h-17.5 w-auto"
          />
        </Link>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-28">
        <div className="w-full max-w-2xl rounded-sm bg-white p-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] sm:p-10">
          <h1 className="mb-8 text-center text-3xl font-semibold text-[#1d2220]">
            Contact us
          </h1>

          <form className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <FloatingField label="First Name" />
              <FloatingField label="Last Name" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <FloatingField label="Email Address" type="email" />
              <FloatingField label="Problem domain" />
            </div>
            <FloatingField label="Write your message" area />

            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-[#1d2220] px-10 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors hover:bg-black"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
