import Link from "next/link";

// Main component for the "Learn More" page. 
export default function learnMore() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 sm:p-20">
            {/* Header Section */}
            <header className="flex justify-between items-center w-full py-6 px-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20">
                <h1 className="text-4xl font-extrabold text-center text-white">Learn more about Better Picks</h1>
            </header>
            {/* Main Content */}
            <main className="flex flex-col gap-8 items-center sm:items-start mt-16 flex-grow">
                {/* Section: Our Purpose */}
                <section>
                    <h2 className="text-3xl font-bold text-purple-200"> Our Purpose</h2>
                    <p className="text-lg sm:text-xl text-gray-300">
                        Better Picks was created to give sports bettors a data-driven edge in making informed decisions. By leveraging cutting-edge analytics and AI technology, our tool provides you with real-time game insights, trends, and predictions to maximize your chances of success. 
                    </p>
                </section>

                {/* Section: Our Vision */}
                <section> 
                    <h2 className="text-3xl font-bold text-purple-200"> Our Vision</h2>
                    <p className="text-lg sm:text-xl text-gray-300">
                        Our vision is to revolutionize sports betting by making advanced insights accessible to everyone. Whether you're a casual bettor or a seasoned pro, Better Picks empowers you with the knowledge you need to make smarter, more confident betting decisions.
                    </p>
                </section>
                {/* Section: Why Choose Us?*/}
                <section>
                    <h2 className="text-3xl font-bold text-purple-200"> Why choose us?</h2>
                    <ul className="list-disc pl-5 text-lg sm:text-xl text-gray-300">
                        <li> AI-driven analytics that provide predicitive insights</li>
                        <li> Real-time data on NBA, NFL, and other sports</li>
                        <li> Expert betting tips and trends</li>
                        <li> Easy-to-use interface with interactive tools</li>

                    </ul>
                    </section>
                    {/* Section: Our Commitment */}
                    <section> 
                        <h2 className="text-3xl font-bold text-purple-200"> Our Commitment</h2>
                        <p className="text-lg sm:text-xl text-gray-300">
                        We're committed to providing the most accurate and up-to-date sports data, combined with actionable insights. Our goal is to help you make smarter betting decisions, based on a solid foundation of statistics, trends, and expert advice.

                        </p>
                    </section>

                    {/* Section: Get Started */}
                    <section className="text-center">
                        <a
                        href="/register"
                        className="jsx-7dd05aa38b830a2d rounded-full border border-transparent transition-all transform hover:scale-105 flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold gap-2 text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10 shadow-md hover:shadow-xl"
                        >
                        Get Started
                    </a>

                    {/* Link back to home */}
                    <Link 
                        href="/"
                        className="rounded-full border border-transparent transition-all transform hover:scale-105 flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold gap-2 text-lg sm:text-xl h-12 sm:h-14 px-8 sm:px-10 shadow-md hover:shadow-xl"
                    >

                        Back to home
                    </Link>
                    </section>


            </main>

            {/* Footer */}

                <footer className="flex gap-8 flex-wrap items-center justify-center text-gray-300 text-base mt-auto py-6">
                    <a className="hover:text-green-400 transition-colors" href="/features">Features</a>
                    <a className="hover:text-green-400 transition-colors" href="/Pricing">Pricing</a>
                    <a className="hover:text-green-400 transition-colors" href="/Contact Us">Contact Us</a>
                </footer>
            </div>
    );
}