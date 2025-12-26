import "../globals.css";
import { InventoryProvider } from "../components/InventoryContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <InventoryProvider className="bg-gray-100 min-h-screen">
          {children}
        </InventoryProvider>
      </body>
    </html>
  );
}
