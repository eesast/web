import { PageProps } from "../..";
import MentorApplicationCounselor from "./MentorApplicationCounselor";
import MentorApplicationMentor from "./MentorApplicationMentor";
import MentorApplicationStudent from "./MentorApplicationStudent";
import Forbidden from "../../Components/Forbidden";

const MentorApplicationPage: React.FC<PageProps> = ({ mode, user }) => {
  return (
    <>
      {user.role === "student" && (
        <MentorApplicationStudent mode={mode} user={user} />
      )}
      {user.role === "counselor" && (
        <MentorApplicationCounselor mode={mode} user={user} />
      )}
      {user.role === "teacher" && (
        <MentorApplicationMentor mode={mode} user={user} />
      )}
      {!["student", "counselor", "teacher"].includes(user.role) && (
        <Forbidden />
      )}
    </>
  );
};

export default MentorApplicationPage;
