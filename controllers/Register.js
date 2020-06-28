const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  
  if(!email || !name || !password) {
    return res.status(400).json('invalid submittal');
  }

  const hash = bcrypt.hashSync(password);

  //use transaction when doing two tables at once
  //use trx for transction
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            //always respond
            res.json(user[0]);
          });
      })
      .then(trx.commit) //must commit for pass both user and login table
      .catch(trx.rollback); //rollback if not met
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
    handleRegister: handleRegister
}