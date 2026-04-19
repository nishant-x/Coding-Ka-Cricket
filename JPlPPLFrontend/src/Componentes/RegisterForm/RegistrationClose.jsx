const RegistrationClosed = () => {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-8">
      <section className="w-full rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-soft">
        <svg className="mx-auto h-14 w-14 text-cyan-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          <path d="M16.59 7.58 10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
        </svg>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">Registration Closed</h1>
        <p className="mt-2 text-slate-300">We&apos;re sorry, but registration for this event has now closed.</p>
        <p className="mt-2 text-sm text-slate-400">
          For inquiries, contact us at <a href="mailto:info@example.com" className="text-cyan-300 hover:underline">info@example.com</a>
        </p>
      </section>
    </main>
  );
};

export default RegistrationClosed;
