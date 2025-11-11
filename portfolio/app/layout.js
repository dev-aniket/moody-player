import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer';
import ScrollToTop from './components/helper/scroll-to-top';
import Navbar from './components/navbar';
import './css/card.scss';
import './css/globals.scss';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'dev-aniket',
  description:
    "I’m Aniket Mallick, a dynamic Software Engineer with an M.Tech. in ECE from NIT Raipur (2025). As an SDE Intern at ITJOBXS, I built impactful solutions like a responsive eCommerce platform and a bot-detection system, boosting engagement by 30% and cutting spam by 70%. Proficient in React, Redux, Node.js, and DSA, I’ve solved 600+ coding problems and ranked top 10% in Bhilai Hacks 2023. Check out my projects, Moviverse and Shortest Path Visualizer, for a glimpse of my innovative, scalable work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
    </html>
  );
}
