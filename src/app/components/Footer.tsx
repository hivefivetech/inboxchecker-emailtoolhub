export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-700 text-gray-200 py-10">
            <div className="max-w-6xl mx-auto px-6 space-y-6 text-center">
                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">JetStream Mailer</h3>
                    <p className="text-sm">
                        Your trusted tool for improving email deliverability and ensuring your campaigns land where they matter.
                    </p>
                </div>
                <div className="flex justify-center space-x-6">
                    <a
                        href="https://t.me/ZplusMan"
                        className="text-gray-400 hover:text-blue-500 transition"
                        aria-label="Telegram"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path d="M22.679 0c.535.019.971.472.92 1.005-.004.049-.01.099-.016.15l-3.356 20.8c-.079.47-.425.84-.869.96a1.046 1.046 0 0 1-.426.02c-.097-.01-.195-.031-.292-.062l-5.694-1.912-2.785 2.877c-.01.011-.021.021-.033.031a1.003 1.003 0 0 1-.63.247.982.982 0 0 1-.564-.176.98.98 0 0 1-.36-.564L8.61 15.99 2.25 14.234c-.533-.162-.897-.674-.83-1.232.03-.253.148-.491.337-.667.082-.074.17-.14.262-.198.13-.074.267-.14.413-.191l19-7.4c.493-.193 1.051-.034 1.37.387.177.245.247.554.197.855-.005.041-.013.081-.021.121l-6.054 16.049 1.496.504 3.007-18.564-17.552 6.832 3.888 1.06 12.44-11.984c.066-.063.142-.115.225-.155z" />
                        </svg>
                    </a>
                </div>
                <p className="text-sm">
                    &copy; 2024 InboxChecker. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
