import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="bg-bg px-4 pt-16 pb-8">
      <div className="mx-auto grid max-w-5xl grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-8">
        <div>
          <a href="#" className="text-lg font-semibold text-accent">
            VitalityFortress
          </a>
          <span className="mt-1 mb-6 block text-sm text-muted">fitness</span>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="text-2xl text-title">
              <BiLogoFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="text-2xl text-title">
              <BiLogoInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="text-2xl text-title">
              <BiLogoTwitter />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl text-title">Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-fg transition-colors hover:text-accent">
                Workout Programs
              </a>
            </li>
            <li>
              <a href="#" className="text-fg transition-colors hover:text-accent">
                Exercise Demonstrations
              </a>
            </li>
            <li>
              <a href="#" className="text-fg transition-colors hover:text-accent">
                Class Reservations
              </a>
            </li>
            <li>
              <a href="#" className="text-fg transition-colors hover:text-accent">
                Nutrition Guidance
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl text-title">Information</h3>
          <ul className="space-y-2">
            <li>
              <a href="/contact" className="text-fg transition-colors hover:text-accent">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="text-fg transition-colors hover:text-accent">
                Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-fg transition-colors hover:text-accent">
                Terms of conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-fg transition-colors hover:text-accent">
                Events
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl text-title">Address</h3>
          <ul className="space-y-2 text-fg">
            <li>Planners Avenue</li>
            <li>New port 876</li>
            <li>0262692988</li>
            <li>fitnessfortress@email.com</li>
          </ul>
        </div>
      </div>

      <p className="mt-14 text-center text-sm text-muted">
        &#169; {new Date().getFullYear()} VitalityFortress. All rights reserved
      </p>
    </footer>
  );
}
