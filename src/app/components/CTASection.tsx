export default function CTASection() {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-6">
            <div className="max-w-5xl mx-auto text-center space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                    <span className="text-yellow-400">Jetstream Mailer:</span> 90% Inbox Success, Bulk Mailing Made Effortless!
                </h2>
                <p className="text-lg sm:text-xl font-light">
                    JetStream Mailer is now available for purchase. Click the <span className="font-semibold">Buy</span> button below to get it now!
                </p>
                <button className="px-8 py-4 bg-yellow-400 text-indigo-900 font-semibold rounded-full shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105">
                    <a href="https://t.me/ZplusMan" target="_blank">
                        Buy JetStream Mailer Now
                    </a>
                </button>
            </div>
        </section>
    );
}
