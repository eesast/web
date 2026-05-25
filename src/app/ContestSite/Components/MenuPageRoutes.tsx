import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ContestProps } from "..";
import Authenticate, { userRoles } from "../../Components/Authenticate";
import Loading from "../../Components/Loading";
import NotFound from "../../Components/NotFound";
import AnalysisPage from "../AnalysisPage";
import ArenaPage from "../ArenaPage";
import CodePage from "../CodePage";
import IntroPage from "../IntroPage";
import ManagerPage from "../ManagerPage";
import NoticePage from "../NoticePage";
import PlaybackPage from "../PlaybackPage";
import PlaygroundPage from "../PlaygroundPage";
import RecordPage from "../RecordPage";
import RLScorePage from "../RLScorePage";
import StreamPage from "../StreamPage";
import TeamPage from "../TeamPage";

const StreamNativePage = lazy(() => import("../StreamNativePage"));

const MenuPageRoutes: React.FC<ContestProps> = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="intro" element={<IntroPage {...props} />} />
        <Route path="notice" element={<NoticePage {...props} />} />

        <Route path="playground" element={<PlaygroundPage {...props} />} />
        <Route path="stream" element={<StreamPage {...props} />} />
        <Route path="stream-native" element={<StreamNativePage {...props} />} />
        <Route path="playback" element={<PlaybackPage {...props} />} />

        <Route
          path="team"
          element={
            <Authenticate role={userRoles} user={props.user}>
              <TeamPage {...props} />
            </Authenticate>
          }
        />
        <Route
          path="code"
          element={
            <Authenticate role={userRoles} user={props.user}>
              <CodePage {...props} />
            </Authenticate>
          }
        />

        <Route path="rl-score" element={<RLScorePage {...props} />} />
        <Route path="arena-score" element={<ArenaPage {...props} />} />
        <Route path="arena-record" element={<RecordPage {...props} />} />
        <Route
          path="arena-analysis"
          element={
            <Authenticate role={userRoles} user={props.user}>
              <AnalysisPage {...props} />
            </Authenticate>
          }
        />
        <Route path="manager" element={<ManagerPage {...props} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MenuPageRoutes;
