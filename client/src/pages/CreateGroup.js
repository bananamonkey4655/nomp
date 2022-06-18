import GroupSettings from "../components/GroupSettings/GroupSettings";
import Logo from "../components/Logo/Logo";

const CreateGroup = () => {
  return (
    <div className="create-group position-relative d-flex justify-content-center">
      <div className="position-absolute top-0 start-0 mt-3 ms-3">
        <Logo />
      </div>
      <GroupSettings />
    </div>
  );
};

export default CreateGroup;
