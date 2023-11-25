// Import & Init
const { UniqueConstraintError, ValidationError } = require("sequelize");
const { UserModel, RoleModel } = require("../db/sequelize");
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
exports.signUp = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
        // 
        const dataUser = { ...req.body, password: hash };
        console.log(dataUser)
        return UserModel.create(dataUser).then((result) => {
            res.status(201).json({ message: "Un utilisateur a bien été créé.", 
            data: { ...result, password: "hidden" } });
        });
    })
    .catch((error) => {
        // Redirect Error
      if (error instanceof ValidationError) {
        if (error instanceof UniqueConstraintError){
          error.message = error.message + ": l'utilisateur est déjà présent"
        }
        return res.status(400).json({ message: `${error.message}` });
      }

      res.status(500).json({ message: error });
    });
};
// Login Conexion 
exports.login = (req, res) => {
  UserModel.findOne({ where: { useremail: req.body.useremail } })
    .then((user) => {
      // console.log(user);
      if (!user) return res.status(404).json({ message: `L'utilisateur n'existe pas` });
      bcrypt.compare(req.body.password, user.password).then((isValid) => {
        if (isValid) {
          const token = jwt.sign(
            {
              data: {
                useremail: req.body.useremail,
                id: user.id,
                role: user.RoleId,
              },
            },
            SECRET_KEY,
            { expiresIn: 60 * 60 }
          );

          res.json({ message: "login réussi", data: token });
        } else {
          return res.json({ message: `Le mot de passe n'est pas correct` });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

exports.protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: `Vous n'êtes pas authentifié` });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.useremail = decoded.data.useremail;
      next();
    } catch (error) {
      res.status(403).json({ message: `Le jeton n'est pas valide` });
    }
  } else {
    res.status(401).json({ message: `Vous n'êtes pas authentifié.` });
  }
};

exports.restrictTo = (roleParam) => {
  return (req, res, next) => {
    return UserModel.findOne({ where: { useremail: req.useremail } })
      .then((user) => {
        return RoleModel.findByPk(user.RoleId).then((role) => {
          if (rolesHierarchy[role.label].includes(roleParam)) {
            console.log("UserId",user.id)
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

exports.restrictToOwnUser = (modelParam) => {
  return (req, res, next) => {
    modelParam
      .findByPk(req.params.id)
      .then((result) => {
        if (!result) {
          const message = `La ressource n°${req.params.id} n'existe pas`;
          return res.status(404).json({ message });
        }
        return UserModel.findOne({ where: { useremail: req.useremail } }).then((user) => {
          if (result.UserId !== user.id) {
            const message = "Tu n'es pas le créateur de cette ressource";
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