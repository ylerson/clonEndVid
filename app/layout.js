import './globals.css';

export const metadata = {
    title: 'Aprende English with EngVid',
    description: 'Aprende English de manera facil ',
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className="bg-gray-100">{children}</body>
        </html>
    );
}
