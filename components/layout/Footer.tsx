import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <Image
            src="/logo/dark.jpeg"
            alt="JosBong"
            width={192}
            height={126}
            className="h-24 w-auto mx-auto md:mx-0"
          />
          <p className="mt-4 text-sm text-gray-400 max-w-sm">
            Ideation, Research, Analysis, and Consultancy - for Businesses and Academics.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Contact
          </h3>
          <a
            href="mailto:hello@josbong.com"
            className="mt-4 flex items-center justify-center gap-2 text-sm hover:text-orange transition-colors md:justify-start"
          >
            <Mail size={16} />
            hello@josbong.com
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400 md:text-left">
          © {new Date().getFullYear()} JosBong. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
