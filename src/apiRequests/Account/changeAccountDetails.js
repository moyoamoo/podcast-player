

export const changeAccDetails = async (details) => {
  try {
    const { data } = await axios.patch(
      "http://localhost:6001/user/update",
      details,
      {
        headers: {
          token,
        },
      }
    );
    console.log(data);
    if (data.status) {
      store.dispatch(setMessage("Account Details Changed"));
      dispatch(setEmail(userInput.email));
    }
  } catch (e) {
    console.log(e);
  }
};
