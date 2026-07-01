import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { JournalProvider } from "./context/JournalContext";
import { useAuth } from "./hooks/useAuth";
import JournalListPage from "./pages/JournalListPage";
import EntryDetailPage from "./pages/EntryDetailPage";
import EntryFormPage from "./pages/EntryFormPage";
import LoginPage from "./pages/LoginPage";

function AuthGate() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-svh flex items-center justify-center text-stone-400">Loading…</div>;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <JournalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JournalListPage />} />
          <Route path="/entry/new" element={<EntryFormPage />} />
          <Route path="/entry/:id" element={<EntryDetailPage />} />
          <Route path="/entry/:id/edit" element={<EntryFormPage />} />
        </Routes>
      </BrowserRouter>
    </JournalProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-svh bg-stone-50">
        <AuthGate />
      </div>
    </AuthProvider>
  );
}
