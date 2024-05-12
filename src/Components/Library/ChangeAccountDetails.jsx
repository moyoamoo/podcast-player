import { useSelector } from "react-redux";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { selectScreen } from "../../redux/librarySlice";
import { deleteAccount } from "../../apiRequests/Account/deleteAccount";

const ChangeAccountDetails = () => {
  const screen = useSelector(selectScreen);


  return (
    <>
      <div className="mainContainer">
        {screen === 0 && <ChangeEmail />}
        {screen === 1 && <ChangePassword />}

        <button
          className="deleteAccountBtn"
          onClick={() => {
            deleteAccount();
          }}
        >
          Delete Account
        </button>
      </div>
    </>
  );
};

export default ChangeAccountDetails;
