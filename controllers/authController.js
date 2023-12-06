// Import & Init
const { checkIsDefaultValidatorErrorMessage } = require("./errorController");
const { ValidationError } = require("sequelize");
const { UserModel, RoleModel } = require("../db/sequelizeSetup");
// Hash JWT Init
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ma_clé_secrète";
// Set Role Hiearchy
const rolesHierarchy = {
  user: ["user", "Adherent Spectacteur / Soutiens", "Adherent Atelier"],
  editor: ["user","Adherent Spectacteur / Soutiens", "Adherent Atelier", "editor"],
  admin: ["user", "Adherent Spectacteur / Soutiens", "Adherent Atelier", "editor", "admin"],
};
// Create User
const signUp = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
        // Get Req Data
        const dataUser = { ...req.body, password: hash };
        // console.log(dataUser)
        // Check Role - If Role is a Admin Role or undefined, set value into Default Value
        if (!dataUser.RoleId || dataUser.RoleId > 5) {dataUser.RoleId = 1}
        return UserModel.create(dataUser).then((result) => {
            res.status(201).json({ message: "Un utilisateur a bien été créé.", 
            data: { ...result, password: "hidden" } });
        });
    })
    .catch((error) => {
      // Redirect Error
      if (error instanceof ValidationError) {
        // check and rename if Default Error Message
        checkIsDefaultValidatorErrorMessage(error);
        // Return Error 400
        return res.status(400).json({ message: `${error.message}` });
      }
      // Default Error
      res.status(500).json({ message: error });
    });
};
// Login Conexion 
const login = (req, res) => {
  UserModel.findOne({ where: { email: req.body.identifiant } })
    .then((user) => {
      // console.log(user);
      if (!user) return res.status(404).json({ message: `L'utilisateur n'existe pas` });
      bcrypt.compare(req.body.password, user.password).then((isValid) => {
        if (isValid) {
          const token = jwt.sign(
            {
              data: {
                email: req.body.identifiant,
                id: user.id,
                role: user.RoleId,
                username:user.username
              },
            },
            SECRET_KEY,
            { expiresIn: 60 * 60 }
          );

          res.json({ message: "login réussi", data: token });
        } else {
          return res.status(406).json({ message: `Le mot de passe n'est pas correct` });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

const protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: `Vous n'êtes pas authentifié` });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.username = decoded.data.username;
      req.email = decoded.data.email;
      // console.log(req.username)
      next();
    } catch (error) {
      res.status(403).json({ message: `Le jeton n'est pas valide` });
    }
  } else {
    res.status(401).json({ message: `Vous n'êtes pas authentifié.` });
  }
};

const restrictTo = (roleParam) => {
  return (req, res, next) => {
    return UserModel.findOne({ where: { email: req.email } })
      .then((user) => {
        return RoleModel.findByPk(user.RoleId).then((role) => {
          if (rolesHierarchy[role.label].includes(roleParam)) {
            // console.log("UserId",user.id)
            req.UserId = user.id;
            return next();
          } else {
            return res.status(403).json({ message: `Vous n'avez pas les droits suffisants` });
          }
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  };
};

const restrictToOwnUser = (modelParam) => {
  return (req, res, next) => {
    modelParam
      .findByPk(parseInt(req.params.id))
      .then((result) => {
        if (!result) {
          const message = `La ressource n°${req.params.id} n'existe pas`;
          return res.status(404).json({ message });
        } 
        return UserModel.findOne({ where: { email: req.email } }).then((user) => {
          // Only same user or a Admin User (RoleId = 5) can pass next
          if (result.id !== user.id && (user.RoleId !== 5)) {
            const message = "Tu n'as pas l'autorisation d'accéder à cette ressource";
            return res.status(403).json({ message });
          }
          return next();
        });
      })
      .catch((err) => {
        const message = "Erreur lors de l'autorisation";
        res.status(500).json({ message, data: err });
      });
  };
};

// Export
module.exports = {login, signUp, protect, restrictTo, restrictToOwnUser}