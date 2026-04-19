import { useEffect, useState } from "react";
import IntroText from "./Introduction/IntroText.jsx";
import ProcessFlow from "./ProcessFlow/ProcessFlow.jsx";
import ProfileCard from "./Card/ProfileCard.jsx";
import Faq from "./Faq/Faq.jsx";
import Mainpage from "./mainpage/Mainpage.jsx";
import DeveloperSlider from "./DeveloperCards/DeveloperCards.jsx";
import Cursor from "./Cursor/Cursor";

const UrgentAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const pdfUrl = "/Result/PPL-Teams.pdf";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(pdfUrl, { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "PPL-Result.pdf";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      window.open(pdfUrl, "_blank");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mx-auto mb-6 flex max-w-7xl flex-col gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-display text-lg font-semibold text-red-100">Urgent: Python Premier League results are out now</h2>
      <div className="flex gap-3">
        <button onClick={handleDownload} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400">Download Result</button>
        <button onClick={() => setIsVisible(false)} className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-400">Close</button>
      </div>
    </div>
  );
};

const Homepage = () => {
  return (
    <>
      <Cursor />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* <UrgentAlert /> */}
        <Mainpage />
        <IntroText />
        <ProcessFlow />
        <Faq />
        <ProfileCard />
        <DeveloperSlider />
      </main>
    </>
  );
};

export default Homepage;
