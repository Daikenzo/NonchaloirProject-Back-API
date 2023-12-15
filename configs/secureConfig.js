// Bcrypt Data
const defaultSaltRound = 10;
// JsonWebToken Info
const jwtToken = {
    key:"$2y$10$vNi4rfm4pSSkoCLWm5jYAuKCvDGBtMDZhikH4alYJz671uItPih6i",
    expiresIn: 60 * 60 // Data Shema : Minutes * Seconds
};

// Export
module.exports = {defaultSaltRound, jwtToken};