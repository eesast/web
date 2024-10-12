import { PageProps } from "..";

/* ---------------- 主页面 ---------------- */
const RepoPage: React.FC<PageProps> = ({ mode, user }) => {
  /* ---------------- 页面组件 ---------------- */
  return (
    <div style={{ color: mode === "dark" ? "white" : "initial" }}>
      <h1>敬请期待！</h1>
    </div>
  );
};

export default RepoPage;
