import { useSelector } from "react-redux";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { selectScreen } from "../../redux/librarySlice";
import { deleteAccount } from "../../apiRequests/Account/deleteAccount";
import FormBtn from "./FormBtn";

const ChangeAccountDetails = () => {
  const screen = useSelector(selectScreen);

  return (
    <>
      <div className="mainContainer">
        {screen === 0 && <ChangeEmail />}
        {screen === 1 && <ChangePassword />}

        <FormBtn
          type="button"
          className="deleteAccountBtn"
          text="Delete Account"
          func={deleteAccount}
        />
      </div>
    </>
  );
};

export default ChangeAccountDetails;
