import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">Home</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link className="hover:text-cyan-300" to="/guideline">Guidelines</Link></li>
            <li><Link className="hover:text-cyan-300" to="/contact">Explore</Link></li>
            <li><Link className="hover:text-cyan-300" to="/contact">About</Link></li>
            <li><Link className="hover:text-cyan-300" to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-white">Participants</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link className="hover:text-cyan-300" to="/guideline">Instructions</Link></li>
            <li><Link className="hover:text-cyan-300" to="/guideline">How to Apply</Link></li>
            <li><a className="hover:text-cyan-300" href="/Result/PPL-Teams.pdf" target="_blank" rel="noreferrer">Result</a></li>
            <li><a className="hover:text-cyan-300" href="/#faq">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-white">Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>SISTec-R Ratibad Campus, Bhopal, 462003</p>
            <p>+91 7879261234</p>
            <a className="hover:text-cyan-300" href="mailto:sistec@codechamp.com">sistec@codechamp.com</a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-white">Follow Us</h3>
          <div className="mt-4 flex items-center gap-3 text-slate-200">
            <a className="rounded-full border border-slate-700 p-2 transition hover:border-indigo-400 hover:text-indigo-300" href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a className="rounded-full border border-slate-700 p-2 transition hover:border-indigo-400 hover:text-indigo-300" href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a className="rounded-full border border-slate-700 p-2 transition hover:border-indigo-400 hover:text-indigo-300" href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a className="rounded-full border border-slate-700 p-2 transition hover:border-indigo-400 hover:text-indigo-300" href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
