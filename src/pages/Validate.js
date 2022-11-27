const Validate = (userPermission) => {
  const { id, isAdmin } = userPermission
  console.log(userPermission)
  console.log(isAdmin + "return data")
  if (isAdmin == true) {
    console.log("Your are admin")
  } else {
    console.log("You are not admin")
  }
}

export default Validate