"use client";

export default function HomePage() {
  const handleLogin = () => {
    const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      "https://organizational-realign-app.vercel.app/api/auth/callback"
    );
    const scope = "read:user user:email";

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <main className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">Welcome to NorthPath</h1>
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Sign in with GitHub
      </button>
    </main>
  );
}