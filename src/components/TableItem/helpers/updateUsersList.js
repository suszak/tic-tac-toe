import axios from "../../../axios";
import * as usersListActions from "../../../actions/usersListActions";

const getAllUsers = async () => {
  return await axios.get("/getUsers");
};

export const updateUsersList = ({ dispatch }) => {
  getAllUsers().then((response) => {
    if (!response.data.error) {
      dispatch(usersListActions.updateList(response.data));
    }
  });
};
