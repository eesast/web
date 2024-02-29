import { useState } from "react";

const RepoPage: React.FC = () => {
  const [mode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light",
  );

  return (
    <div style={{color: mode === 'dark' ? 'white' : 'initial'}}>
      <h1>敬请期待！</h1>
    </div>
  );
};

export default RepoPage;
