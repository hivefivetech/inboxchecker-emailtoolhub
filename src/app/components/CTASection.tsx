export default function CTASection() {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-6">
            <div className="max-w-5xl mx-auto text-center space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                    Ready to Improve Your <span className="text-yellow-400">Email Deliverability?</span>
                </h2>
                <p className="text-lg sm:text-xl font-light">
                    Download our powerful tool to ensure your emails always land in the <span className="font-semibold">right place</span>.
                </p>
                <button className="px-8 py-4 bg-yellow-400 text-indigo-900 font-semibold rounded-full shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105">
                    Download JetStream Mailer Now
                </button>
            </div>
        </section>
    );
}
